import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { ArrowLeft, ArrowUpRight, Check, Loader2 } from "lucide-react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import AuditReportModal from "./AuditReportModal";
import type { AuditReport } from "./AuditReportModal";
import { generatePageSpeedAudit } from "../../lib/pageSpeedAudit";
import {
  AUDIT_FORM_ID,
  AUDIT_GOALS,
  AUDIT_INDUSTRIES,
  AUDIT_INTAKE_ENDPOINT,
  AUDIT_TIMELINES,
  DEFAULT_AUDIT_GOAL,
  START_AUDIT_EVENT,
} from "../../data/audit";

type Step = "website" | "details" | "sent";

type Errors = Partial<Record<"name" | "email" | "phone", string>>;

const inputClass =
  "h-[54px] w-full border-b border-black/15 bg-transparent px-0 text-[16px] text-[#111] outline-none transition-colors placeholder:text-[#a2abba] focus:border-[#2f2297]";

const labelClass =
  "mb-[6px] block text-[10px] font-semibold tracking-[0.14em] text-[#667080] uppercase";

const selectClass =
  "h-[54px] w-full appearance-none border-b border-black/15 bg-transparent pr-6 text-[15px] text-[#111] outline-none transition-colors focus:border-[#2f2297]";

const AuditForm = () => {
  const [step, setStep] = useState<Step>("website");
  const [website, setWebsite] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState<string | undefined>();
  const [industry, setIndustry] = useState("");
  const [timeline, setTimeline] = useState("");
  const [goals, setGoals] = useState<string[]>([DEFAULT_AUDIT_GOAL]);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [report, setReport] = useState<AuditReport | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleStart = () => {
      setStep("details");
      setStatus("idle");

      window.setTimeout(() => {
        document
          .getElementById(AUDIT_FORM_ID)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });

        detailsRef.current
          ?.querySelector<HTMLInputElement>('input[name="name"]')
          ?.focus({ preventScroll: true });
      }, 60);
    };

    window.addEventListener(START_AUDIT_EVENT, handleStart);

    return () => window.removeEventListener(START_AUDIT_EVENT, handleStart);
  }, []);

  const goToDetails = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStep("details");
    setStatus("idle");

    window.setTimeout(() => {
      document
        .getElementById(AUDIT_FORM_ID)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });

      detailsRef.current
        ?.querySelector<HTMLInputElement>('input[name="name"]')
        ?.focus({ preventScroll: true });
    }, 60);
  };

  const toggleGoal = (goal: string) => {
    setGoals((current) =>
      current.includes(goal)
        ? current.filter((item) => item !== goal)
        : [...current, goal],
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Errors = {};

    if (name.trim().length < 2) {
      nextErrors.name = "Please enter your name";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address";
    }

    if (!phone || !isValidPhoneNumber(phone)) {
      nextErrors.phone = "Choose your country and enter a valid phone number";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    if (!AUDIT_INTAKE_ENDPOINT) {
      setStatus("error");
      setErrorMessage(
        "The audit form is not connected yet. Please email contact@novafoundry.org and we will take it from there.",
      );

      return;
    }

    try {
      if (!website.trim()) {
        throw new Error("Enter a website address to generate a Lighthouse audit.");
      }

      let generatedReport: AuditReport | null = null;
      let auditError: unknown = null;

      try {
        generatedReport = await generatePageSpeedAudit(website);
      } catch (error) {
        auditError = error;
      }

      // Save the lead even when PageSpeed fails. The same-origin API forwards
      // the request to Apps Script without exposing its cross-origin redirect.
      const response = await fetch(AUDIT_INTAKE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          website,
          industry,
          timeline,
          goals,
          notes,
          auditReport: generatedReport,
        }),
      });

      const result = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;

      if (!response.ok || result?.success !== true) {
        throw new Error(
          result?.message || "We could not save your request. Please try again.",
        );
      }

      if (!generatedReport) {
        throw auditError instanceof Error
          ? auditError
          : new Error("The lead was saved, but the audit could not be generated.");
      }

      setReport(generatedReport);
      setIsReportOpen(true);
      setStep("sent");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "We could not generate the audit. Please check your connection and try again.",
      );
    }
  };

  if (step === "website") {
    return (
      <form
        id={AUDIT_FORM_ID}
        onSubmit={goToDetails}
        className="mx-auto mt-[39px] flex w-full max-w-[1080px] scroll-mt-28 flex-col rounded-[6px] border border-black/[0.10] bg-white p-[6px] sm:flex-row"
      >
        <input
          type="text"
          name="website"
          value={website}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setWebsite(event.target.value)
          }
          aria-label="Website URL"
          placeholder="Enter your website URL"
          className="h-[62px] min-w-0 flex-1 bg-transparent px-[20px] text-[16px] font-medium text-[#222] outline-none placeholder:font-normal placeholder:text-[#a2abba] sm:px-[20px]"
        />

        <button
          type="submit"
          className="inline-flex h-[62px] w-full shrink-0 cursor-pointer items-center justify-between rounded-[5px] bg-black px-[28px] text-[18px] font-medium tracking-[-0.025em] text-white transition hover:bg-[#1b1b1b] sm:w-[316px] sm:px-[56px]"
        >
          <span>Get my free audit</span>
          <ArrowUpRight size={23} strokeWidth={1.5} className="ml-5 shrink-0" />
        </button>
      </form>
    );
  }

  if (step === "sent") {
    return (
      <>
        <div
          id={AUDIT_FORM_ID}
          className="mx-auto mt-[39px] w-full max-w-[1080px] scroll-mt-28 rounded-[8px] border border-black/[0.10] bg-white p-[38px] text-center sm:p-[52px]"
        >
          <span className="mx-auto grid h-[46px] w-[46px] place-items-center rounded-full bg-[#2f2297] text-white">
            <Check size={22} strokeWidth={2.2} />
          </span>

          <h3 className="mt-[22px] text-[clamp(24px,2.4vw,32px)] leading-[1.08] font-semibold tracking-[-0.045em] text-[#101010]">
            Your audit is ready
          </h3>

          <p className="mx-auto mt-[16px] max-w-[520px] text-[15px] leading-[1.6] tracking-[-0.015em] text-[#555555]">
            We generated an initial digital presence audit for {website || "your business"}.
          </p>

          <button
            type="button"
            onClick={() => setIsReportOpen(true)}
            className="mt-[26px] inline-flex h-[46px] cursor-pointer items-center gap-[10px] rounded-[5px] bg-black px-[26px] text-[13px] font-medium text-white transition hover:bg-[#1b1b1b]"
          >
            View my audit
            <ArrowUpRight size={15} />
          </button>
        </div>

        {report && isReportOpen ? (
          <AuditReportModal report={report} onClose={() => setIsReportOpen(false)} />
        ) : null}
      </>
    );
  }

  return (
    <form
      id={AUDIT_FORM_ID}
      onSubmit={handleSubmit}
      noValidate
      className="relative mx-auto mt-[39px] w-full max-w-[1080px] scroll-mt-28 rounded-[8px] border border-black/[0.10] bg-white p-[26px] sm:p-[40px]"
    >
      <div className="flex flex-wrap items-end justify-between gap-[12px]">
        <h3 className="text-[clamp(20px,2vw,26px)] leading-[1.1] font-semibold tracking-[-0.04em] text-[#101010]">
          Where should we send the audit?
        </h3>

        <button
          type="button"
          onClick={() => setStep("website")}
          className="inline-flex cursor-pointer items-center gap-[7px] text-[12px] font-medium text-[#555] transition hover:text-[#2f2297]"
        >
          <ArrowLeft size={14} />
          Change URL
        </button>
      </div>

      <div ref={detailsRef} className="mt-[30px] grid gap-x-[28px] gap-y-[24px] sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="audit-website">
            Website
          </label>
          <input
            id="audit-website"
            type="text"
            name="website"
            value={website}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setWebsite(event.target.value)
            }
            placeholder="yoursite.com — leave blank if you don't have one"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="audit-phone">
            Phone number
          </label>
          <PhoneInput
            id="audit-phone"
            international
            value={phone}
            onChange={setPhone}
            placeholder="Select country and enter your number"
            aria-invalid={Boolean(errors.phone)}
            className="audit-phone-input h-[54px] border-b border-black/15 text-[15px] text-[#111] focus-within:border-[#2f2297]"
          />
          {errors.phone ? (
            <p className="mt-[8px] text-[12px] text-[#c0392b]">{errors.phone}</p>
          ) : (
            <p className="mt-[7px] text-[11px] text-[#8b8b8b]">
              Stored securely in international format.
            </p>
          )}
        </div>

        <div>
          <label className={labelClass} htmlFor="audit-name">
            Your name
          </label>
          <input
            id="audit-name"
            type="text"
            name="name"
            value={name}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setName(event.target.value)
            }
            placeholder="Jane Doe"
            aria-invalid={Boolean(errors.name)}
            className={inputClass}
          />
          {errors.name ? (
            <p className="mt-[8px] text-[12px] text-[#c0392b]">{errors.name}</p>
          ) : null}
        </div>

        <div>
          <label className={labelClass} htmlFor="audit-email">
            Work email
          </label>
          <input
            id="audit-email"
            type="email"
            name="email"
            value={email}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
            placeholder="jane@company.com"
            aria-invalid={Boolean(errors.email)}
            className={inputClass}
          />
          {errors.email ? (
            <p className="mt-[8px] text-[12px] text-[#c0392b]">{errors.email}</p>
          ) : null}
        </div>

        <div>
          <label className={labelClass} htmlFor="audit-industry">
            Industry
          </label>
          <select
            id="audit-industry"
            name="industry"
            value={industry}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setIndustry(event.target.value)
            }
            className={selectClass}
          >
            <option value="">Select your industry</option>
            {AUDIT_INDUSTRIES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="audit-timeline">
            Timeline
          </label>
          <select
            id="audit-timeline"
            name="timeline"
            value={timeline}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setTimeline(event.target.value)
            }
            className={selectClass}
          >
            <option value="">When do you need this?</option>
            {AUDIT_TIMELINES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <span className={labelClass}>What do you want to improve?</span>

          <div className="mt-[10px] flex flex-wrap gap-[8px]">
            {AUDIT_GOALS.map((goal) => {
              const isActive = goals.includes(goal);

              return (
                <button
                  key={goal}
                  type="button"
                  onClick={() => toggleGoal(goal)}
                  aria-pressed={isActive}
                  className={`h-[38px] cursor-pointer rounded-full border px-[15px] text-[12px] font-medium tracking-[-0.015em] transition ${
                    isActive
                      ? "border-[#2f2297] bg-[#2f2297] text-white"
                      : "border-black/[0.14] bg-white text-[#262626] hover:border-black/35"
                  }`}
                >
                  {goal}
                </button>
              );
            })}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="audit-notes">
            Anything we should know? <span className="normal-case">(optional)</span>
          </label>
          <textarea
            id="audit-notes"
            name="notes"
            value={notes}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setNotes(event.target.value)
            }
            rows={3}
            placeholder="What is not working, what you have already tried, or what a win would look like."
            className="w-full resize-none border-b border-black/15 bg-transparent py-[12px] text-[15px] leading-[1.55] text-[#111] outline-none transition-colors placeholder:text-[#a2abba] focus:border-[#2f2297]"
          />
        </div>
      </div>

      {errorMessage ? (
        <p className="mt-[20px] rounded-[6px] bg-[#fdecea] px-[14px] py-[11px] text-[13px] text-[#c0392b]">
          {errorMessage}
        </p>
      ) : null}

      <div className="mt-[30px] flex flex-col items-start gap-[16px] sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px] leading-[1.5] text-[#7b7b7b]">
          No spam, no sales sequence. Your report lands within two hours.
        </p>

        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-[58px] w-full shrink-0 cursor-pointer items-center justify-center gap-[12px] rounded-[5px] bg-black px-[34px] text-[16px] font-medium tracking-[-0.025em] text-white transition hover:bg-[#1b1b1b] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {status === "sending" ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              Generating audit…
            </>
          ) : (
            <>
              Generate my audit
              <ArrowUpRight size={19} strokeWidth={1.6} />
            </>
          )}
        </button>
      </div>

    </form>
  );
};

export default AuditForm;
