import { memo } from "react";
import { motion } from "framer-motion";
import Logo from "../../assets/novahero.png";
import Address from "../../assets/Info Icon.svg";
import Email from "../../assets/Vector (2).svg";
import Phone from "../../assets/Vector (1).svg";
import FB from "../../assets/fb.svg";
import X from "../../assets/x.svg";
import LN from "../../assets/linkedin.svg";
import IG from "../../assets/ig.svg";

const footerHeadlineGradient = {
  background:
    "linear-gradient(90deg, #9f9fee 0%, #b7b9f4 45%, #d9d0f1 78%, #fff1c7 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const Footer = () => {
  return (
    <div className="mx-auto my-10 w-full max-w-5xl px-4">
      <style>{`
        @keyframes borderPulse {
          0%, 100% {
            box-shadow:
              0 0 0 1.5px #B5B5FF,
              0 0 0 4px rgba(181, 181, 255, 0.2),
              0 0 0 7px rgba(181, 181, 255, 0.08),
              0px 8px 32px rgba(99, 102, 241, 0.08);
            outline-color: rgba(181, 181, 255, 0.18);
          }
          50% {
            box-shadow:
              0 0 0 1.5px #c4a0ff,
              0 0 0 5px rgba(181, 181, 255, 0.35),
              0 0 0 10px rgba(181, 181, 255, 0.12),
              0px 8px 40px rgba(99, 102, 241, 0.18);
            outline-color: rgba(181, 181, 255, 0.35);
          }
        }
      `}</style>

      <motion.div
        className="relative w-full overflow-hidden rounded-3xl px-5 py-8 sm:px-10 sm:py-10"
        style={{
          background:
            "linear-gradient(135deg, #fff8f0 0%, #f0f0ff 50%, #e8f4ff 100%)",
          border: "1px solid rgba(0,0,0,0.06)",
          outline: "4px solid rgba(181, 181, 255, 0.18)",
          outlineOffset: "4px",
          animation: "borderPulse 3s ease-in-out infinite",
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Glow blobs */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: "300px",
            height: "300px",
            top: -80,
            left: -60,
            background: "#FFC46A42",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: "300px",
            height: "300px",
            bottom: -80,
            right: -60,
            background: "#B5B5FF59",
            filter: "blur(70px)",
          }}
        />

        <div className="relative z-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:gap-4">
          <div className="flex flex-col leading-none">
            <span
              className="text-4xl font-bold tracking-tight min-[360px]:text-5xl sm:text-7xl"
              style={footerHeadlineGradient}
            >
              START
            </span>
            <div className="flex items-center gap-3">
              <span
                className="text-4xl font-bold tracking-tight min-[360px]:text-5xl sm:text-7xl"
                style={footerHeadlineGradient}
              >
                PR
              </span>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-9 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#B5B5FF] min-[360px]:h-10 min-[360px]:w-20 sm:h-15 sm:w-25"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  boxShadow:
                    "0 2px 0 rgba(255,255,255,0.9) inset, 0 4px 16px rgba(99,102,241,0.1)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 17L17 7M17 7H7M17 7V17"
                    stroke="#5A4B99"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>

              <span
                className="text-4xl font-bold tracking-tight min-[360px]:text-5xl sm:text-7xl"
                style={footerHeadlineGradient}
              >
                JECT
              </span>
            </div>
          </div>

          <div className="mt-2 flex w-full flex-col gap-4 sm:w-auto">
            {[
              {
                icon: Email,
                label: "Email",
                value: "contact@novafoundry.com",
              },
              { icon: Phone, label: "Phone", value: "+447405864013" },
              { icon: Address, label: "Address", value: "Bedfordshire, UK" },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex min-w-0 items-center gap-3">
                <span
                  className="flex items-center border border-gray-100 shadow-md justify-center w-8 h-8 rounded-lg text-xs text-gray-500 shrink-0"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <img src={icon} alt={label} />
                </span>
                <div className="flex min-w-0 flex-col">
                  <span className="text-[10px] text-gray-400">{label}</span>
                  <span className="break-words text-xs text-gray-700">
                    {value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-8 flex flex-col gap-4">
          <div className="mx-auto flex items-center gap-3 sm:ml-15 sm:gap-4">
            {[
              { label: "Facebook", icon: FB, href: "#" },
              { label: "Instagram", icon: IG, href: "https://www.instagram.com/nova_foundry" },
              { label: "Twitter", icon: X, href: "#" },
              { label: "LinkedIn", icon: LN, href: "#" },
            ].map(({ label, icon, href }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="z-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#EFF7FE] bg-white text-[10px] font-semibold text-gray-500 shadow-md sm:h-10 sm:w-10"
              >
                <img src={icon} className="w-3" alt={label} />
              </motion.a>
            ))}
          </div>
          <div className="absolute top-1/2 z-0 w-full h-px bg-[#B5B5FF]" />
        </div>

        <div className="relative z-10 mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
          {/* Pages */}
          <div className="flex w-full flex-col gap-3 sm:max-w-35">
            <details className="sm:open" open>
              <summary className="text-sm font-semibold text-gray-900 mb-1 cursor-pointer list-none sm:list-none select-none sm:pointer-events-none">
                Pages
                <span className="ml-2 text-gray-400 sm:hidden">▼</span>
              </summary>
              <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-2 sm:mt-1">
                {["Home", "About", "Services", "Team", "Blog", "Contact"].map(
                  (link) => (
                    <a
                      key={link}
                      href="#"
                      className="text-sm text-gray-500 hover:text-gray-800 transition-colors sm:text-xs"
                    >
                      {link}
                    </a>
                  ),
                )}
              </div>
            </details>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-gray-900 mb-1">
              Subscribe Newsletter
            </p>
            <p className="text-sm text-gray-500 leading-relaxed sm:text-xs">
              Subscribe for fresh content and stories straight to your email.
            </p>
            <div className="mt-2 flex items-center justify-between gap-2 rounded-full border-2 border-[#B5B5FF] bg-white p-1 shadow-md transition-shadow focus-within:shadow-lg focus-within:border-[#AD72FF]">
              <input
                type="email"
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-gray-700 outline-none placeholder:text-gray-400 sm:text-xs"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-9 h-9 rounded-full shadow-sm"
                style={{
                  background: "linear-gradient(to right, #5A4B99, #AD72FF)",
                }}
                aria-label="Subscribe"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-8">
          <img src={Logo} className="h-10" alt="Novafoundry logo" />
        </div>
      </motion.div>
    </div>
  );
};

export default memo(Footer);
