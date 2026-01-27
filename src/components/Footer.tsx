import { Link } from "react-router-dom";
import { TrendingUp, Phone, Mail, MapPin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border/30">
      <div className="container-tight section-padding !py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                <TrendingUp className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Zyka<span className="text-gradient-primary">Credit</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Smart credit solutions designed for individuals and businesses who build. Access capital responsibly.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold">Quick Links</h4>
            <div className="flex flex-col gap-3">
              <Link to="/about" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/solutions" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                Credit Solutions
              </Link>
              <Link to="/how-it-works" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                How It Works
              </Link>
              <Link to="/apply" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                Apply Now
              </Link>
            </div>
          </div>

          {/* Solutions */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold">Solutions</h4>
            <div className="flex flex-col gap-3">
              <Link to="/solutions" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                Personal Credit
              </Link>
              <Link to="/solutions" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                Business Credit
              </Link>
              <Link to="/solutions" className="text-muted-foreground text-sm hover:text-primary transition-colors">
                Growth Financing
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-foreground font-semibold">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:08187052728" className="text-muted-foreground text-sm hover:text-primary transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4" />
                08187052728
              </a>
              <a href="tel:09049371418" className="text-muted-foreground text-sm hover:text-primary transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4" />
                09049371418
              </a>
              <a href="https://instagram.com/Zykacreditlimited" target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-sm hover:text-primary transition-colors flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                @Zykacreditlimited
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} ZykaCredit. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/contact" className="text-muted-foreground text-sm hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="text-muted-foreground text-sm hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
