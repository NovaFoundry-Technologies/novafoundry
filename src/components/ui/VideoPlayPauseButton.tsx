import { Pause, Play } from "lucide-react";
import type { ButtonHTMLAttributes } from "react";

type VideoPlayPauseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isPlaying: boolean;
};

export default function VideoPlayPauseButton({
  isPlaying,
  className = "",
  "aria-label": ariaLabel,
  ...props
}: VideoPlayPauseButtonProps) {
  const Icon = isPlaying ? Pause : Play;

  return (
    <button
      type="button"
      aria-label={ariaLabel ?? (isPlaying ? "Pause video" : "Play video")}
      className={`
        inline-flex size-14 items-center justify-center rounded-full
        border border-white/20
        bg-[transparent] p-1
        shadow-[0_8px_18px_rgba(0,0,0,0.18)]
        transition-transform duration-150
        hover:scale-105
        active:scale-95
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4c36c]
        ${className}
      `}
      {...props}
    >
      <span
        className="
          inline-flex size-full items-center justify-center rounded-full
          border border-white/80
          bg-gradient-to-b from-[#ffd98d] to-[#f2b958]
          shadow-[inset_0_2px_5px_rgba(255,255,255,0.65),inset_0_-3px_8px_rgba(150,87,12,0.18)]
        "
      >
        {isPlaying ? (
          <span
            aria-hidden="true"
            className="flex items-center justify-center gap-1"
          >
            <span className="h-4 w-1.5 rounded-full bg-[#111111]" />
            <span className="h-4 w-1.5 rounded-full bg-[#111111]" />
          </span>
        ) : (
          <Icon
            aria-hidden="true"
            className="ml-0.5 text-[#111111]"
            fill="currentColor"
            size={18}
            strokeWidth={3}
          />
        )}
      </span>
    </button>
  );
}
