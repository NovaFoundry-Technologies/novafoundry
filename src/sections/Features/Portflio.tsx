import { AnimatePresence, motion } from "framer-motion";
import { memo, useEffect, useState } from "react";
import SectionBadge from "../../components/ui/SectionBadge";
import { portfolioItems } from "../../data/portfolio";
import PortfolioCard from "../../components/ui/Portfoliocard";
import PortfolioCarousel from "../../components/animations/PortfolioCarousel";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Button from "../../components/ui/Button";

const Portfolio = () => {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const showPreviousFeaturedItem = () => {
    setFeaturedIndex(
      (currentIndex) =>
        (currentIndex - 1 + portfolioItems.length) % portfolioItems.length,
    );
  };
  const showNextFeaturedItem = () => {
    setFeaturedIndex(
      (currentIndex) => (currentIndex + 1) % portfolioItems.length,
    );
  };

  useEffect(() => {
    if (!portfolioItems.length) return;

    const intervalId = setInterval(() => {
      setFeaturedIndex(
        (currentIndex) => (currentIndex + 1) % portfolioItems.length,
      );
    }, 3600);

    return () => clearInterval(intervalId);
  }, []);

  if (!portfolioItems.length) return null;
  const featuredItem = portfolioItems[featuredIndex];

  return (
    <div
      id="case-studies"
      className="mx-auto mt-14 mb-6 w-full max-w-6xl scroll-mt-24 px-4 sm:mt-10 sm:px-0"
    >
      <SectionBadge label="Case studies" />
      <h1 className="my-2 text-center font-[Syne] text-2xl sm:text-left sm:text-3xl">
        <span className="bg-gradient-to-r from-[#252633] via-[#2d2f3d] to-[#343646] bg-clip-text text-transparent">
          The work speaks
        </span>{" "}
        <span className="bg-gradient-to-r from-[#6250c9] via-[#7b5be0] to-[#946df4] bg-clip-text text-transparent">
          loud
        </span>
      </h1>

      <div className="mt-6 overflow-hidden">
        <PortfolioCarousel
          className="grid grid-flow-col auto-cols-[55%] items-start gap-4 sm:grid-flow-row sm:grid-cols-4 sm:auto-cols-auto sm:gap-6"
          items={portfolioItems}
          itemKey={(item) => item.id}
            renderItem={(item, _index, isShortPosition) => (
              <PortfolioCard
                item={item}
                heightClassName={
                  isShortPosition
                    ? "h-[14rem] sm:h-[16rem]"
                    : "h-[17rem] sm:h-[22rem]"
                }
              />
            )}
        />
      </div>

      <div className="flex w-full flex-col">
        <a
          href={featuredItem.link}
          target="_blank"
          rel="noopener noreferrer"
          className="relative mt-8 h-[20rem] w-full overflow-hidden rounded-xl border border-gray-200 sm:mt-10 sm:h-[50vh] block"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={featuredItem.id}
              src={featuredItem.image}
              alt={featuredItem.title}
              className="h-full w-full object-cover"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
        </a>
        <AnimatePresence mode="wait">
          <motion.div
            key={featuredItem.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <p className="my-2 font-[Helvetica] font-semibold text-black text-base sm:text-lg">
              {featuredItem.title}
            </p>
            <p className="text-sm text-gray-600 font-[inter] sm:text-base">
              {featuredItem.year} {featuredItem.category}
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-5 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous portfolio item"
            onClick={showPreviousFeaturedItem}
            className="inline-flex size-11 items-center justify-center rounded-full border-2 border-[#f4b83f] bg-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[#424242] hover:text-[#ffd16a] hover:border-[#424242] active:scale-95"
          >
            <FiArrowLeft aria-hidden="true" size={20} />
          </button>
          <button
            type="button"
            aria-label="Next portfolio item"
            onClick={showNextFeaturedItem}
            className="inline-flex size-11 items-center justify-center rounded-full border-2 border-[#f4b83f] bg-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-[#424242] hover:text-[#ffd16a] hover:border-[#424242] active:scale-95"
          >
            <FiArrowRight aria-hidden="true" size={20} />
          </button>
        </div>
      </div>
        <div className="mt-12 flex items-center justify-center sm:mt-15">
            <Button />
        </div>
    </div>
  );
};

export default memo(Portfolio);
