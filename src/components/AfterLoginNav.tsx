const DALAL_API_BASE_URL = import.meta.env.VITE_DALAL_API_BASE_URL;
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Globe, Settings, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import dalalLogo from "@/assets/dalal-logo.png";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";

interface AfterLoginNavProps {
  language: string;
  setLanguage: (lang: string) => void;
}

const AfterLoginNav = ({ language, setLanguage }: AfterLoginNavProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const authData = localStorage.getItem("authData");
    console.log("Logging out, authData:", authData);
    let refresh_token = "";
    try {
      if (authData) {
        const parsed = JSON.parse(authData);
        refresh_token = parsed.refresh || "";
      }
      if (refresh_token) {
        await fetch(`${DALAL_API_BASE_URL}/accounts/logout/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh_token: refresh_token })
        });
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
    localStorage.removeItem("authData");
    navigate(`/${language}/merchant/login`);
  };
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
         
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            >
              <Globe className="w-4 h-4 mr-2" />
              {t("nav.languageSwitch")}
            </Button>
               <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4 mr-2" />
             
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-full p-0 w-8 h-8">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfterLoginNav;
