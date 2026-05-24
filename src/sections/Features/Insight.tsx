import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import SectionBadge from "../../components/ui/SectionBadge";
import Button from "../../components/ui/Button";
import { leftCards, rightCards } from "../../data/insight";
import PhoneMockup from "../../assets/phonemockup.svg";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
  align?: "left" | "right";
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  index,
}) => (
  <motion.div
    variants={fadeUp}
    custom={index}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className="flex flex-col gap-3 p-5 rounded-2xl bg-white w-full max-w-[320px] shadow-md"
    style={{
      border: "1px solid rgba(0,0,0,0.05)",
    }}
  >
    <span
      className="flex items-center justify-center w-10 h-10 rounded-full shadow-sm"
      style={{
        background: "#FFFFFF01",
        border: "1px solid rgba(181,181,255,0.3)",
      }}
    >
      <img src={icon} className="w-5 h-5" alt="" />
    </span>
    <div className="flex flex-col gap-1">
      <p className="text-sm font-semibold text-gray-900">{title}</p>
      <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const Insight = () => {
  return (
    <div className="w-full my-10 min-h-[50vh] max-w-3xl mx-auto flex flex-col justify-center items-center">
      <motion.div
        className="flex flex-col justify-center items-center my-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.div variants={fadeUp} custom={0}>
          <SectionBadge label="Edge" />
        </motion.div>

        <motion.h1
          className="text-2xl text-center mt-2"
          variants={fadeUp}
          custom={1}
        >
          Insight into your project
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
          Preview
        </motion.span>

        <p className="text-gray-700 my-6 text-center">
          Within 72 hrs of working on your product, have an insight into your
          project without writing any line of code
        </p>

        <div className="my-6">
          <Button />
        </div>
      </motion.div>

      <div className="hidden lg:flex items-center justify-between gap-6 w-full max-w-5xl">
        <div className="relative flex flex-col gap-6">
          {leftCards.map((card, i) => (
            <FeatureCard
              key={card.id}
              icon={card.icon}
              title={card.title}
              description={card.description}
              index={i}
              align="left"
            />
          ))}

          <div
            className="absolute bottom-0 left-0 pointer-events-none rounded-full"
            style={{
              width: "300px",
              height: "100%",

              background: "#FFC46A42",
              filter: "blur(60px)",
            }}
          />
        </div>

        <motion.div
          className="flex-shrink-0 relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="absolute bottom-1 pointer-events-none rounded-full"
              style={{
                width: "300px",
                height: "300px",
                background: "#B5B5FF59",
                filter: "blur(50px)",
              }}
            />
            <img
              src={PhoneMockup}
              alt="App preview"
              className="relative z-10 w-[250px] drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>

        <div className="relative flex flex-col gap-6">
          {rightCards.map((card, i) => (
            <FeatureCard
              key={card.id}
              icon={card.icon}
              title={card.title}
              description={card.description}
              index={i + 2}
              align="right"
            />
          ))}

          <div
            className="absolute bottom-1 pointer-events-none rounded-full"
            style={{
              width: "260px",
              height: "260px",
              background: "#8CD5FE3D",
              filter: "blur(50px)",
            }}
          />
        </div>
      </div>

      <div className="flex lg:hidden flex-col items-center gap-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.img
            src={PhoneMockup}
            alt="App preview"
            className="w-full max-w-[250px] drop-shadow-2xl"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
        <div className="grid grid-cols-1 gap-4 w-full mx-auto place-items-center">
          {[...leftCards, ...rightCards].map((card, i) => (
            <FeatureCard
              key={card.id}
              icon={card.icon}
              title={card.title}
              description={card.description}
              index={i}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Insight;
