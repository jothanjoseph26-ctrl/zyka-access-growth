import { Wallet, RefreshCw, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Access to Credit",
    description: "Unlock capital when you need it most. Our streamlined process ensures quick access to funds for your personal or business needs.",
  },
  {
    icon: RefreshCw,
    title: "Structured Repayment",
    description: "Flexible repayment plans designed around your cash flow. We work with you to create terms that make sense for your situation.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Process",
    description: "No hidden fees, no surprises. Every term is clearly explained upfront so you can make informed financial decisions.",
  },
];

const WhatWeDoSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-tight">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            What We Do
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            Credit Solutions <span className="text-gradient-primary">Built Right</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            ZykaCredit provides structured credit solutions designed to help individuals and businesses access capital responsibly, transparently, and efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-8 rounded-2xl bg-gradient-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-glow"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
