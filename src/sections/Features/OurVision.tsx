import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import VisionVideo from "../../assets/About Image (1).png";
import SectionBadge from "../../components/ui/SectionBadge";
import ExpandingCard from "../../components/ui/SliderBar";
import Positive from "../../assets/positive.svg";
import Worked from "../../assets/worked.svg";
import Partner from "../../assets/partner.svg";

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
  return (
    <div className="w-full max-w-5xl mx-auto my-10">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* left grid  */}
          <motion.div
            className="w-full h-100 relative"
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <img
              src={VisionVideo}
              alt=""
              className="w-full h-full object-cover"
            />
            <div
              className="absolute pointer-events-none z-0"
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
            className="mt-20 pl-6 space-y-4 relative"
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={fadeUp} custom={0}>
              <SectionBadge label="Vision" />
            </motion.div>

            <motion.p
              className="text-xs max-w-xs text-gray-700 leading-loose"
              variants={fadeUp}
              custom={1}
            >
              "We're a Digital agency driven by design, strategy, and
              storytelling. Our mission is to help brands stand out through bold
              ideas,.''
            </motion.p>

            <motion.div className="my-10" variants={fadeUp} custom={2}>
              <ExpandingCard
                title="C.E.O Aderinto Samson"
                startWidth="80%"
                colorFrom="#FFDFAF"
                colorTo="#B5B5FF1A"
              />
            </motion.div>

            <motion.div
              className="flex items-center gap-3"
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
                  className="flex items-center text-[10px] gap-1"
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
              className="absolute pointer-events-none z-0"
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
