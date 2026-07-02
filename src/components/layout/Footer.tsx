import { memo } from "react";
import { ArrowUpRight } from "lucide-react";
import starDesign from "../../assets/starDesign.svg";
import NovaFoundry from "../../assets/NovaFoundry.svg";

const contentWidth =
  "mx-auto w-[min(1120px,calc(100%-48px))] max-[900px]:w-[min(calc(100%-32px),720px)]";

const linkColumns = [
  [
    ["Home", "#hero"],
    [ "About", "#about"],
    ["Service", "#work"],

  [ "Portfolio",  "#work"],
  [ "Internship", "#internship"],
  [ "Contact", "#contact"],
  ],
  [
    ["Portfolio one", "#work"],
    ["Portfolio two", "#work"],
    ["Portfolio three", "#work"],
    ["Internship", "#internship"],
  ],
  [
    ["Privacy", "#"],
    ["Style guide", "#"],
    ["Changelog", "#"],
    ["404", "#"],
  ],
];

function Footer() {
  return (
    <footer
      className="w-full bg-[#050505] px-[35px] pt-[110px] pb-[50px] text-[#f5f5f5] max-[900px]:px-0 max-[600px]:pt-[70px] max-[600px]:pb-[150px]"
      id="contact"
    >
      <div
        className={`${contentWidth} grid grid-cols-[1.15fr_.8fr_1.6fr] gap-[70px] pb-[70px] max-[900px]:grid-cols-2 max-[600px]:grid-cols-1`}
      >
        <div className="flex flex-col items-start">
          <img
            className="mb-[25px] h-auto w-[180px] brightness-0 invert"
            src={NovaFoundry}
            alt="NovaFoundry"
          />
          <small className="mt-[17px] text-[8px] text-[#777] uppercase">
            Mail:
          </small>
          <a
            className="mt-[5px] text-xs"
            href="mailto:contact@novafoundry.org"
          >
            contact@novafoundry.org
          </a>
          <small className="mt-[17px] text-[8px] text-[#777] uppercase">
            Call:
          </small>
          <a className="mt-[5px] text-xs" href="tel:+447405864013">
            +44 7405 864013
          </a>
        </div>

        <div className="flex flex-col items-start gap-[13px]">
          {["Dribbble", "Instagram", "LinkedIn"].map((social) => (
            <a
              className="flex items-center gap-2 border-b border-[#888] text-[17px]"
              href="#"
              key={social}
            >
              {social}
              <ArrowUpRight size={15} />
            </a>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-[35px] max-[900px]:col-span-2 max-[600px]:col-auto max-[600px]:gap-[15px]">
          {linkColumns.map((column, index) => (
            <div
              className="flex flex-col gap-4 text-[10px] text-[#777]"
              key={index}
            >
              {column.map(([label, href]) => (
                <a className="hover:text-white" href={href} key={label}>
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div
        className={`${contentWidth} flex flex-col justify-between border-t border-[#282828] py-[35px] text-[8px] text-[#777] max-[600px]:flex-col max-[600px]:gap-2.5`}
      >
        <p>Designed by NovaFoundry Agency. Powered by NovaFoundry.</p>
        <p>● Bedfordshire, United Kingdom</p>
      </div>

      <div
        className={`${contentWidth} grid grid-cols-[auto_1fr] items-center gap-[70px] max-[900px]:gap-[30px] max-[600px]:grid-cols-[50px_1fr] max-[600px]:gap-5 max-[600px]:pt-[45px]`}
      >
        <img
          className="w-[115px] max-[600px]:w-[50px]"
          src={starDesign}
          alt=""
        />
        <strong className="justify-self-end text-[clamp(46px,9vw,80px)] tracking-[-.07em] max-[600px]:text-[34px]">
          Novafoundry
        </strong>
      </div>
    </footer>
  );
}

export default memo(Footer);
