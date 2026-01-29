import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Building2, TrendingUp, Briefcase, GraduationCap, Users, ArrowRight, CheckCircle, Wheat } from "lucide-react";
import teamGroup from "@/assets/team-group.jpg";
import teamZyka from "@/assets/team-zyka.jpg";

const solutions = [
  {
    icon: Briefcase,
    title: "SME Loans",
    subtitle: "For Small & Medium Enterprises",
    description: "Fuel your business growth with capital designed for operations, inventory, equipment, and expansion.",
    features: [
      "Working capital solutions",
      "Equipment financing",
      "Inventory funding",
      "Expansion capital",
    ],
  },
  {
    icon: User,
    title: "Personal Loans",
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
    title: "Salary Loans",
    subtitle: "For Employed Individuals",
    description: "Get quick access to funds based on your salary. Perfect for covering unexpected expenses before payday.",
    features: [
      "Fast approval process",
      "Repayment from salary",
      "Minimal documentation",
      "Competitive interest rates",
    ],
  },
  {
    icon: Wheat,
    title: "Agricultural Loans",
    subtitle: "For Farmers & Agribusiness",
    description: "Supporting agricultural ventures with capital for seeds, equipment, livestock, and farm expansion.",
    features: [
      "Seasonal repayment options",
      "Farm equipment financing",
      "Livestock funding",
      "Crop production support",
    ],
  },
  {
    icon: Users,
    title: "Group Loans",
    subtitle: "For Cooperative Groups",
    description: "Collective credit solutions for groups, cooperatives, and associations looking to grow together.",
    features: [
      "Shared responsibility",
      "Lower interest rates",
      "Group accountability",
      "Community building",
    ],
  },
  {
    icon: GraduationCap,
    title: "Educational Loans",
    subtitle: "For Students & Parents",
    description: "Invest in education with loans designed to cover tuition, books, and other academic expenses.",
    features: [
      "Covers all educational levels",
      "Flexible repayment after graduation",
      "Competitive rates",
      "Quick disbursement",
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
                Whether you're an individual, business, or group, we have credit solutions tailored to your unique needs.
              </p>
            </div>
          </div>
        </section>

        {/* Team Image Banner */}
        <section className="section-padding !py-8">
          <div className="container-tight">
            <div className="relative rounded-2xl overflow-hidden h-64 md:h-80">
              <img
                src={teamGroup}
                alt="ZykaCredit Team"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent flex items-center">
                <div className="p-8 md:p-12 max-w-lg">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
                    We're Here to Help You Grow
                  </h2>
                  <p className="text-muted-foreground">
                    Our dedicated team is committed to providing the best credit solutions for your needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="section-padding bg-card">
          <div className="container-tight">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution) => (
                <div
                  key={solution.title}
                  className="p-8 rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <solution.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">{solution.subtitle}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                    {solution.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {solution.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {solution.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="cta" size="sm" asChild className="w-full">
                    <Link to="/apply">
                      Apply Now <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Team Image */}
        <section className="section-padding">
          <div className="container-tight">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={teamZyka}
                alt="ZykaCredit Team Together"
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent flex items-end">
                <div className="p-8 md:p-12 text-center w-full">
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Ready to Get Started?
                  </h2>
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/apply">
                      Apply for Credit Today <ArrowRight className="w-5 h-5 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Solutions;
