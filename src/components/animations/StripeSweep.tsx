import { useEffect, useState, type CSSProperties } from "react";
import "./StripeSweep.css";

export const STRIPE_SWEEP_TIMER_MS = 200;
export const STRIPE_SWEEP_SPEED_MS = 5600;

type StripeSweepProps = {
  className?: string;
  speedMs?: number;
  timerMs?: number;
};

export default function StripeSweep({
  className = "",
  speedMs = STRIPE_SWEEP_SPEED_MS,
  timerMs = STRIPE_SWEEP_TIMER_MS,
}: StripeSweepProps) {
  const [direction, setDirection] = useState<"rtl" | "ltr">("rtl");
  const [isRunning, setIsRunning] = useState(false);
  const cycleMs = Math.max(timerMs, speedMs + 100);

  useEffect(() => {
    let animationFrameId = 0;
    let finishTimerId: ReturnType<typeof setTimeout>;

    const playSweep = () => {
      setIsRunning(false);

      animationFrameId = requestAnimationFrame(() => {
        setIsRunning(true);

        finishTimerId = setTimeout(() => {
          setIsRunning(false);
          setDirection((currentDirection) =>
            currentDirection === "rtl" ? "ltr" : "rtl",
          );
        }, speedMs);
      });
    };

    playSweep();
    const intervalId = setInterval(playSweep, cycleMs);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(finishTimerId);
      clearInterval(intervalId);
    };
  }, [cycleMs, speedMs]);

  return (
    <div
      aria-hidden="true"
      className={`stripe-sweep ${isRunning ? "is-running" : ""} ${className}`}
      data-direction={direction}
      style={
        {
          "--stripe-sweep-speed": `${speedMs}ms`,
        } as CSSProperties
      }
    >
      <div className="stripe-sweep__glow" />
    </div>
  );
}
