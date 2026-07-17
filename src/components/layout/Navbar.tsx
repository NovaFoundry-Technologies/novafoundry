import { memo, useState } from "react";
import type { MouseEvent } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import logo from "../../assets/novahero.png";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Service", href: "#work" },
  { label: "Portfolio", href: "#work" },
  { label: "Internship", href: "/internship" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) {
      setMenuOpen(false);
      return;
    }

    const target = document.querySelector(href);
    if (!target) {
      event.preventDefault();
      window.location.assign(`/${href}`);
      return;
    }

    event.preventDefault();
    setMenuOpen(false);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="relative z-5 flex w-full items-center justify-between border-b border-black/8 px-[52px] py-2 max-[00px]:px-[18px]">
      <a
        href="/"
        aria-label="NovaFoundry home"
      >
        <img
          className="block w-[132px] max-[600px]:w-[110px]"
          src={logo}
          alt="NovaFoundry"
        />
      </a>

      <nav
        aria-label="Primary navigation"
        className={`${menuOpen ? "max-[900px]:flex" : "max-[900px]:hidden"} flex gap-[20px] text-[13px] max-[900px]:absolute max-[900px]:top-[68px] max-[900px]:right-0 max-[900px]:left-0 max-[900px]:flex-col max-[900px]:gap-0 max-[900px]:rounded-lg max-[900px]:bg-[#f6f6f4] max-[900px]:p-3 max-[900px]:shadow-[0_12px_40px_rgba(0,0,0,.12)]`}
      >
        {navItems.map(({ label, href }) => (
          <a
            className="transition-opacity hover:opacity-50 max-[900px]:p-[13px]"
            href={href}
            key={label}
            onClick={(event) => handleNavigation(event, href)}
          >
            {label}
          </a>
        ))}
      </nav>

      <a
        className="inline-flex items-center justify-center gap-2 rounded-[5px] bg-[#050505] px-3.5 py-2.5 text-xs font-bold text-white max-[900px]:hidden"
        href="/internship"
      >
        Internship Program <ArrowUpRight size={14} />
      </a>

      <button
        type="button"
        className="hidden place-items-center border-0 bg-transparent max-[900px]:grid"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  );
}

export default memo(Navbar);
