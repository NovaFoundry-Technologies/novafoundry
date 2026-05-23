import { FiArrowRight } from "react-icons/fi";

export default function Button() {
  return (
    <div className="p-1 rounded-2xl bg-[#F3CB7A] inline-block">
      <div className="p-0.5 rounded-[14px] bg-white/90">
        <button
          className="
            flex items-center justify-between gap-5

            px-4 py-1.5 

            rounded-xl

            
            bg-gradient-to-b
            from-[#F8D38A]
            to-[#F3CB7A]

            shadow-[inset_0_4px_10px_rgba(255,255,255,0.35)]
          "
        >
          <span className="text-md font-normal text-black">
            Book A Free Call
          </span>
            <div className="bg-white  rounded-lg border border-white/40">
            <span
                className="
                p-1.5 rounded-lg translate-x-px translate-y-px

                flex items-center justify-center

                bg-gradient-to-b
                from-[#F6D28B]
                to-[#EFC677]

                shadow-[2px_3px_2px_rgba(0,0,0,0.16),inset_0_2px_6px_rgba(255,255,255,0.4)]
                "
            >
            <FiArrowRight className="text-white text-sm" />
          </span>
          </div>
        </button>
      </div>
    </div>
  );
}
