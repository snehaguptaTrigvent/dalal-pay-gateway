import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate } from "react-router-dom";
import { 
  Building, 
  CreditCard, 
  FileText, 
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Upload,
  Globe,
  User,
  Phone,
  Mail
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  // Basic Information
  type: string;
  country: string;
  email: string;
  business_type: string;
  business_profile_url: string;
  business_profile_mcc: string;
  statement_descriptor: string;
  
  // Individual Information
  individual_first_name: string;
  individual_last_name: string;
  individual_email: string;
  individual_phone: string;
  individual_id_number: string;
  individual_dob_day: string;
  individual_dob_month: string;
  individual_dob_year: string;
  individual_address_line1: string;
  individual_address_city: string;
  individual_address_state: string;
  individual_address_postal_code: string;
  individual_address_country: string;
  
  // Banking Information
  external_account_object: string;
  external_account_country: string;
  external_account_currency: string;
  external_account_account_number: string;
  external_account_routing_number: string;
  external_account_account_holder_name: string;
  
  // Verification & Documents
  individual_verification_document_front: File | null;
  tos_acceptance_date: string;
  tos_acceptance_ip: string;
}

const KYCOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();
  const { toast } = useToast();

  const totalSteps = 4;

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    // Step 1: Basic Information
    type: "custom",
    country: "US",
    email: "",
    business_type: "individual",
    business_profile_url: "",
    business_profile_mcc: "5734",
    statement_descriptor: "",
    
    // Step 2: Individual Information
    individual_first_name: "",
    individual_last_name: "",
    individual_email: "",
    individual_phone: "",
    individual_id_number: "",
    individual_dob_day: "",
    individual_dob_month: "",
    individual_dob_year: "",
    individual_address_line1: "",
    individual_address_city: "",
    individual_address_state: "",
    individual_address_postal_code: "",
    individual_address_country: "US",
    
    // Step 3: Banking Information
    external_account_object: "bank_account",
    external_account_country: "US",
    external_account_currency: "usd",
    external_account_account_number: "",
    external_account_routing_number: "",
    external_account_account_holder_name: "",
    
    // Step 4: Verification & Documents
    individual_verification_document_front: null,
    tos_acceptance_date: "",
    tos_acceptance_ip: ""
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});
  const [submitting, setSubmitting] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateStep = (step: number) => {
    const newErrors: {[key: string]: string} = {};
    
    switch (step) {
      case 1:
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!validateEmail(formData.email)) {
          newErrors.email = "Please enter a valid email address";
        }
        if (!formData.business_profile_url.trim()) newErrors.business_profile_url = "Business URL is required";
        if (!formData.statement_descriptor.trim()) newErrors.statement_descriptor = "Statement descriptor is required";
        break;
        
      case 2:
        if (!formData.individual_first_name.trim()) newErrors.individual_first_name = "First name is required";
        if (!formData.individual_last_name.trim()) newErrors.individual_last_name = "Last name is required";
        if (!formData.individual_email.trim()) {
          newErrors.individual_email = "Email is required";
        } else if (!validateEmail(formData.individual_email)) {
          newErrors.individual_email = "Please enter a valid email address";
        }
        if (!formData.individual_phone.trim()) {
          newErrors.individual_phone = "Phone number is required";
        } else if (!validatePhone(formData.individual_phone)) {
          newErrors.individual_phone = "Please enter a valid phone number";
        }
        if (!formData.individual_id_number.trim()) newErrors.individual_id_number = "ID number is required";
        if (!formData.individual_dob_day.trim()) newErrors.individual_dob_day = "Birth day is required";
        if (!formData.individual_dob_month.trim()) newErrors.individual_dob_month = "Birth month is required";
        if (!formData.individual_dob_year.trim()) newErrors.individual_dob_year = "Birth year is required";
        if (!formData.individual_address_line1.trim()) newErrors.individual_address_line1 = "Address is required";
        if (!formData.individual_address_city.trim()) newErrors.individual_address_city = "City is required";
        if (!formData.individual_address_state.trim()) newErrors.individual_address_state = "State is required";
        if (!formData.individual_address_postal_code.trim()) newErrors.individual_address_postal_code = "Postal code is required";
        break;
        
      case 3:
        if (!formData.external_account_account_number.trim()) newErrors.external_account_account_number = "Account number is required";
        if (!formData.external_account_routing_number.trim()) newErrors.external_account_routing_number = "Routing number is required";
        if (!formData.external_account_account_holder_name.trim()) newErrors.external_account_account_holder_name = "Account holder name is required";
        break;
        
      case 4:
        if (!formData.individual_verification_document_front) newErrors.individual_verification_document_front = "Identity document is required";
        break;
    }
    
    return newErrors;
  };

  const handleInputChange = (field, value) => {
    setFormData({...formData, [field]: value});
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({...errors, [field]: null});
    }
    
    setTouched({...touched, [field]: true});
  };

  const handleNext = async () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors({...errors, ...stepErrors});
      toast({
        title: language === "en" ? "Validation Error" : "خطأ في التحقق",
        description: language === "en" ? "Please fill in all required fields correctly." : "يرجى ملء جميع الحقول المطلوبة بشكل صحيح.",
        variant: "destructive"
      });
      return;
    }
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - submit to Stripe Connect API
      setSubmitting(true);
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formPayload.append(key, value);
        }
      });
      
      // Add automatic fields for Stripe
      formPayload.append('capabilities[card_payments][requested]', 'true');
      formPayload.append('capabilities[transfers][requested]', 'true');
      formPayload.append('tos_acceptance[date]', Math.floor(Date.now() / 1000).toString());
      formPayload.append('tos_acceptance[ip]', '127.0.0.1'); // You should get the real IP
      
      try {
        const response = await fetch("https://api.dalal-pay.com/api/stripe-connect-account", {
          method: "POST",
          body: formPayload
        });
        if (!response.ok) throw new Error("Submission failed");
        toast({
          title: language === "en" ? "Application Submitted Successfully" : "تم إرسال الطلب بنجاح",
          description: language === "en" ? "Your application is under review. We'll notify you once approved." : "طلبك قيد المراجعة. سنخبرك عند الموافقة."
        });
        setTimeout(() => {
          navigate("/merchant/dashboard");
        }, 2000);
      } catch (err) {
        toast({
          title: language === "en" ? "Submission Error" : "خطأ في الإرسال",
          description: language === "en" ? "There was a problem submitting your application. Please try again." : "حدثت مشكلة أثناء إرسال طلبك. يرجى المحاولة مرة أخرى.",
          variant: "destructive"
        });
      } finally {
        setSubmitting(false);
      }
    }
  };

  const content = {
    en: {
      steps: [
        { title: "Basic Information", subtitle: "Account and business details" },
        { title: "Personal Information", subtitle: "Individual information and address" },
        { title: "Banking Information", subtitle: "Bank account for payouts" },
        { title: "Verification", subtitle: "Identity verification and terms" }
      ],
      previous: "Previous",
      nextStep: "Next Step",
      submit: "Submit Application",
      
      // Basic Info
      email: "Email Address",
      emailPlaceholder: "your@email.com",
      businessUrl: "Business Website URL",
      urlPlaceholder: "https://your-business.com",
      statementDescriptor: "Statement Descriptor",
      descriptorPlaceholder: "How your business appears on customer statements",
      
      // Personal Info
      firstName: "First Name",
      firstNamePlaceholder: "Enter your first name",
      lastName: "Last Name",
      lastNamePlaceholder: "Enter your last name",
      personalEmail: "Personal Email",
      personalEmailPlaceholder: "your.personal@email.com",
      phoneNumber: "Phone Number",
      phonePlaceholder: "+1 555 123 4567",
      idNumber: "ID Number",
      idPlaceholder: "Social Security Number or Tax ID",
      dateOfBirth: "Date of Birth",
      day: "Day",
      month: "Month",
      year: "Year",
      address: "Address",
      addressLine1: "Street Address",
      addressPlaceholder: "123 Main Street",
      city: "City",
      cityPlaceholder: "Enter city",
      state: "State",
      statePlaceholder: "Select state",
      postalCode: "Postal Code",
      postalPlaceholder: "Enter postal code",
      
      // Banking Info
      accountNumber: "Bank Account Number",
      accountPlaceholder: "Enter account number",
      routingNumber: "Routing Number",
      routingPlaceholder: "Enter routing number",
      accountHolder: "Account Holder Name",
      holderPlaceholder: "Name on bank account",
      
      // Verification
      identityDocument: "Identity Document",
      uploadDocument: "Upload Document",
      supportedFormats: "Supported: PDF, JPG, PNG (Max 5MB)",
      termsAcceptance: "Terms of Service",
      acceptTerms: "I accept the Terms of Service and Privacy Policy"
    },
    ar: {
      steps: [
        { title: "المعلومات الأساسية", subtitle: "تفاصيل الحساب والعمل" },
        { title: "المعلومات الشخصية", subtitle: "المعلومات الفردية والعنوان" },
        { title: "المعلومات المصرفية", subtitle: "الحساب المصرفي للمدفوعات" },
        { title: "التحقق", subtitle: "التحقق من الهوية والشروط" }
      ],
      previous: "السابق",
      nextStep: "الخطوة التالية",
      submit: "إرسال الطلب",
      
      // Basic Info
      email: "عنوان البريد الإلكتروني",
      emailPlaceholder: "your@email.com",
      businessUrl: "رابط الموقع التجاري",
      urlPlaceholder: "https://your-business.com",
      statementDescriptor: "وصف الكشف",
      descriptorPlaceholder: "كيف يظهر عملك في كشوف العملاء",
      
      // Personal Info
      firstName: "الاسم الأول",
      firstNamePlaceholder: "أدخل اسمك الأول",
      lastName: "اسم العائلة",
      lastNamePlaceholder: "أدخل اسم عائلتك",
      personalEmail: "البريد الإلكتروني الشخصي",
      personalEmailPlaceholder: "your.personal@email.com",
      phoneNumber: "رقم الهاتف",
      phonePlaceholder: "+1 555 123 4567",
      idNumber: "رقم الهوية",
      idPlaceholder: "رقم الضمان الاجتماعي أو الرقم الضريبي",
      dateOfBirth: "تاريخ الميلاد",
      day: "اليوم",
      month: "الشهر",
      year: "السنة",
      address: "العنوان",
      addressLine1: "عنوان الشارع",
      addressPlaceholder: "123 الشارع الرئيسي",
      city: "المدينة",
      cityPlaceholder: "أدخل المدينة",
      state: "الولاية",
      statePlaceholder: "اختر الولاية",
      postalCode: "الرمز البريدي",
      postalPlaceholder: "أدخل الرمز البريدي",
      
      // Banking Info
      accountNumber: "رقم الحساب المصرفي",
      accountPlaceholder: "أدخل رقم الحساب",
      routingNumber: "رقم التوجيه",
      routingPlaceholder: "أدخل رقم التوجيه",
      accountHolder: "اسم صاحب الحساب",
      holderPlaceholder: "الاسم في الحساب المصرفي",
      
      // Verification
      identityDocument: "وثيقة الهوية",
      uploadDocument: "رفع الوثيقة",
      supportedFormats: "المدعوم: PDF, JPG, PNG (حد أقصى 5 ميجا)",
      termsAcceptance: "شروط الخدمة",
      acceptTerms: "أوافق على شروط الخدمة وسياسة الخصوصية"
    }
  };

  const t = content[language];

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Building className="w-6 h-6 text-primary mr-3" />
        <div>
          <h2 className="text-xl font-semibold text-foreground">Step 1: Basic Information</h2>
          <p className="text-sm text-muted-foreground">Account and business details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="email" className="text-foreground font-medium">
            {t.email} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder={t.emailPlaceholder}
            className="mt-2 bg-background border-input focus:border-primary"
            required
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="business_profile_url" className="text-foreground font-medium">
            {t.businessUrl} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="business_profile_url"
            type="url"
            value={formData.business_profile_url}
            onChange={(e) => handleInputChange('business_profile_url', e.target.value)}
            placeholder={t.urlPlaceholder}
            className="mt-2 bg-background border-input focus:border-primary"
            required
          />
          {errors.business_profile_url && (
            <p className="text-sm text-destructive mt-1">{errors.business_profile_url}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="statement_descriptor" className="text-foreground font-medium">
          {t.statementDescriptor} <span className="text-destructive">*</span>
        </Label>
        <Input
          id="statement_descriptor"
          value={formData.statement_descriptor}
          onChange={(e) => handleInputChange('statement_descriptor', e.target.value)}
          placeholder={t.descriptorPlaceholder}
          className="mt-2 bg-background border-input focus:border-primary"
          maxLength={22}
          required
        />
        {errors.statement_descriptor && (
          <p className="text-sm text-destructive mt-1">{errors.statement_descriptor}</p>
        )}
        <p className="text-xs text-muted-foreground mt-1">Maximum 22 characters</p>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Account Type:</strong> Individual Business Account<br/>
          <strong>Country:</strong> United States<br/>
          <strong>Capabilities:</strong> Card Payments, Transfers
        </p>
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <User className="w-6 h-6 text-primary mr-3" />
        <div>
          <h2 className="text-xl font-semibold text-foreground">Step 2: Personal Information</h2>
          <p className="text-sm text-muted-foreground">Individual information and address</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="individual_first_name" className="text-foreground font-medium">
            {t.firstName} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="individual_first_name"
            value={formData.individual_first_name}
            onChange={(e) => handleInputChange('individual_first_name', e.target.value)}
            placeholder={t.firstNamePlaceholder}
            className="mt-2 bg-background border-input focus:border-primary"
            required
          />
          {errors.individual_first_name && (
            <p className="text-sm text-destructive mt-1">{errors.individual_first_name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="individual_last_name" className="text-foreground font-medium">
            {t.lastName} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="individual_last_name"
            value={formData.individual_last_name}
            onChange={(e) => handleInputChange('individual_last_name', e.target.value)}
            placeholder={t.lastNamePlaceholder}
            className="mt-2 bg-background border-input focus:border-primary"
            required
          />
          {errors.individual_last_name && (
            <p className="text-sm text-destructive mt-1">{errors.individual_last_name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="individual_email" className="text-foreground font-medium">
            {t.personalEmail} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="individual_email"
            type="email"
            value={formData.individual_email}
            onChange={(e) => handleInputChange('individual_email', e.target.value)}
            placeholder={t.personalEmailPlaceholder}
            className="mt-2 bg-background border-input focus:border-primary"
            required
          />
          {errors.individual_email && (
            <p className="text-sm text-destructive mt-1">{errors.individual_email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="individual_phone" className="text-foreground font-medium">
            {t.phoneNumber} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="individual_phone"
            type="tel"
            value={formData.individual_phone}
            onChange={(e) => handleInputChange('individual_phone', e.target.value)}
            placeholder={t.phonePlaceholder}
            className="mt-2 bg-background border-input focus:border-primary"
            required
          />
          {errors.individual_phone && (
            <p className="text-sm text-destructive mt-1">{errors.individual_phone}</p>
          )}
        </div>

        <div>
          <Label htmlFor="individual_id_number" className="text-foreground font-medium">
            {t.idNumber} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="individual_id_number"
            value={formData.individual_id_number}
            onChange={(e) => handleInputChange('individual_id_number', e.target.value)}
            placeholder={t.idPlaceholder}
            className="mt-2 bg-background border-input focus:border-primary"
            required
          />
          {errors.individual_id_number && (
            <p className="text-sm text-destructive mt-1">{errors.individual_id_number}</p>
          )}
        </div>
      </div>

      <div>
        <Label className="text-foreground font-medium">
          {t.dateOfBirth} <span className="text-destructive">*</span>
        </Label>
        <div className="grid grid-cols-3 gap-4 mt-2">
          <div>
            <Label htmlFor="individual_dob_day" className="text-sm text-muted-foreground">{t.day}</Label>
            <Input
              id="individual_dob_day"
              type="number"
              min="1"
              max="31"
              value={formData.individual_dob_day}
              onChange={(e) => handleInputChange('individual_dob_day', e.target.value)}
              placeholder="29"
              className="mt-1 bg-background border-input focus:border-primary"
              required
            />
            {errors.individual_dob_day && (
              <p className="text-sm text-destructive mt-1">{errors.individual_dob_day}</p>
            )}
          </div>
          <div>
            <Label htmlFor="individual_dob_month" className="text-sm text-muted-foreground">{t.month}</Label>
            <Input
              id="individual_dob_month"
              type="number"
              min="1"
              max="12"
              value={formData.individual_dob_month}
              onChange={(e) => handleInputChange('individual_dob_month', e.target.value)}
              placeholder="01"
              className="mt-1 bg-background border-input focus:border-primary"
              required
            />
            {errors.individual_dob_month && (
              <p className="text-sm text-destructive mt-1">{errors.individual_dob_month}</p>
            )}
          </div>
          <div>
            <Label htmlFor="individual_dob_year" className="text-sm text-muted-foreground">{t.year}</Label>
            <Input
              id="individual_dob_year"
              type="number"
              min="1900"
              max="2005"
              value={formData.individual_dob_year}
              onChange={(e) => handleInputChange('individual_dob_year', e.target.value)}
              placeholder="1990"
              className="mt-1 bg-background border-input focus:border-primary"
              required
            />
            {errors.individual_dob_year && (
              <p className="text-sm text-destructive mt-1">{errors.individual_dob_year}</p>
            )}
          </div>
        </div>
      </div>

      <div>
        <Label className="text-foreground font-medium">
          {t.address} <span className="text-destructive">*</span>
        </Label>
        <div className="space-y-4 mt-2">
          <div>
            <Input
              id="individual_address_line1"
              value={formData.individual_address_line1}
              onChange={(e) => handleInputChange('individual_address_line1', e.target.value)}
              placeholder={t.addressPlaceholder}
              className="bg-background border-input focus:border-primary"
              required
            />
            {errors.individual_address_line1 && (
              <p className="text-sm text-destructive mt-1">{errors.individual_address_line1}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                id="individual_address_city"
                value={formData.individual_address_city}
                onChange={(e) => handleInputChange('individual_address_city', e.target.value)}
                placeholder={t.cityPlaceholder}
                className="bg-background border-input focus:border-primary"
                required
              />
              {errors.individual_address_city && (
                <p className="text-sm text-destructive mt-1">{errors.individual_address_city}</p>
              )}
            </div>
            <div>
              <Input
                id="individual_address_state"
                value={formData.individual_address_state}
                onChange={(e) => handleInputChange('individual_address_state', e.target.value)}
                placeholder={t.statePlaceholder}
                className="bg-background border-input focus:border-primary"
                required
              />
              {errors.individual_address_state && (
                <p className="text-sm text-destructive mt-1">{errors.individual_address_state}</p>
              )}
            </div>
            <div>
              <Input
                id="individual_address_postal_code"
                value={formData.individual_address_postal_code}
                onChange={(e) => handleInputChange('individual_address_postal_code', e.target.value)}
                placeholder={t.postalPlaceholder}
                className="bg-background border-input focus:border-primary"
                required
              />
              {errors.individual_address_postal_code && (
                <p className="text-sm text-destructive mt-1">{errors.individual_address_postal_code}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBankingInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <CreditCard className="w-6 h-6 text-primary mr-3" />
        <div>
          <h2 className="text-xl font-semibold text-foreground">Step 3: Banking Information</h2>
          <p className="text-sm text-muted-foreground">Bank account for payouts</p>
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg mb-6">
        <p className="text-sm text-muted-foreground">
          <strong>Account Type:</strong> US Bank Account<br/>
          <strong>Currency:</strong> USD
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="external_account_account_number" className="text-foreground font-medium">
            {t.accountNumber} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="external_account_account_number"
            value={formData.external_account_account_number}
            onChange={(e) => handleInputChange('external_account_account_number', e.target.value)}
            placeholder={t.accountPlaceholder}
            className="mt-2 bg-background border-input focus:border-primary"
            required
          />
          {errors.external_account_account_number && (
            <p className="text-sm text-destructive mt-1">{errors.external_account_account_number}</p>
          )}
        </div>

        <div>
          <Label htmlFor="external_account_routing_number" className="text-foreground font-medium">
            {t.routingNumber} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="external_account_routing_number"
            value={formData.external_account_routing_number}
            onChange={(e) => handleInputChange('external_account_routing_number', e.target.value)}
            placeholder={t.routingPlaceholder}
            className="mt-2 bg-background border-input focus:border-primary"
            required
          />
          {errors.external_account_routing_number && (
            <p className="text-sm text-destructive mt-1">{errors.external_account_routing_number}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="external_account_account_holder_name" className="text-foreground font-medium">
            {t.accountHolder} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="external_account_account_holder_name"
            value={formData.external_account_account_holder_name}
            onChange={(e) => handleInputChange('external_account_account_holder_name', e.target.value)}
            placeholder={t.holderPlaceholder}
            className="mt-2 bg-background border-input focus:border-primary"
            required
          />
          {errors.external_account_account_holder_name && (
            <p className="text-sm text-destructive mt-1">{errors.external_account_account_holder_name}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderVerification = () => {
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        handleInputChange('individual_verification_document_front', file);
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center mb-6">
          <FileText className="w-6 h-6 text-primary mr-3" />
          <div>
            <h2 className="text-xl font-semibold text-foreground">Step 4: Verification</h2>
            <p className="text-sm text-muted-foreground">Identity verification and terms</p>
          </div>
        </div>

        <div>
          <Label htmlFor="individual_verification_document_front" className="text-foreground font-medium">
            {t.identityDocument} <span className="text-destructive">*</span>
          </Label>
          <div className="mt-2">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Upload a photo of your government-issued ID (front side)
              </p>
              <Input
                id="individual_verification_document_front"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
                required
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('individual_verification_document_front')?.click()}
              >
                <Upload className="w-4 h-4 mr-2" />
                {t.uploadDocument}
              </Button>
              {formData.individual_verification_document_front && (
                <p className="text-sm text-primary mt-2">
                  ✓ {formData.individual_verification_document_front.name}
                </p>
              )}
            </div>
            {errors.individual_verification_document_front && (
              <p className="text-sm text-destructive mt-1">{errors.individual_verification_document_front}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">{t.supportedFormats}</p>
          </div>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <Label className="text-foreground font-medium">
                {t.termsAcceptance}
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                {t.acceptTerms}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Next Steps:</strong><br/>
            • Your application will be reviewed within 1-2 business days<br/>
            • We may request additional documentation if needed<br/>
            • You'll receive an email notification once your account is approved
          </p>
        </div>
      </div>
    );
  };

  const getCurrentStepComponent = () => {
    switch (currentStep) {
      case 1:
        return renderBasicInfo();
      case 2:
        return renderPersonalInfo();
      case 3:
        return renderBankingInfo();
      case 4:
        return renderVerification();
      default:
        return renderBasicInfo();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <ArrowLeft className="w-5 h-5" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {language === "en" ? "Merchant Onboarding" : "تسجيل التاجر"}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {language === "en" ? "Complete your KYC verification to start accepting payments" : "أكمل عملية التحقق من الهوية لبدء قبول الدفعات"}
                </p>
              </div>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-2"
            >
              <Globe className="w-4 h-4" />
              <span>{language === "en" ? "العربية" : "English"}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="border-b border-border bg-card">
        <div className="container max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {t.steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index < t.steps.length - 1 ? "flex-1" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep > index + 1
                        ? "bg-green-500 text-white"
                        : currentStep === index + 1
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {currentStep > index + 1 ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className={`${language === "ar" ? "text-right" : "text-left"}`}>
                    <div
                      className={`text-sm font-medium ${
                        currentStep >= index + 1
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {step.subtitle}
                    </div>
                  </div>
                </div>
                {index < t.steps.length - 1 && (
                  <div className="flex-1 h-px bg-border mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-3xl mx-auto px-6 py-8">
        <Card className="p-8">
          {getCurrentStepComponent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.previous}</span>
            </Button>

            <Button
              onClick={handleNext}
              disabled={submitting}
              className="flex items-center space-x-2"
            >
              <span>
                {currentStep === totalSteps 
                  ? (submitting ? "Submitting..." : t.submit || "Submit Application")
                  : t.nextStep
                }
              </span>
              {currentStep < totalSteps && <ArrowRight className="w-4 h-4" />}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default KYCOnboarding;