import { memo, useEffect, useId, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { createPortal } from "react-dom";
import { FiArrowRight, FiX } from "react-icons/fi";

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

const initialForm: BookingForm = {
  name: "",
  email: "",
  startTime: "",
};

function Button() {
  const titleId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState<BookingForm>(initialForm);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) {
        setIsOpen(false);
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
  };

  const closeDialog = () => {
    if (isSubmitting) return;
    setIsOpen(false);
    setMessage("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = (await response.json()) as BookingResponse;

      if (!response.ok || !data.success) {
        throw new Error(data.error ?? "Failed to book call");
      }

      setFormData(initialForm);
      setMessage("Booked. Check your email for the invite.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const modal = isOpen ? (
    <div
      className="fixed inset-0 z-[1000] flex min-h-dvh items-center justify-center overflow-y-auto bg-black/35 px-4 py-6 backdrop-blur-sm"
      role="presentation"
      onMouseDown={closeDialog}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="my-auto w-full max-w-md rounded-2xl border border-white/70 bg-white p-5 shadow-2xl sm:p-6"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2
              id={titleId}
              className="font-['Syne'] text-xl font-semibold text-gray-950"
            >
              Book a free call
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              Pick a 30-minute slot and we will send your Google Meet link.
            </p>
          </div>
          <button
            type="button"
            onClick={closeDialog}
            disabled={isSubmitting}
            aria-label="Close booking form"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-xs font-medium text-gray-700">
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-normal text-gray-800 outline-none transition focus:border-[#EFC677] focus:ring-2 focus:ring-[#F8D38A]/30"
              placeholder="Your full name"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-xs font-medium text-gray-700">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-normal text-gray-800 outline-none transition focus:border-[#EFC677] focus:ring-2 focus:ring-[#F8D38A]/30"
              placeholder="you@example.com"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-xs font-medium text-gray-700">
            Date and time
            <input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
              className="rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-normal text-gray-800 outline-none transition focus:border-[#EFC677] focus:ring-2 focus:ring-[#F8D38A]/30"
            />
          </label>

          {message && (
            <p className="rounded-xl bg-gray-50 px-3 py-2 text-sm text-gray-700">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 rounded-xl bg-gradient-to-b from-[#F8D38A] to-[#EFC677] px-4 py-3 text-sm font-medium text-black shadow-[inset_0_2px_8px_rgba(255,255,255,0.35)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Booking..." : "Confirm booking"}
          </button>
        </form>
      </div>
    </div>
  ) : null;

  return (
    <>
      <div className="relative isolate inline-block rounded-2xl p-1">
        <div className="absolute inset-0 z-0 rounded-2xl bg-gradient-to-b from-[#F8D38A]/55 to-[#F3CB7A]/40 blur-md" />
        <div className="relative z-10 rounded-[14px] bg-white/90 p-0.5">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="
              -mt-1.5
              flex items-center justify-between gap-5
              rounded-xl
              bg-gradient-to-b from-[#F8D38A] to-[#F3CB7A]
              px-3 py-1.5 shadow-[inset_0_4px_10px_rgba(255,255,255,0.35)]
              sm:px-4
            "
          >
            <span className="whitespace-nowrap font-['inter'] text-sm font-extralight text-black">
              Book a free call
            </span>
            <span className="rounded-lg border border-white/40 bg-white">
              <span
                className="
                  flex translate-x-px translate-y-px items-center justify-center
                  rounded-lg bg-gradient-to-b from-[#F6D28B] to-[#EFC677]
                  p-1.5 shadow-[2px_3px_2px_rgba(0,0,0,0.16),inset_0_2px_6px_rgba(255,255,255,0.4)]
                "
              >
                <FiArrowRight className="text-sm text-white" />
              </span>
            </span>
          </button>
        </div>
      </div>

      {modal && typeof document !== "undefined"
        ? createPortal(modal, document.body)
        : null}
    </>
  );
}

export default memo(Button);
