import Wave from "../components/shapes/Wave";
import User from "../assets/user.png";
import HeroBanner from "../assets/HeroBanner.png";
import OrganicImageMask from "../components/shapes/OrganicMask";
import Button from "../components/ui/Button";

const Hero = () => {
  return (
    <section className="relative min-h-screen">
      <Wave />

      <div
        className="
          absolute top-32 left-1/2 -translate-x-1/2
          z-10
          w-full max-w-6xl
          px-6 md:px-10

          flex justify-center
        "
      >
        <div
          className="
            w-fit
            flex flex-col items-center gap-10

            px-4 py-2
          "
        >
          <div className="flex items-center gap-4 mt-8">
            <div className="flex items-center">
              {[1, 2, 3].map((i) => (
                <img
                  key={i}
                  src={User}
                  alt="user"
                  className="
                  h-10 w-10 rounded-full
                  border-2 border-white
                  object-cover

                  -ml-3 first:ml-0
                "
                />
              ))}
            </div>

            <p className="text-md font-medium text-black">
              1000+ satisfied clients
            </p>
          </div>
          <div className="w-full">
            <div className="text-center text-5xl font-semibold leading-[1.2]">
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

            <p className="mt-8 text-center text-sm">
              Web design and Mobile app design agency, we deliver digital
              product with speed and accuracy.
            </p>

            <div className="relative mx-auto mt-4 w-full max-w-2xl">
              <div className="absolute -top-2 right-0 z-10">
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

export default Hero;
