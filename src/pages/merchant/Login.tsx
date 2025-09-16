import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
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

const MerchantLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState("en");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const { toast } = useToast();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: language === "en" ? "Login Successful" : "تم تسجيل الدخول بنجاح",
      description: language === "en" ? "Redirecting to dashboard..." : "جاري التوجيه إلى لوحة التحكم..."
    });
  };

  const content = {
    en: {
      title: "Welcome Back",
      subtitle: "Sign in to your merchant account",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter your password",
      rememberMe: "Remember me",
      forgotPassword: "Forgot Password?",
      signIn: "Sign In",
      noAccount: "Don't have an account?",
      signUp: "Sign up here",
      securityNote: "Your data is protected with enterprise-grade security",
      loading: "Signing in..."
    },
    ar: {
      title: "مرحباً بعودتك",
      subtitle: "سجل دخولك إلى حساب التاجر",
      emailLabel: "البريد الإلكتروني",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      passwordLabel: "كلمة المرور",
      passwordPlaceholder: "أدخل كلمة المرور",
      rememberMe: "تذكرني",
      forgotPassword: "نسيت كلمة المرور؟",
      signIn: "تسجيل الدخول",
      noAccount: "ليس لديك حساب؟",
      signUp: "سجل هنا",
      securityNote: "بياناتك محمية بأمان على مستوى المؤسسات",
      loading: "جاري تسجيل الدخول..."
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

      <div className="w-full max-w-md">
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

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
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

            {/* Password Field */}
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => 
                    setFormData({...formData, rememberMe: checked as boolean})
                  }
                />
                <Label 
                  htmlFor="rememberMe" 
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  {t.rememberMe}
                </Label>
              </div>
              <Link
                to="/merchant/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                {t.forgotPassword}
              </Link>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              variant="gradient" 
              size="lg" 
              className="w-full"
            >
              {t.signIn}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>

          {/* Divider */}
          <div className="my-8">
            <Separator />
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              {t.noAccount}{" "}
              <Link 
                to="/merchant/register" 
                className="text-primary font-medium hover:underline"
              >
                {t.signUp}
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

export default MerchantLogin;