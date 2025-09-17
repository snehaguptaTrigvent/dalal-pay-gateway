import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Building, 
  Phone,
  ArrowRight,
  Globe,
  Shield,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MerchantRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    acceptPrivacy: false
  });

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: language === "en" ? "Password Mismatch" : "كلمات المرور غير متطابقة",
        description: language === "en" ? "Passwords do not match" : "كلمات المرور غير متطابقة"
      });
      return;
    }

    toast({
      title: language === "en" ? "Registration Successful" : "تم التسجيل بنجاح",
      description: language === "en" ? "Proceeding to KYC verification..." : "جاري الانتقال إلى التحقق من الهوية..."
    });
    
    // Navigate to KYC flow
    setTimeout(() => {
      navigate("/merchant/kyc");
    }, 1500);
  };

  const content = {
    en: {
      title: "Create Merchant Account",
      subtitle: "Join thousands of businesses using Dalal Pay",
      fullNameLabel: "Full Name",
      fullNamePlaceholder: "Enter your full name",
      companyLabel: "Company Name",
      companyPlaceholder: "Enter your company name",
      emailLabel: "Business Email",
      emailPlaceholder: "Enter your business email",
      phoneLabel: "Phone Number",
      phonePlaceholder: "Enter your phone number",
      passwordLabel: "Password",
      passwordPlaceholder: "Create a secure password",
      confirmPasswordLabel: "Confirm Password",
      confirmPasswordPlaceholder: "Confirm your password",
      acceptTerms: "I accept the Terms of Service",
      acceptPrivacy: "I accept the Privacy Policy",
      signUp: "Create Account",
      hasAccount: "Already have an account?",
      signIn: "Sign in here",
      securityNote: "Your data is encrypted and secure",
      passwordRequirements: "At least 8 characters with numbers and symbols"
    },
    ar: {
      title: "إنشاء حساب تاجر",
      subtitle: "انضم إلى آلاف الشركات التي تستخدم دلال باي",
      fullNameLabel: "الاسم الكامل",
      fullNamePlaceholder: "أدخل اسمك الكامل",
      companyLabel: "اسم الشركة",
      companyPlaceholder: "أدخل اسم شركتك",
      emailLabel: "البريد الإلكتروني للعمل",
      emailPlaceholder: "أدخل بريدك الإلكتروني للعمل",
      phoneLabel: "رقم الهاتف",
      phonePlaceholder: "أدخل رقم هاتفك",
      passwordLabel: "كلمة المرور",
      passwordPlaceholder: "أنشئ كلمة مرور آمنة",
      confirmPasswordLabel: "تأكيد كلمة المرور",
      confirmPasswordPlaceholder: "أكد كلمة المرور",
      acceptTerms: "أوافق على شروط الخدمة",
      acceptPrivacy: "أوافق على سياسة الخصوصية",
      signUp: "إنشاء الحساب",
      hasAccount: "لديك حساب بالفعل؟",
      signIn: "سجل دخولك هنا",
      securityNote: "بياناتك مشفرة وآمنة",
      passwordRequirements: "8 أحرف على الأقل مع أرقام ورموز"
    }
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      {/* Language Toggle */}
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleLanguage}
        className="absolute top-4 right-4 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
      >
        <Globe className="w-4 h-4 mr-2" />
        {language === "en" ? "العربية" : "English"}
      </Button>

      {/* Back to Home */}
      <Link 
        to="/"
        className="absolute top-4 left-4 text-primary-foreground/80 hover:text-primary-foreground transition-smooth"
      >
        <div className="text-xl font-bold">Dalal Pay</div>
      </Link>

      <div className="w-full max-w-lg">
        <Card className="p-8 shadow-strong bg-card/95 backdrop-blur-sm border-0">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {t.title}
            </h1>
            <p className="text-muted-foreground">
              {t.subtitle}
            </p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-foreground font-medium">
                {t.fullNameLabel}
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder={t.fullNamePlaceholder}
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="pl-11 bg-muted/30 border-border focus:border-primary transition-smooth"
                  required
                />
              </div>
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-foreground font-medium">
                {t.companyLabel}
              </Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="companyName"
                  type="text"
                  placeholder={t.companyPlaceholder}
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                  className="pl-11 bg-muted/30 border-border focus:border-primary transition-smooth"
                  required
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  {t.emailLabel}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="pl-11 bg-muted/30 border-border focus:border-primary transition-smooth"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground font-medium">
                  {t.phoneLabel}
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t.phonePlaceholder}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="pl-11 bg-muted/30 border-border focus:border-primary transition-smooth"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">
                  {t.passwordLabel}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t.passwordPlaceholder}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="pl-11 pr-11 bg-muted/30 border-border focus:border-primary transition-smooth"
                    required
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground font-medium">
                  {t.confirmPasswordLabel}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={t.confirmPasswordPlaceholder}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="pl-11 pr-11 bg-muted/30 border-border focus:border-primary transition-smooth"
                    required
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
              </div>
            </div>

            {/* Password Requirements */}
            <div className="text-xs text-muted-foreground">
              {t.passwordRequirements}
            </div>

            {/* Terms & Privacy */}
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => 
                    setFormData({...formData, acceptTerms: checked as boolean})
                  }
                  className="mt-1"
                  required
                />
                <Label htmlFor="acceptTerms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                  {t.acceptTerms}
                </Label>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="acceptPrivacy"
                  checked={formData.acceptPrivacy}
                  onCheckedChange={(checked) => 
                    setFormData({...formData, acceptPrivacy: checked as boolean})
                  }
                  className="mt-1"
                  required
                />
                <Label htmlFor="acceptPrivacy" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                  {t.acceptPrivacy}
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              variant="gradient" 
              size="lg" 
              className="w-full"
              disabled={!formData.acceptTerms || !formData.acceptPrivacy}
            >
              {t.signUp}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>

          {/* Divider */}
          <div className="my-8">
            <Separator />
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              {t.hasAccount}{" "}
              <Link 
                to="/merchant/login" 
                className="text-primary font-medium hover:underline transition-smooth"
              >
                {t.signIn}
              </Link>
            </p>

            {/* Security Badge */}
            <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>{t.securityNote}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MerchantRegister;