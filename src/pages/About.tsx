import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TrendingUp, Target, Users, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="section-padding">
          <div className="container-tight">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                About ZykaCredit
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
                Bridging Ambition <span className="text-gradient-gold">and Access</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                ZykaCredit was built to bridge the gap between ambition and access by offering credit solutions that are fair, structured, and growth-focused. We believe that access to capital should not be a barrier to progress.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding bg-card">
          <div className="container-tight">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="p-8 rounded-2xl bg-gradient-card border border-border/50">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To provide accessible, transparent, and responsible credit solutions that empower individuals and businesses to achieve their financial goals and build sustainable futures.
                </p>
              </div>
              <div className="p-8 rounded-2xl bg-gradient-card border border-border/50">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <TrendingUp className="w-7 h-7 text-accent" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To become the most trusted credit partner for ambitious individuals and growing businesses, known for our integrity, transparency, and genuine commitment to customer success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding">
          <div className="container-tight">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our <span className="text-gradient-primary">Values</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Integrity", desc: "We do what we say and say what we mean." },
                { title: "Transparency", desc: "No hidden fees, no surprises. Ever." },
                { title: "Responsibility", desc: "We lend responsibly, always." },
                { title: "Growth", desc: "Your success is our success." },
              ].map((value) => (
                <div key={value.title} className="text-center p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.desc}</p>
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

export default About;
