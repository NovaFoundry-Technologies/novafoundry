import { memo } from "react";
import Wave from "../components/shapes/Wave";
import User from "../assets/user.png";
import HeroBanner from "../assets/HeroBanner.png";
import OrganicImageMask from "../components/shapes/OrganicMask";
import Button from "../components/ui/Button";

const Hero = () => {
  return (
    <section id="hero" className="relative overflow-hidden">
      <Wave />

      <div
        className="
          relative
          z-10
          mx-auto
          w-full max-w-6xl
          px-4 pt-24 pb-10 sm:px-6 sm:pt-32 sm:pb-12 md:px-10

          flex justify-center
        "
      >
        <div
          className="
            w-full
            flex flex-col items-center gap-6 sm:gap-10

            px-2 py-2 sm:w-fit sm:px-4
          "
        >
          <div className="mt-4 flex items-center gap-3 sm:mt-8 sm:gap-4">
            <div className="flex items-center">
              {[1, 2, 3].map((i) => (
                <img
                  key={i}
                  src={User}
                  alt="user"
                  className="
                  h-8 w-8 rounded-full sm:h-10 sm:w-10
                  border-2 border-white
                  object-cover

                  -ml-3 first:ml-0
                "
                />
              ))}
            </div>

            <p className="text-xs font-medium text-gray-700 sm:text-lg">
              1000+ satisfied clients
            </p>
          </div>
          <div className="w-full">
            <div className="font-['Syne'] text-center text-[1.6rem] font-semibold leading-[1.12] sm:text-6xl sm:leading-[1.15]">
              <h1 className="bg-gradient-to-r from-[#171717] via-[#3f4b86] to-[#7c8dff] bg-clip-text text-transparent">
                Premium digital products.
              </h1>
              <h1>
                <span className="bg-gradient-to-r from-[#1b1b1f] via-[#465694] to-[#7890ff] bg-clip-text text-transparent">
                  Delivered with
                </span>{" "}
                <span className="bg-gradient-to-r from-[#ffd27c] via-[#ffc2cf] to-[#c7a6ff] bg-clip-text text-transparent">
                  speed.
                </span>
              </h1>
            </div>

            <p className="mx-auto mt-4 max-w-xs font-[Helvetica] text-center text-sm leading-relaxed text-gray-600 sm:mt-8 sm:mb-14 sm:max-w-none sm:text-base sm:text-gray-600">
              NovaFoundry crafts premium web & mobile products for startups and
              scale-ups — shipped with speed, precision, and purpose.
            </p>

            <div className="relative mx-auto mt-5 w-full max-w-[22rem] sm:mt-4 sm:max-w-3xl">
              <div className="absolute -top-3 right-0 z-10 origin-top-right scale-90 sm:scale-110 drop-shadow-lg">
                <Button />
              </div>

              <OrganicImageMask className="aspect-[980/875] w-full">
                <img
                  src={HeroBanner}
                  className="h-full w-full object-cover"
                  alt=""
                />
              </OrganicImageMask>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(Hero);
