import React, { useState } from "react";
import Logo from "../../assets/novahero.png";
import Button from "../ui/Button";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="
        fixed top-0 left-0 right-0
        w-full max-w-5xl mx-auto mt-6
        rounded-2xl bg-white
        border border-gray-100
        shadow-[0px_1px_2px_rgba(16,24,40,0.04),0px_6px_12px_rgba(16,24,40,0.06)]
        transition-all duration-200
        hover:-translate-y-0.5
        hover:shadow-[0px_2px_4px_rgba(16,24,40,0.05),0px_10px_18px_rgba(16,24,40,0.08)]
        overflow-hidden
        z-50
      "
    >
      {/* Main bar */}
      <div className="flex justify-between items-center py-2 px-4 mx-4">
        <img src={Logo} className="h-12" alt="nova logo" />

        {/* Desktop nav — hidden on mobile */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <li className="hover:text-gray-900 cursor-pointer transition-colors duration-150">
            Who We Are
          </li>
          <li className="hover:text-gray-900 cursor-pointer transition-colors duration-150">
            What We Do
          </li>
          <li className="hover:text-gray-900 cursor-pointer transition-colors duration-150">
            Case Studies
          </li>
          <li className="hover:text-gray-900 cursor-pointer transition-colors duration-150">
            Contact
          </li>
        </ul>

        {/* Desktop button — hidden on mobile */}
        <div className="hidden md:block">
          <Button />
        </div>

        {/* Hamburger — visible on mobile only */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col gap-[5px] p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-[22px] h-[2px] bg-gray-800 rounded transition-transform duration-250 origin-center ${
              menuOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-[22px] h-[2px] bg-gray-800 rounded transition-all duration-250 ${
              menuOpen ? "opacity-0 scale-x-0" : ""
            }`}
          />
          <span
            className={`block w-[22px] h-[2px] bg-gray-800 rounded transition-transform duration-250 origin-center ${
              menuOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden transition-all duration-200 origin-top overflow-hidden ${
          menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ background: "#FED08C" }}
      >
        <ul className="flex flex-col gap-1 px-4 pb-4 pt-2">
          {["Who We Are", "What We Do", "Case Studies", "Contact"].map(
            (item) => (
              <li
                key={item}
                className="text-sm font-medium text-gray-800 hover:bg-[#ffc96e] rounded-xl px-3 py-2.5 cursor-pointer transition-colors"
              >
                {item}
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
