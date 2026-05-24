import React, { memo } from "react";
import type { PortfolioItem } from "../../data/portfolio";

interface PortfolioCardProps {
  item: PortfolioItem;
  heightClassName?: string;
  onClick?: (item: PortfolioItem) => void;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  item,
  heightClassName = "h-80",
  onClick,
}) => {
  return (
    <div
      className="w-full flex flex-col gap-4 cursor-pointer group"
      onClick={() => onClick?.(item)}
    >
      <div className="overflow-hidden rounded-2xl">
        <img
          src={item.image}
          alt={item.title}
          className={`w-full ${heightClassName} object-cover transition-[height,transform] duration-300 ease-out group-hover:scale-105`}
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-black text-center font-medium font-[Helvetica]">{item.title}</p>
        <p className="text-sm text-gray-500 text-center font-[inter]">
          [ {item.year} ] &nbsp; {item.category}
        </p>
      </div>
    </div>
  );
};

export default memo(PortfolioCard);
