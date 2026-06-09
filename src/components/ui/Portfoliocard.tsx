import { memo } from "react";
import type { PortfolioItem } from "../../data/portfolio";

interface PortfolioCardProps {
  item: PortfolioItem;
  heightClassName?: string;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  item,
  heightClassName = "h-80",
}) => {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full flex flex-col gap-4 cursor-pointer group"
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
    </a>
  );
};

export default memo(PortfolioCard);
