import LogoMarquee from "../../components/animations/marque";

const TrustedPartners = () => {
  return (
    <div className="mx-auto w-full max-w-7xl px-4">
      <div className="relative flex items-center justify-center">
        <hr className="absolute left-0 right-0 top-1/2 border-t border-[#17171733]" />
        <div className="relative rounded-full bg-[#F6F6F9] px-3 py-1.5 sm:px-4">
          <h5 className="font-['Creato_Display'] text-[10px] font-medium text-gray-600 sm:text-xs">
            Trusted Partners Worldwide for Success
          </h5>
        </div>
      </div>
      <LogoMarquee />
    </div>
  );
};

export default TrustedPartners;
