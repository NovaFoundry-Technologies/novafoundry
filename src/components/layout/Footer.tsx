import { motion } from "framer-motion";
import Logo from "../../assets/novahero.png";
import Address from "../../assets/Info Icon.svg";
import Email from "../../assets/Vector (2).svg";
import Phone from "../../assets/Vector (1).svg";
import FB from "../../assets/fb.svg";
import X from "../../assets/x.svg";
import LN from "../../assets/linkedin.svg";
import IG from "../../assets/ig.svg";

const Footer = () => {
  return (
    <div className="w-full max-w-5xl mx-auto my-10 px-4">
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
        className="w-full rounded-3xl overflow-hidden relative px-10 py-10"
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

        <div className="relative z-10 flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex flex-col leading-none">
            <span
              className="text-5xl sm:text-7xl font-bold tracking-tight"
              style={{
                background: "linear-gradient(to bottom, #9090d0, #c4c4ee)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              START
            </span>
            <div className="flex items-center gap-3">
              <span
                className="text-5xl sm:text-7xl font-bold tracking-tight"
                style={{
                  background: "linear-gradient(to bottom, #9090d0, #c4c4ee)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                PR
              </span>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center w-20 h-10 sm:w-25 sm:h-15 justify-center rounded-full shrink-0 border-2 border-[#B5B5FF]"
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
                className="text-5xl sm:text-7xl font-bold tracking-tight"
                style={{
                  background: "linear-gradient(to bottom, #9090d0, #c4c4ee)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                JECT
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            {[
              {
                icon: Email,
                label: "Email",
                value: "contact.Novafoundry@gmail.com",
              },
              { icon: Phone, label: "Phone", value: "+2 (88) 000-0000" },
              { icon: Address, label: "Address", value: "No 7, Omole estate." },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <span
                  className="flex items-center border border-gray-100 shadow-md justify-center w-8 h-8 rounded-lg text-xs text-gray-500 shrink-0"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    border: "1px solid rgba(0,0,0,0.06)",
                  }}
                >
                  <img src={icon} alt={label} />
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400">{label}</span>
                  <span className="text-xs text-gray-700">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-8 flex flex-col gap-4">
          <div className="flex items-center gap-4 mx-auto sm:ml-15">
            {[
              { label: "Facebook", icon: FB },
              { label: "Instagram", icon: IG },
              { label: "Twitter", icon: X },
              { label: "LinkedIn", icon: LN },
            ].map(({ label, icon }) => (
              <motion.button
                key={label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center z-1 justify-center w-10 h-10 rounded-full text-[10px] font-semibold text-gray-500 bg-white shadow-md border-2 border-[#EFF7FE]"
              >
                <img src={icon} className="w-3" alt="" />
              </motion.button>
            ))}
          </div>
          <div className="absolute top-1/2 z-0 w-full h-px bg-[#B5B5FF]" />
        </div>

        <div className="relative z-10 mt-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Pages */}
          <div className="flex flex-col gap-2 max-w-35">
            <p className="text-sm font-semibold text-gray-900 mb-1">Pages</p>
            <div className="grid grid-cols-2 gap-x-1 gap-y-1.5">
              {["Home", "About", "Services", "Teams", "Blogs", "Contact"].map(
                (link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-xs text-gray-500 hover:text-gray-800 transition-colors"
                  >
                    {link}
                  </a>
                ),
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2 max-w-35">
            <p className="text-sm font-semibold text-gray-900 mb-1">
              Utility Page
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {[
                "Change Log",
                "License",
                "Style Guide",
                "Instruction",
                "404 Page",
                "Password",
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-xs text-gray-500 hover:text-gray-800 transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-gray-900 mb-1">
              Subscribe Newsletter
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Subscribe for fresh content and stories straight to your email.
            </p>
            <div className="flex items-center justify-between mt-2 p-3 bg-[#B5B5FF33] rounded-full border border-[#B5B5FF]">
              <input
                type="email"
                placeholder="Aderinto Samson@gmail.com"
                className="bg-transparent text-xs text-gray-700 placeholder:text-gray-600 outline-none flex-1"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-6 h-6 rounded-lg"
                style={{
                  background: "linear-gradient(to right, #5A4B99, #AD72FF)",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="white"
                    strokeWidth="1.6"
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

export default Footer;
