import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Building2, TrendingUp, ArrowRight, CheckCircle } from "lucide-react";

const solutions = [
  {
    icon: User,
    title: "Personal Credit",
    subtitle: "For Individuals",
    description: "Access funds for personal needs—emergencies, education, home improvements, or life's important moments.",
    features: [
      "Quick application process",
      "Flexible repayment terms",
      "Competitive rates",
      "No collateral required for select products",
    ],
  },
  {
    icon: Building2,
    title: "Business Credit",
    subtitle: "For SMEs & Enterprises",
    description: "Fuel your business growth with capital designed for operations, inventory, equipment, and expansion.",
    features: [
      "Working capital solutions",
      "Equipment financing",
      "Inventory funding",
      "Expansion capital",
    ],
  },
  {
    icon: TrendingUp,
    title: "Growth Financing",
    subtitle: "For Scaling Businesses",
    description: "Strategic capital for businesses ready to scale. Bridge cash flow gaps and seize growth opportunities.",
    features: [
      "Larger credit facilities",
      "Longer repayment periods",
      "Structured disbursement",
      "Dedicated account management",
    ],
  },
];

const Solutions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="section-padding">
          <div className="container-tight">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                Credit Solutions
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
                Solutions Designed for <span className="text-gradient-gold">Your Growth</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Whether you're an individual or a business, we have credit solutions tailored to your unique needs.
              </p>
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section className="section-padding bg-card">
          <div className="container-tight">
            <div className="space-y-16">
              {solutions.map((solution, index) => (
                <div
                  key={solution.title}
                  className={`flex flex-col lg:flex-row gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <solution.icon className="w-6 h-6 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{solution.subtitle}</span>
                    </div>
                    <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
                      {solution.title}
                    </h2>
                    <p className="text-muted-foreground text-lg mb-6">
                      {solution.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {solution.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-muted-foreground">
                          <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button variant="cta" asChild>
                      <Link to="/apply">
                        Apply Now <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </div>

                  {/* Visual */}
                  <div className="flex-1">
                    <div className="aspect-square max-w-md mx-auto rounded-2xl bg-gradient-card border border-border/50 p-8 flex items-center justify-center">
                      <solution.icon className="w-32 h-32 text-primary/20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Solutions;
