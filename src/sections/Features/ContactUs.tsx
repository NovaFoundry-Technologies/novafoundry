import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import SectionBadge from "../../components/ui/SectionBadge";
import Man from "../../assets/man.png";
import FormPic from "../../assets/formpic.png";
import Address from "../../assets/Info Icon.svg";
import Email from "../../assets/Vector (2).svg";
import Phone from "../../assets/Vector (1).svg";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const ContactSection = () => {
  return (
    <div className="mx-auto my-14 w-full max-w-5xl px-4 sm:my-16">
      <motion.div
        className="relative w-full overflow-hidden rounded-3xl"
        style={{
          background:
            "linear-gradient(135deg, #fff8f0 0%, #f0f4ff 50%, #e8f4ff 100%)",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow:
            "0px 8px 32px rgba(99,102,241,0.08), 0px 2px 8px rgba(0,0,0,0.04)",
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Glow  */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: "300px",
            height: "300px",
            top: -100,
            left: -60,
            background: "#FFC46A42",
            filter: "blur(80px)",
          }}
        />

        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: "260px",
            height: "260px",
            bottom: -80,
            right: 0,
            background: "#8CD5FE3D",
            filter: "blur(60px)",
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="p-5 sm:p-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col gap-6"
            >
              <motion.div variants={fadeUp} custom={0}>
                <SectionBadge label="Contact us" />
              </motion.div>

              <motion.h1
                className="font-[Syne] text-2xl font-semibold leading-snug text-gray-900 sm:text-3xl"
                variants={fadeUp}
                custom={1}
              >
                We want to hear from you
              </motion.h1>

              {/* Form fields */}
              <motion.div
                className="flex flex-col gap-5"
                variants={fadeUp}
                custom={2}
              >
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full border-b border-gray-200 bg-transparent py-2 text-sm text-gray-600 outline-none transition-colors placeholder:font-[inter] placeholder:text-gray-300 focus:border-gray-400"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-700">
                    Your Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter the e-mail"
                    className="w-full border-b border-gray-200 bg-transparent px-2 py-2 text-sm text-gray-600 outline-none transition-colors placeholder:text-gray-300 focus:border-gray-400"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-700">
                    What's the type of your company?
                  </label>
                  <div className="relative">
                    <select
                      defaultValue=""
                      className="w-full appearance-none border-b border-gray-200 bg-transparent px-2 py-2 pr-8 text-sm text-gray-500 outline-none transition-colors focus:border-gray-400"
                    >
                      <option value="" disabled>
                        Select the type of your company
                      </option>
                      <option value="startup">Startup</option>
                      <option value="agency">Agency</option>
                      <option value="enterprise">Enterprise</option>
                      <option value="freelance">Freelance</option>
                    </select>
                    <span className="pointer-events-none absolute bottom-2.5 right-0 text-sm text-gray-400">
                      v
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-700">
                    What you need from us?
                  </label>
                  <div className="relative">
                    <select
                      defaultValue=""
                      className="w-full appearance-none border-b border-gray-200 bg-transparent px-2 py-2 pr-8 text-sm text-gray-500 outline-none transition-colors focus:border-gray-400"
                    >
                      <option value="" disabled>
                        Select the Services Needed
                      </option>
                      <option value="branding">Branding</option>
                      <option value="web">Web Design</option>
                      <option value="product">Product Design</option>
                      <option value="ui">UI/UX Design</option>
                    </select>
                    <span className="pointer-events-none absolute bottom-2.5 right-0 text-sm text-gray-400">
                      v
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col gap-3 mt-2"
                variants={fadeUp}
                custom={3}
              >
                {[
                  {
                    icon: Email,
                    label: "Email",
                    value: "contact.Novafoundry@gmail.com",
                  },
                  { icon: Phone, label: "Phone", value: "+2 (88) 000-0000" },
                  {
                    icon: Address,
                    label: "Address",
                    value: "4140 Parker Rd. Allentown",
                  },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex min-w-0 items-center gap-3">
                    <span
                      className="flex items-center border border-gray-100 shadow-md justify-center w-8 h-8 rounded-lg text-xs text-gray-500 shrink-0"
                      style={{
                        background: "rgba(255,255,255,0.7)",
                        border: "1px solid rgba(0,0,0,0.06)",
                      }}
                    >
                      <img src={icon} alt="" />
                    </span>
                    <div className="flex min-w-0 flex-col">
                      <span className="text-[10px] text-gray-400">{label}</span>
                      <span className="break-words text-xs text-gray-700">
                        {value}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.button
                variants={fadeUp}
                custom={4}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="w-fit rounded-full px-6 py-2.5 text-sm font-medium text-white transition-all"
                style={{
                  background: "linear-gradient(to right, #5A4B99, #AD72FF)",
                }}
              >
                Send Message
              </motion.button>
            </motion.div>
          </div>

          <div className="hidden lg:flex flex-col gap-3 p-6 justify-center">
            <motion.div
              className="grid grid-cols-2 gap-3 h-full"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{ height: "280px" }}
              >
                <img
                  src={Man}
                  alt="Team"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="rounded-2xl overflow-hidden mt-8"
                style={{ height: "280px" }}
              >
                <img
                  src={FormPic}
                  alt="Landscape"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactSection;
