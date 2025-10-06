import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link, useParams, useNavigate } from "react-router-dom";
import MerchantLoginNavigation from '@/components/MerchantLoginNavigation';
import { Lock, ArrowRight, Shield, Building, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";

const DALAL_API_BASE_URL = import.meta.env.VITE_DALAL_API_BASE_URL;

const MerchantResetPassword = () => {
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { language, t } = useTranslation();
  const { token, uid } = useParams();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.password.trim()) {
      newErrors.password = "merchant.register.passwordRequired";
    } else if (formData.password.length < 8) {
      newErrors.password = "merchant.register.passwordMin";
    } else {
      // Require at least one number and one symbol
      const numberRegex = /[0-9]/;
      const symbolRegex = /[^A-Za-z0-9]/;
      if (!numberRegex.test(formData.password) || !symbolRegex.test(formData.password)) {
        newErrors.password = "merchant.register.passwordRegex";
      }
    }
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "merchant.register.confirmPasswordRequired";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "merchant.register.passwordMatch";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${DALAL_API_BASE_URL}/accounts/reset-pwd/${uid}/${token}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          new_password: formData.password,
          confirm_password: formData.confirmPassword
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Reset failed');
      }
      toast({
        title: t("merchant.reset.successTitle"),
        description: t("merchant.reset.successDesc")
      });
      setTimeout(() => {
        navigate(`/${language}/merchant/login`);
      }, 1200);
    } catch (error: any) {
      if (error.message && error.message.includes("has expired.")) {
        toast({
          variant: "destructive",
          title: t("merchant.reset.linkExpired"),
          description: t("merchant.reset.linkExpiredMessage")
        });
      }else{
          toast({
            variant: "destructive",
            title: t("merchant.reset.resetFailed"),
            description: error.message ? t(error.message) : t("merchant.reset.resetError")
          });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <MerchantLoginNavigation />
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 py-20">
        <div className="w-full max-w-md">
          <Card className="p-8 shadow-strong bg-card/95 backdrop-blur-sm border-0">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {t("merchant.reset.title")}
              </h1>
              <p className="text-muted-foreground">
                {t("merchant.reset.subtitle")}
              </p>
            </div>
            {/* Reset Password Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">
                  {t("merchant.reset.passwordLabel")}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("merchant.reset.passwordPlaceholder")}
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
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive mt-1">{t(errors.password)}</p>
                )}
              </div>
              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground font-medium">
                  {t("merchant.reset.confirmPasswordLabel")}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={t("merchant.reset.confirmPasswordPlaceholder")}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="pl-11 pr-11 bg-muted/30 border-border focus:border-primary transition-smooth"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive mt-1">{t(errors.confirmPassword)}</p>
                )}
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
                    {t("merchant.reset.loading")}
                  </>
                ) : (
                  <>
                    {t("merchant.reset.submit")}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
            {/* Divider */}
            <div className="my-8">
              <Separator />
            </div>
            {/* Back to Login Link */}
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                {t("merchant.reset.backToLogin") + " "}
                <Link
                  to={`/${language}/merchant/login`}
                  className="text-primary font-medium hover:underline"
                >
                  {t("merchant.reset.loginLink")}
                </Link>
              </p>
              {/* Security Badge */}
              <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>{t("merchant.reset.securityNote")}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MerchantResetPassword;
