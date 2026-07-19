import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Pause,
  Play,
  Plus,
  Star,
  Volume2,
  VolumeX,
} from "lucide-react";
import { motion } from "framer-motion";
import Seo from "./Seo";
import Button from "./components/ui/Button";

import heroArt from "./assets/novafoundry_3d_shape_bg_FFFEFD 1.png";
import feedbackPoster from "./assets/IMG_20260524_191845.png";
import feedbackVideo from "./assets/f_d_b_amp_.mp4";
import internshipImage from "./assets/internshipImage.png";
import internshipVideo from "./assets/InternshipProgVideo.mp4";
import avatar from "./assets/user.png";
import formPic from "./assets/formpic.png";
import man from "./assets/man.png";
import examprep from "./assets/examprep.png";
import mediprep from "./assets/mediprep.png";
import tfalcon from "./assets/tfalcon.jpeg";
import foodmartex from "./assets/foodmartex.png";
import starDesign from "./assets/starDesign.svg";
import TrustedPartners from "./sections/Features/TrustedPartners";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const SITE_URL = "https://novafoundry.org";
const contentWidth =
  "mx-auto w-[min(1120px,calc(100%-48px))] max-[600px]:w-[calc(100%-32px)] max-[380px]:w-[calc(100%-24px)]";
const internshipLayout = `${contentWidth} grid grid-cols-[.9fr_1.1fr] items-center gap-[clamp(48px,7vw,110px)] rounded-[18px] bg-black px-[clamp(28px,5vw,80px)] py-[clamp(64px,8vw,112px)] text-white shadow-[0_28px_80px_rgba(0,0,0,.16)] max-[900px]:grid-cols-1 max-[900px]:gap-[56px] max-[600px]:rounded-[14px] max-[600px]:px-5 max-[600px]:py-12`;

const stats = [
  {
    value: "108+",
    label: "Projects completed",
    note: "We've delivered projects across industries",
    color: "bg-[#f2c5ea]",
  },
  {
    value: "50+",
    label: "Happy clients",
    note: "Trusted by teams worldwide who rely on us to design",
    color: "bg-[#f4d9b4]",
  },
  {
    value: "10+",
    label: "Years of experience",
    note: "Years of refining our process to consistently deliver",
    color: "bg-[#cbc3f4]",
  },
  {
    value: "24+",
    label: "Industries served",
    note: "Startups to brands we've created diverse sectors",
    color: "bg-[#c6f3b7]",
  },
];

const projects = [
  {
    title: "ExamPreps 360",
    type: "EdTech · Product design",
    image: examprep,
    href: "https://exampreps360.online",
    aspect: "aspect-[1.6]",
  },
  {
    title: "MediPrep",
    type: "HealthTech · Web platform",
    image: mediprep,
    href: "https://mediprep.net",
    aspect: "aspect-[1.65]",
  },
  {
    title: "TFalcon",
    type: "Logistics · Digital product",
    image: tfalcon,
    href: "https://tfalcon.online",
    aspect: "aspect-[1.25]",
  },
  {
    title: "FoodMartex",
    type: "Commerce · Mobile ecosystem",
    image: foodmartex,
    href: "https://foodmartex.online",
    aspect: "aspect-[2.8] max-[600px]:aspect-[1.4]",
    featured: true,
  },
];

const solutions = [
  {
    title: "Web application platforms",
    image: examprep,
    imageAlt: "ExamPreps 360 web application platform",
    tags: ["Web development", "Product design"],
  },
  {
    title: "Mobile application development",
    image: foodmartex,
    imageAlt: "FoodMartex mobile application",
    tags: ["Mobile app development", "Product strategy"],
  },
  {
    title: "Website design development",
    image: mediprep,
    imageAlt: "MediPrep website design",
    tags: ["Website design", "UX/UI design"],
  },
  {
    title: "Digital marketing solutions",
    image: tfalcon,
    imageAlt: "TFalcon digital marketing project",
    tags: ["Brand strategy", "Digital marketing"],
  },
];

