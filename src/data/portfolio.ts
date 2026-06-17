import examprep from "../assets/examprep.png";
import mediprep from "../assets/mediprep.png";
import tfalcon from "../assets/tfalcon.jpeg";
import foodmartex from "../assets/foodmartex.png";


export interface PortfolioItem {
  id: number;
  title: string;
  year: string;
  category: string;
  image: string;
  link: string;
  width: number;
  height: number;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "ExamPreps-360",
    year: "2024 - 2025",
    category: "EdTech",
    image: examprep,
    link: "https://exampreps360.online",
    width: 389,
    height: 490,
  },
  {
    id: 2,
    title: "MediPrep Pro",
    year: "2024 - 2025",
    category: "HealthTech",
    image: mediprep,
    link: "https://mediprep.online",
    width: 389,
    height: 490,
  },
  {
    id: 3,
    title: "TFalcon",
    year: "2023",
    category: "Logistics Platform",
    image: tfalcon,
    link: "https://tfalcon.online",
    width: 389,
    height: 490,
  },
  {
    id: 4,
    title: "Foodmartex",
    year: "2025 - 2026",
    category: "Food Delivery and Logistics Platform",
    image: foodmartex,
    link: "https://foodmartex.online",
    width: 389,
    height: 490,
  },
];
