import { Button } from "@/components/ui/button";
import { 
  Twitter, 
  Linkedin, 
  Github, 
  Mail,
  Globe,
  Shield,
  FileText,
  ExternalLink
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features" },
        { name: "Security", href: "#security" },
        { name: "Pricing", href: "#pricing" },
        { name: "API Documentation", href: "/docs", external: true },
        { name: "Integration Guide", href: "/integration", external: true }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
        { name: "Press Kit", href: "/press" },
        { name: "Contact", href: "#contact" }
      ]
    },
    {
      title: "Resources", 
      links: [
        { name: "Help Center", href: "/help" },
        { name: "Community", href: "/community" },
        { name: "System Status", href: "/status", external: true },
        { name: "Changelog", href: "/changelog" },
        { name: "Partners", href: "/partners" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
        { name: "Compliance", href: "/compliance" },
        { name: "Data Processing", href: "/dpa" }
      ]
    }
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Dalal Pay
            </div>
            <p className="text-background/70 leading-relaxed">
              Simplifying payments for businesses worldwide with secure, scalable, 
              and reliable payment processing solutions.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-background/70 hover:text-background hover:bg-background/10">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background/70 hover:text-background hover:bg-background/10">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background/70 hover:text-background hover:bg-background/10">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background/70 hover:text-background hover:bg-background/10">
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold text-background">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href}
                      className="text-background/70 hover:text-background transition-smooth flex items-center group"
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                    >
                      {link.name}
                      {link.external && (
                        <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-smooth" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Security Badges */}
        <div className="border-t border-background/20 pt-8 mb-8">
          <div className="flex flex-wrap items-center justify-center space-x-8 mb-6">
            <div className="flex items-center space-x-2 text-background/70">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">PCI DSS Compliant</span>
            </div>
            <div className="flex items-center space-x-2 text-background/70">
              <FileText className="w-5 h-5" />
              <span className="text-sm font-medium">SOC 2 Type II</span>
            </div>
            <div className="flex items-center space-x-2 text-background/70">
              <Globe className="w-5 h-5" />
              <span className="text-sm font-medium">ISO 27001</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-6 text-sm text-background/70">
              <div>© {currentYear} Dalal Pay. All rights reserved.</div>
              <div className="hidden lg:block">•</div>
              <div>Built with security and compliance in mind</div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-background/70 hover:text-background hover:bg-background/10"
              >
                <Globe className="w-4 h-4 mr-2" />
                English
              </Button>
              <div className="text-xs text-background/50">
                Powered by Stripe Connect
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;