import Seo from "./Seo";
import Hero from "./sections/Hero";
import {
  ClientReviews,
  ContactUs,
  ExpertServices,
  Feedback,
  Insight,
  Portflio,
  ProjectMethod,
  ProjectStrategy,
  Speech,
} from "./sections/Features";
import Navbar from "./components/layout/Navbar";
import TrustedPartners from "./sections/Features/TrustedPartners";

const SITE_URL = "https://novafoundry.org";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Hero />

        <Seo
          title="Build Products Faster"
          description="NovaFoundry builds modern web experiences with performance, SEO, and scalability from day one."
          url={SITE_URL}
        />

        <TrustedPartners />

        <ExpertServices />
        <ProjectStrategy />
        <ProjectMethod />
        <Portflio />
        <ClientReviews />
        <Feedback />
        <Insight />
        <Speech />
        <ContactUs />
      </div>
    </>
  );
}

export default App;
