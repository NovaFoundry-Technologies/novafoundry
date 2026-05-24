import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import VisionVideo from "../../assets/mp_.mp4";
import SectionBadge from "../../components/ui/SectionBadge";
import ExpandingCard from "../../components/ui/SliderBar";
import Positive from "../../assets/positive.svg";
import Worked from "../../assets/worked.svg";
import Partner from "../../assets/partner.svg";
import { OrganicVideoMask } from "../../components/shapes/OrganicMask";
import VideoPlayPauseButton from "../../components/ui/VideoPlayPauseButton";

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const OurVision = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

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

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMutedState = !video.muted;
    video.muted = nextMutedState;
    setIsMuted(nextMutedState);
  };

  return (
    <div className="mx-auto my-14 w-full max-w-5xl px-4 sm:my-10 sm:mt-37 sm:px-0">
      <div className="space-y-3">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <span
            className="w-3 h-3 rounded-full"
            style={{
              background: "linear-gradient(to right, #5A4B99, #FDCD86)",
            }}
          />
          <p>Our Vision</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
          {/* left grid  */}
          <motion.div
            className="group relative h-[24rem] w-full sm:h-100"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <OrganicVideoMask className="h-full w-full">
              <video
                ref={videoRef}
                src={VisionVideo}
                className="h-full w-full object-cover"
                muted={isMuted}
                loop
                playsInline
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onVolumeChange={(event) =>
                  setIsMuted(event.currentTarget.muted)
                }
              />
            </OrganicVideoMask>

            <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100">
              <VideoPlayPauseButton
                isPlaying={isPlaying}
                onClick={toggleVideo}
              />
            </div>

            <button
              type="button"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              onClick={toggleMute}
              className="absolute bottom-5 right-5 z-20 inline-flex size-9 items-center justify-center rounded-full border border-white/30 bg-[transparent] p-1 opacity-0 shadow-[0_8px_18px_rgba(0,0,0,0.18)] transition duration-200 group-hover:opacity-100 hover:scale-105 focus:opacity-100 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f4c36c]"
            >
              <span className="inline-flex size-full items-center justify-center rounded-full border border-white/80 bg-gradient-to-b from-[#ffd98d] to-[#f2b958] shadow-[inset_0_2px_5px_rgba(255,255,255,0.65),inset_0_-3px_8px_rgba(150,87,12,0.18)]">
                {isMuted ? (
                  <VolumeX
                    aria-hidden="true"
                    className="text-[#111111]"
                    size={14}
                    strokeWidth={2.7}
                  />
                ) : (
                  <Volume2
                    aria-hidden="true"
                    className="text-[#111111]"
                    size={14}
                    strokeWidth={2.7}
                  />
                )}
              </span>
            </button>

            <div
              className="absolute pointer-events-none z-0 hidden sm:block"
              style={{
                width: "300px",
                height: "500px",
                bottom: -200,
                left: 0,
                background: "#FFC46A42",
                filter: "blur(80px)",
                borderRadius: "100%",
              }}
            />
          </motion.div>

          {/* right grid  */}

          <motion.div
            className="relative space-y-4 sm:mt-20 sm:pl-6"
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={fadeUp} custom={0}>
              <SectionBadge label="Vision" />
            </motion.div>

            <motion.p
              className="max-w-xs text-xs leading-loose text-gray-700"
              variants={fadeUp}
              custom={1}
            >
              "We're a Digital agency driven by design, strategy, and
              storytelling. Our mission is to help brands stand out through bold
              ideas,.''
            </motion.p>

            <motion.div className="my-7 sm:my-10" variants={fadeUp} custom={2}>
              <ExpandingCard
                title="C.E.O Aderinto Samson"
                startWidth="80%"
                colorFrom="#FFDFAF"
                colorTo="#B5B5FF1A"
              />
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-3"
              variants={fadeUp}
              custom={3}
            >
              {[
                { icon: Partner, label: "Worked with 100+ client" },
                { icon: Worked, label: "Worked with 100+ client" },
                { icon: Positive, label: "90% Positive responses" },
              ].map(({ icon, label }, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-1 text-[10px]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.15 }}
                >
                  <span className="p-1 text-gray-700 border border-[#FBB040] rounded-md">
                    <img src={icon} className="w-2.5" alt="" />
                  </span>
                  {label}
                </motion.div>
              ))}
            </motion.div>

            <div
              className="absolute pointer-events-none z-0 hidden sm:block"
              style={{
                width: "300px",
                height: "500px",
                bottom: -200,
                left: 0,
                background: "#B5B5FF59",
                filter: "blur(70px)",
                borderRadius: "100%",
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OurVision;
