import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Database,
  MessageCircleQuestion,
  Tag,
} from "lucide-react";
import Seo from "./Seo";
import AuditForm from "./components/forms/AuditForm";
import { startAudit, startSocialMediaAudit } from "./lib/auditCta";

import feedbackPoster from "./assets/IMG_20260524_191845.png";
import avatar from "./assets/foodmartex-boss.jpg";
import formPic from "./assets/tiwa.jpg";
import man from "./assets/man.png";
import examprep from "./assets/examprep.png";
import foodmartex from "./assets/foodmartex.png";
import foodmartexLogo from "./assets/foodmartex_logo.png";
import perfumeGardenLogo from "./assets/perfumegarden.png";
import mediPrepLogo from "./assets/mediprep.png";
import examPreps360Logo from "./assets/exampreps360.svg";
import emeritusLogo from "./assets/emeritus.png";
import tFalconLogo from "./assets/tfalcon.png";

const SITE_URL = "https://novafoundry.org";
const contentWidth =
  "mx-auto w-[min(1180px,calc(100%-48px))] max-[640px]:w-[calc(100%-28px)]";

const auditItems = [
  {
    phase: "DETECT",
    title: "Website & product audit",
    description:
      "We identify the design, product and conversion issues holding your experience back.",
    image: feedbackPoster,
  },
  {
    phase: "TRACE",
    title: "UX & conversion review",
    description:
      "We trace where users drop off and where the product creates unnecessary friction.",
    image: examprep,
  },
  {
    phase: "RESOLVE",
    title: "Growth-readiness check",
    description:
      "We turn the findings into clear, prioritized actions your team can implement.",
    image: foodmartex,
  },
];

const stats = [
  {
    value: "108+",
    label: "Projects completed",
    note: "Digital experiences delivered across multiple industries.",
  },
  {
    value: "50+",
    label: "Happy clients",
    note: "Teams and founders supported from idea through launch.",
  },
  {
    value: "10+",
    label: "Years of experience",
    note: "Combined experience across product, design and development.",
  },
  {
    value: "24+",
    label: "Industries served",
    note: "From education and logistics to commerce and health.",
  },
];

const testimonials = [
  {
    name: "Tolulope-Adebayo Okedere",
    role: "CEO, Foodmartex",
    image: avatar,
    quote:
      "NovaFoundry transformed our ideas into a polished digital experience. The process was clear, thoughtful and remarkably fast.",
  },
  {
    name: "Ayodeji Tiwaoluwa Oluwapelumi",
    role: "COO, ExamPreps-360",
    image: formPic,
    quote:
      "The team understood exactly what our brand needed and turned it into a website that feels distinctive, focused and easy to use.",
  },
  {
    name: "Oliver Carter",
    role: "CEO, Nova Digital Commerce",
    image: man,
    quote:
      "Their design decisions are grounded in real business goals. We launched with more confidence and stronger engagement.",
  },
];

const trustedBrands = [
  { name: "Foodmartex", logo: foodmartexLogo },
  { name: "Perfume Garden", logo: perfumeGardenLogo },
  { name: "Mediprep", logo: mediPrepLogo },
  { name: "Exampreps-360", logo: examPreps360Logo },
  { name: "Emeritus", logo: emeritusLogo },
  { name: "T-Falcon", logo: tFalconLogo },
];

const faqs = [
  [
    "What services does NovaFoundry provide?",
    "We design and build websites, mobile apps, digital products and brand experiences, with strategy and product support included where needed.",
  ],
  [
    "Is the first audit really free?",
    "Yes. The initial audit is designed to help you understand the most important opportunities before you commit to a larger engagement.",
  ],
  [
    "How quickly can a project start?",
    "Once the scope is agreed, we can move into discovery and planning immediately. Delivery time depends on the size and complexity of the project.",
  ],
  [
    "Do you work with startups and existing businesses?",
    "Yes. We work with early-stage founders, growing businesses and established teams that need a new product or want to improve an existing one.",
  ],
  [
    "Can you redesign an existing product?",
    "Yes. We can audit, redesign and rebuild an existing website or application without forcing you to start from zero.",
  ],
  [
    "Will I have a dedicated point of contact?",
    "Yes. A project lead coordinates communication from discovery through delivery and launch.",
  ],
];

