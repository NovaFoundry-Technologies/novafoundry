import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  FiAlertCircle,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiMail,
  FiRefreshCw,
  FiUser,
} from "react-icons/fi";

type BusySlot = {
  start: string;
  end: string;
};

type AvailabilityResponse = {
  busySlots?: BusySlot[];
  error?: string;
};

type BookingResponse = {
  success?: boolean;
  meetLink?: string;
  error?: string;
};

type BookingForm = {
  name: string;
  email: string;
};

type SlotState = {
  time: Date;
  isFree: boolean;
};

const initialForm: BookingForm = {
  name: "",
  email: "",
};

const slotFormatter = new Intl.DateTimeFormat([], {
  hour: "numeric",
  minute: "2-digit",
});

const longDateFormatter = new Intl.DateTimeFormat([], {
  weekday: "long",
  month: "long",
  day: "numeric",
});

function getTodayValue() {
  const today = new Date();
  const offset = today.getTimezoneOffset() * 60000;

  return new Date(today.getTime() - offset).toISOString().slice(0, 10);
}

function generateSlots(date: string) {
  const slots: Date[] = [];
  const start = new Date(`${date}T09:00:00`);
  const end = new Date(`${date}T17:00:00`);

  while (start < end) {
    slots.push(new Date(start));
    start.setMinutes(start.getMinutes() + 30);
  }

  return slots;
}

function isSlotFree(slot: Date, busySlots: BusySlot[]) {
  const slotEnd = new Date(slot.getTime() + 30 * 60000);

  return !busySlots.some((busySlot) => {
    const busyStart = new Date(busySlot.start);
    const busyEnd = new Date(busySlot.end);

    return slot < busyEnd && slotEnd > busyStart;
  });
}

