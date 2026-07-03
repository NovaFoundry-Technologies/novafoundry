import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Pause,
  Play,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import Seo from "./Seo";
import Button from "./components/ui/Button";

import heroArt from "./assets/novafoundry_3d_shape_bg_FFFEFD 1.png";
import feedbackPoster from "./assets/IMG_20260524_191845.png";
import feedbackVideo from "./assets/f_d_b_amp_.mp4";
import internshipImage from "./assets/IMG_20260524_192825.png";
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
  "mx-auto w-[min(1120px,calc(100%-48px))] max-[900px]:w-[min(calc(100%-32px),720px)]";
const internshipLayout = `mx-auto w-[95%] grid grid-cols-[.9fr_1.1fr] items-center gap-[clamp(60px,8vw,130px)] rounded-[18px] bg-black px-[clamp(28px,5vw,80px)] py-[clamp(70px,8vw,120px)] text-white max-[900px]:grid-cols-1 max-[900px]:gap-[70px] max-[600px]:rounded-[12px] max-[600px]:px-5 max-[600px]:py-[65px]`;

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
    href: "https://mediprep.online",
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
    aspect:
      "aspect-[2.8] max-[600px]:aspect-[1.4]",
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
    <div className="flex items-center gap-2 text-[10px] font-semibold tracking-[0.04em] uppercase">
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
    <article className="flex min-h-[180px] w-[360px] shrink-0 flex-col justify-between rounded-[12px] bg-white px-6 py-5 text-[#111] max-[600px]:min-h-[165px] max-[600px]:w-[300px]">
      <div className="flex items-center gap-3">
        <img
          className="h-9 w-9 rounded-full object-cover"
          src={comment.image}
          alt=""
        />
        <div className="flex min-w-0 flex-col">
          <strong className="text-[11px] font-medium">{comment.name}</strong>
          <span className="truncate text-[8px] text-black/55">
            {comment.role}
          </span>
        </div>
      </div>
      <p className="mb-0 text-[10px] leading-[1.55] text-black/75">
        “{comment.comment}”
      </p>
    </article>
  );
}

