import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Menu,
  Pause,
  Play,
  Plus,
  X,
} from "lucide-react";
import Seo from "./Seo";
import Button from "./components/ui/Button";

import logo from "./assets/novahero.png";
import heroArt from "./assets/novafoundry_3d_shape_bg_FFFEFD 1.png";
import feedbackPoster from "./assets/IMG_20260524_191845.png";
import feedbackVideo from "./assets/f_d_b_amp_.mp4";
import internshipImage from "./assets/IMG_20260524_192825.png";
import avatar from "./assets/user.png";
import examprep from "./assets/examprep.png";
import mediprep from "./assets/mediprep.png";
import tfalcon from "./assets/tfalcon.jpeg";
import foodmartex from "./assets/foodmartex.png";
import starDesign from "./assets/starDesign.svg";
import novaFoundryLogo from "./assets/Group 1000002717.svg"
import TrustedPartners from "./sections/Features/TrustedPartners";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const SITE_URL = "https://novafoundry.org";
const contentWidth =
  "mx-auto w-[min(1120px,calc(100%-48px))] max-[900px]:w-[min(calc(100%-32px),720px)]";
const internshipLayout = `${contentWidth} grid grid-cols-2 items-center gap-[120px] px-[35px] pt-[150px] pb-[260px] max-[900px]:grid-cols-1 max-[900px]:gap-[70px] max-[900px]:px-0 max-[900px]:pb-[180px] max-[600px]:pt-[90px] max-[600px]:pb-[130px]`;

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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
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

      <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_15%_23%,rgba(113,91,255,.025),transparent_18%),#e7e6e6] text-[#050505] motion-reduce:[&_*]:transition-none bg-amber-50">
        <section className="px-[34px] pt-[34px] max-[900px]:p-4" id="home">
          <div className="relative min-h-[650px] overflow-hidden rounded-[20px] bg-[radial-gradient(circle_at_83%_12%,rgba(255,210,246,.78),transparent_35%),radial-gradient(circle_at_55%_3%,rgba(207,208,255,.8),transparent_35%),linear-gradient(145deg,#f7f7f4_35%,#fff_70%)] text-[#080808] max-[900px]:min-h-[720px] max-[600px]:rounded-[13px]">
            <Navbar />

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

        <div className="my-20 flex items-center gap-4 text-center text-[10px] text-[#393939] max-[600px]:my-[55px]">
          <TrustedPartners />
        </div>

        <section
          className={`${contentWidth} grid min-h-[620px] grid-cols-[1.25fr_.75fr] items-center gap-[110px] py-20 max-[900px]:grid-cols-1 max-[900px]:gap-[60px] max-[600px]:pt-[50px]`}
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
          className={`${contentWidth} mb-40 grid grid-cols-[repeat(4,minmax(0,1fr))_160px] gap-3 max-[900px]:grid-cols-2 max-[600px]:mb-[100px] max-[600px]:gap-2`}
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

        <section className={internshipLayout} id="internship-intro">
          <div>
            <Eyebrow>Internship program</Eyebrow>
            <h2 className="mt-[25px] mb-[15px] text-[clamp(34px,4vw,58px)] leading-none tracking-[-.05em]">
              Join our team and <span>build the future.</span>
            </h2>
            <p className="max-w-[520px] text-xs leading-[1.65] text-[#a0a0a0]">
              We’re looking for talented individuals to join our team and help
              us create innovative solutions for our clients. If you’re
              passionate about design, development, and technology, we want to
              hear from you.
            </p>
          </div>
        </section>

        <section
          className={`${contentWidth} px-0 pt-[60px] pb-[460px] max-[900px]:pb-[250px] max-[600px]:py-[35px] max-[600px]:pb-[180px]`}
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
          className={`${contentWidth} px-0 pt-[100px] pb-[180px] max-[600px]:pb-[100px]`}
          id="work"
        >
          <div className="mb-[100px] max-[600px]:mb-[60px]">
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
                  <ArrowUpRight
                    className="max-[600px]:col-start-2 max-[600px]:row-span-2 max-[600px]:row-start-1"
                    size={16}
                  />
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
              className="mt-[25px] inline-flex items-center justify-center gap-2 rounded-[5px] bg-[#f5f5f2] px-4 py-[13px] text-xs font-bold text-white"
              href="mailto:contact@novafoundry.org?subject=Internship program"
            >
              View internship program <ArrowUpRight size={14} />
            </a>
            <div className="mt-[65px] grid grid-cols-2 gap-[35px]">
              <div className="flex flex-col items-start">
                <Mark className="mb-[15px] origin-top-left scale-[.62]" />
                <strong className="text-[17px]">4.9 ★</strong>
                <span className="mt-2 text-[8px] text-[#777] uppercase">
                  500+ students
                </span>
              </div>
              <div className="flex flex-col items-start">
                <strong className="text-[66px] leading-[.9] max-[600px]:text-5xl">
                  25
                </strong>
                <span className="mt-2 text-[8px] text-[#777] uppercase">+</span>
                <span className="mt-2 text-[8px] text-[#777] uppercase">
                  Years of experience
                </span>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-lg bg-[#222] max-[900px]:ml-auto max-[900px]:w-[min(520px,85%)] max-[600px]:w-full">
            <img
              className="block aspect-[.9] w-full object-cover"
              src={internshipImage}
              alt="NovaFoundry internship creative"
            />
            <button
              className={mediaButtonClass}
              aria-label="Play internship story"
            >
              <Play size={15} fill="currentColor" />
            </button>
          </div>
        </section>

        <section
          className={`${contentWidth} px-[100px] pt-[130px] pb-40 max-[900px]:px-5 max-[600px]:px-0 max-[600px]:pt-20 max-[600px]:pb-[110px]`}
        >
          <h2 className="mb-[45px] text-center text-[clamp(38px,5vw,68px)] font-medium tracking-[-.05em] text-[#101010]">
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
