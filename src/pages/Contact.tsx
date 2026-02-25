import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, Instagram, MapPin, Send, Building2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        <section className="section-padding">
          <div className="container-tight">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <div>
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                  Contact Us
                </span>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
                  Let's <span className="text-gradient-gold">Talk</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-10">
                  Have questions about our credit solutions? We're here to help. Reach out and our team will respond promptly.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border/50">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Office Address</p>
                      <p className="text-foreground font-medium">Suite 13, Purple Stone Plaza,<br />Apo Resettlement, Abuja, Nigeria.</p>
                    </div>
                  </div>

                  <a
                    href="mailto:zykascreditlimited@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-foreground font-medium">zykascreditlimited@gmail.com</p>
                    </div>
                  </a>

                  <a
                    href="tel:08187052728"
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="text-foreground font-medium">0818 705 2728</p>
                    </div>
                  </a>

                  <a
                    href="tel:09049371418"
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone (Alt)</p>
                      <p className="text-foreground font-medium">0904 937 1418</p>
                    </div>
                  </a>

                  <a
                    href="https://instagram.com/Zykacreditlimited"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Instagram className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Instagram</p>
                      <p className="text-foreground font-medium">@Zykacreditlimited</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="p-8 rounded-2xl bg-card border border-border/50">
                <h2 className="text-2xl font-semibold text-foreground mb-6">Send us a message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">First Name</label>
                      <Input placeholder="John" required className="bg-secondary border-border/50" />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Last Name</label>
                      <Input placeholder="Doe" required className="bg-secondary border-border/50" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                    <Input type="email" placeholder="john@example.com" required className="bg-secondary border-border/50" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Phone</label>
                    <Input type="tel" placeholder="08012345678" className="bg-secondary border-border/50" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Message</label>
                    <Textarea
                      placeholder="Tell us how we can help..."
                      rows={4}
                      required
                      className="bg-secondary border-border/50 resize-none"
                    />
                  </div>
                  <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="w-4 h-4 ml-1" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
