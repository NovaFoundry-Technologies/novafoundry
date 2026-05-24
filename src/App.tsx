import Seo from "./Seo";
import Hero from "./sections/Hero";
import {
  ClientReviews,
  ContactUs,
  ExpertServices,
  Feedback,
  Insight,
  OurVision,
  Portflio,
  ProjectMethod,
  ProjectStrategy,
} from "./sections/Features";
import Navbar from "./components/layout/Navbar";
import TrustedPartners from "./sections/Features/TrustedPartners";
import Footer from "./components/layout/Footer";

const SITE_URL = "https://novafoundry.org";

function App() {
  return (
    <>
      <div className="w-full overflow-x-clip">
        <Navbar />
        <Hero />

        <Seo
          title="Build Products Faster"
          description="NovaFoundry builds modern web experiences with performance, SEO, and scalability from day one."
          url={SITE_URL}
        />

        <TrustedPartners />

        <ProjectMethod />
        <Feedback />
        <ExpertServices />
        <Portflio />
        <ProjectStrategy />

        <ClientReviews />
        <OurVision />
        <Insight />
        <ContactUs />
        <Footer />
      </div>
    </>
  );
}

export default App;
