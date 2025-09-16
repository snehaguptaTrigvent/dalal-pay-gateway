import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Dalal Pay
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-smooth">
                {language === "en" ? "Features" : "الميزات"}
              </a>
              <a href="#security" className="text-muted-foreground hover:text-primary transition-smooth">
                {language === "en" ? "Security" : "الأمان"}
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-smooth">
                {language === "en" ? "Contact" : "اتصل بنا"}
              </a>
            </div>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-2"
            >
              <Globe className="w-4 h-4" />
              <span>{language === "en" ? "العربية" : "English"}</span>
            </Button>
            <Button variant="outline" size="sm">
              {language === "en" ? "Login" : "تسجيل الدخول"}
            </Button>
            <Button variant="hero" size="sm">
              {language === "en" ? "Get Started" : "ابدأ الآن"}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background border-t border-border">
              <a
                href="#features"
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                {language === "en" ? "Features" : "الميزات"}
              </a>
              <a
                href="#security"
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                {language === "en" ? "Security" : "الأمان"}
              </a>
              <a
                href="#contact"
                className="block px-3 py-2 text-muted-foreground hover:text-primary transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                {language === "en" ? "Contact" : "اتصل بنا"}
              </a>
              <div className="flex space-x-2 px-3 py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="flex items-center space-x-2"
                >
                  <Globe className="w-4 h-4" />
                  <span>{language === "en" ? "العربية" : "English"}</span>
                </Button>
                <Button variant="outline" size="sm">
                  {language === "en" ? "Login" : "تسجيل الدخول"}
                </Button>
                <Button variant="hero" size="sm">
                  {language === "en" ? "Get Started" : "ابدأ الآن"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;