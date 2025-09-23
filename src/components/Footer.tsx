import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
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
import dalalLogo from "@/assets/dalal-logo.png";

const Footer = () => {
  const { t, language } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: t('footer.product'),
      links: [
        { name: t('nav.features'), href: "#features" },
        { name: t('nav.security'), href: "#security" },
        { name: t('footer.pricing'), href: "#pricing" },
        { name: t('footer.apiDocumentation'), href: "/docs", external: true },
        { name: t('footer.merchantOnboarding'), href: "/integration", external: true }
      ]
    },
    {
      title: t('footer.company'),
      links: [
        { name: t('footer.aboutUs'), href: "/about" },
        { name: t('footer.blog'), href: "/blog" },
        { name: t('footer.careers'), href: "/careers" },
        { name: t('footer.newsroom'), href: "/press" },
        { name: t('nav.contact'), href: "#contact" }
      ]
    },
    {
      title: t('footer.support'), 
      links: [
        { name: t('footer.helpCenter'), href: "/help" },
        { name: t('footer.contactUs'), href: "/community" },
        { name: t('footer.status'), href: "/status", external: true },
        { name: t('footer.developerResources'), href: "/changelog" },
        { name: "Partners", href: "/partners" }
      ]
    },
    {
      title: t('footer.legal'),
      links: [
        { name: t('footer.privacy'), href: "/privacy" },
        { name: t('footer.terms'), href: "/terms" },
        { name: t('footer.cookies'), href: "/cookies" },
        { name: t('footer.compliance'), href: "/compliance" },
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
            <img 
              src={dalalLogo} 
              alt="Dalal Pay" 
              className="h-10 w-auto"
            />
            <p className="text-background/70 leading-relaxed">
              {t('footer.tagline')}
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
              <div>© {currentYear} Dalal Pay. {t('footer.allRightsReserved')}</div>
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
                {t('nav.languageSwitch')}
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