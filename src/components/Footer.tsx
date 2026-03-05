import { Link } from "react-router-dom";
import { Phone, Instagram, Globe, Facebook, MapPin, Mail } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";

const Footer = () => {
  return (
    <footer className="bg-[hsl(220,20%,12%)] border-t border-[hsl(220,15%,20%)]">
      <div className="container-tight section-padding !py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoWhite} alt="ZykaCredit" className="h-12 w-auto" />
            </Link>
            <p className="text-[hsl(220,10%,65%)] text-sm leading-relaxed">
              Efficient. Reliable. Easily Accessible. Smart credit solutions for individuals and businesses.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-[hsl(220,10%,90%)] font-semibold">Quick Links</h4>
            <div className="flex flex-col gap-3">
              <Link to="/about" className="text-[hsl(220,10%,65%)] text-sm hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/solutions" className="text-[hsl(220,10%,65%)] text-sm hover:text-primary transition-colors">
                Our Services
              </Link>
              <Link to="/how-it-works" className="text-[hsl(220,10%,65%)] text-sm hover:text-primary transition-colors">
                How It Works
              </Link>
              <Link to="/apply" className="text-[hsl(220,10%,65%)] text-sm hover:text-primary transition-colors">
                Apply Now
              </Link>
            </div>
          </div>

          {/* Loan Products */}
          <div className="space-y-4">
            <h4 className="text-[hsl(220,10%,90%)] font-semibold">Loan Products</h4>
            <div className="flex flex-col gap-3">
              {["SME Loans", "Personal Loan", "Salary Loans", "Agricultural Loan", "Group Loans", "Educational Loan"].map((item) => (
                <Link key={item} to="/solutions" className="text-[hsl(220,10%,65%)] text-sm hover:text-primary transition-colors">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-[hsl(220,10%,90%)] font-semibold">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <div className="text-[hsl(220,10%,65%)] text-sm flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Suite 13, Purple Stone Plaza,<br />Apo Resettlement,<br />Abuja, Nigeria.</span>
              </div>
              <a href="mailto:zykascreditlimited@gmail.com" className="text-[hsl(220,10%,65%)] text-sm hover:text-primary transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" />
                zykascreditlimited@gmail.com
              </a>
              <a href="tel:09049371418" className="text-[hsl(220,10%,65%)] text-sm hover:text-primary transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4" />
                0904 937 1418
              </a>
              <a href="tel:08187052728" className="text-[hsl(220,10%,65%)] text-sm hover:text-primary transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4" />
                0818 705 2728
              </a>
              <a href="https://instagram.com/zykascredit_limited" target="_blank" rel="noopener noreferrer" className="text-[hsl(220,10%,65%)] text-sm hover:text-primary transition-colors flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                @zykascredit_limited
              </a>
              <a href="https://facebook.com/ZykaCreditLimited" target="_blank" rel="noopener noreferrer" className="text-[hsl(220,10%,65%)] text-sm hover:text-primary transition-colors flex items-center gap-2">
                <Facebook className="w-4 h-4" />
                Zyka Credit Limited
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[hsl(220,15%,20%)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[hsl(220,10%,65%)] text-sm">
            © {new Date().getFullYear()} Zyka Credit Limited. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/contact" className="text-[hsl(220,10%,65%)] text-sm hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/contact" className="text-[hsl(220,10%,65%)] text-sm hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;