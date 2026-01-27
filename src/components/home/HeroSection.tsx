import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import heroBusiness from "@/assets/hero-business.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBusiness}
          alt="Business growth"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-tight section-padding">
        <div className="max-w-2xl">
          <div className="animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              Smart Credit Solutions
            </span>
          </div>

          <h1 className="animate-fade-up opacity-0 delay-100 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6" style={{ animationFillMode: 'forwards' }}>
            Access Capital.
            <br />
            <span className="text-gradient-gold">Build Futures.</span>
          </h1>

          <p className="animate-fade-up opacity-0 delay-200 text-lg md:text-xl text-muted-foreground leading-relaxed mb-8" style={{ animationFillMode: 'forwards' }}>
            We provide fast and flexible credit designed to support growth, expansion, and daily operations—helping your business move forward with confidence.
          </p>

          {/* Trust Points */}
          <div className="animate-fade-up opacity-0 delay-300 flex flex-wrap gap-4 mb-10" style={{ animationFillMode: 'forwards' }}>
            {["Transparent Terms", "Flexible Repayment", "Quick Approval"].map((point) => (
              <div key={point} className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-sm">{point}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="animate-fade-up opacity-0 delay-400 flex flex-wrap gap-4" style={{ animationFillMode: 'forwards' }}>
            <Button variant="hero" size="lg" asChild>
              <Link to="/apply">
                Apply for Credit
                <ArrowRight className="w-5 h-5 ml-1" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/how-it-works">
                How It Works
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
