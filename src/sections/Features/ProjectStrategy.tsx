import { motion } from "framer-motion";
import Button from "../../components/ui/Button";
import { serviceItems } from "../../components/ui/Card";
import SectionBadge from "../../components/ui/SectionBadge";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const ProjectStrategy = () => {
  return (
    <div className="w-full max-w-6xl mx-auto my-10">
      {/* Header */}
      <motion.div
        className="flex flex-col justify-center items-center my-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.div variants={fadeUp} custom={0}>
          <SectionBadge label="The Process" />
        </motion.div>

        <motion.h1
          className="text-2xl text-center mt-2"
          variants={fadeUp}
          custom={1}
        >
          Expert Services Designed to
        </motion.h1>

        <motion.span
          className="text-2xl"
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
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
            className="flex flex-col gap-6 p-5 rounded-xl bg-white border border-gray-100 cursor-default"
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
              <p className="text-md font-medium text-black">{item.title}</p>
              <p className="text-xs text-gray-800 leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Button */}
      <motion.div
        className="my-10 flex justify-center items-center"
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
