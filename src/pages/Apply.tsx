import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Apply = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [creditType, setCreditType] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you within 2-3 business days.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="section-padding">
          <div className="container-tight">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Info Side */}
              <div className="lg:col-span-2">
                <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
                  Get Started
                </span>
                <h1 className="font-serif text-4xl font-bold text-foreground mb-6">
                  Start Your <span className="text-gradient-gold">Credit Journey</span>
                </h1>
                <p className="text-muted-foreground mb-8">
                  Complete this form to begin your application. Our team will review your information and contact you within 2-3 business days.
                </p>

                <div className="space-y-4">
                  {[
                    "Quick online application",
                    "No hidden fees or surprises",
                    "Decision within days",
                    "Dedicated support team",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Side */}
              <div className="lg:col-span-3">
                <div className="p-8 rounded-2xl bg-card border border-border/50">
                  <h2 className="text-2xl font-semibold text-foreground mb-6">Application Form</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">First Name *</label>
                        <Input placeholder="John" required className="bg-secondary border-border/50" />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Last Name *</label>
                        <Input placeholder="Doe" required className="bg-secondary border-border/50" />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Email *</label>
                        <Input type="email" placeholder="john@example.com" required className="bg-secondary border-border/50" />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground mb-2 block">Phone *</label>
                        <Input type="tel" placeholder="08012345678" required className="bg-secondary border-border/50" />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Type of Credit *</label>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {["Personal Credit", "Business Credit", "Growth Financing"].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setCreditType(type)}
                            className={`p-4 rounded-xl border text-sm font-medium transition-all ${
                              creditType === type
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-border/50 bg-secondary text-muted-foreground hover:border-primary/30"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Estimated Amount Needed</label>
                      <Input type="text" placeholder="e.g., ₦500,000 - ₦1,000,000" className="bg-secondary border-border/50" />
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Tell us about your needs</label>
                      <Textarea
                        placeholder="Briefly describe what you need the credit for..."
                        rows={4}
                        className="bg-secondary border-border/50 resize-none"
                      />
                    </div>

                    <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      By submitting, you agree to our terms and privacy policy.
                    </p>
                  </form>
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

export default Apply;
