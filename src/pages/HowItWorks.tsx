import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Search, CheckCircle, Banknote, ArrowRight, Clock, Shield, HeadphonesIcon } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Submit Your Application",
    description: "Fill out our simple online application form with your basic personal or business information. It only takes a few minutes.",
    details: ["Personal/Business details", "Credit amount needed", "Preferred repayment period"],
  },
  {
    number: "02",
    icon: Search,
    title: "Review & Verification",
    description: "Our team reviews your application and may request additional documentation to verify your information.",
    details: ["Valid ID verification", "Income/revenue verification", "Business documentation (if applicable)"],
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Approval Decision",
    description: "Receive your approval decision with clear terms, rates, and repayment schedule. No hidden surprises.",
    details: ["Transparent terms", "Clear repayment schedule", "All fees disclosed upfront"],
  },
  {
    number: "04",
    icon: Banknote,
    title: "Disbursement & Repayment",
    description: "Once approved, funds are disbursed to your account. Repayment begins according to your agreed schedule.",
    details: ["Quick fund transfer", "Flexible payment methods", "Ongoing support"],
  },
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="section-padding">
          <div className="container-tight">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                Simple Process
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
                Your Path to <span className="text-gradient-gold">Financial Access</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                We've designed our process to be straightforward and stress-free. Here's how it works.
              </p>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="section-padding bg-card">
          <div className="container-tight">
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={step.title} className="flex gap-8">
                  {/* Step Number */}
                  <div className="hidden md:flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
                      <span className="text-xl font-bold text-primary-foreground">{step.number}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-0.5 flex-1 bg-border mt-4" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="p-8 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-all">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center md:hidden">
                          <span className="font-bold text-primary">{step.number}</span>
                        </div>
                        <step.icon className="w-6 h-6 text-primary" />
                        <h2 className="text-xl font-semibold text-foreground">{step.title}</h2>
                      </div>
                      <p className="text-muted-foreground mb-6">{step.description}</p>
                      <div className="flex flex-wrap gap-3">
                        {step.details.map((detail) => (
                          <span
                            key={detail}
                            className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm"
                          >
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="section-padding">
          <div className="container-tight">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Clock, title: "Quick Processing", desc: "Get decisions within days, not weeks." },
                { icon: Shield, title: "Secure & Safe", desc: "Your information is protected with bank-level security." },
                { icon: HeadphonesIcon, title: "Dedicated Support", desc: "Our team is here to help at every step." },
              ].map((feature) => (
                <div key={feature.title} className="text-center p-8 rounded-2xl glass-card">
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <Button variant="hero" size="xl" asChild>
                <Link to="/apply">
                  Start Your Application
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
