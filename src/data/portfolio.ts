export interface PortfolioItem {
  id: number;
  title: string;
  year: number;
  category: string;
  image: string;
  width: number;
  height: number;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Core Essence",
    year: 2026,
    category: "Branding",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800",
    width: 389,
    height: 490,
  },
  {
    id: 2,
    title: "Urban Pulse",
    year: 2025,
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
    width: 389,
    height: 490,
  },
  {
    id: 3,
    title: "Bloom Studio",
    year: 2025,
    category: "Product Design",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    width: 389,
    height: 490,
  },
  {
    id: 4,
    title: "Noir Identity",
    year: 2024,
    category: "Branding",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800",
    width: 389,
    height: 490,
  },
  {
    id: 5,
    title: "Flux Interface",
    year: 2024,
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800",
    width: 389,
    height: 490,
  },
  {
    id: 6,
    title: "Terra Collective",
    year: 2026,
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1504703395950-b89145a5425b?w=800",
    width: 389,
    height: 490,
  },
  {
    id: 7,
    title: "Solace Brand",
    year: 2025,
    category: "Brand Identity",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800",
    width: 389,
    height: 490,
  },
  {
    id: 8,
    title: "Kinetic Motion",
    year: 2024,
    category: "Product Design",
    image: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=800",
    width: 389,
    height: 490,
  },
];
