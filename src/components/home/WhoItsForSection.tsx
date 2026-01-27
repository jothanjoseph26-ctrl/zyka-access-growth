import { User, Building2, Briefcase } from "lucide-react";

const audiences = [
  {
    icon: User,
    title: "Individuals",
    description: "Access personal credit for emergencies, education, or life's important moments.",
  },
  {
    icon: Building2,
    title: "Small & Growing Businesses",
    description: "Fuel your expansion with capital designed for business operations and growth.",
  },
  {
    icon: Briefcase,
    title: "Professionals & Entrepreneurs",
    description: "Bridge cash flow gaps and seize opportunities with flexible financing.",
  },
];

const WhoItsForSection = () => {
  return (
    <section className="section-padding">
      <div className="container-tight">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
            Who We Serve
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Credit for <span className="text-gradient-gold">Builders</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you're an individual with aspirations or a business with ambitions, we're here to support your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <div
              key={audience.title}
              className="relative p-8 rounded-2xl bg-secondary/50 border border-border/30 overflow-hidden group hover:border-accent/30 transition-all duration-300"
            >
              {/* Accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <audience.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {audience.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoItsForSection;
