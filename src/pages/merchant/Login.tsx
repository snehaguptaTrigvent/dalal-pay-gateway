import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import dalalLogo from '@/assets/dalal-logo.png';
import MerchantLoginNavigation from '@/components/MerchantLoginNavigation';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Globe,
  Shield,
  Building
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";

const DALAL_API_BASE_URL = import.meta.env.VITE_DALAL_API_BASE_URL;


const MerchantLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { language, setLanguage, t } = useTranslation();

  const validateEmail = (email: string) => /.+@.+\..+/.test(email);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email.trim()) {
      newErrors.email = ("merchant.login.emailRequired");
    } else if (!validateEmail(formData.email)) {
      newErrors.email = ("merchant.login.emailInvalid");
    }
    if (!formData.password.trim()) {
      newErrors.password = ("merchant.login.passwordRequired");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${DALAL_API_BASE_URL}/accounts/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      localStorage.setItem("authData", JSON.stringify(data.data));
      toast({
        title: t("merchant.login.loginSuccessful"),
        description: t("merchant.login.redirectingToDashboard")
      });
      setTimeout(() => {
        navigate(`/${language}/merchant/dashboard`);
      }, 1500);
    } catch (error: any) {
      if (error.message.includes("deactivated")){
        toast({
          variant: "destructive",
          title: t("merchant.login.loginFailed"),
          description: t("merchant.login.accountNotVerified")
        });
      }else{
        toast({
          variant: "destructive",
          title: t("merchant.login.loginFailed"),
          description: error.message ? t("merchant.login.invalidCredentials") : t("merchant.login.loginError")
        });
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <div className="relative min-h-screen overflow-hidden" style={{ overflow: 'hidden', height: '100vh' }}>
        <MerchantLoginNavigation />
        <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 py-20 overflow-hidden">
          <div className="w-full max-w-md">
            <Card className="shadow-strong bg-card/95 backdrop-blur-sm border-0 xl:h-[75vh] overflow-hidden">
              <div className="p-8 overflow-y-auto max-h-[75vh]">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="w-8 h-8 text-primary" />

                  </div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    {t("merchant.login.title")}
                  </h1>
                  <p className="text-muted-foreground">
                    {t("merchant.login.subtitle")}
                  </p>
                </div>
                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium">
                      {t("merchant.login.emailLabel")}
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="text"
                        placeholder={t("merchant.login.emailPlaceholder")}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-11 bg-muted/30 border-border focus:border-primary transition-smooth"

                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{t(errors.email)}</p>
                    )}

                  </div>
                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground font-medium">
                      {t("merchant.login.passwordLabel")}
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={t("merchant.login.passwordPlaceholder")}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="pl-11 pr-11 bg-muted/30 border-border focus:border-primary transition-smooth"

                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        )}
                      </Button>
                      {errors.password && (
                        <p className="text-sm text-destructive mt-1">{t(errors.password)}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <Link
                      to={`/${language}/merchant/forgot-password`}
                      className="text-sm text-primary hover:underline"
                    >
                      {t("merchant.login.forgotPassword")}
                    </Link>
                  </div>
                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <ArrowRight className="mr-2 w-5 h-5 animate-spin" />
                        {t("merchant.login.loading")}
                      </>
                    ) : (
                      <>
                        {t("merchant.login.signIn")}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
                {/* Divider */}
                <div className="my-8">
                  <Separator />
                </div>
                {/* Sign Up Link */}
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    {t("merchant.login.noAccount") + " "}
                    <Link
                      to={`/${language}/merchant/register`}
                      className="text-primary font-medium hover:underline"
                    >
                      {t("merchant.login.signUp")}
                    </Link>
                  </p>
                  {/* Security Badge */}
                  <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>{t("merchant.login.securityNote")}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>



    </>
  );
};

export default MerchantLogin;