function App() {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [activeSolution, setActiveSolution] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const mediaButtonClass =
    "absolute top-1/2 left-1/2 grid h-[38px] w-[38px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-0 bg-[#ffc85b] text-white shadow-[0_0_0_3px_rgba(255,255,255,.3)]";

  return (
    <>
      <Seo
        title="NovaFoundry — Digital products delivered with speed"
        description="NovaFoundry designs and builds high-performing websites, mobile apps, and digital products."
        url={SITE_URL}
      />

      <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_15%_23%,rgba(113,91,255,.025),transparent_18%),#e7e6e6] text-[#050505] motion-reduce:[&_*]:transition-none bg-[#fefefe]">
        <Navbar />
        <section className="px-[34px] pt-[34px] max-[900px]:p-4" id="home">
          <div className="relative min-h-[650px] overflow-hidden rounded-[20px] bg-[radial-gradient(circle_at_83%_12%,rgba(255,210,246,.78),transparent_35%),radial-gradient(circle_at_55%_3%,rgba(207,208,255,.8),transparent_35%),linear-gradient(145deg,#fefefe_35%,#fff_70%)] text-[#080808] max-[900px]:min-h-[720px] max-[600px]:rounded-[13px]">
            

            <div className="grid min-h-[560px] grid-cols-[1.15fr_.8fr] grid-rows-[1fr_auto] px-[68px] pt-[65px] pb-[55px] max-[900px]:grid-cols-1 max-[900px]:grid-rows-[auto_auto_1fr] max-[900px]:px-[25px] max-[900px]:pt-[60px] max-[900px]:pb-[30px] max-[600px]:min-h-[645px] max-[600px]:pt-[45px]">
              <div className="self-start">
                <Eyebrow>Web design · Mobile app design</Eyebrow>
                <h1 className="my-[30px] text-[clamp(58px,6vw,92px)] leading-[.91] font-bold tracking-[-.075em] max-[900px]:text-[clamp(48px,13vw,72px)] max-[600px]:mt-[25px] max-[600px]:text-[45px]">
                  Get your website,
                  <br />
                  mobile app.
                  <br />
                  <span className="text-[#c9c9c7]">Within 72hrs.</span>
                </h1>
                <form
                  className="flex h-[42px] w-[min(390px,100%)] max-[600px]:h-auto max-[600px]:flex-col max-[600px]:gap-2"
                  action="mailto:contact@novafoundry.org"
                >
                  <input
                    className="min-w-0 flex-1 rounded-l-md border border-[#aaa] bg-white/50 px-3.5 text-xs outline-none max-[600px]:h-[42px] max-[600px]:w-full max-[600px]:rounded-[5px]"
                    type="email"
                    aria-label="Email address"
                    placeholder="your@email.com"
                  />
                  <button
                    className="rounded-r-md border-0 bg-[#050505] px-[19px] text-[11px] font-bold text-white max-[600px]:h-[42px] max-[600px]:w-full max-[600px]:rounded-[5px]"
                    type="submit"
                  >
                    Get a free demo now
                  </button>
                </form>
              </div>

              <p className="m-0 max-w-[425px] self-center text-[11px] leading-[1.65] max-[900px]:mt-[45px] max-[900px]:self-start">
                We turn bold ideas into impactful brand experiences that
                inspire audiences, evoke emotion, and deliver measurable
                results through creativity and strategic design.
              </p>

              <div className="col-start-2 ml-auto w-[min(100%,245px)] self-end max-[900px]:col-start-1 max-[900px]:ml-0">
                {["Creative direction", "Interaction design", "Web design"].map(
                  (service) => (
                    <a
                      className="flex items-center justify-between border-b border-black/25 py-[13px] text-[11px] font-semibold"
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

            <span className="absolute bottom-[18px] left-[68px] text-sm text-[#ff6b16] max-[900px]:left-[25px]">
              ✦
            </span>
          </div>
        </section>

        <div className="my-10 flex items-center gap-4 text-center text-[10px] text-[#393939] max-[600px]:my-[30px]">
          <TrustedPartners />
        </div>

        <section
          className={`${contentWidth} grid min-h-[520px] grid-cols-[1.25fr_.75fr] items-center gap-[110px] py-10 max-[900px]:grid-cols-1 max-[900px]:gap-[60px] max-[600px]:pt-[30px]`}
          id="about"
        >
          <div>
            <Eyebrow>NovaFoundry creative agency</Eyebrow>
            <h2 className="my-[25px] max-w-[660px] text-[clamp(28px,3.4vw,52px)] leading-[1.08] font-medium tracking-[-.045em] text-[#050505]">
              We help brands express their vision through innovative design compelling storytelling and strategic solutions that leave a lasting impression
            </h2>
            <div className="flex flex-wrap gap-2" id="services">
              {["Product design", "Development", "Brand strategy"].map(
                (service) => (
                  <span
                    className="min-w-[120px] rounded-full border border-[#555] px-3.5 py-2 text-center text-[10px] text-[#8d8d8d] max-[600px]:min-w-[42%] max-[600px]:flex-1"
                    key={service}
                  >
                    {service}
                  </span>
                ),
              )}
            </div>
            <Button className="mt-7" />
            <div className="mt-[50px] flex items-center">
              {[avatar, feedbackPoster, internshipImage].map((image, index) => (
                <img
                  className="-mr-2 h-[52px] w-[52px] rounded-sm border-2 border-[#050505] object-cover max-[600px]:h-[42px] max-[600px]:w-[42px]"
                  src={image}
                  alt=""
                  key={index}
                />
              ))}
              <p className="m-0 ml-[25px] text-[10px] leading-[1.6] text-[#777]">
                <b className="text-[#050505]">4.9/5</b>
                <br />
                from ambitious teams
              </p>
            </div>
          </div>

          <div className="bg-[#f6f6f4] p-[18px] max-[900px]:ml-auto max-[900px]:w-[min(430px,85%)]">
            <img
              className="block aspect-square w-full object-cover"
              src={heroArt}
              alt="Abstract NovaFoundry artwork"
            />
          </div>
        </section>

        <section
          className={`${contentWidth} mb-20 grid grid-cols-[repeat(4,minmax(0,1fr))_160px] gap-3 max-[900px]:grid-cols-2 max-[600px]:mb-[60px] max-[600px]:gap-2`}
          aria-label="Company statistics"
        >
          {stats.map((stat) => (
            <article
              className={`${stat.color} flex min-h-[220px] flex-col justify-between rounded-[7px] p-5 text-[#080808] max-[600px]:min-h-[170px] max-[600px]:p-3.5`}
              key={stat.value}
            >
              <div className="flex items-end justify-between gap-2.5">
                <strong className="text-[45px] tracking-[-.06em] max-[600px]:text-[34px]">
                  {stat.value}
                </strong>
                <span className="pb-2 text-[8px] text-[#656565]">
                  {stat.label}
                </span>
              </div>
              <p className="m-0 max-w-[190px] text-xs leading-[1.3] max-[600px]:text-[10px]">
                {stat.note}
              </p>
            </article>
          ))}

          <aside
            className="relative min-h-[220px] overflow-hidden max-[900px]:col-span-2 max-[900px]:min-h-[170px]"
            aria-label="Years of experience"
          >
            <span className="absolute top-0 bottom-7 left-6 w-px bg-black/25" />
            <span className="absolute top-8 right-0 left-6 h-px bg-black/25" />
            <span className="absolute top-[56px] right-3 grid h-7 w-7 place-items-center rounded-full bg-[#ff6b16] text-black">
              <Plus size={17} strokeWidth={2.5} />
            </span>
            <strong className="absolute bottom-8 left-14 text-[68px] leading-none font-medium tracking-[-.08em] text-black">
              25
            </strong>
            <span className="absolute bottom-3 left-14 text-[9px] tracking-[.04em] text-black/35 uppercase">
              Years of experience
            </span>
          </aside>
        </section>

        <section
          className={`${contentWidth} grid grid-cols-2 items-center gap-[120px] px-[35px] pt-[60px] pb-[100px] max-[900px]:grid-cols-1 max-[900px]:gap-[70px] max-[900px]:px-0 max-[900px]:pb-[80px] max-[600px]:pt-[40px] max-[600px]:pb-[60px]`}
          id="internship-intro"
        >
          <div>
            <Eyebrow>Internship program</Eyebrow>
            <h2 className="mt-[25px] mb-[15px] text-[clamp(36px,4vw,58px)] leading-[.95] font-medium tracking-[-.055em]">
              Join our team and <span>build the future.</span>
            </h2>
            <p className="max-w-[520px] text-[13px] leading-[1.75] text-white/70">
              We’re looking for talented individuals to join our team and help
              us create innovative solutions for our clients. If you’re
              passionate about design, development, and technology, we want to
              hear from you.
            </p>
          </div>
        </section>

       

        <section
          className={`${contentWidth} px-0 pt-[40px] pb-[120px] max-[900px]:pb-[80px] max-[600px]:py-[25px] max-[600px]:pb-[70px]`}
        >
          <Eyebrow>Client feedback</Eyebrow>
          <div className="relative mt-[34px] h-[clamp(320px,48vw,620px)] overflow-hidden rounded-xl bg-[#171717] max-[600px]:h-[280px]">
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
              <div className="text-xs tracking-[2px] text-[#ff6b16]">
                ★★★★★
              </div>
              <p className="min-h-[90px] text-[11px] leading-[1.55]">
                “We were blown away by the creativity and dedication shown by
                NovaFoundry. They understood our vision and delivered a
                stunning website.”
              </p>
              <div className="flex items-center gap-2.5">
                <img
                  className="h-7 w-7 rounded-full"
                  src={avatar}
                  alt=""
                />
                <span className="flex flex-col text-[9px]">
                  <b>Games Cameron</b>
                  <small className="text-[#777]">CEO, FoodMartex</small>
                </span>
              </div>
            </article>

            <article className="flex min-h-[210px] flex-col justify-between rounded-lg bg-[#f6f6f4] p-[22px] text-[#111]">
              <strong className="text-[26px]">
                53%{" "}
                <span className="text-[9px] font-normal text-[#777]">
                  Goal completed
                </span>
              </strong>
              <div className="h-1 overflow-hidden rounded-lg bg-[#ddd]">
                <i className="block h-full w-[53%] bg-[#ff6b16]" />
              </div>
              <div className="flex flex-col text-[9px]">
                <b>James Cameron</b>
                <small className="text-[#777]">Movie director</small>
              </div>
            </article>

            <article className="flex flex-col gap-4 rounded-3xl bg-black p-[30px] max-[900px]:col-span-2 max-[900px]:min-h-[160px] max-[600px]:col-auto gap-4">
              <div className="flex flex-row items-center gap-4">
                <img className="w-[65px] max-[300px]:w-[30px]"  src={starDesign} />
                <div className="h-4 w-4 rounded-lg bg-[#ff6b16] text-[9px]"></div>
              </div>
              
              <div className="flex flex-row items-end justify-between">
                <strong className="self-end text-[75px] text-[#b3b3b3] leading-[.8] tracking-[-.07em]">
                  25%
                </strong>
                <span className="text-[8px] uppercase text-[#777]">
                  Success rate
                </span>
              </div>
            </article>
          </div>
        </section>

         <section
          className={`${contentWidth} pb-[80px] max-[900px]:pb-[60px] max-[600px]:pb-[50px]`}
          id="solutions"
        >
          <p className="mb-7 text-[9px] tracking-[0.02em] uppercase">
            NovaFoundry&apos;s solutions
          </p>
          <div className="flex items-start justify-between gap-8 max-[700px]:flex-col">
            <h2 className="m-0 max-w-[760px] text-[clamp(30px,3.3vw,50px)] leading-[1.08] font-medium tracking-[-.055em]">
              We help brands express their vision through innovative design,
              compelling storytelling and strategic solutions that leave a
              lasting impression
            </h2>
            <Button className="mt-1 shrink-0" />
          </div>

          <div className="mt-[45px] grid grid-cols-[minmax(0,.82fr)_minmax(390px,1.18fr)] items-start gap-[clamp(60px,10vw,150px)] max-[900px]:mt-[30px] max-[900px]:grid-cols-1 max-[900px]:gap-10">
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
                    className="rounded-full border border-black/35 px-3 py-1.5 text-[8px] font-medium uppercase"
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
                    className={`grid min-h-[86px] w-full grid-cols-[70px_1fr_auto] items-center gap-4 border-0 border-b border-black/20 px-5 text-left transition-all duration-300 max-[600px]:min-h-[72px] max-[600px]:grid-cols-[42px_1fr_auto] max-[600px]:px-3 ${
                      isActive
                        ? "my-2 rounded-[13px] border-b-transparent bg-black text-white shadow-[0_22px_30px_rgba(0,0,0,.2)]"
                        : "bg-transparent text-black hover:bg-black/[.04]"
                    }`}
                    aria-pressed={isActive}
                    onClick={() => setActiveSolution(index)}
                    onFocus={() => setActiveSolution(index)}
                    key={solution.title}
                  >
                    <span className="text-[10px]">
                      ({String(index + 1).padStart(2, "0")})
                    </span>
                    <span className="text-center text-[11px] max-[600px]:text-left">
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
            <h2 className="mt-[22px] max-w-[680px] text-[clamp(42px,6vw,82px)] leading-[.95] font-medium tracking-[-.06em]">
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
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 pt-4 text-[10px] max-[600px]:grid-cols-[1fr_auto]">
                  <span>{project.title}</span>
                  <span className="text-[#666] max-[600px]:row-start-2">
                    {project.type}
                  </span>
                  <div className="bg-black rounded rounded-lg px-4 pr-1 flex justify-end align-end ">
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
            <h2 className="mt-[25px] mb-[15px] text-[clamp(34px,4vw,58px)] leading-none tracking-[-.05em]">
              All-In-One Internship Program
            </h2>
            <p className="max-w-[520px] text-xs leading-[1.65] text-[#a0a0a0]">
              We design meaningful brand experiences that inspire connection
              and drive growth. Through creativity and strategy, we help
              emerging talent stand out, engage audiences, and move confidently
              toward the future.
            </p>
            <a
              className="mt-[30px] inline-flex items-center justify-center rounded-[4px] bg-[#f5f5f2] px-5 py-[15px] text-xs font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white"
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
                <strong className="mt-6 block text-[13px] font-medium">
                  4.9 <span className="text-[#ffc85b]">★</span>
                </strong>
                <span className="mt-3 block text-[9px] text-white/70 uppercase">
                  500+ students
                </span>
              </div>

              <div className="relative border-t border-l border-white/20 px-6 pt-8 pb-1 max-[600px]:px-4">
                <strong className="text-[clamp(60px,8vw,105px)] leading-[.75] font-medium tracking-[-.07em]">
                  25
                </strong>
                <span className="absolute top-6 right-0 grid h-6 w-6 place-items-center rounded-full bg-[#c9c2ff] text-lg text-white">
                  +
                </span>
                <span className="mt-6 block text-[9px] text-white/70 uppercase">
                  Years of experience
                </span>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[14px] bg-[#222] max-[900px]:mx-auto max-[900px]:w-full">
            <img
              className="block aspect-[.94] w-full object-cover"
              src={internshipImage}
              alt="NovaFoundry internship creative"
            />
            <button
              className={mediaButtonClass}
              aria-label="Pause internship story"
            >
              <Pause size={15} fill="currentColor" />
            </button>
          </div>
        </section>

        <section
          className="overflow-hidden py-[80px] max-[600px]:py-[50px]"
          aria-labelledby="client-comments-title"
        >
          <h2
            className="mb-[40px] text-center text-[clamp(38px,5vw,68px)] font-medium tracking-[-.055em] text-[#101010] max-[600px]:mb-[25px]"
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
          className={`${contentWidth} px-[100px] pt-[70px] pb-20 max-[900px]:px-5 max-[600px]:px-0 max-[600px]:pt-10 max-[600px]:pb-[60px]`}
        >
          <h2 className="mb-[30px] text-center text-[clamp(38px,5vw,68px)] font-medium tracking-[-.05em] text-[#101010]">
            Frequently asked questions
          </h2>
          <div className="grid grid-cols-2 gap-3 max-[600px]:grid-cols-1">
            {faqs.map(([question, answer], index) => (
              <details
                className="group overflow-hidden rounded-[7px] bg-[#f6f6f3] text-[#0b0b0b]"
                key={question}
              >
                <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between px-[18px] text-[11px] font-semibold [&::-webkit-details-marker]:hidden">
                  <span>
                    {index + 1}. {question}
                  </span>
                  <Plus
                    className="transition-transform group-open:rotate-45"
                    size={17}
                  />
                </summary>
                <p className="m-0 px-[18px] pb-[18px] text-[11px] leading-[1.55] text-[#666]">
                  {answer}
                </p>
              </details>
            ))}
          </div>
          <div className="mt-[35px] flex items-center justify-between px-[18px] max-[600px]:items-start max-[600px]:gap-5 max-[600px]:px-0">
            <div>
              <b className="text-xs">Still Have Questions Left?</b>
              <p className="text-[9px] text-[#666] max-[600px]:max-w-[210px]">
                Customizable design and development solutions tailored to fit
                your goals, timeline, and budget.
              </p>
            </div>
            <a
              className="rounded-md bg-[#f6f6f3] px-[18px] py-3 text-[10px] font-bold text-white"
              href="#contact"
            >
              Get in touch
            </a>
          </div>
        </section>

        <Footer/>
      </main>
    </>
  );
}

export default App;
