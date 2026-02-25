import { Eye, Heart, RefreshCcw, Users, Cpu } from "lucide-react";

const pillars = [
  {
    icon: Eye,
    title: "Transparent Terms",
    description: "Every fee, rate, and condition is clearly communicated before you commit.",
  },
  {
    icon: Heart,
    title: "Responsible Lending",
    description: "We assess affordability carefully to ensure credit works for you, not against you.",
  },
  {
    icon: RefreshCcw,
    title: "Structured Repayment",
    description: "Flexible plans designed around your income cycle and cash flow.",
  },
  {
    icon: Users,
    title: "Customer-First Approach",
    description: "Your success is our priority. We're here to support you throughout your journey.",
  },
  {
    icon: Cpu,
    title: "Technology-Enabled",
    description: "Modern systems ensure fast processing and seamless communication.",
  },
];

const WhyZykaSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container-tight relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            The <span className="text-gradient-gold">ZykaCredit</span> Difference
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Built on principles of trust, transparency, and genuine care for your financial wellbeing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className={`p-6 rounded-xl glass-card hover:border-primary/30 transition-all duration-300 ${
                index === 4 ? "lg:col-span-1 lg:col-start-2" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <pillar.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyZykaSection;
