import LogoMarquee from "../../components/animations/marque";

const TrustedPartners = () => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="relative flex items-center justify-center">
        <hr className="absolute left-0 right-0 top-1/2 border-t border-[#17171733]" />
        <div className="relative rounded-full bg-[#F6F6F9] px-4 py-1.5">
          <h5 className="text-1x1 font-medium text-gray-600">
            Trusted Partners Worldwide for Success
          </h5>
        </div>
      </div>
      <LogoMarquee />
    </div>
  );
};

export default TrustedPartners;
