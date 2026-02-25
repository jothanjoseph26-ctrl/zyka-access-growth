import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import ceoImage from "@/assets/ceo.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background with CEO Portrait */}
      <div className="absolute inset-0 z-0">
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 overflow-hidden">
          <img
            src={ceoImage}
            alt="ZykaCredit CEO"
            className="w-full h-full object-cover object-top opacity-90"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/70 to-transparent lg:from-background lg:via-background/90 lg:to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding max-w-7xl">
        <div className="max-w-2xl">
          <div className="animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              Zyka Credit Limited
            </span>
          </div>

          <h1 className="animate-fade-up opacity-0 delay-100 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4" style={{ animationFillMode: 'forwards' }}>
            <span className="text-gradient-gold">Efficient. Reliable.</span>
            <br />
            Easily Accessible.
          </h1>

          <p className="animate-fade-up opacity-0 delay-200 text-lg md:text-xl text-muted-foreground leading-relaxed mb-8" style={{ animationFillMode: 'forwards' }}>
            Smart credit solutions for individuals and businesses. Access capital when you need it most with transparent terms and flexible repayment options.
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