const clientComments = [
  {
    name: "Jackson Mitchell",
    role: "Founder, BrightPath E-Commerce",
    image: avatar,
    comment:
      "NovaFoundry transformed our ideas into a polished digital experience. The process was clear, thoughtful, and remarkably fast.",
  },
  {
    name: "Daniel Reed",
    role: "Performance Marketing Director",
    image: man,
    comment:
      "The team understood exactly what our brand needed and turned it into a website that feels distinctive, focused, and easy to use.",
  },
  {
    name: "Oliver Carter",
    role: "CEO, Nova Digital Commerce",
    image: formPic,
    comment:
      "Their design decisions are grounded in real business goals. We launched with more confidence and saw stronger engagement immediately.",
  },
  {
    name: "Jason Lee",
    role: "Owner, Urban Artisan Co.",
    image: internshipImage,
    comment:
      "From strategy to final delivery, every detail felt intentional. NovaFoundry made a complicated project feel refreshingly simple.",
  },
  {
    name: "Mark Lucifer",
    role: "Co-Founder, TrendHive Brands",
    image: feedbackPoster,
    comment:
      "The final product is clean, fast, and genuinely represents our company. The level of care throughout the project was exceptional.",
  },
  {
    name: "Millan Lucifer",
    role: "Co-Founder, TrendHive Brands",
    image: formPic,
    comment:
      "Communication was excellent and every milestone arrived with clarity. We always knew what was happening and why.",
  },
  {
    name: "Ryan Patel",
    role: "Solo Entrepreneur, Digital Launch Studio",
    image: man,
    comment:
      "Our new platform is intuitive, responsive, and built to grow. It has become an essential part of how we run the business.",
  },
  {
    name: "Michael Anderson",
    role: "Founder & CEO, Apex Growth Co.",
    image: internshipImage,
    comment:
      "NovaFoundry brought together strong visual thinking and practical execution. The result exceeded what we imagined at the start.",
  },
];

const faqs = [
  [
    "What services does your agency provide?",
    "We design and build brand identities, websites, mobile apps, and complete digital products.",
  ],
  [
    "Do you offer customized packages?",
    "Yes. Every engagement is shaped around your goals, timeline, product stage, and budget.",
  ],
  [
    "How does the onboarding process work?",
    "We begin with a focused discovery call, define the scope, then move into a clear sprint-based delivery plan.",
  ],
  [
    "What industries do you specialize in?",
    "We work across fintech, health, education, logistics, commerce, and emerging technology.",
  ],
  [
    "How long does it take to see results?",
    "You will see the first visual direction within 72 hours. Full delivery depends on the scope of the project.",
  ],
  [
    "Will I have a dedicated point of contact?",
    "Yes. A dedicated project lead keeps communication direct from kickoff through launch.",
  ],
];

function Mark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative inline-block h-[62px] w-[62px] ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <i
          key={index}
          className="absolute top-7 left-1 h-[7px] w-[54px] bg-[#c9c2ff]"
          style={{ transform: `rotate(${index * 22.5}deg)` }}
        />
      ))}
    </span>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-bold tracking-[0.06em] uppercase max-[600px]:text-[10px]">
      <span className="h-[7px] w-[7px] rounded-full bg-[#ff6b16]" />
      {children}
    </div>
  );
}

function CommentCard({
  comment,
}: {
  comment: (typeof clientComments)[number];
}) {
  return (
    <article className="flex min-h-[190px] w-[360px] shrink-0 flex-col justify-between rounded-[14px] border border-black/[.04] bg-white px-6 py-5 text-[#111] shadow-[0_14px_40px_rgba(0,0,0,.05)] max-[600px]:min-h-[180px] max-[600px]:w-[min(320px,calc(100vw-32px))] max-[600px]:px-5">
      <div className="flex items-center gap-3">
        <img
          className="h-9 w-9 rounded-full object-cover"
          src={comment.image}
          alt=""
        />
        <div className="flex min-w-0 flex-col">
          <strong className="text-[13px] font-bold">{comment.name}</strong>
          <span className="truncate text-[10px] font-medium text-black/55">
            {comment.role}
          </span>
        </div>
      </div>
      <p className="mb-0 text-[13px] leading-[1.65] font-medium text-black/75">
        “{comment.comment}”
      </p>
    </article>
  );
}

