import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import dalalLogo from '@/assets/dalal-logo.png';
import { useTranslation } from "@/hooks/useTranslation";
import { Link } from "react-router-dom";

const MerchantLoginNavigation = () => {
  const { language, setLanguage, t } = useTranslation();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={`/${language}`} aria-label="Dalal Pay" className="flex items-center">
            <img 
              src={dalalLogo} 
              alt="Dalal Pay" 
              className="h-8 w-auto" 
            />
          </Link>
          {/* Only Language Toggle for Login */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="flex items-center space-x-2"
            >
              <Globe className="w-4 h-4" />
              <span>{t('nav.languageSwitch')}</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MerchantLoginNavigation;
