import { Link } from "react-router-dom";
import { 
  Building2, 
  User, 
  Wallet, 
  Leaf, 
  Users, 
  GraduationCap,
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Building2,
    title: "SME Loans",
    description: "Capital solutions designed for small and medium enterprises to fuel operations and expansion.",
  },
  {
    icon: User,
    title: "Personal Loan",
    description: "Access funds for personal needs—emergencies, home improvements, or life's important moments.",
  },
  {
    icon: Wallet,
    title: "Salary Loans",
    description: "Quick credit against your salary for immediate financial needs with convenient repayment.",
  },
  {
    icon: Leaf,
    title: "Agricultural Loan",
    description: "Support for farmers and agribusinesses to invest in equipment, seeds, and farm expansion.",
  },
  {
    icon: Users,
    title: "Group Loans",
    description: "Collective lending solutions for cooperatives and community groups with shared responsibility.",
  },
  {
    icon: GraduationCap,
    title: "Educational Loan",
    description: "Invest in education with flexible loans for tuition, training, and skill development programs.",
  },
];

const ServicesSection = () => {
  return (
    <section className="section-padding">
      <div className="container-tight">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Loan Solutions <span className="text-gradient-gold">For Everyone</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We offer a comprehensive range of credit products tailored to meet your specific financial needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group p-6 rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-glow"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <Link 
                to="/solutions" 
                className="inline-flex items-center text-primary text-sm font-medium hover:gap-2 transition-all"
              >
                Learn more <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="cta" size="lg" asChild>
            <Link to="/apply">
              Apply for a Loan <ArrowRight className="w-5 h-5 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
