import { lazy, Suspense } from "react";
import Seo from "./Seo";
import Hero from "./sections/Hero";
import { ProjectMethod } from "./sections/Features";
import Navbar from "./components/layout/Navbar";
import TrustedPartners from "./sections/Features/TrustedPartners";
import Footer from "./components/layout/Footer";

const SITE_URL = "https://novafoundry.org";

const Feedback = lazy(() => import("./sections/Features/Feedback"));
const ExpertServices = lazy(() => import("./sections/Features/ExpertServices"));
const Portflio = lazy(() => import("./sections/Features/Portflio"));
const ProjectStrategy = lazy(
  () => import("./sections/Features/ProjectStrategy"),
);
const ClientReviews = lazy(() => import("./sections/Features/ClientReviews"));
const OurVision = lazy(() => import("./sections/Features/OurVision"));
const Insight = lazy(() => import("./sections/Features/Insight"));
const ContactUs = lazy(() => import("./sections/Features/ContactUs"));

function App() {
  return (
    <>
      <div className="w-full max-sm:overflow-x-clip">
        <Navbar />
        <Hero />

        <Seo
          title="Build Products Faster"
          description="NovaFoundry builds modern web experiences with performance, SEO, and scalability from day one."
          url={SITE_URL}
        />

        <TrustedPartners />

        <ProjectMethod />

        <Suspense fallback={null}>
          <Feedback />
          <ExpertServices />
          <Portflio />
          <ProjectStrategy />
          <ClientReviews />
          <OurVision />
          <Insight />
          <ContactUs />
        </Suspense>

        <Footer />
      </div>
    </>
  );
}

export default App;
