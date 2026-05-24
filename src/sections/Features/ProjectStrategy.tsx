import { motion, type Variants } from "framer-motion";
import Button from "../../components/ui/Button";
import { serviceItems } from "../../components/ui/Card";
import SectionBadge from "../../components/ui/SectionBadge";
import HeaderBackground from "../../assets/Background (3).png";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};
const ProjectStrategy = () => {
  return (
    <div className="relative mx-auto my-14 w-full max-w-6xl overflow-visible px-4 sm:my-10 sm:mt-37 sm:px-0">
      <div
        className="absolute pointer-events-none z-0"
        style={{
          width: "min(360px, 80vw)",
          height: "360px",
          top: "50%",
          left: "90%",
          transform: "translate(-50%, -50%)",
          background: "#8CD5FE3D",
          filter: "blur(50px)",
        }}
      />
      {/* Header */}
      <motion.div
        className="relative isolate z-10 my-6 flex flex-col items-center justify-center overflow-visible font-[Syne]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <img
          src={HeaderBackground}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-20 w-[22rem] max-w-none -translate-x-1/2 -translate-y-1/2 -rotate-12 object-contain opacity-30 sm:h-28 sm:w-[36rem] sm:opacity-35"
        />

        <motion.div className="relative z-10" variants={fadeUp} custom={0}>
          <SectionBadge label="The Process" />
        </motion.div>

        <motion.h1
          className="relative z-10 mt-2 text-center text-xl sm:text-2xl"
          variants={fadeUp}
          custom={1}
        >
          Expert Services Designed to
        </motion.h1>
    
       <motion.span
          className="relative z-10 text-xl sm:text-2xl"
          variants={fadeUp}
          custom={2}
          style={{
            background: "linear-gradient(to bottom, #2F2F82, #AD72FF)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Empower You
        </motion.span>
      </motion.div>

      {/* Cards */}
      <motion.div
        className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {serviceItems.map((item, i) => (
          <motion.div
            key={item.id}
            variants={fadeUp}
            custom={i}
            whileHover={{
              y: -4,
              boxShadow: "0px 12px 32px rgba(16,24,40,0.10)",
            }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-5 rounded-xl border border-gray-100 bg-white p-4 cursor-default sm:gap-6 sm:p-5"
            style={{
              boxShadow:
                "0px 1px 2px rgba(16,24,40,0.04), 0px 4px 12px rgba(16,24,40,0.04)",
            }}
          >
            <div className="flex items-start justify-between">
              <motion.div
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-50 border border-gray-100"
                whileHover={{
                  rotate: [0, -8, 8, 0],
                  transition: { duration: 0.4 },
                }}
              >
                {item.icon}
              </motion.div>
              <span className="text-2xl font-bold text-gray-200 tabular-nums">
                {item.step}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-[Helvetica] text-sm font-medium text-black sm:text-base">{item.title}</p>
              <p className="text-xs leading-relaxed text-gray-800">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Button */}
      <motion.div
        className="relative z-10 my-8 flex items-center justify-center sm:my-10"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Button />
      </motion.div>
    </div>
  );
};

export default ProjectStrategy;
