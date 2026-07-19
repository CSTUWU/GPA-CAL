import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import TrustBar from "../components/TrustBar/TrustBar";
import FeatureCards from "../components/FeatureCards/FeatureCards";
import Steps from "../components/Steps/Steps";
import CTA from "../components/CTA/CTA";
import Footer from "../components/Footer/Footer";

export default function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustBar />
      <FeatureCards />
      <Steps />
      <CTA />
      <Footer />
    </>
  );
}