function isSlotBookable(slot: Date, busySlots: BusySlot[]) {
  return slot.getTime() > Date.now() && isSlotFree(slot, busySlots);
}

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function Booking() {
  const [date, setDate] = useState(getTodayValue);
  const [busySlots, setBusySlots] = useState<BusySlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [formData, setFormData] = useState<BookingForm>(initialForm);
  const [availabilityError, setAvailabilityError] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");
  const [meetLink, setMeetLink] = useState("");
  const [isLoadingAvailability, setIsLoadingAvailability] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);

  const slots = useMemo<SlotState[]>(
    () =>
      generateSlots(date).map((slot) => ({
        time: slot,
        isFree: isSlotBookable(slot, busySlots),
      })),
    [busySlots, date],
  );

  const selectedLabel = selectedSlot
    ? `${longDateFormatter.format(selectedSlot)} at ${slotFormatter.format(
        selectedSlot,
      )}`
    : "";

  useEffect(() => {
    const controller = new AbortController();

    async function loadAvailability() {
      setIsLoadingAvailability(true);
      setAvailabilityError("");
      setBookingMessage("");
      setMeetLink("");

      try {
        const response = await fetch(
          `/api/availability?date=${encodeURIComponent(date)}`,
          { signal: controller.signal },
        );
        const data = (await response.json()) as AvailabilityResponse;

        if (!response.ok) {
          throw new Error(data.error ?? "Failed to load availability");
        }

        setBusySlots(data.busySlots ?? []);
        setSelectedSlot((current) => {
          if (!current) return null;

          const nextIsFree = isSlotBookable(current, data.busySlots ?? []);

          return nextIsFree ? current : null;
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setBusySlots([]);
        setSelectedSlot(null);
        setAvailabilityError(
          getErrorMessage(error, "Failed to load availability"),
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoadingAvailability(false);
        }
      }
    }

    loadAvailability();

    return () => controller.abort();
  }, [date, reloadToken]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    setBookingMessage("");
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
    setSelectedSlot(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBookingMessage("");
    setMeetLink("");

    if (!selectedSlot) {
      setBookingMessage("Choose an available time slot first.");
      return;
    }

    if (!isSlotBookable(selectedSlot, busySlots)) {
      setBookingMessage("That time is no longer available.");
      return;
    }

    setIsBooking(true);

    try {
      const response = await fetch("/api/book-call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          startTime: selectedSlot.toISOString(),
        }),
      });
      const data = (await response.json()) as BookingResponse;

      if (!response.ok || !data.success) {
        throw new Error(data.error ?? "Failed to book call");
      }

      setFormData(initialForm);
      setSelectedSlot(null);
      setMeetLink(data.meetLink ?? "");
      setBookingMessage("Booked. Your Google Meet invite is on its way.");

      const availability = await fetch(
        `/api/availability?date=${encodeURIComponent(date)}`,
      );
      const availabilityData =
        (await availability.json()) as AvailabilityResponse;

      if (availability.ok) {
        setBusySlots(availabilityData.busySlots ?? []);
      }
    } catch (error) {
      setBookingMessage(getErrorMessage(error, "Failed to book call"));
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <div className="overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-[0_18px_60px_rgba(16,24,40,0.08)]">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-gradient-to-br from-[#FFF8EF] via-[#F6F7FF] to-[#EAF6FF] p-6 sm:p-8">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-3 py-1 text-xs font-medium text-gray-600 shadow-sm">
              <FiCalendar className="text-[#E8B85F]" />
              Free strategy call
            </span>

            <h1 className="mt-6 font-['Syne'] text-3xl font-semibold leading-tight text-gray-950 sm:text-4xl">
              Choose a time that works.
            </h1>

            <p className="mt-4 text-sm leading-6 text-gray-600">
              Pick a 30-minute opening and we will send a confirmed Google Meet
              link to your inbox.
            </p>

            <div className="mt-8 grid gap-3 text-sm text-gray-700">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#E8B85F] shadow-sm">
                  <FiClock />
                </span>
                30 minutes
              </div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#8B7CFF] shadow-sm">
                  <FiCheckCircle />
                </span>
                Booked slots are blocked automatically
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-5 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-xs font-medium text-gray-700">
                Your name
                <span className="relative">
                  <FiUser className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Full name"
                    className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-10 pr-3 text-sm font-normal text-gray-900 outline-none transition focus:border-[#EFC677] focus:ring-4 focus:ring-[#F8D38A]/20"
                  />
                </span>
              </label>

              <label className="flex flex-col gap-2 text-xs font-medium text-gray-700">
                Email address
                <span className="relative">
                  <FiMail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-gray-200 bg-white py-3 pl-10 pr-3 text-sm font-normal text-gray-900 outline-none transition focus:border-[#EFC677] focus:ring-4 focus:ring-[#F8D38A]/20"
                  />
                </span>
              </label>
            </div>

            <label className="mt-5 flex flex-col gap-2 text-xs font-medium text-gray-700">
              Select date
              <input
                type="date"
                value={date}
                min={getTodayValue()}
                onChange={handleDateChange}
                className="w-full rounded-2xl border border-gray-200 bg-white px-3 py-3 text-sm font-normal text-gray-900 outline-none transition focus:border-[#EFC677] focus:ring-4 focus:ring-[#F8D38A]/20"
              />
            </label>

            <div className="mt-6 flex items-center justify-between gap-3">
              <div>
                <h2 className="font-['Syne'] text-lg font-semibold text-gray-950">
                  Available times
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  9:00 AM to 5:00 PM, 30-minute slots
                </p>
              </div>

              <button
                type="button"
                onClick={() => setReloadToken((current) => current + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:bg-gray-50"
                aria-label="Refresh availability"
              >
                <FiRefreshCw
                  className={isLoadingAvailability ? "animate-spin" : ""}
                />
              </button>
            </div>

            {availabilityError ? (
              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                <FiAlertCircle className="mt-0.5 shrink-0" />
                {availabilityError}
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {slots.map((slot) => {
                  const isSelected =
                    selectedSlot?.toISOString() === slot.time.toISOString();

                  return (
                    <button
                      key={slot.time.toISOString()}
                      type="button"
                      disabled={!slot.isFree || isLoadingAvailability}
                      onClick={() => {
                        setSelectedSlot(slot.time);
                        setBookingMessage("");
                        setMeetLink("");
                      }}
                      className={`min-h-12 rounded-2xl border px-3 py-2 text-sm font-medium transition ${
                        isSelected
                          ? "border-[#EFC677] bg-[#FFF4DC] text-gray-950 ring-4 ring-[#F8D38A]/20"
                          : "border-gray-200 bg-white text-gray-800 hover:border-[#EFC677] hover:bg-[#FFF9EC]"
                      } disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-300`}
                    >
                      {slotFormatter.format(slot.time)}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="mt-5 min-h-6">
              {selectedLabel && (
                <p className="text-sm text-gray-600">
                  Selected:{" "}
                  <span className="font-medium text-gray-950">
                    {selectedLabel}
                  </span>
                </p>
              )}
            </div>

            {bookingMessage && (
              <div
                className={`mt-4 flex items-start gap-3 rounded-2xl px-4 py-3 text-sm ${
                  meetLink
                    ? "border border-emerald-100 bg-emerald-50 text-emerald-700"
                    : "border border-gray-100 bg-gray-50 text-gray-700"
                }`}
              >
                {meetLink ? (
                  <FiCheckCircle className="mt-0.5 shrink-0" />
                ) : (
                  <FiAlertCircle className="mt-0.5 shrink-0" />
                )}
                <span>{bookingMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isBooking || isLoadingAvailability}
              className="mt-5 w-full rounded-2xl bg-gradient-to-b from-[#F8D38A] to-[#EFC677] px-5 py-3 text-sm font-semibold text-black shadow-[inset_0_3px_10px_rgba(255,255,255,0.36),0_10px_24px_rgba(239,198,119,0.28)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isBooking ? "Booking..." : "Book selected time"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
