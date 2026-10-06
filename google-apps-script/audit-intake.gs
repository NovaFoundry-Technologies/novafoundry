/**
 * NovaFoundry — free audit intake
 *
 * Deploy (no Google Cloud or service account needed):
 * 1. Create an Apps Script project and paste this file in. If no Sheet ID is
 *    configured, the script creates "NovaFoundry Audit Requests" automatically.
 * 2. Deploy > New deployment > type "Web app".
 *    Execute as: Me. Who has access: Anyone.
 * 3. Copy the /exec URL and configure it as AUDIT_INTAKE_ENDPOINT.
 *
 * After editing this script, create a new deployment version (Deploy > Manage
 * deployments > edit > Version: New version) or edits will not take effect.
 */

var SHEET_NAME = "Audit Requests";

// Paste the Sheet ID here if this script is a standalone project. It is the
// long string in the Sheet URL between /d/ and /edit. Leave it empty when the
// script is bound to the Sheet, because then the bound Sheet is used instead.
var SPREADSHEET_ID = "";
var HEADERS = [
  "Submitted",
  "Name",
  "Email",
  "Phone",
  "Website",
  "Industry",
  "Goals",
  "Timeline",
  "Notes",
  "Overall Score",
  "Verdict",
  "Speed",
  "Mobile",
  "First Impression",
  "Top Fixes",
  "Audit Summary",
];
var CONTACT_COOLDOWN_SECONDS = 30 * 60;
var MAX_SUBMISSIONS_PER_HOUR = 30;
var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function doGet() {
  try {
    var sheet = getSheet();
    return json({
      ok: true,
      spreadsheetId: sheet.getParent().getId(),
      sheet: sheet.getName(),
      lastRow: sheet.getLastRow(),
    });
  } catch (error) {
    return json({ ok: false, error: String(error) }, 500);
  }
}

function doPost(e) {
  var payload = readPayload(e);

  var name = clean(payload.name, 120);
  var email = clean(payload.email, 160).toLowerCase();
  var phone = clean(payload.phone, 40);
  var website = normalizeUrl(clean(payload.website, 400));
  var industry = clean(payload.industry, 80);
  var timeline = clean(payload.timeline, 80);
  var goals = cleanList(payload.goals).slice(0, 12).join(", ");
  var notes = clean(payload.notes, 2000);
  var report = readAuditReport(payload.auditReport);

  if (name.length < 2) {
    return json({ ok: false, error: "Name is required" }, 400);
  }

  if (!EMAIL_PATTERN.test(email)) {
    return json({ ok: false, error: "A valid email is required" }, 400);
  }

  if (!/^\+[1-9]\d{6,14}$/.test(phone)) {
    return json({ ok: false, error: "A valid international phone number is required" }, 400);
  }

  if (!claimSlot(email, phone)) {
    return json({ ok: false, error: "Please wait before submitting again" }, 429);
  }

  var lead = {
    name: name,
    email: email,
    phone: phone,
    website: website,
    industry: industry,
    goals: goals,
    timeline: timeline,
    notes: notes,
    report: report,
  };

  try {
    appendLead(lead);
  } catch (error) {
    Logger.log("appendLead failed: " + error);
    return json({ ok: false, error: "Could not record the request" }, 500);
  }

  return json({ ok: true });
}

function readPayload(e) {
  if (e && e.parameter && e.parameter.name) {
    return e.parameter;
  }

  // Apps Script exposes the raw POST body through e.postData, not e.postBody.
  var raw = e && e.postData && e.postData.contents;

  if (!raw) {
    return {};
  }

  try {
    var parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    return {};
  }
}

function getSheet() {
  var spreadsheet = getSpreadsheet();

  // Always write to the first tab (gid=0), which is the tab linked from the
  // NovaFoundry audit spreadsheet. This avoids rows landing in a second tab.
  var sheets = spreadsheet.getSheets();
  return sheets[0] || spreadsheet.insertSheet(SHEET_NAME);
}

function getSpreadsheet() {
  if (SPREADSHEET_ID) {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }

  var properties = PropertiesService.getScriptProperties();
  var savedId = properties.getProperty("AUDIT_SPREADSHEET_ID");

  if (savedId) {
    return SpreadsheetApp.openById(savedId);
  }

  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  if (activeSpreadsheet) {
    properties.setProperty("AUDIT_SPREADSHEET_ID", activeSpreadsheet.getId());
    return activeSpreadsheet;
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    savedId = properties.getProperty("AUDIT_SPREADSHEET_ID");

    if (savedId) {
      return SpreadsheetApp.openById(savedId);
    }

    var createdSpreadsheet = SpreadsheetApp.create("NovaFoundry Audit Requests");
    properties.setProperty("AUDIT_SPREADSHEET_ID", createdSpreadsheet.getId());
    return createdSpreadsheet;
  } finally {
    lock.releaseLock();
  }
}

