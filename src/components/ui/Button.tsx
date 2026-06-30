import { memo, useEffect, useId, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { createPortal } from "react-dom";
import {
  FiArrowUpRight,
  FiCalendar,
  FiCheckCircle,
  FiX,
} from "react-icons/fi";

type BookingForm = {
  name: string;
  email: string;
  startTime: string;
};

type BookingResponse = {
  success?: boolean;
  meetLink?: string;
  error?: string;
};

type ButtonProps = {
  className?: string;
};

const initialForm: BookingForm = {
  name: "",
  email: "",
  startTime: "",
};

async function readBookingResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    return {
      error: `Booking API returned an empty response (${response.status})`,
    } satisfies BookingResponse;
  }

  try {
    return JSON.parse(text) as BookingResponse;
  } catch {
    return {
      error: `Booking API returned a non-JSON response (${response.status})`,
    } satisfies BookingResponse;
  }
}

function Button({ className = "" }: ButtonProps) {
  const titleId = useId();
  const messageId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<BookingForm>(initialForm);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) {
        setIsOpen(false);
        setMessage("");
        setIsSuccess(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isSubmitting]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    setMessage("");
    setIsSuccess(false);
  };

  const closeDialog = () => {
    if (isSubmitting) return;
    setIsOpen(false);
    setMessage("");
    setIsSuccess(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    setIsSuccess(false);

    try {
      const response = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await readBookingResponse(response);

      if (!response.ok || !data.success) {
        throw new Error(data.error ?? "Failed to book call");
      }

      setFormData(initialForm);
      setIsSuccess(true);
      setMessage("Booked. Check your email for the calendar invite.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClassName =
    "mt-2 w-full rounded-lg border border-black/10 bg-white/65 px-4 py-3.5 text-sm text-[#111] outline-none transition placeholder:text-black/35 focus:border-black/45 focus:bg-white focus:ring-4 focus:ring-black/[0.04]";

  const modal = isOpen ? (
    <div
      className="fixed inset-0 z-[1000] flex min-h-dvh items-center justify-center overflow-y-auto bg-black/80 px-4 py-6 backdrop-blur-md"
      role="presentation"
      onMouseDown={closeDialog}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={message ? messageId : undefined}
        className="relative my-auto w-full max-w-[510px] overflow-hidden rounded-2xl border border-white/15 bg-[#f6f5f1] text-[#090909] shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#efc9ed]/75 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-[#c9c2ff]/55 blur-3xl" />

        <div className="relative border-b border-black/10 px-6 py-6 sm:px-8 sm:py-7">
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="mb-5 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.12em]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b16]" />
                Free discovery call
              </div>
              <h2
                id={titleId}
                className="max-w-sm text-3xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-[42px]"
              >
                Let’s make your idea real.
              </h2>
              <p className="mt-4 max-w-sm text-xs leading-5 text-black/55">
                Choose a 30-minute slot. We’ll talk through your goals, scope,
                and the fastest path to launch.
              </p>
            </div>
            <button
              type="button"
              onClick={closeDialog}
              disabled={isSubmitting}
              aria-label="Close booking form"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/15 bg-white/50 text-black transition hover:rotate-90 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiX size={18} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative px-6 py-6 sm:px-8 sm:py-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-black/60">
              Your name
              <input
                autoFocus
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                className={fieldClassName}
                placeholder="Full name"
              />
            </label>

            <label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-black/60">
              Work email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className={fieldClassName}
                placeholder="you@company.com"
              />
            </label>
          </div>

          <label className="mt-5 block text-[10px] font-semibold uppercase tracking-[0.08em] text-black/60">
            Preferred date and time
            <span className="relative block">
              <FiCalendar
                className="pointer-events-none absolute left-4 top-1/2 z-10 mt-1 -translate-y-1/2 text-black/45"
                size={16}
              />
              <input
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
                className={`${fieldClassName} pl-11`}
              />
            </span>
          </label>

          {message && (
            <p
              id={messageId}
              role="status"
              className={`mt-5 flex items-start gap-2 rounded-lg px-4 py-3 text-xs leading-5 ${
                isSuccess
                  ? "bg-[#c6f3b7]/70 text-[#173d13]"
                  : "bg-[#ffd8ce] text-[#7c2414]"
              }`}
            >
              {isSuccess && <FiCheckCircle className="mt-0.5 shrink-0" size={15} />}
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 flex w-full items-center justify-between rounded-lg bg-[#080808] px-5 py-4 text-xs font-semibold text-white transition hover:bg-[#242424] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span>{isSubmitting ? "Booking your call…" : "Confirm free call"}</span>
            <FiArrowUpRight size={16} />
          </button>

          <p className="mt-4 text-center text-[9px] leading-4 text-black/40">
            No sales pressure. Just a focused conversation about your product.
          </p>
        </form>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center justify-center gap-2 rounded-[5px] border border-[#242424] bg-[#0c0c0c] px-[18px] py-3 text-xs font-bold text-white transition hover:-translate-y-0.5 hover:border-[#444] hover:bg-[#171717] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${className}`}
      >
        Book a free call
        <FiArrowUpRight size={14} aria-hidden="true" />
      </button>

      {modal && typeof document !== "undefined"
        ? createPortal(modal, document.body)
        : null}
    </>
  );
}

export default memo(Button);
