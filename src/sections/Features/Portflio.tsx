import React from "react";
import SectionBadge from "../../components/ui/SectionBadge";
import { portfolioItems } from "../../data/portfolio";
import PortfolioCard from "../../components/ui/Portfoliocard";

const Portfolio = () => {
  return (
    <div className="w-full max-w-6xl mx-auto mt-10 mb-6">
      <SectionBadge label="Case studies" />
      <h1 className="text-2xl my-2">The word speaks loud</h1>

      <div className="overflow-x-auto scrollbar-hide mt-6">
        <div className="grid grid-cols-4 gap-6">
          {portfolioItems.slice(0, 4).map((item) => (
            <PortfolioCard
              key={item.id}
              item={item}
              onClick={(item) => console.log(item.title)}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col">
        <div className="border border-orange-500 rounded-xl h-[60vh] mt-10 w-full"></div>
        <p className="text-black font-medium my-2">User Velocity</p>
        <p className="text-sm text-gray-500">2026 UI/UX</p>
      </div>
    </div>
  );
};

export default Portfolio;
