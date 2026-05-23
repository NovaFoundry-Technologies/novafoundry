import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import SectionBadge from "../../components/ui/SectionBadge";
import { portfolioItems } from "../../data/portfolio";
import PortfolioCard from "../../components/ui/Portfoliocard";
import PortfolioCarousel from "../../components/animations/PortfolioCarousel";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Button from "../../components/ui/Button";

const Portfolio = () => {
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const featuredItem = portfolioItems[featuredIndex];
  const showPreviousFeaturedItem = () => {
    setFeaturedIndex(
      (currentIndex) =>
        (currentIndex - 1 + portfolioItems.length) % portfolioItems.length,
    );
  };
  const showNextFeaturedItem = () => {
    setFeaturedIndex((currentIndex) => (currentIndex + 1) % portfolioItems.length);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFeaturedIndex((currentIndex) => (currentIndex + 1) % portfolioItems.length);
    }, 3600);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 mb-6">
      <SectionBadge label="Case studies" />
      <h1 className="my-2 font-[Syne] text-2xl">
        <span className="bg-gradient-to-r from-[#252633] via-[#2d2f3d] to-[#343646] bg-clip-text text-transparent">
          The work speaks
        </span>{" "}
        <span className="bg-gradient-to-r from-[#6250c9] via-[#7b5be0] to-[#946df4] bg-clip-text text-transparent">
          loud
        </span>
      </h1>

      <div className="mt-6 overflow-hidden">
        <PortfolioCarousel
          className="grid grid-cols-4 items-start gap-6"
          items={portfolioItems}
          itemKey={(item) => item.id}
          renderItem={(item, _index, isShortPosition) => (
            <PortfolioCard
              item={item}
              heightClassName={isShortPosition ? "h-[16rem]" : "h-[20rem]"}
              onClick={(item) => console.log(item.title)}
            />
          )}
        />
      </div>

      <div className="flex w-full flex-col">
        <div className="relative mt-10 h-[60vh] w-full overflow-hidden rounded-xl border border-gray-200">
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
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={featuredItem.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <p className="my-2 font-medium text-black font-[Helvetica]">{featuredItem.title}</p>
            <p className="text-sm text-gray-500 font-[inter]">
              {featuredItem.year} {featuredItem.category}
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-5 flex items-center justify-center gap-4">
          <button
            type="button"
            aria-label="Previous portfolio item"
            onClick={showPreviousFeaturedItem}
            className="inline-flex size-10 items-center justify-center rounded-full border border-[#f4b83f] bg-[transparent] transition duration-200 hover:-translate-y-0.5 hover:bg-[#424242] hover:text-[#ffd16a] active:scale-95"
          >
            <FiArrowLeft aria-hidden="true" size={18} />
          </button>
          <button
            type="button"
            aria-label="Next portfolio item"
            onClick={showNextFeaturedItem}
            className="inline-flex size-10 items-center justify-center rounded-full border border-[#f4b83f] bg-[transparent]  transition duration-200 hover:-translate-y-0.5 hover:bg-[#424242] hover:text-[#ffd16a] active:scale-95"
          >
            <FiArrowRight aria-hidden="true" size={18} />
          </button>
        </div>
      </div>
        <div className="mt-15 flex items-center justify-center">
            <Button />
        </div>
    </div>
  );
};

export default Portfolio;
