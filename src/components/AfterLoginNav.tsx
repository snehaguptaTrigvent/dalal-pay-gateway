import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Globe, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import dalalLogo from "@/assets/dalal-logo.png";
interface AfterLoginNavProps {
  language: string;
  setLanguage: (lang: string) => void;
}

const AfterLoginNav = ({ language, setLanguage }: AfterLoginNavProps) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            <Link to={`/${language}/merchant/dashboard`} aria-label="Dalal Pay" className="flex items-center">
            <img 
              src={dalalLogo} 
              alt="Dalal Pay" 
              className="h-8 w-auto" 
            />
          </Link>
            </div>
            <Badge variant="secondary">{t("dashboard.dashboard")}</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            >
              <Globe className="w-4 h-4 mr-2" />
              {t("nav.languageSwitch")}
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              {t("dashboard.settings")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfterLoginNav;
