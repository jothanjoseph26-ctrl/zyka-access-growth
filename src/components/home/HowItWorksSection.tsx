import { FileText, Search, CheckCircle, Banknote } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Apply",
    description: "Submit your application with basic information about yourself or your business.",
  },
  {
    number: "02",
    icon: Search,
    title: "Review & Verification",
    description: "Our team reviews your application and verifies the required documentation.",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Approval",
    description: "Receive your approval decision quickly with clear terms and conditions.",
  },
  {
    number: "04",
    icon: Banknote,
    title: "Disbursement",
    description: "Funds are disbursed to your account with a structured repayment plan.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="section-padding bg-card">
      <div className="container-tight">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
            How It <span className="text-gradient-primary">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our streamlined process is designed to get you the capital you need without unnecessary complexity.
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-glow">
                  {/* Step Number */}
                  <span className="absolute -top-3 left-6 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                    {step.number}
                  </span>
                  
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 mt-2">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