function appendLead(lead) {
  var sheet = getSheet();

  // Preserve existing rows when upgrading an older sheet that did not yet
  // contain the Phone column.
  if (sheet.getLastRow() > 0 && sheet.getRange(1, 4).getValue() === "Website") {
    sheet.insertColumnBefore(4);
  }

  // Keep the header row aligned when new audit columns are added later.
  sheet
    .getRange(1, 1, 1, HEADERS.length)
    .setValues([HEADERS])
    .setFontWeight("bold");

  var row = sheet.getLastRow() + 1;
  var range = sheet.getRange(row, 1, 1, HEADERS.length);

  // Plain text format first, otherwise a note starting with = becomes a formula.
  range.setNumberFormat("@");

  range.setValues([
    [
      new Date().toISOString(),
      lead.name,
      lead.email,
      lead.phone,
      lead.website || "No website yet",
      lead.industry || "Not provided",
      lead.goals || "Not provided",
      lead.timeline || "Not provided",
      lead.notes,
      lead.report.overallScore,
      lead.report.verdict,
      lead.report.speed,
      lead.report.mobile,
      lead.report.firstImpression,
      lead.report.findings
        .map(function (finding, index) {
          return (
            index +
            1 +
            ". " +
            finding.title +
            (finding.description ? " — " + finding.description : "")
          );
        })
        .join("\n"),
      lead.report.summary,
    ],
  ]);
}

function claimSlot(email, phone) {
  var cache = CacheService.getScriptCache();
  var digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    String(email).toLowerCase() + "|" + String(phone),
  );
  var contactKey =
    "audit-contact-" +
    digest
      .map(function (byte) {
        return (byte + 256).toString(16).slice(-2);
      })
      .join("");

  if (cache.get(contactKey)) {
    return false;
  }

  var lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) {
    return false;
  }

  try {
    var hourKey = "audit-hour-" + Utilities.formatDate(new Date(), "UTC", "yyyyMMddHH");
    var hourlyCount = Number(cache.get(hourKey) || 0);

    if (hourlyCount >= MAX_SUBMISSIONS_PER_HOUR) {
      return false;
    }

    cache.put(hourKey, String(hourlyCount + 1), 60 * 60);
    cache.put(contactKey, "1", CONTACT_COOLDOWN_SECONDS);
    return true;
  } finally {
    lock.releaseLock();
  }
}

function normalizeUrl(value) {
  if (!value) {
    return "";
  }

  var candidate = /^[a-z][a-z0-9+.-]*:\/\//i.test(value)
    ? value
    : "https://" + value;

  // Apps Script does not consistently expose the browser's WHATWG URL class.
  // Validate the schemes and hostname without relying on `new URL()`.
  if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(candidate)) {
    return "";
  }

  return candidate;
}

function clean(value, maxLength) {
  var text = value === undefined || value === null ? "" : String(value).trim();
  return text.slice(0, maxLength);
}

function cleanList(value) {
  if (value === undefined || value === null) {
    return [];
  }

  var list = Array.isArray(value) ? value : String(value).split(",");

  return list
    .map(function (item) {
      return String(item).trim();
    })
    .filter(function (item) {
      return item.length > 0;
    });
}

function readAuditReport(value) {
  var report = value && typeof value === "object" ? value : {};

  function score(input) {
    var number = Number(input);
    return isFinite(number) ? Math.max(0, Math.min(100, Math.round(number))) : "";
  }

  return {
    overallScore: score(report.overallScore),
    verdict: clean(report.verdict, 80),
    speed: score(report.speed),
    mobile: score(report.mobile),
    firstImpression: score(report.firstImpression),
    findings: (Array.isArray(report.findings) ? report.findings : [])
      .slice(0, 3)
      .map(function (finding) {
        if (finding && typeof finding === "object") {
          return {
            title: clean(finding.title, 180),
            description: clean(finding.description, 500),
          };
        }

        return {
          title: clean(finding, 180),
          description: "",
        };
      }),
    summary: clean(report.summary, 600),
  };
}

function json(payload, status) {
  // ContentService.TextOutput has no setStatusCode method. Include the desired
  // status in the JSON body so validation failures do not cause script errors.
  if (status) {
    payload.status = status;
  }

  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
