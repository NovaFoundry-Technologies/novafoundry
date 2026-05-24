import { useEffect, useRef, useState } from "react";
import FeedbackVideo from "../../assets/f_d_b_amp_.mp4";
import ExpandingCard from "../../components/ui/SliderBar";
import VideoPlayPauseButton from "../../components/ui/VideoPlayPauseButton";

const Feedback = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => setIsPlaying(false));
          return;
        }

        video.pause();
      },
      { threshold: 0.35 },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      return;
    }

    video.pause();
  };

  return (
    <div className="mx-auto mt-14 flex min-h-[50vh] w-full max-w-6xl flex-col px-4 sm:mt-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span
            className="w-3 h-3 rounded-full "
            style={{
              background: "linear-gradient(to right, #5A4B99, #FDCD86)",
            }}
          ></span>
          <p className="font-[Creato Display]">Client feedback</p>
        </div>
        <div className="w-full sm:w-xl">
          <ExpandingCard title="C.O.O Tiwa Ayodeji" />
        </div>
      </div>
      <div className="my-6">
        <div className="group relative mb-2 h-[18rem] w-full overflow-hidden rounded-2xl sm:h-[50vh]">
          <video
            ref={videoRef}
            src={FeedbackVideo}
            className="h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100">
            <VideoPlayPauseButton
              isPlaying={isPlaying}
              onClick={toggleVideo}
            />
          </div>
        </div>

        <p className="max-w-2xl font-[Helvetica] text-xs leading-loose text-gray-700 sm:text-sm">
          We’re a creative agency driven by design, strategy, and storytelling.
          Our mission is to help brands stand out through bold ideas, thoughtful
          design, and impactful digital experiences.
        </p>
      </div>
    </div>
  );
};

export default Feedback;