function LogoMark() {
  return (
    <a
      href="#home"
      className="inline-flex shrink-0 items-center gap-[8px]"
      aria-label="NovaFoundry home"
    >
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M17 1.5L25 9.5L17 17.5V1.5Z" fill="#7067E8" />
        <path d="M17 1.5L9 9.5L17 17.5V1.5Z" fill="#D8D6FB" />
        <path d="M9 9.5L1 17L9 24.5L17 17.5L9 9.5Z" fill="#F8E3C0" />
        <path d="M17 17.5L25 9.5L33 17L25 24.5L17 17.5Z" fill="#5D56D9" />
        <path d="M17 17.5L9 24.5L17 32.5V17.5Z" fill="#C8C4F5" />
        <path d="M17 17.5L25 24.5L17 32.5V17.5Z" fill="#8D86ED" />
      </svg>
      <span className="whitespace-nowrap text-[13px] font-extrabold tracking-[-0.045em]">
        <span className="text-[#2D2492]">Nova</span>
        <span className="text-[#D9BFA8]">foundry</span>
      </span>
    </a>
  );
}

function App() {
  const [activeAudit, setActiveAudit] = useState(0);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const testimonialTrackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateNavbar = () => setIsNavScrolled(window.scrollY > 24);

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });

    return () => window.removeEventListener("scroll", updateNavbar);
  }, []);

  const scrollTestimonials = (direction: number) => {
    testimonialTrackRef.current?.scrollBy({
      left: direction * 568,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Seo
        title="NovaFoundry — Digital products built for growth"
        description="NovaFoundry designs and builds websites, mobile apps and digital products for ambitious businesses."
        url={SITE_URL}
      />

      <main
        className="min-h-screen bg-[#f7f7f5] text-[#101010] antialiased"
        style={{ fontFamily: '"Creato Display", sans-serif' }}
      >
        <header className="sticky top-0 z-50 px-4 py-4 sm:px-6 lg:px-8">
          <div
            className={`mx-auto flex h-[64px] w-full max-w-[1120px] items-center rounded-[7px] border bg-white/95 px-[22px] backdrop-blur-md transition-[box-shadow,border-color,transform] duration-300 ease-out motion-reduce:transition-none sm:px-[30px] lg:px-[34px] ${
              isNavScrolled
                ? "translate-y-0 border-black/[0.06] shadow-[0_10px_35px_rgba(30,24,80,0.12)]"
                : "border-black/[0.08] shadow-[0_2px_10px_rgba(30,24,80,0.03)]"
            }`}
          >
            <LogoMark />

            <nav className="mx-auto hidden items-center gap-[34px] whitespace-nowrap text-[14px] font-medium tracking-[-0.025em] text-[#0d0d0d] lg:flex xl:gap-[36px]">
              <a className="nav-link" href="#sample-report">
                Sample report
              </a>
              <a className="nav-link" href="#process">
                How it works
              </a>
              <a className="nav-link" href="#testimonials">
                Testimonials
              </a>
              <a className="nav-link" href="#faq">
                Frequently asked questions
              </a>
            </nav>

            <button
              type="button"
              onClick={startAudit}
              className="group ml-auto inline-flex h-[34px] shrink-0 cursor-pointer items-center justify-center gap-[12px] rounded-[5px] bg-[#2d218d] px-[20px] text-[10px] font-bold text-white shadow-[0_5px_12px_rgba(45,33,141,0.16)] transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[#241a77] hover:shadow-[0_8px_18px_rgba(45,33,141,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d218d] motion-reduce:transform-none motion-reduce:transition-none sm:min-w-[143px]"
            >
              Get my free audit
              <ArrowUpRight
                size={11}
                strokeWidth={1.9}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
              />
            </button>
          </div>
        </header>

        <section
  id="home"
  className={`${contentWidth} px-4 pt-[48px] pb-[112px] text-center sm:px-6 lg:pt-[54px]`}
>
  {/* Eyebrow */}
  <div className="mx-auto mb-[26px] flex w-fit items-center gap-[9px] text-[10px] font-semibold tracking-[0.14em] text-[#667080] uppercase">
    <span className="h-[7px] w-[7px] rounded-[2px] bg-gradient-to-br from-[#7268e7] to-[#efd6ae]" />
    NOVAFOUNDRY
  </div>

  {/* Heading */}
  <h1 className="mx-auto max-w-[1080px] text-[clamp(46px,5.2vw,74px)] leading-[1.04] font-bold tracking-[-0.055em] text-[#101010]">
    Increase visibility. More customers.
    <br />
    <span className="text-[#2f2297]">
      Start with a free audit.
    </span>
  </h1>

  {/* Subtitle */}
  <p className="mx-auto mt-[42px] max-w-[720px] text-[clamp(16px,1.45vw,23px)] leading-[1.45] font-medium tracking-[-0.025em] text-[#555555]">
    A free audit of what's working — and what isn't.
  </p>

  {/* Audit form */}
  <AuditForm />

  {/* No website */}
  <p className="mt-[21px] text-[14px] font-normal tracking-[-0.015em] text-[#262626]">
    No website yet?{" "}
    <button
      type="button"
      onClick={startSocialMediaAudit}
      className="cursor-pointer text-[#6658d7] transition hover:text-[#2f2297]"
    >
      input your social media link for a check-up
    </button>{" "}
    anyway
  </p>

  {/* Proof */}
  <div className="mx-auto mt-[79px]">
    <div className="flex items-center justify-center gap-[10px]">
      <span className="h-[7px] w-[7px] rounded-[2px] bg-gradient-to-br from-[#7268e7] to-[#efd6ae]" />

      <p className="text-[10px] font-semibold tracking-[0.17em] text-[#657080] uppercase">
        Tested &amp; proven by
      </p>
    </div>

    <div
      className="trusted-brands-marquee mx-auto mt-[22px] max-w-[760px] overflow-hidden"
      aria-label="Trusted brands"
    >
      <div className="trusted-brands-track flex w-max items-center">
        {[0, 1].map((setIndex) => (
          <div
            key={setIndex}
            className="flex shrink-0 items-center gap-[16px] pr-[16px]"
            aria-hidden={setIndex === 1}
          >
            {trustedBrands.map((brand) => (
              <div
                key={`${setIndex}-${brand.name}`}
                className="flex h-[32px] w-[108px] shrink-0 items-center justify-center"
              >
                <img
                  src={brand.logo}
                  alt={setIndex === 0 ? `${brand.name} logo` : ""}
                  loading="lazy"
                  className="max-h-[28px] max-w-full object-contain opacity-75 transition-opacity duration-200 hover:opacity-100 motion-reduce:transition-none"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

        <section id="sample-report" className="relative z-0 px-3 pb-0 sm:px-5 lg:px-8 xl:px-4">
          <div className="mx-auto w-full max-w-[1304px] overflow-hidden rounded-[16px] bg-[#FFFDFB] shadow-[0_20px_55px_rgba(0,0,0,0.08)] xl:max-w-[1600px]">
            <div className="flex h-[48px] items-center gap-[5px] px-[16px] sm:px-[18px]">
              <span className="h-[8px] w-[8px] rounded-full bg-[#98A1AD]" />
              <span className="h-[8px] w-[8px] rounded-full bg-[#98A1AD]" />
              <span className="h-[8px] w-[8px] rounded-full bg-[#98A1AD]" />
            </div>

            <div className="grid gap-[10px] px-[18px] pb-[20px] sm:px-[20px] lg:grid-cols-[342px_minmax(0,1fr)_232px] lg:px-[20px] lg:pb-[22px]">
              <div className="flex min-h-[402px] flex-col px-[0px] py-[22px] lg:pr-[18px]">
                <p className="mb-[14px] text-[8px] font-semibold tracking-[0.18em] text-[#4f5966] uppercase">
                  Video testimonial
                </p>
                <h2 className="mb-[30px] text-[34px] leading-[1] font-bold tracking-[-0.045em] text-[#101010]">
                  Why free audit?
                </h2>

                <div className="space-y-[9px]">
                  {auditItems.map((item, index) => {
                    const isActive = activeAudit === index;
                    return (
                      <button
                        type="button"
                        key={item.title}
                        onClick={() => setActiveAudit(index)}
                        className={`min-h-[90px] w-full rounded-[16px] border px-[24px] py-[18px] text-left transition duration-200 ${
                          isActive
                            ? "border-[#17191e] bg-[#111216] text-white"
                            : "border-[#c9d1dc] bg-white text-[#101010] hover:border-[#9099a7]"
                        }`}
                      >
                        <span
                          className={`block text-[8px] font-bold tracking-[0.24em] ${
                            isActive ? "text-white/85" : "text-[#30343b]"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")} · {item.phase}
                        </span>
                        <span
                          className={`mt-[13px] block text-[12px] leading-[1.35] font-medium ${
                            isActive ? "text-white" : "text-[#171717]"
                          }`}
                        >
                          {item.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="relative min-h-[402px] overflow-hidden rounded-[5px] bg-[#b7a380]">
                <img
                  key={auditItems[activeAudit].image}
                  src={auditItems[activeAudit].image}
                  alt={auditItems[activeAudit].title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-black/5" />

                <p className="absolute top-[34px] left-[18px] text-[7px] font-semibold tracking-[0.21em] text-white/80 uppercase">
                  Miss Pelumi, C.O.O FoodMartex
                </p>

                <div className="absolute bottom-[18px] left-[18px] max-w-[420px] text-white sm:bottom-[20px]">
                  <h3 className="max-w-[395px] text-[clamp(29px,2.7vw,39px)] leading-[1.02] font-medium tracking-[-0.035em]">
                    “A free Audit that changed
                    <br className="hidden sm:block" /> my business forever”
                  </h3>
                  <a
                    href="mailto:contact@novafoundry.org?subject=Free%20NovaFoundry%20Audit"
                    className="mt-[14px] inline-flex h-[64px] items-center gap-[12px] rounded-[5px] bg-white px-[17px] text-[10px] font-medium text-[#191919] transition hover:bg-[#f4f4f4]"
                  >
                    <span className="text-[12px]">▶</span>
                    Watch video (4:20)
                  </a>
                </div>
              </div>

              <div className="relative hidden min-h-[402px] overflow-hidden rounded-[5px] bg-[#c6ad86] lg:block">
                <img
                  src={auditItems[(activeAudit + 1) % auditItems.length].image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/[0.14]" />
              </div>
            </div>
          </div>
        </section>

<section
  id="results"
  className="relative z-10 -mt-[16px] bg-[#FCFCFC] px-[24px] py-[52px]"
>
  {/* INNER WHITE RESULTS BACKGROUND */}
  <div className="mx-auto w-full bg-[#FCFCFC] px-4 pt-[30px] pb-[118px] sm:px-6 lg:px-8">
    
    <div className="mx-auto max-w-[960px]">
      
      {/* Results heading */}
      <div className="mb-[48px] text-center">
        <div className="mb-[17px] flex items-center justify-center gap-[7px]">
          <span className="h-[6px] w-[6px] rounded-[1px] bg-gradient-to-br from-[#7268E7] to-[#EFD6AE]" />

          <p className="text-[8px] font-semibold tracking-[0.18em] text-[#5B6470] uppercase">
            Results
          </p>
        </div>

        <h2 className="text-[35px] leading-none font-bold tracking-[-0.045em] text-[#101010] sm:text-[38px]">
          Our results in numbers
        </h2>
      </div>

      {/* Result cards */}
      <div className="grid gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <article
            key={stat.value}
            className="flex min-h-[146px] flex-col items-center justify-center rounded-[10px] border border-[#D9D9E5] px-[18px] py-[22px] text-center"
          >
            <strong className="text-[25px] leading-none font-medium tracking-[-0.04em] text-[#111111]">
              {stat.value}
            </strong>

            <p className="mt-[18px] max-w-[170px] text-[11px] leading-[1.65] font-normal text-[#7B7B7B]">
              {stat.note}
            </p>
          </article>
        ))}
      </div>

    </div>
  </div>
</section>

<section
  id="testimonials"
  className="overflow-hidden bg-[#FFFDFB] pt-[72px] pb-[140px]"
>
  {/* HEADING */}
  <div className="mx-auto w-[min(1392px,calc(100%-48px))] max-[640px]:w-[calc(100%-28px)]">
    <p className="text-[12px] font-medium tracking-[0.11em] text-[#556171] uppercase">
      Testimonials
    </p>

    <h2 className="mt-[29px] text-[clamp(36px,3vw,46px)] leading-[1] font-semibold tracking-[-0.05em] text-[#111111]">
      Real-time results and insight.
    </h2>
  </div>

  {/* TESTIMONIAL CAROUSEL */}
  <div
    className="mt-[65px] overflow-hidden"
    style={{
      paddingLeft: "max(24px, calc((100vw - 1392px) / 2))",
    }}
  >
    <div
      ref={testimonialTrackRef}
      className="
        flex gap-[100px] overflow-x-auto scroll-smooth
        pr-[80px]
        [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
      "
    >
      {testimonials.map((item) => (
        <article
          key={item.name}
          className="
            grid
            w-[607px]
            min-w-[607px]
            grid-cols-[212px_372px]
            items-center
            gap-[23px]

            max-[760px]:w-[calc(100vw-42px)]
            max-[760px]:min-w-[calc(100vw-42px)]
            max-[760px]:grid-cols-1
            max-[760px]:gap-[24px]
          "
        >
          {/* PORTRAIT */}
          <img
            src={item.image}
            alt={item.name}
            className="
              h-[282px]
              w-[212px]
              rounded-[5px]
              object-cover
              object-center

              max-[760px]:h-[390px]
              max-[760px]:w-full
            "
          />

          {/* TEXT */}
          <div className="max-[760px]:pr-3">
            <p className="text-[17px] leading-[1.45] font-normal tracking-[-0.025em] text-[#2B2B2B]">
              “{item.quote}”
            </p>

            <div className="mt-[25px] text-[15px] leading-[1.35] text-[#313131]">
              <p className="font-medium">
                {item.name}
              </p>

              <p className="mt-[1px] font-normal">
                {item.role}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>

  {/* BOTTOM DIVIDER + CONTROLS */}
  <div className="mx-auto mt-[48px] w-[min(1392px,calc(100%-48px))] border-t border-[#E7E4E1] pt-[36px] max-[640px]:w-[calc(100%-28px)]">
    <div className="flex items-center max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-[28px]">
      
      {/* HELP TEXT */}
      <div className="w-[304px] text-[14px] leading-[1.4] text-[#292929]">
        <p className="font-medium">
          Need some help?
        </p>

        <p className="font-normal">
          We’re here to provide support and assistance.
        </p>
      </div>

      {/* REPORT BUTTON */}
      <button
        type="button"
        onClick={startAudit}
        className="
          ml-[40px]
          inline-flex
          h-[36px]
          w-[154px]
          shrink-0
          cursor-pointer
          items-center
          justify-center
          gap-[12px]
          rounded-[5px]
          bg-[#2D218D]
          text-[10px]
          font-bold
          text-white
          transition
          hover:bg-[#241A77]

          max-[760px]:ml-0
        "
      >
        Generate my report
        <ArrowUpRight size={11} strokeWidth={2} />
      </button>

      {/* SPACER */}
      <div className="flex-1 max-[760px]:hidden" />

      {/* CAROUSEL ARROWS */}
      <div className="flex shrink-0 items-center gap-[11px] max-[760px]:self-end">
        <button
          type="button"
          onClick={() => scrollTestimonials(-1)}
          aria-label="Previous testimonial"
          className="
            grid
            h-[44px]
            w-[44px]
            place-items-center
            rounded-full
            bg-[#FFFDF9]
            text-[#232323]
            shadow-[0_7px_24px_rgba(0,0,0,0.07)]
            transition
            hover:-translate-y-[1px]
            hover:shadow-[0_9px_26px_rgba(0,0,0,0.10)]
          "
        >
          <ChevronLeft size={18} strokeWidth={2} />
        </button>

        <button
          type="button"
          onClick={() => scrollTestimonials(1)}
          aria-label="Next testimonial"
          className="
            grid
            h-[44px]
            w-[44px]
            place-items-center
            rounded-full
            bg-[#FFFDF9]
            text-[#232323]
            shadow-[0_7px_24px_rgba(0,0,0,0.07)]
            transition
            hover:-translate-y-[1px]
            hover:shadow-[0_9px_26px_rgba(0,0,0,0.10)]
          "
        >
          <ChevronRight size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  </div>
</section>

<section
  id="process"
  className="bg-[#F7F7F5] px-[12px] pt-[36px] pb-[48px] sm:px-[20px] lg:px-[40px]"
>
{/* Header */}
<div className="mx-auto mb-[68px] max-w-[760px] text-center">
  <div className="flex items-center justify-center gap-[8px]">
    <span className="h-[6px] w-[6px] rounded-[1px] bg-gradient-to-br from-[#7268E7] to-[#EFD6AE]" />

    <p className="text-[10px] font-medium tracking-[0.16em] text-[#667284] uppercase">
      How it works
    </p>
  </div>

  <h2 className="mx-auto mt-[25px] max-w-[620px] text-[clamp(36px,3.25vw,50px)] leading-[1.06] font-semibold tracking-[-0.055em] text-[#111111]">
    From free audit
    <br />
    to real fixes, in three steps
  </h2>
</div>

{/* Cards */}
<div className="mx-auto grid max-w-[1640px] gap-[24px] lg:grid-cols-3">

{/* =========================
    CARD 1 — SUBMIT
========================= */}
<article
  className="
    grid min-h-[522px]
    grid-rows-[26px_96px_255px]
    content-between gap-y-[26px]
    rounded-[18px]
    bg-[#FFFCFB]
    px-[30px]
    pt-[32px]
    pb-[40px]
  "
>
  {/* STEP LABEL */}
  <div className="flex h-[26px] items-center gap-[10px]">
    <span className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-[#F2F2F1] text-[#1B1B1B]">
      <Database size={14} strokeWidth={1.7} />
    </span>

    <p className="text-[10px] font-medium tracking-[0.14em] text-[#718096] uppercase">
      01 <span className="mx-[7px]">·</span> Submit
    </p>
  </div>

  {/* TITLE */}
  <div className="flex items-start">
    <h3 className="max-w-[440px] text-[23px] leading-[1.14] font-medium tracking-[-0.04em] text-[#111111]">
      Enter your URL — or your business
      <br />
      details if you don't have one yet
    </h3>
  </div>

  <div className="h-[222px] overflow-hidden rounded-[10px] bg-[#050505] px-[24px] py-[25px] text-white">
    <p className="text-[11px] font-medium text-[#8D97A6]">SUBMIT</p>
    <div className="mt-[40px] flex items-center gap-[4px]">
      <div className="flex h-[54px] min-w-0 flex-1 items-center rounded-[4px] border border-white/30 px-[8px] text-[13px] text-[#AEB6C2]">
        Novafoundry.org
      </div>
      <button type="button" onClick={startAudit} className="flex h-[54px] w-[112px] shrink-0 items-center justify-center gap-[13px] rounded-[4px] bg-[#30238F] text-[8px] font-medium">
        Generate my report <ArrowUpRight size={11} />
      </button>
    </div>
    <p className="mt-[10px] text-[9px] text-[#555A63]">Free, no cost attached, simply put in your url</p>
  </div>
</article>


{/* =========================
    CARD 2 — REVIEW
========================= */}
<article
  className="
    grid min-h-[522px]
    grid-rows-[26px_96px_255px]
    content-between gap-y-[26px]
    rounded-[18px]
    bg-[#FFFCFB]
    px-[30px]
    pt-[32px]
    pb-[40px]
  "
>
  {/* STEP LABEL */}
  <div className="flex h-[26px] items-center gap-[10px]">
    <span className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-[#F2F2F1] text-[#1B1B1B]">
      <Tag size={14} strokeWidth={1.7} />
    </span>

    <p className="text-[10px] font-medium tracking-[0.14em] text-[#718096] uppercase">
      02 <span className="mx-[7px]">·</span> Review
    </p>
  </div>

  {/* TITLE */}
  <div className="flex items-start">
    <h3 className="max-w-[440px] text-[23px] leading-[1.14] font-medium tracking-[-0.04em] text-[#111111]">
      We check your site the way real
      <br />
      visitors and Google both see it
    </h3>
  </div>

  <div className="relative h-[222px] overflow-hidden rounded-[10px] bg-[#30238F] px-[24px] pt-[25px] text-white">
    <p className="text-[11px] font-medium text-white/90">REVIEW</p>
    <div className="absolute inset-x-[24px] bottom-0 flex h-[162px] items-end gap-[10px]">
      {[58, 64, 56, 68, 102, 131, 162].map((height, index) => (
        <span
          key={height}
          className={`flex-1 rounded-t-[6px] ${index < 4 ? "bg-[#47399C]" : "bg-[#7D899A]"}`}
          style={{ height }}
        />
      ))}
    </div>
  </div>
</article>


{/* =========================
    CARD 3 — RECEIVE
========================= */}
<article
  className="
    grid min-h-[522px]
    grid-rows-[26px_96px_255px]
    content-between gap-y-[26px]
    rounded-[18px]
    bg-[#FFFCFB]
    px-[30px]
    pt-[32px]
    pb-[40px]
  "
>
  {/* STEP LABEL */}
  <div className="flex h-[26px] items-center gap-[10px]">
    <span className="grid h-[26px] w-[26px] shrink-0 place-items-center rounded-full bg-[#F2F2F1] text-[#1B1B1B]">
      <MessageCircleQuestion size={14} strokeWidth={1.7} />
    </span>

    <p className="text-[10px] font-medium tracking-[0.14em] text-[#718096] uppercase">
      03 <span className="mx-[7px]">·</span> Receive
    </p>
  </div>

  {/* TITLE */}
  <div className="flex items-start">
    <h3 className="max-w-[455px] text-[23px] leading-[1.14] font-medium tracking-[-0.04em] text-[#111111]">
      Get your report and top 3 fixes, ranked by
      <br />
      impact, within 2 hours
    </h3>
  </div>

  <div className="h-[222px] overflow-hidden rounded-t-[10px] bg-[#050505] px-[12px] pt-[25px] text-white">
    <p className="px-[12px] text-[11px] font-medium text-[#8D97A6]">RECEIVE</p>
    <div className="mt-[8px] rounded-[10px] bg-[#0D0D0D] px-[14px] py-[14px]">
      <div className="flex justify-between text-[8px] text-[#555A63]"><span>Digital presence audit</span><span>Novafoundry.org</span></div>
      <div className="mt-[10px] flex items-center gap-[12px]">
        <span className="h-[7px] flex-1 rounded-full bg-[#4E3A06]" />
        <span className="text-[10px] text-[#6E7075]">74% Overall score</span>
      </div>
    </div>
    <div className="mt-[9px] grid grid-cols-3 gap-[9px]">
      {[["Speed", "41%", "text-[#F15A31]"], ["Mobile", "64", "text-[#E9AB00]"], ["First Impression", "78", "text-[#0EAE24]"]].map(([label, value, color]) => (
        <div key={label} className="rounded-[10px] bg-[#0D0D0D] px-[12px] py-[14px]">
          <p className="text-[10px] text-[#777A80]">{label}</p>
          <p className={`mt-[12px] text-[20px] font-semibold ${color}`}>{value}</p>
        </div>
      ))}
    </div>
  </div>
</article>
</div>
</section>

<section
  id="faq"
  className="bg-[#FCFCFC] px-[20px] pt-[82px] pb-[128px] sm:px-[28px]"
>
  <div className="mx-auto max-w-[820px]">

    {/* EYEBROW */}
    <div className="flex items-center justify-center gap-[8px]">
      <span className="h-[6px] w-[6px] rounded-[1px] bg-gradient-to-br from-[#7268E7] to-[#EFD6AE]" />

      <p className="text-[10px] font-medium tracking-[0.16em] text-[#657084] uppercase">
        Frequently asked questions
      </p>
    </div>

    {/* HEADING */}
    <h2
      className="
        mx-auto
        mt-[36px]
        text-center
        text-[clamp(40px,4vw,56px)]
        leading-[0.98]
        font-semibold
        tracking-[-0.06em]
        text-[#101010]
      "
    >
      Frequently asked questions
    </h2>

    {/* FAQ GRID */}
    <div className="mt-[60px] grid gap-x-[10px] gap-y-[10px] md:grid-cols-2">
      {faqs.map(([question, answer], index) => (
        <details
          key={question}
          className="
            group
            overflow-hidden
            rounded-[9px]
            border
            border-[#E8E7E4]
            bg-[#F7F7F5]
            transition
            open:bg-white
          "
        >
          <summary
            className="
              flex
              min-h-[62px]
              cursor-pointer
              list-none
              items-center
              justify-between
              gap-[18px]
              px-[18px]
              text-[11px]
              leading-[1.3]
              font-semibold
              tracking-[-0.015em]
              text-[#111111]
              [&::-webkit-details-marker]:hidden
            "
          >
            <span>
              {index + 1}. {question}
            </span>

            <span
              className="
                relative
                grid
                h-[20px]
                w-[20px]
                shrink-0
                place-items-center
                text-[20px]
                font-light
                leading-none
                text-[#252525]
              "
            >
              <span className="group-open:hidden">+</span>
              <span className="hidden group-open:block">−</span>
            </span>
          </summary>

          <div className="px-[18px] pb-[18px]">
            <p className="max-w-[330px] text-[11px] leading-[1.6] font-normal text-[#666666]">
              {answer}
            </p>
          </div>
        </details>
      ))}
    </div>

    {/* BOTTOM HELP AREA */}
    <div
      className="
        mt-[34px]
        flex
        items-center
        justify-between
        gap-[30px]
        px-[16px]
        max-[640px]:flex-col
        max-[640px]:items-start
      "
    >
      <div>
        <p className="text-[12px] font-semibold tracking-[-0.015em] text-[#151515]">
          Still Have Questions Left?
        </p>

        <p className="mt-[4px] max-w-[360px] text-[10px] leading-[1.55] font-normal text-[#656565]">
          We’re happy to walk through your specific situation — no audit required
          to ask.
        </p>
      </div>

      <a
        href="mailto:contact@novafoundry.org"
        className="
          inline-flex
          h-[43px]
          min-w-[94px]
          shrink-0
          items-center
          justify-center
          rounded-[6px]
          bg-[#2F218D]
          px-[18px]
          text-[10px]
          font-semibold
          text-white
          transition
          hover:bg-[#251A76]
        "
      >
        Get in touch
      </a>
    </div>
  </div>
</section>

        <section className="bg-white px-[60px] pb-[80px] max-[900px]:px-[24px] max-[640px]:px-[14px]">
  <div
    className="
      mx-auto
      max-w-[1470px]
      overflow-hidden
      rounded-[16px]
      bg-[#000000]
      px-[32px]
      pt-[130px]
      pb-[44px]
      text-white
      shadow-[0_28px_70px_rgba(0,0,0,0.14)]

      max-[900px]:pt-[90px]
      max-[640px]:px-[18px]
      max-[640px]:pt-[70px]
    "
  >
    {/* HEADING */}
    <div className="mx-auto max-w-[760px] text-center">
      <h2
        className="
          text-[clamp(34px,3vw,46px)]
          leading-[1]
          font-semibold
          tracking-[-0.055em]
          text-white
        "
      >
        Still deciding? Try it yourself.
      </h2>

      <p
        className="
          mx-auto
          mt-[24px]
          max-w-[500px]
          text-[10px]
          leading-[1.75]
          font-normal
          text-white/65
        "
      >
        Customizable design and development solutions tailored to fit your goals,
        <br className="hidden sm:block" />
        timeline, and budget.
      </p>
    </div>

    {/* DASHBOARD WINDOW */}
    <div
      className="
        mx-auto
        mt-[34px]
        max-w-[950px]
        overflow-hidden
        rounded-[16px]
        bg-[#181A1E]
        shadow-[0_28px_70px_rgba(0,0,0,0.32)]
      "
    >
      {/* WINDOW TOP BAR */}
      <div className="flex h-[40px] items-center gap-[7px] border-b border-white/[0.05] px-[18px]">
        <span className="h-[10px] w-[10px] rounded-full bg-[#8994A3]" />
        <span className="h-[10px] w-[10px] rounded-full bg-[#8994A3]" />
        <span className="h-[10px] w-[10px] rounded-full bg-[#8994A3]" />
      </div>

      {/* DASHBOARD CONTENT */}
      <div className="px-[28px] pt-[28px] pb-[18px] max-[640px]:px-[16px]">
        {/* METRIC CARDS */}
        <div className="grid gap-[76px] lg:grid-cols-3 max-[1100px]:gap-[26px]">
          
          {/* ACTIVE USERS */}
          <div className="min-h-[151px] rounded-[9px] border border-[#62666D] bg-[#25272B] px-[22px] py-[24px]">
            <p className="text-[13px] font-medium text-[#9DA5B2]">
              Active users
            </p>

            <strong className="mt-[17px] block text-[39px] leading-none font-semibold tracking-[-0.045em] text-white">
              48.2k
            </strong>

            <span className="mt-[18px] inline-flex rounded-full bg-[#F1F3F5] px-[9px] py-[3px] text-[10px] font-semibold text-[#15171A]">
              +8.1%
            </span>
          </div>

          {/* CONVERSION */}
          <div className="min-h-[151px] rounded-[9px] border border-white/[0.04] bg-[#25272B] px-[22px] py-[24px]">
            <p className="text-[13px] font-medium text-[#9DA5B2]">
              Conversion
            </p>

            <strong className="mt-[17px] block text-[39px] leading-none font-semibold tracking-[-0.045em] text-white">
              4.6%
            </strong>

            <span className="mt-[18px] inline-flex rounded-full bg-[#F1F3F5] px-[9px] py-[3px] text-[10px] font-semibold text-[#15171A]">
              stable
            </span>
          </div>

          {/* CHURN RISK */}
          <div className="min-h-[151px] rounded-[9px] border border-white/[0.04] bg-[#25272B] px-[22px] py-[24px]">
            <p className="text-[13px] font-medium text-[#9DA5B2]">
              Churn risk
            </p>

            <strong className="mt-[17px] block text-[39px] leading-none font-semibold tracking-[-0.045em] text-white">
              low
            </strong>

            <span className="mt-[18px] inline-flex rounded-full bg-[#F1F3F5] px-[9px] py-[3px] text-[10px] font-semibold text-[#15171A]">
              watching v2.14
            </span>
          </div>
        </div>

        {/* BOTTOM ANALYSIS */}
        <div className="mt-[30px] grid items-end gap-[28px] lg:grid-cols-[1fr_180px]">
          <div>
            <p className="text-[9px] font-semibold tracking-[0.18em] text-[#7E8794] uppercase">
              Trace explains · Active users
            </p>

            <p className="mt-[17px] max-w-[630px] text-[14px] leading-[1.5] font-normal text-[#AAB0BB]">
              Growth is up 8.1% since v2.14 — the new referral prompt is working.
              Invited users activate 1.9× faster than organic signups.
            </p>

            <span className="mt-[28px] inline-flex rounded-full bg-[#727780] px-[11px] py-[4px] text-[10px] font-medium text-[#191B1E]">
              Root cause: v2.14 referral prompt
            </span>
          </div>

          {/* BAR CHART */}
          <div className="flex h-[72px] items-end justify-end gap-[5px]">
            <span className="h-[24px] w-[22px] bg-[#303237]" />
            <span className="h-[26px] w-[22px] bg-[#303237]" />
            <span className="h-[25px] w-[22px] bg-[#303237]" />
            <span className="h-[28px] w-[22px] bg-[#303237]" />
            <span className="h-[40px] w-[22px] bg-[#738093]" />
            <span className="h-[52px] w-[22px] bg-[#738093]" />
            <span className="h-[64px] w-[22px] bg-[#738093]" />
          </div>
        </div>
      </div>
    </div>

    {/* CTA */}
    <div className="mt-[50px] flex justify-center">
      <button
        type="button"
        onClick={startAudit}
        className="
          inline-flex
          h-[55px]
          min-w-[282px]
          cursor-pointer
          items-center
          justify-between
          rounded-[5px]
          bg-white
          px-[50px]
          text-[18px]
          font-medium
          tracking-[-0.025em]
          text-[#111111]
          transition
          hover:bg-[#F4F4F4]
        "
      >
        <span>Get my free audit</span>
        <ArrowUpRight size={20} strokeWidth={1.6} />
      </button>
    </div>
  </div>
</section>

        <footer className="border-t border-black/[0.05] bg-[#FCFCFC]">
          <div className={`${contentWidth} flex flex-col gap-4 py-8 text-[9px] font-medium text-black/40 sm:flex-row sm:items-center sm:justify-between`}>
            <LogoMark />
            <span>© {new Date().getFullYear()} NovaFoundry Technologies. All rights reserved.</span>
          </div>
        </footer>
      </main>
    </>
  );
}

export default App;
