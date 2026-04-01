import Navbar from "@/components/Navbar";

import HeroSection from "@/components/HeroSection";
import ChatDemo from "@/components/ChatDemo";
import HowItWorks from "@/components/HowItWorks";
import UseCases from "@/components/UseCases";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <ChatDemo />
    <HowItWorks />
    <UseCases />
    <Features />
    <Testimonials />
    <Pricing />
    <FinalCTA />
    <Footer />
  </div>
);

export default Index;
