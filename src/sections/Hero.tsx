import Wave from "../components/shapes/Wave";
import User from "../assets/user.png";
import HeroBanner from "../assets/HeroBanner.png";

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
            flex flex-col items-center gap-4

            px-4 py-2
          "
        >
          <div className="flex items-center gap-4">
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

          <h1 className="text-4xl leading-relaxed text-center ">
            Premium digital products. Delivered with speed.
          </h1>
          <p className="text-sm text-center">
            Web design and Mobile app design agency, we deliver digital product
            with speed and accuracy.
          </p>

          <div className="w-full max-w-2xl h-xl mx-auto border">
            <img
              src={HeroBanner}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
