import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Link, useNavigate } from "react-router-dom";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone,
  Calendar,
  ArrowRight,
  Globe,
  Shield,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Validation schema
const registerSchema = z.object({
  full_name: z.string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must not exceed 50 characters"),
  email: z.string()
    .email("Please enter a valid email address"),
  phone: z.string()
    .min(10, "Phone number must be at least 10 characters")
    .regex(/^[+]?[\d\s-()]+$/, "Please enter a valid phone number"),
  dob: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter date in YYYY-MM-DD format"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      "Password must contain uppercase, lowercase, number and special character"),
  confirm_password: z.string()
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ["confirm_password"],
});

const MerchantRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [language, setLanguage] = useState("en");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      dob: "",
      password: "",
      confirm_password: ""
    },
  });

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const handleSubmit = async (values: z.infer<typeof registerSchema>) => {
    if (!acceptTerms || !acceptPrivacy) {
      toast({
        variant: "destructive",
        title: language === "en" ? "Terms Required" : "الشروط مطلوبة",
        description: language === "en" ? "Please accept terms and privacy policy" : "يرجى قبول الشروط وسياسة الخصوصية"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Call your API endpoint
      const response = await fetch('https://api.staging.dalalpay.com/en/merchant/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: values.full_name,
          email: values.email,
          phone: values.phone,
          dob: values.dob,
          password: values.password,
          confirm_password: values.confirm_password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      toast({
        title: language === "en" ? "Registration Successful" : "تم التسجيل بنجاح",
        description: language === "en" 
          ? "Account created successfully! Redirecting to login..." 
          : "تم إنشاء الحساب بنجاح! جاري التوجيه لتسجيل الدخول..."
      });
      
      // Navigate to login page
      setTimeout(() => {
        navigate("/en/merchant/login");
      }, 2000);

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: language === "en" ? "Registration Failed" : "فشل التسجيل",
        description: error.message || (language === "en" 
          ? "An error occurred during registration" 
          : "حدث خطأ أثناء التسجيل")
      });
    } finally {
      setIsLoading(false);
    }
  };

  const content = {
    en: {
      title: "Create Merchant Account",
      subtitle: "Join thousands of businesses using Dalal Pay",
      fullNameLabel: "Full Name",
      fullNamePlaceholder: "Enter your full name",
      emailLabel: "Business Email",
      emailPlaceholder: "Enter your business email",
      phoneLabel: "Phone Number",
      phonePlaceholder: "Enter your phone number",
      dobLabel: "Date of Birth",
      dobPlaceholder: "YYYY-MM-DD",
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
      emailLabel: "البريد الإلكتروني للعمل",
      emailPlaceholder: "أدخل بريدك الإلكتروني للعمل",
      phoneLabel: "رقم الهاتف",
      phonePlaceholder: "أدخل رقم هاتفك",
      dobLabel: "تاريخ الميلاد",
      dobPlaceholder: "سنة-شهر-يوم",
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
              <User className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {t.title}
            </h1>
            <p className="text-muted-foreground">
              {t.subtitle}
            </p>
          </div>

          {/* Registration Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">
                      {t.fullNameLabel}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          placeholder={t.fullNamePlaceholder}
                          {...field}
                          className="pl-11 bg-muted/30 border-border focus:border-primary transition-smooth"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium">
                      {t.emailLabel}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder={t.emailPlaceholder}
                          {...field}
                          className="pl-11 bg-muted/30 border-border focus:border-primary transition-smooth"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone and DOB */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">
                        {t.phoneLabel}
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            type="tel"
                            placeholder={t.phonePlaceholder}
                            {...field}
                            className="pl-11 bg-muted/30 border-border focus:border-primary transition-smooth"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dob"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">
                        {t.dobLabel}
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            type="date"
                            placeholder={t.dobPlaceholder}
                            {...field}
                            className="pl-11 bg-muted/30 border-border focus:border-primary transition-smooth"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">
                        {t.passwordLabel}
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder={t.passwordPlaceholder}
                            {...field}
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-medium">
                        {t.confirmPasswordLabel}
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder={t.confirmPasswordPlaceholder}
                            {...field}
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    className="mt-1"
                    required
                  />
                  <label htmlFor="acceptTerms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                    {t.acceptTerms}
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
                    {t.acceptPrivacy}
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
                    {t.signUp}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="my-8">
            <Separator />
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              {t.hasAccount}{" "}
              <Link 
                to="/en/merchant/login" 
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