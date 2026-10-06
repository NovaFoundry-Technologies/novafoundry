import { useEffect } from "react";
import { Check, X } from "lucide-react";

export type AuditReport = {
  siteName: string;
  overallScore: number;
  verdict: string;
  speed: number;
  mobile: number;
  firstImpression: number;
  findings: Array<{
    title: string;
    description: string;
  }>;
  summary: string;
};

type AuditReportModalProps = {
  report: AuditReport;
  onClose: () => void;
};

const scoreColor = (score: number) => {
  if (score < 50) return "text-[#f05b3f]";
  if (score < 70) return "text-[#dc9200]";
  return "text-[#119b20]";
};

const AuditReportModal = ({ report, onClose }: AuditReportModalProps) => {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/55 p-[12px] backdrop-blur-[3px] sm:p-[24px]"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="audit-report-title"
        className="relative my-auto w-full max-w-[730px] overflow-hidden rounded-[18px] bg-[#fdfdfd] p-[22px] shadow-[0_30px_100px_rgba(0,0,0,.28)] sm:p-[28px]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close audit report"
          className="absolute top-[18px] right-[18px] grid h-[36px] w-[36px] cursor-pointer place-items-center rounded-full bg-black/[0.05] text-[#151515] transition hover:bg-black/10"
        >
          <X size={18} />
        </button>

        <div className="pr-[44px] sm:flex sm:items-end sm:justify-between">
          <div>
            <p className="text-[16px] font-medium text-[#909bab]">Digital presence audit</p>
            <h2 id="audit-report-title" className="mt-[2px] text-[20px] font-semibold tracking-[-0.03em] text-[#171717]">
              {report.siteName}
            </h2>
          </div>
          <p className="mt-[8px] text-[13px] text-[#909bab] sm:mt-0">Prepared by Novafoundry</p>
        </div>

        <div className="relative mt-[14px] min-h-[168px] overflow-hidden rounded-[14px] border border-black/15 bg-[#fafafa] px-[20px] py-[34px]">
          <svg className="pointer-events-none absolute right-0 bottom-0 h-full w-[48%] opacity-80" viewBox="0 0 340 170" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 170V120C35 112 42 162 72 142C95 126 72 76 104 70C133 65 130 150 164 148C194 146 188 91 221 94C252 97 247 46 273 43C304 39 297 6 320 0C335 9 332 50 340 48V170Z" fill="#e7eefb" />
            <path d="M0 120C35 112 42 162 72 142C95 126 72 76 104 70C133 65 130 150 164 148C194 146 188 91 221 94C252 97 247 46 273 43C304 39 297 6 320 0C335 9 332 50 340 48" fill="none" stroke="#bd7000" strokeWidth="2.5" />
          </svg>
          <div className="relative z-10 max-w-[410px]">
            <p className="text-[17px] font-semibold text-[#7d8899]">{report.overallScore}% Success</p>
            <div className="mt-[9px] h-[12px] overflow-hidden rounded-full bg-[#e6e6e6]">
              <div className="h-full rounded-full bg-[#c9c9c9]" style={{ width: `${report.overallScore}%` }} />
            </div>
            <p className="mt-[10px] text-[16px] text-[#8995a6]">Overall score: {report.verdict}</p>
          </div>
        </div>

        <div className="mt-[14px] grid grid-cols-3 gap-[10px]">
          {[
            ["Speed", report.speed],
            ["Mobile", report.mobile],
            ["First impression", report.firstImpression],
          ].map(([label, score]) => (
            <div key={label} className="rounded-[13px] border border-black/15 bg-[#fafafa] px-[8px] py-[25px] text-center">
              <p className="text-[13px] text-[#8995a6] sm:text-[16px]">{label}</p>
              <p className={`mt-[8px] text-[26px] font-semibold sm:text-[30px] ${scoreColor(Number(score))}`}>
                {score}{label === "Speed" ? "%" : ""}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-[14px] rounded-[13px] border border-black/15 bg-[#fafafa] px-[14px] py-[18px] sm:px-[20px]">
          <ol className="space-y-[16px]">
            {report.findings.map((finding, index) => (
              <li key={`${finding.title}-${index}`} className="flex gap-[13px] text-[14px] leading-[1.45] text-[#8995a6] sm:text-[16px]">
                <span className={`grid h-[27px] w-[27px] shrink-0 place-items-center rounded-full text-[12px] text-white ${index === 0 ? "bg-[#470a0a]" : index === 1 ? "bg-[#dd9200]" : "bg-[#2f238e]"}`}>
                  {index + 1}
                </span>
                <div className="pt-[1px]">
                  <h3 className="text-[15px] font-medium tracking-[-0.02em] text-[#171717] sm:text-[17px]">
                    {finding.title}
                  </h3>
                  <p className="mt-[7px] text-[13px] leading-[1.55] text-[#8995a6] sm:text-[14px]">
                    {finding.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-[16px] flex items-start gap-[10px] rounded-[10px] bg-[#f0eefb] px-[14px] py-[12px] text-[12px] leading-[1.5] text-[#514a75]">
          <Check size={16} className="mt-[1px] shrink-0" />
          <p>{report.summary}</p>
        </div>
      </section>
    </div>
  );
};

export default AuditReportModal;
