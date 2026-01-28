import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import LoanCalculator from "@/components/home/LoanCalculator";
import WhatWeDoSection from "@/components/home/WhatWeDoSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import WhyZykaSection from "@/components/home/WhyZykaSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <LoanCalculator />
        <WhatWeDoSection />
        <HowItWorksSection />
        <WhyZykaSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
