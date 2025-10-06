         
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
  Phone, XCircle
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { toast } from "@/components/ui/sonner";


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
    } else if (!/^[A-Za-z0-9 ]+$/.test(formData.full_name)) {
      newErrors.full_name = ("merchant.register.fullNameRegex");
    }
    if (!formData.email.trim()) {
      newErrors.email = ("merchant.register.emailRequired");
    } else {
      // Stricter email validation
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = ("merchant.register.emailInvalid");
      }
    }
    if (!formData.phone.trim()) {
      newErrors.phone = ("merchant.register.phoneRequired");
    } else {
      const raw = formData.phone.trim();
      // Normalize: remove spaces, dashes, parentheses
      const normalized = raw.replace(/[()\s-]/g, "");
      const e164Regex = /^\+?[1-9]\d{9,14}$/;
      if (!e164Regex.test(normalized)) {
        newErrors.phone = ("merchant.register.phoneRegex");
      }
    }
    if (!formData.dob.trim()) {
      newErrors.dob = ("merchant.register.dobRequired");
    } else {
    
      const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dobRegex.test(formData.dob)) {
        newErrors.dob = ("merchant.register.dobFormat");
      } else {
        const dobDate = new Date(formData.dob);
        const today = new Date();
        dobDate.setHours(0,0,0,0);
        today.setHours(0,0,0,0);
        if (dobDate >= today) {
          newErrors.dob = ("merchant.register.dobPastOnly");
        } else {
          // Must be at least 18 years old
          const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
          if (dobDate > eighteenYearsAgo) {
            newErrors.dob = ("merchant.register.dobAge");
          }
        }
      }
    }
    if (!formData.password.trim()) {
      newErrors.password = ("merchant.register.passwordRequired");
    } else if (formData.password.length < 8) {
      newErrors.password = ("merchant.register.passwordMin");
    } else {
      // Require at least one number and one symbol
      const numberRegex = /[0-9]/;
      const symbolRegex = /[^A-Za-z0-9]/;
      if (!numberRegex.test(formData.password) || !symbolRegex.test(formData.password)) {
        newErrors.password = ("merchant.register.passwordRegex");
      }
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
    let nextValue = value;
    if (field === 'full_name') {
      // Allow only alphanumeric characters and spaces
      nextValue = value.replace(/[^A-Za-z0-9 ]/g, "");
    }
    setFormData((prev) => ({ ...prev, [field]: nextValue }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const [showActivationModal, setShowActivationModal] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   
  if (!validateForm()) return;
    if (!acceptTerms || !acceptPrivacy) {
      console.log(t("merchant.register.pleaseAcceptTerms"));
      return;
    }
    setIsLoading(true);
    try {
      
      const response = await fetch(`${DALAL_API_BASE_URL}/accounts/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          dob: formData.dob,
          password: formData.password,
          confirm_password: formData.confirm_password
        })
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
       setShowActivationModal(true);
     
    } catch (error: any) {
      if (error.message.includes("already exists")) {
        toast(t("merchant.register.emailAlreadyUsed"), {
          description: "",
          duration: 6000,
          position: "top-center",
          icon: <XCircle className="text-red-500" />,
          className:
            "bg-red-600 text-white border border-red-700 font-semibold rounded-lg shadow-lg",
          descriptionClassName: "text-sm text-red-100 mt-1",
          style: {
            fontSize: 16,
            padding: "16px 20px",
          },
        });
      }else{
          toast(t("merchant.register.registrationError"), {
          description: "",
          duration: 6000,
          position: "top-center",
          icon: <XCircle className="text-red-500" />,
          className:
            "bg-red-600 text-white border border-red-700 font-semibold rounded-lg shadow-lg",
          descriptionClassName: "text-sm text-red-100 mt-1",
          style: {
            fontSize: 16,
            padding: "16px 20px",
          },
        });

      }

      console.log(error.message || t("merchant.register.registrationError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="relative min-h-screen" style={{ overflow: 'hidden' }}>
      <MerchantLoginNavigation />
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 py-20">
        <Dialog open={showActivationModal} onOpenChange={(open) => { setShowActivationModal(open); if (!open) navigate(`/${language}/merchant/login`); }}>
          <DialogContent className="bg-white text-black text-lg font-semibold py-6 px-8 w-full max-w-lg rounded-xl shadow-2xl border-2 border-white flex flex-col items-center justify-center text-center">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-l mb-2">{t("activateAccount.title")}</h2>
              <p className="text-base mt-2 text-gray-500 text-center">
                {t("activateAccount.instructions")}<br />{t("activateAccount.checkSpam")}
              </p>
            </div>
          </DialogContent>
        </Dialog>
        
        <div className="w-full max-w-xl">         
          <Card className="shadow-strong bg-card/95 backdrop-blur-sm border-0 rounded-2xl max-h-[75vh] overflow-hidden">
            <div className="p-8 overflow-y-auto pr-2 max-h-[75vh]">
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
              {/* Full Name & Email in one row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div>
                  <label className="text-foreground font-medium">
                    {t("merchant.register.emailLabel")}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
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
                                        
                      inputMode="numeric"
                    
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
                <div className="flex justify-center">
              <Button
                type="submit"
                variant="gradient"
                size="lg"
                    className="w-3/4 mx-auto"
                    
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
              </div>
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
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MerchantRegister;
