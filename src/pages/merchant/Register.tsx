
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import dalalLogo from '@/assets/dalal-logo.png';
import MerchantLoginNavigation from '../../components/MerchantLoginNavigation';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Calendar,
  ArrowRight,
  Shield,
  Loader2,
  Phone
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
const DALAL_API_BASE_URL = import.meta.env.VITE_DALAL_API_BASE_URL;

const MerchantRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { language, t } = useTranslation();
  const navigate = useNavigate();

  // Manual form state for validation
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirm_password: ""
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Simple email validation
  const validateEmail = (email: string) => /.+@.+\..+/.test(email);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.full_name.trim()) {
      newErrors.full_name = ("merchant.register.fullNameRequired");
    } else if (formData.full_name.length < 2) {
      newErrors.full_name = ("merchant.register.fullNameMin");
    }
    if (!formData.email.trim()) {
      newErrors.email = ("merchant.register.emailRequired");
    } else if (!validateEmail(formData.email)) {
      newErrors.email = ("merchant.register.emailInvalid");
    }
    if (!formData.phone.trim()) {
      newErrors.phone = ("merchant.register.phoneRequired");
    } else if (formData.phone.length < 10) {
      newErrors.phone = ("merchant.register.phoneMin");
    }
    if (!formData.dob.trim()) {
      newErrors.dob = ("merchant.register.dobRequired");
    }
    if (!formData.password.trim()) {
      newErrors.password = ("merchant.register.passwordRequired");
    } else if (formData.password.length < 8) {
      newErrors.password = ("merchant.register.passwordMin");
    }
    if (!formData.confirm_password.trim()) {
      newErrors.confirm_password = ("merchant.register.confirmPasswordRequired");
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = ("merchant.register.passwordMatch");
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!acceptTerms || !acceptPrivacy) {
      alert(t("merchant.register.pleaseAcceptTerms"));
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${DALAL_API_BASE_URL}/accounts/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          dob: formData.dob,
          password: formData.password,
          confirmpassword: formData.confirm_password
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      alert(t("merchant.register.accountCreatedSuccessfully"));
      setTimeout(() => {
        navigate(`/${language}/merchant/login`);
      }, 2000);
    } catch (error: any) {
      alert(error.message || t("merchant.register.registrationError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <MerchantLoginNavigation />
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 py-20">
        <div className="w-full max-w-lg">
          <Card className="p-8 shadow-strong bg-card/95 backdrop-blur-sm border-0">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {t("merchant.register.title")}
              </h1>
              <p className="text-muted-foreground">
                {t("merchant.register.subtitle")}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="text-foreground font-medium">
                  {t("merchant.register.fullNameLabel")}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder={t("merchant.register.fullNamePlaceholder")}
                    value={formData.full_name}
                    onChange={e => handleInputChange('full_name', e.target.value)}
                    className="pl-11 bg-muted/30 border-border focus:border-primary transition-smooth"
                  />
                </div>
                {errors.full_name && (
                  <p className="text-sm text-destructive mt-1">{t(errors.full_name)}</p>
                )}
              </div>
              {/* Email */}
              <div>
                <label className="text-foreground font-medium">
                  {t("merchant.register.emailLabel")}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder={t("merchant.register.emailPlaceholder")}
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    className="pl-11 bg-muted/30 border-border focus:border-primary transition-smooth"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{t(errors.email)}</p>
                )}
              </div>
              {/* Phone and DOB */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-foreground font-medium">
                    {t("merchant.register.phoneLabel")}
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder={t("merchant.register.phonePlaceholder")}
                      value={formData.phone}
                      onChange={e => handleInputChange('phone', e.target.value)}
                      className="pl-11 bg-muted/30 border-border focus:border-primary transition-smooth"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-destructive mt-1">{t(errors.phone)}</p>
                  )}
                </div>
                <div>
                  <label className="text-foreground font-medium">
                    {t("merchant.register.dobLabel")}
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="date"
                      placeholder={t("merchant.register.dobPlaceholder")}
                      value={formData.dob}
                      onChange={e => handleInputChange('dob', e.target.value)}
                      className="pl-11 bg-muted/30 border-border focus:border-primary transition-smooth"
                    />
                  </div>
                  {errors.dob && (
                    <p className="text-sm text-destructive mt-1">{t(errors.dob)}</p>
                  )}
                </div>
              </div>
              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-foreground font-medium">
                    {t("merchant.register.passwordLabel")}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder={t("merchant.register.passwordPlaceholder")}
                      value={formData.password}
                      onChange={e => handleInputChange('password', e.target.value)}
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
                <div>
                  <label className="text-foreground font-medium">
                    {t("merchant.register.confirmPasswordLabel")}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder={t("merchant.register.confirmPasswordPlaceholder")}
                      value={formData.confirm_password}
                      onChange={e => handleInputChange('confirm_password', e.target.value)}
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
                  {errors.confirm_password && (
                    <p className="text-sm text-destructive mt-1">{t(errors.confirm_password)}</p>
                  )}
                </div>
              </div>
              {/* Password Requirements */}
              <div className="text-xs text-muted-foreground">
                {t("merchant.register.passwordRequirements")}
              </div>
              {/* Terms & Privacy */}
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="acceptTerms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    className="mt-1"
                    required
                  />
                  <label htmlFor="acceptTerms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                    {t("merchant.register.acceptTerms")}
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="acceptPrivacy"
                    checked={acceptPrivacy}
                    onCheckedChange={(checked) => setAcceptPrivacy(checked as boolean)}
                    className="mt-1"
                    required
                  />
                  <label htmlFor="acceptPrivacy" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                    {t("merchant.register.acceptPrivacy")}
                  </label>
                </div>
              </div>
              {/* Submit Button */}
              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="w-full"
                disabled={!acceptTerms || !acceptPrivacy || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    {language === "en" ? "Creating Account..." : "جاري إنشاء الحساب..."}
                  </>
                ) : (
                  <>
                    {t("merchant.register.signUp")}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
            {/* Divider */}
            <div className="my-8">
              <Separator />
            </div>
            {/* Sign In Link */}
            <div className="text-center">
              <div>
                <p className="text-muted-foreground mb-4">
                  {t("merchant.register.hasAccount")} {" "}
                  <Link
                    to={`/${language}/merchant/login`}
                    className="text-primary font-medium hover:underline"
                  >
                    {t("merchant.register.signIn")}
                  </Link>
                </p>
                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                  <Shield className="w-4 h-4" />
                  <span>{t("merchant.register.securityNote")}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MerchantRegister;