function App() {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [internshipVideoPlaying, setInternshipVideoPlaying] = useState(false);
  const [internshipVideoMuted, setInternshipVideoMuted] = useState(true);
  const [activeSolution, setActiveSolution] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const internshipVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
          setVideoPlaying(false);
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      setVideoPlaying(true);
    } else {
      video.pause();
      setVideoPlaying(false);
    }
  };

  useEffect(() => {
    const video = internshipVideoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => setInternshipVideoPlaying(false));
          return;
        }

        video.pause();
      },
      { threshold: 0.35 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleInternshipVideo = () => {
    const video = internshipVideoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play().catch(() => setInternshipVideoPlaying(false));
      return;
    }

    video.pause();
  };

  const toggleInternshipVideoMute = () => {
    const video = internshipVideoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setInternshipVideoMuted(video.muted);
  };

  const mediaButtonClass =
    "absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-0 bg-[#ffc85b] text-white shadow-[0_0_0_3px_rgba(255,255,255,.3),0_10px_28px_rgba(0,0,0,.18)] transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white active:scale-95";

  return (
    <>
      <Seo
        title="NovaFoundry — Digital products delivered with speed"
        description="NovaFoundry designs and builds high-performing websites, mobile apps, and digital products."
        url={SITE_URL}
      />

      <main className="min-h-screen overflow-hidden bg-[#fefefe] font-medium text-[#050505] antialiased motion-reduce:[&_*]:transition-none">
        <Navbar />
        <section
          className="px-[34px] pt-[34px] max-[900px]:p-4 max-[380px]:px-3"
          id="home"
        >
          <div className="relative min-h-[650px] overflow-hidden rounded-[20px] border border-black/[.04] bg-[radial-gradient(circle_at_83%_12%,rgba(255,210,246,.78),transparent_35%),radial-gradient(circle_at_55%_3%,rgba(207,208,255,.8),transparent_35%),linear-gradient(145deg,#fefefe_35%,#fff_70%)] text-[#080808] shadow-[0_24px_80px_rgba(49,42,78,.08)] max-[900px]:min-h-0 max-[600px]:rounded-[14px]">
            <div className="grid min-h-[560px] grid-cols-[1.15fr_.8fr] grid-rows-[1fr_auto] px-[clamp(28px,5vw,68px)] pt-[clamp(48px,5vw,65px)] pb-[55px] max-[900px]:min-h-0 max-[900px]:grid-cols-1 max-[900px]:grid-rows-none max-[900px]:gap-10 max-[900px]:pb-10 max-[600px]:gap-8 max-[600px]:px-5 max-[600px]:pt-10">
              <div className="self-start">
                <Eyebrow>Web design · Mobile app design</Eyebrow>
                <h1 className="my-[30px] max-w-[820px] text-[clamp(56px,6vw,92px)] leading-[.92] font-extrabold tracking-[-.07em] max-[900px]:text-[clamp(48px,10vw,72px)] max-[600px]:my-6 max-[600px]:text-[clamp(40px,12vw,54px)] max-[380px]:tracking-[-.055em]">
                  Get your website,
                  <br />
                  mobile app.
                  <br />
                  <span className="text-[#c9c9c7]">Within 72hrs.</span>
                </h1>
                <form
                  className="flex min-h-12 w-[min(430px,100%)] max-[600px]:h-auto max-[600px]:flex-col max-[600px]:gap-2.5"
                  action="mailto:contact@novafoundry.org"
                >
                  <input
                    className="min-w-0 flex-1 rounded-l-lg border border-black/25 bg-white/70 px-4 text-sm font-semibold outline-none transition placeholder:font-medium placeholder:text-black/40 focus:border-black/60 focus:bg-white focus:ring-4 focus:ring-black/[.05] max-[600px]:h-12 max-[600px]:min-h-12 max-[600px]:w-full max-[600px]:flex-none max-[600px]:rounded-lg"
                    type="email"
                    aria-label="Email address"
                    placeholder="your@email.com"
                  />
                  <button
                    className="rounded-r-lg border-0 bg-[#050505] px-5 text-xs font-bold text-white transition hover:bg-[#242424] max-[600px]:h-12 max-[600px]:w-full max-[600px]:rounded-lg"
                    type="submit"
                  >
                    Get a free demo now
                  </button>
                </form>
              </div>

              <p className="m-0 max-w-[500px] self-center text-[14px] leading-[1.7] font-semibold text-black/70 max-[900px]:self-start">
                We turn bold ideas into impactful brand experiences that inspire
                audiences, evoke emotion, and deliver measurable results through
                creativity and strategic design.
              </p>

              <div className="col-start-2 ml-auto w-[min(100%,245px)] self-end max-[900px]:col-start-1 max-[900px]:ml-0">
                {["Creative direction", "Interaction design", "Web design"].map(
                  (service) => (
                    <a
                      className="flex min-h-11 items-center justify-between border-b border-black/20 py-3 text-[13px] font-bold transition hover:border-black/60 hover:pl-1"
                      href="#services"
                      key={service}
                    >
                      {service}
                      <ArrowUpRight size={12} />
                    </a>
                  ),
                )}
              </div>
            </div>
            <div className="mx-[clamp(28px,5vw,68px)] flex w-[230px] flex-col items-start pb-10 max-[900px]:mt-2 max-[600px]:mx-5 max-[600px]:w-[190px]">
              <img
                className="w-[46px] animate-spin [animation-duration:12s] motion-reduce:animate-none"
                src={starDesign}
                alt=""
              />
              <div className="mt-[52px] flex items-center pl-0.5">
                {[avatar, formPic, man].map((image, index) => (
                  <img
                    className="-mr-3 h-[56px] w-[56px] rounded-full border-2 border-white object-cover shadow-[0_8px_18px_rgba(0,0,0,.18)] max-[600px]:h-[48px] max-[600px]:w-[48px]"
                    src={image}
                    alt=""
                    key={image}
                    style={{ zIndex: 4 - index }}
                  />
                ))}
                <span className="relative z-0 grid h-[62px] w-[62px] place-items-center rounded-full border-2 border-white bg-[linear-gradient(145deg,#8d91e8_0%,#b8b9ee_45%,#ead9ca_100%)] text-[34px] font-light text-white shadow-[0_8px_18px_rgba(0,0,0,.18)] max-[600px]:h-[54px] max-[600px]:w-[54px]">
                  +
                </span>
              </div>
              <span className="mt-3 flex items-center gap-1 text-[15px] font-semibold text-black">
                4.9
                <Star
                  className="fill-[#ff9d00] text-[#ff9d00]"
                  size={13}
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>
        </section>

        <div className="my-10 flex items-center gap-4 text-center text-[10px] text-[#393939] max-[600px]:my-[30px]">
          <TrustedPartners />
        </div>

        <section
          className={`${contentWidth} grid min-h-[520px] grid-cols-[1.25fr_.75fr] items-center gap-[clamp(56px,8vw,110px)] py-24 max-[900px]:grid-cols-1 max-[900px]:gap-14 max-[600px]:py-16`}
          id="about"
        >
          <div>
            <Eyebrow>NovaFoundry creative agency</Eyebrow>
            <h2 className="my-[25px] max-w-[700px] text-[clamp(32px,3.6vw,54px)] leading-[1.08] font-bold tracking-[-.045em] text-[#050505] max-[600px]:text-[clamp(30px,9vw,42px)]">
              We help brands express their vision through innovative design
              compelling storytelling and strategic solutions that leave a
              lasting impression
            </h2>
            <div className="flex flex-wrap gap-2" id="services">
              {["Product design", "Development", "Brand strategy"].map(
                (service) => (
                  <span
                    className="min-w-[130px] rounded-full border border-black/35 px-4 py-2.5 text-center text-[12px] font-bold text-black/65 max-[480px]:min-w-0 max-[480px]:flex-1"
                    key={service}
                  >
                    {service}
                  </span>
                ),
              )}
            </div>
            <Button className="mt-7" />
            <figure className="m-0 mt-[50px] grid w-full max-w-[280px] grid-cols-3 items-center gap-[clamp(10px,1vw,24px)]">
              <img
                className="aspect-square w-full rounded-[8px] object-cover"
                src={man}
                alt="NovaFoundry team member"
              />
              <img
                className="aspect-square w-full rounded-full object-cover object-top"
                src={internshipImage}
                alt="NovaFoundry team member"
              />
              <img
                className="aspect-square w-full rounded-[8px] object-cover"
                src={feedbackPoster}
                alt="NovaFoundry team member"
              />
            </figure>
          </div>

          <div className="rounded-[16px] bg-[#f6f6f4] p-[18px] shadow-[0_20px_60px_rgba(0,0,0,.06)] max-[900px]:ml-auto max-[900px]:w-[min(520px,100%)]">
            <img
              className="block aspect-square w-full object-cover"
              src={heroArt}
              alt="Abstract NovaFoundry artwork"
            />
          </div>
        </section>

        <section
          className={`${contentWidth} mb-40 grid grid-cols-[repeat(4,minmax(0,1fr))_160px] gap-3 max-[900px]:grid-cols-2 max-[600px]:mb-[100px] max-[480px]:grid-cols-1`}
          aria-label="Company statistics"
        >
          {stats.map((stat) => (
            <article
              className={`${stat.color} flex min-h-[220px] flex-col justify-between rounded-[12px] p-5 text-[#080808] shadow-[0_14px_36px_rgba(0,0,0,.04)] max-[600px]:min-h-[185px] max-[600px]:p-5`}
              key={stat.value}
            >
              <div className="flex items-end justify-between gap-2.5">
                <strong className="text-[45px] font-extrabold tracking-[-.06em] max-[600px]:text-[38px]">
                  {stat.value}
                </strong>
                <span className="max-w-[90px] pb-2 text-right text-[11px] leading-tight font-bold text-black/55">
                  {stat.label}
                </span>
              </div>
              <p className="m-0 max-w-[210px] text-[13px] leading-[1.5] font-semibold text-black/70">
                {stat.note}
              </p>
            </article>
          ))}

          <aside
            className="relative min-h-[220px] overflow-hidden max-[900px]:col-span-2 max-[900px]:min-h-[180px] max-[480px]:col-span-1"
            aria-label="Years of experience"
          >
            <span className="absolute top-0 bottom-7 left-6 w-px bg-black/25" />
            <span className="absolute top-8 right-0 left-6 h-px bg-black/25" />
            <span className="absolute top-[56px] right-3 grid h-7 w-7 place-items-center rounded-full bg-[#ff6b16] text-black">
              <Plus size={17} strokeWidth={2.5} />
            </span>
            <strong className="absolute bottom-8 left-14 text-[68px] leading-none font-bold tracking-[-.08em] text-black">
              25
            </strong>
            <span className="absolute bottom-3 left-14 text-[11px] font-bold tracking-[.04em] text-black/50 uppercase">
              Years of experience
            </span>
          </aside>
        </section>

        <section
          className={`${contentWidth} grid grid-cols-2 items-center gap-[clamp(56px,8vw,120px)] px-[35px] pt-[140px] pb-[180px] max-[900px]:grid-cols-1 max-[900px]:px-0 max-[900px]:pt-[110px] max-[900px]:pb-[130px] max-[600px]:pt-20 max-[600px]:pb-24`}
          id="internship-intro"
        >
          <div>
            <Eyebrow>Internship program</Eyebrow>
            <h2 className="mt-[25px] mb-[18px] text-[clamp(36px,4vw,58px)] leading-[.98] font-bold tracking-[-.05em]">
              Join our team and <span>build the future.</span>
            </h2>
            <p className="max-w-[560px] text-[14px] leading-[1.75] font-semibold text-black/65">
              We’re looking for talented individuals to join our team and help
              us create innovative solutions for our clients. If you’re
              passionate about design, development, and technology, we want to
              hear from you.
            </p>
          </div>
        </section>

        <section
          className={`${contentWidth} px-0 pt-[60px] pb-[220px] max-[900px]:pb-[170px] max-[600px]:pt-10 max-[600px]:pb-28`}
        >
          <Eyebrow>Client feedback</Eyebrow>
          <div className="relative mt-[34px] aspect-video min-h-[320px] overflow-hidden rounded-[16px] bg-[#171717] shadow-[0_26px_70px_rgba(0,0,0,.16)] max-[600px]:min-h-0 max-[600px]:rounded-[12px]">
            <video
              className="h-full w-full object-cover"
              ref={videoRef}
              poster={feedbackPoster}
              src={feedbackVideo}
              loop
              muted
              playsInline
            />
            <button
              type="button"
              className={mediaButtonClass}
              onClick={toggleVideo}
              aria-label={videoPlaying ? "Pause video" : "Play video"}
            >
              {videoPlaying ? (
                <Pause size={16} fill="currentColor" />
              ) : (
                <Play size={16} fill="currentColor" />
              )}
            </button>
          </div>

          <div className="mt-5 grid grid-cols-[.9fr_1.25fr_1fr] gap-3.5 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
            <article className="min-h-[210px] rounded-lg bg-[#f6f6f4] p-[22px] text-[#111]">
              <div className="text-xs tracking-[2px] text-[#ff6b16]">★★★★★</div>
              <p className="min-h-[90px] text-[13px] leading-[1.65] font-semibold text-black/75">
                “We were blown away by the creativity and dedication shown by
                NovaFoundry. They understood our vision and delivered a stunning
                website.”
              </p>
              <div className="flex items-center gap-2.5">
                <img className="h-7 w-7 rounded-full" src={avatar} alt="" />
                <span className="flex flex-col text-[11px] font-semibold">
                  <b>Games Cameron</b>
                  <small className="text-[#777]">CEO, FoodMartex</small>
                </span>
              </div>
            </article>

            <article className="flex min-h-[210px] flex-col justify-between rounded-lg bg-[#f6f6f4] p-[22px] text-[#111]">
              <strong className="text-[26px]">
                53%{" "}
                <span className="text-[11px] font-semibold text-[#666]">
                  Goal completed
                </span>
              </strong>
              <div className="h-1 overflow-hidden rounded-lg bg-[#ddd]">
                <i className="block h-full w-[53%] bg-[#ff6b16]" />
              </div>
              <div className="flex flex-col text-[11px] font-semibold">
                <b>James Cameron</b>
                <small className="text-[#777]">Movie director</small>
              </div>
            </article>

            <article className="flex flex-col gap-4 rounded-3xl bg-black p-[30px] max-[900px]:col-span-2 max-[900px]:min-h-[160px] max-[600px]:col-auto">
              <div className="flex flex-row items-center gap-4">
                <img
                  className="w-[65px] animate-spin [animation-duration:12s] max-[300px]:w-[30px] motion-reduce:animate-none"
                  src={starDesign}
                  alt=""
                />
                <div className="h-4 w-4 rounded-lg bg-[#ff6b16] text-[9px]"></div>
              </div>

              <div className="flex flex-row items-end justify-between">
                <strong className="self-end text-[75px] text-[#b3b3b3] leading-[.8] tracking-[-.07em]">
                  25%
                </strong>
                <span className="text-[11px] font-bold uppercase text-[#aaa]">
                  Success rate
                </span>
              </div>
            </article>
          </div>
        </section>

        <section
          className={`${contentWidth} pb-[190px] max-[900px]:pb-[140px] max-[600px]:pb-[100px]`}
          id="solutions"
        >
          <p className="mb-7 text-[11px] font-bold tracking-[0.05em] uppercase">
            NovaFoundry&apos;s solutions
          </p>
          <div className="flex items-start justify-between gap-8 max-[700px]:flex-col">
            <h2 className="m-0 max-w-[780px] text-[clamp(32px,3.5vw,52px)] leading-[1.08] font-bold tracking-[-.05em] max-[600px]:text-[clamp(30px,9vw,42px)]">
              We help brands express their vision through innovative design,
              compelling storytelling and strategic solutions that leave a
              lasting impression
            </h2>
            <Button className="mt-1 shrink-0" />
          </div>

          <div className="mt-[85px] grid grid-cols-[minmax(0,.82fr)_minmax(360px,1.18fr)] items-start gap-[clamp(48px,8vw,120px)] max-[900px]:mt-[60px] max-[900px]:grid-cols-1 max-[900px]:gap-10 max-[600px]:mt-12">
            <div>
              <div className="overflow-hidden rounded-[14px] bg-[#d9d9d7]">
                <img
                  className="aspect-[.86] w-full object-cover transition-opacity duration-300 max-[900px]:aspect-[1.2]"
                  src={solutions[activeSolution].image}
                  alt={solutions[activeSolution].imageAlt}
                />
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {solutions[activeSolution].tags.map((tag) => (
                  <span
                    className="rounded-full border border-black/35 px-3.5 py-2 text-[10px] font-bold tracking-[.03em] uppercase"
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-black/20">
              {solutions.map((solution, index) => {
                const isActive = activeSolution === index;

                return (
                  <button
                    type="button"
                    className={`grid min-h-[88px] w-full grid-cols-[70px_1fr_auto] items-center gap-4 border-0 border-b border-black/20 px-5 text-left transition-all duration-300 max-[600px]:min-h-[76px] max-[600px]:grid-cols-[38px_1fr_auto] max-[600px]:gap-3 max-[600px]:px-3 ${
                      isActive
                        ? "my-2 rounded-[13px] border-b-transparent bg-black text-white shadow-[0_22px_30px_rgba(0,0,0,.2)]"
                        : "bg-transparent text-black hover:bg-black/[.04]"
                    }`}
                    aria-pressed={isActive}
                    onClick={() => setActiveSolution(index)}
                    onFocus={() => setActiveSolution(index)}
                    key={solution.title}
                  >
                    <span className="text-[11px] font-bold">
                      ({String(index + 1).padStart(2, "0")})
                    </span>
                    <span className="text-center text-[13px] font-bold max-[600px]:text-left">
                      {solution.title}
                    </span>
                    <ArrowUpRight
                      className="rotate-45"
                      size={16}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section
          className={`${contentWidth} px-0 pt-[60px] pb-[80px] max-[600px]:pb-[50px]`}
          id="work"
        >
          <div className="mb-[50px] max-[600px]:mb-[30px]">
            <Eyebrow>Selected projects · 2024—2026</Eyebrow>
            <h2 className="mt-[22px] max-w-[720px] text-[clamp(42px,6vw,82px)] leading-[.96] font-bold tracking-[-.055em] max-[600px]:text-[clamp(38px,11vw,54px)]">
              Work shaped around{" "}
              <span className="text-[#252525]">real outcomes.</span>
            </h2>
          </div>

          <div className="grid grid-cols-[1.3fr_.8fr] items-end gap-x-[110px] gap-y-20 max-[900px]:gap-x-[30px] max-[900px]:gap-y-[60px] max-[600px]:grid-cols-1 max-[600px]:gap-[55px]">
            {projects.map((project) => (
              <a
                className={`group block ${project.featured ? "col-span-2 max-[600px]:col-auto" : ""}`}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                key={project.title}
              >
                <div
                  className={`${project.aspect} overflow-hidden rounded-lg bg-[#161616]`}
                >
                  <img
                    className="block h-full w-full object-cover transition-transform duration-550 ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.035]"
                    src={project.image}
                    alt={project.title}
                  />
                </div>
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 pt-4 text-[12px] font-semibold max-[600px]:grid-cols-[1fr_auto]">
                  <span className="font-bold">{project.title}</span>
                  <span className="text-[11px] text-[#666] max-[600px]:row-start-2">
                    {project.type}
                  </span>
                  <div className="flex h-9 min-w-11 items-center justify-center rounded-lg bg-black px-3">
                    <ArrowUpRight
                      className="max-[600px]:col-start-2 max-[600px]:row-span-2 max-[600px]:row-start-1 text-white "
                      size={16}
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className={internshipLayout} id="internship">
          <div>
            <Eyebrow>NovaFoundry&apos;s internship</Eyebrow>
            <h2 className="mt-[25px] mb-[18px] text-[clamp(36px,4vw,58px)] leading-[1.02] font-bold tracking-[-.045em]">
              All-In-One Internship Program
            </h2>
            <p className="max-w-[540px] text-[14px] leading-[1.7] font-semibold text-white/65">
              We design meaningful brand experiences that inspire connection and
              drive growth. Through creativity and strategy, we help emerging
              talent stand out, engage audiences, and move confidently toward
              the future.
            </p>
            <a
              className="mt-[30px] inline-flex min-h-12 items-center justify-center rounded-lg bg-[#f5f5f2] px-5 py-3 text-[13px] font-bold text-black transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              href="/internship"
            >
              View Internship Program
            </a>
            <div className="mt-[85px] grid grid-cols-2 items-end gap-[45px] max-[600px]:mt-[65px] max-[600px]:gap-5">
              <div>
                <Mark className="mb-10 origin-top-left scale-[.7]" />
                <div className="flex items-center">
                  {[avatar, formPic, man].map((image, index) => (
                    <img
                      className="-mr-2 h-[48px] w-[48px] rounded-full border-2 border-white object-cover"
                      src={image}
                      alt=""
                      key={image}
                      style={{ zIndex: 3 - index }}
                    />
                  ))}
                  <span className="grid h-[52px] w-[52px] place-items-center rounded-full border-2 border-white bg-[#c9c2ff] text-2xl">
                    +
                  </span>
                </div>
                <strong className="mt-6 block text-[15px] font-bold">
                  4.9 <span className="text-[#ffc85b]">★</span>
                </strong>
                <span className="mt-3 block text-[11px] font-bold text-white/70 uppercase">
                  500+ students
                </span>
              </div>

              <div className="relative border-t border-l border-white/20 px-6 pt-8 pb-1 max-[600px]:px-4">
                <strong className="text-[clamp(60px,8vw,105px)] leading-[.75] font-bold tracking-[-.07em]">
                  25
                </strong>
                <span className="absolute top-6 right-0 grid h-6 w-6 place-items-center rounded-full bg-[#c9c2ff] text-lg text-white">
                  +
                </span>
                <span className="mt-6 block text-[11px] font-bold text-white/70 uppercase">
                  Years of experience
                </span>
              </div>
            </div>
          </div>

          <div className="internshipVideo relative overflow-hidden rounded-[14px] bg-[#222] max-[900px]:mx-auto max-[900px]:w-full">
            <video
              className="block aspect-[.94] w-full object-cover"
              ref={internshipVideoRef}
              poster={internshipImage}
              src={internshipVideo}
              loop
              muted={internshipVideoMuted}
              playsInline
              preload="metadata"
              onPlay={() => setInternshipVideoPlaying(true)}
              onPause={() => setInternshipVideoPlaying(false)}
              onVolumeChange={(event) =>
                setInternshipVideoMuted(event.currentTarget.muted)
              }
            />
            <button
              type="button"
              className={mediaButtonClass}
              onClick={toggleInternshipVideo}
              aria-label={
                internshipVideoPlaying
                  ? "Pause internship story"
                  : "Play internship story"
              }
            >
              {internshipVideoPlaying ? (
                <Pause size={15} fill="currentColor" />
              ) : (
                <Play size={15} fill="currentColor" />
              )}
            </button>
            <button
              type="button"
              className="absolute right-4 bottom-4 grid h-11 w-11 place-items-center rounded-full border border-white/35 bg-black/45 text-white shadow-[0_6px_18px_rgba(0,0,0,.22)] backdrop-blur-sm transition hover:scale-105 hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffc85b] active:scale-95"
              onClick={toggleInternshipVideoMute}
              aria-label={
                internshipVideoMuted
                  ? "Unmute internship story"
                  : "Mute internship story"
              }
            >
              {internshipVideoMuted ? (
                <VolumeX size={16} aria-hidden="true" />
              ) : (
                <Volume2 size={16} aria-hidden="true" />
              )}
            </button>
          </div>
        </section>

        <section
          className="overflow-hidden py-[80px] max-[600px]:py-[50px]"
          aria-labelledby="client-comments-title"
        >
          <h2
            className="mb-[70px] px-4 text-center text-[clamp(38px,5vw,68px)] font-bold tracking-[-.05em] text-[#101010] max-[600px]:mb-[45px] max-[600px]:text-[clamp(36px,10vw,48px)]"
            id="client-comments-title"
          >
            Client&apos;s comments
          </h2>

          <div className="space-y-3">
            {[clientComments.slice(0, 4), clientComments.slice(4)].map(
              (comments, rowIndex) => (
                <motion.div
                  className="flex w-max will-change-transform"
                  initial={{
                    x: rowIndex === 0 ? "-50%" : "0%",
                  }}
                  animate={{
                    x: rowIndex === 0 ? "0%" : "-50%",
                  }}
                  transition={{
                    duration: 36,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                  key={rowIndex}
                >
                  {[0, 1].map((copy) => (
                    <div
                      className="flex gap-3 pr-3"
                      aria-hidden={copy === 1}
                      key={copy}
                    >
                      {comments.map((comment) => (
                        <CommentCard
                          comment={comment}
                          key={`${copy}-${comment.name}`}
                        />
                      ))}
                    </div>
                  ))}
                </motion.div>
              ),
            )}
          </div>
        </section>

        <section
          className={`${contentWidth} px-[clamp(0px,7vw,100px)] pt-[130px] pb-40 max-[600px]:pt-20 max-[600px]:pb-[110px]`}
        >
          <h2 className="mb-[45px] text-center text-[clamp(38px,5vw,68px)] font-bold tracking-[-.05em] text-[#101010] max-[600px]:text-[clamp(34px,10vw,48px)]">
            Frequently asked questions
          </h2>
          <div className="grid grid-cols-2 gap-3 max-[760px]:grid-cols-1">
            {faqs.map(([question, answer], index) => (
              <details
                className="group overflow-hidden rounded-[10px] border border-black/[.04] bg-[#f6f6f3] text-[#0b0b0b] transition open:bg-white open:shadow-[0_14px_40px_rgba(0,0,0,.06)]"
                key={question}
              >
                <summary className="flex min-h-[68px] cursor-pointer list-none items-center justify-between gap-4 px-5 text-[13px] font-bold [&::-webkit-details-marker]:hidden">
                  <span>
                    {index + 1}. {question}
                  </span>
                  <Plus
                    className="transition-transform group-open:rotate-45"
                    size={17}
                  />
                </summary>
                <p className="m-0 px-5 pb-5 text-[13px] leading-[1.65] font-medium text-[#5a5a5a]">
                  {answer}
                </p>
              </details>
            ))}
          </div>
          <div className="mt-[35px] flex items-center justify-between gap-6 px-[18px] max-[600px]:px-0 max-[480px]:flex-col max-[480px]:items-stretch">
            <div>
              <b className="text-sm font-bold">Still Have Questions Left?</b>
              <p className="max-w-[420px] text-[12px] leading-relaxed font-medium text-[#666]">
                Customizable design and development solutions tailored to fit
                your goals, timeline, and budget.
              </p>
            </div>
            <a
              className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-lg bg-black px-5 py-3 text-xs font-bold text-white transition hover:bg-[#242424]"
              href="#contact"
            >
              Get in touch
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

export default App;
