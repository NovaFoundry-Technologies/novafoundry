import { memo } from "react";
import { ArrowUpRight } from "lucide-react";
import starDesign from "../../assets/starDesign.svg";
import NovaFoundry from "../../assets/NovaFoundry.svg";

const contentWidth =
  "mx-auto w-[min(1120px,calc(100%-48px))] max-[600px]:w-[calc(100%-32px)] max-[380px]:w-[calc(100%-24px)]";

// Replace each placeholder with your profile URL, or add another entry.
const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/nova_foundry_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tiwaloluwa-ayodeji-4bb25b417?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  },
];

const linkColumns = [
  {
    title: "Explore",
    links: [
      ["Home", "#home"],
      ["About us", "#about"],
      ["Our solutions", "#solutions"],
    ],
  },
  {
    title: "Services",
    links: [
      ["Product design", "#services"],
      ["Development", "#services"],
      ["Brand strategy", "#services"],
    ],
  },
  {
    title: "Discover",
    links: [
      ["Selected work", "#work"],
      ["Internship program", "#internship"],
      ["Contact us", "#contact"],
    ],
  },
];

function Footer() {
  return (
    <footer
      className="w-full overflow-hidden bg-[#050505] px-[35px] pt-[110px] pb-[50px] text-[#f5f5f5] max-[900px]:px-0 max-[600px]:pt-20 max-[600px]:pb-10"
      id="contact"
    >
      <div
        className={`${contentWidth} grid grid-cols-[1.1fr_.7fr_1.35fr] gap-[clamp(48px,7vw,90px)] pb-20 max-[900px]:grid-cols-2 max-[900px]:gap-x-10 max-[900px]:gap-y-16 max-[600px]:grid-cols-1 max-[600px]:gap-12 max-[600px]:pb-14`}
      >
        <div className="flex flex-col items-start">
          <img
            className="mb-6 h-auto w-[190px] brightness-0 invert max-[600px]:w-[170px]"
            src={NovaFoundry}
            alt="NovaFoundry"
          />
          <p className="mb-5 max-w-[300px] text-[13px] leading-[1.7] font-medium text-white/55">
            We design and build thoughtful digital products that help ambitious
            ideas move from concept to launch.
          </p>
          <small className="mt-3 text-[10px] font-bold tracking-[.08em] text-white/40 uppercase">
            Email
          </small>
          <a
            className="mt-1.5 text-[14px] font-semibold text-white/90 transition hover:text-[#ffc85b]"
            href="mailto:contact@novafoundry.org"
          >
            contact@novafoundry.org
          </a>
          <small className="mt-5 text-[10px] font-bold tracking-[.08em] text-white/40 uppercase">
            Call
          </small>
          <a className="mt-1.5 text-[14px] font-semibold text-white/90 transition hover:text-[#ffc85b]" 
              href="tel:+447405864013">
            +44 7405 864013
          </a>
          <a
            className="mt-1.5 text-[14px] font-semibold text-white/90 transition hover:text-[#ffc85b]"
            href="tel:+2347077660475"
          >
            +234 707 7660 475
          </a>
        </div>

        <div className="socialLinks flex flex-col items-start gap-4">
          <span className="mb-1 text-[10px] font-bold tracking-[.08em] text-white/40 uppercase">
            Follow us
          </span>
          {socialLinks.map(({ label, href }) => (
            <a
              className="group flex min-h-10 items-center gap-2 border-b border-white/30 text-[18px] font-bold transition hover:border-[#ffc85b] hover:text-[#ffc85b]"
              href={href}
              key={label}
              target="_blank"
              rel="noreferrer"
            >
              {label}
              <ArrowUpRight
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                size={16}
                aria-hidden="true"
              />
            </a>
          ))}
        </div>

        <nav
          className="grid grid-cols-3 gap-[clamp(24px,4vw,52px)] max-[900px]:col-span-2 max-[600px]:col-auto max-[480px]:grid-cols-2 max-[480px]:gap-y-10"
          aria-label="Footer navigation"
        >
          {linkColumns.map(({ title, links }) => (
            <div className="flex flex-col items-start gap-3.5" key={title}>
              <span className="mb-1 text-[10px] font-bold tracking-[.08em] text-white/40 uppercase">
                {title}
              </span>
              {links.map(([label, href]) => (
                <a
                  className="text-[13px] font-semibold text-white/65 transition hover:translate-x-0.5 hover:text-white"
                  href={href}
                  key={label}
                >
                  {label}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </div>

      <div
        className={`${contentWidth} flex items-center justify-between gap-6 border-t border-white/15 py-8 text-[11px] font-semibold text-white/45 max-[600px]:items-start max-[600px]:py-6 max-[480px]:flex-col max-[480px]:gap-2`}
      >
        <p className="m-0">Designed and powered by NovaFoundry Agency.</p>
        <p className="m-0 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#ffc85b]" />
          Lagos, Nigeria
        </p>
      </div>

      <div
        className={`${contentWidth} grid grid-cols-[auto_1fr] items-end gap-[clamp(28px,6vw,70px)] pt-5 max-[600px]:grid-cols-[52px_minmax(0,1fr)] max-[600px]:items-center max-[600px]:gap-4 max-[600px]:pt-8`}
      >
        <img
          className="w-[100px] animate-spin [animation-duration:12s] motion-reduce:animate-none max-[600px]:w-[52px]"
          src={starDesign}
          alt=""
        />
        <strong className="min-w-0 justify-self-end text-right text-[clamp(52px,9vw,112px)] leading-[.82] font-bold tracking-[-.075em] text-white max-[600px]:text-[clamp(34px,10vw,52px)] max-[380px]:tracking-[-.055em]">
          NovaFoundry
        </strong>
      </div>
    </footer>
  );
}

export default memo(Footer);
