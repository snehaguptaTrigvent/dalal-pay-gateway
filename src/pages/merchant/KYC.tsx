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
  businessName: string;
  businessType: string;
  registrationNumber: string;
  taxId: string;
  businessAddress: string;
  businessDescription: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactPosition: string;
  bankName: string;
  accountNumber: string;
  iban: string;
  swiftCode: string;
  accountHolder: string;
  businessLicense: File | null;
  taxCertificate: File | null;
  bankStatement: File | null;
  ownershipDocs: File | null;
}

const KYCOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();
  const { toast } = useToast();

  const totalSteps = 4;

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    // Step 1: Business Information
    businessName: "",
    businessType: "",
    registrationNumber: "",
    taxId: "",
    businessAddress: "",
    businessDescription: "",
    
    // Step 2: Contact Details
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    contactPosition: "",
    
    // Step 3: Banking Information
    bankName: "",
    accountNumber: "",
    iban: "",
    swiftCode: "",
    accountHolder: "",
    
    // Step 4: Documents
    businessLicense: null,
    taxCertificate: null,
    bankStatement: null,
    ownershipDocs: null
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});

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
        if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";
        if (!formData.businessType.trim()) newErrors.businessType = "Business type is required";
        if (!formData.registrationNumber.trim()) newErrors.registrationNumber = "Registration number is required";
        if (!formData.businessAddress.trim()) newErrors.businessAddress = "Business address is required";
        if (!formData.businessDescription.trim()) newErrors.businessDescription = "Business description is required";
        break;
        
      case 2:
        if (!formData.contactName.trim()) newErrors.contactName = "Contact name is required";
        if (!formData.contactEmail.trim()) {
          newErrors.contactEmail = "Contact email is required";
        } else if (!validateEmail(formData.contactEmail)) {
          newErrors.contactEmail = "Please enter a valid email address";
        }
        if (!formData.contactPhone.trim()) {
          newErrors.contactPhone = "Contact phone is required";
        } else if (!validatePhone(formData.contactPhone)) {
          newErrors.contactPhone = "Please enter a valid phone number";
        }
        if (!formData.contactPosition.trim()) newErrors.contactPosition = "Position is required";
        break;
        
      case 3:
        if (!formData.bankName.trim()) newErrors.bankName = "Bank name is required";
        if (!formData.accountNumber.trim()) newErrors.accountNumber = "Account number is required";
        if (!formData.accountHolder.trim()) newErrors.accountHolder = "Account holder name is required";
        break;
        
      case 4:
        if (!formData.businessLicense) newErrors.businessLicense = "Business license is required";
        if (!formData.bankStatement) newErrors.bankStatement = "Bank statement is required";
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

  const handleNext = () => {
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
      // Final step - submit
      toast({
        title: language === "en" ? "Application Submitted Successfully" : "تم إرسال الطلب بنجاح",
        description: language === "en" ? "Your application is under review. We'll notify you once approved." : "طلبك قيد المراجعة. سنخبرك عند الموافقة."
      });
      
      setTimeout(() => {
        navigate("/merchant/dashboard");
      }, 2000);
    }
  };

  const content = {
    en: {
      steps: [
        { title: "Business Information", subtitle: "Tell us about your business" },
        { title: "Contact Details", subtitle: "Primary contact information" },
        { title: "Banking Information", subtitle: "Account details for payouts" },
        { title: "Documentation", subtitle: "Upload required documents" }
      ],
      previous: "Previous",
      nextStep: "Next Step",
      
      // Business Info
      businessName: "Business Name",
      businessNamePlaceholder: "Enter your business name",
      businessType: "Business Type",
      businessTypePlaceholder: "e.g. E-commerce, Retail",
      registrationNumber: "Registration Number",
      registrationPlaceholder: "Business registration number",
      taxId: "Tax ID",
      taxIdPlaceholder: "Tax identification number",
      businessAddress: "Business Address",
      addressPlaceholder: "Full business address",
      businessDescription: "Business Description",
      descriptionPlaceholder: "Describe your business activities",
      
      // Contact Details
      contactTitle: "Contact Details",
      contactSubtitle: "Primary contact information",
      contactName: "Contact Person Name",
      contactNamePlaceholder: "Full name of primary contact",
      contactEmail: "Contact Email",
      contactEmailPlaceholder: "Primary business email",
      contactPhone: "Contact Phone",
      contactPhonePlaceholder: "Business phone number",
      contactPosition: "Position/Role",
      positionPlaceholder: "e.g. CEO, Manager, Owner",
      
      // Banking Info
      bankingTitle: "Banking Information",
      bankingSubtitle: "Account details for payouts",
      bankName: "Bank Name",
      bankNamePlaceholder: "Your bank name",
      accountNumber: "Account Number",
      accountPlaceholder: "Bank account number",
      iban: "IBAN",
      ibanPlaceholder: "International bank account number",
      swiftCode: "SWIFT/BIC Code",
      swiftPlaceholder: "Bank identifier code",
      accountHolder: "Account Holder Name",
      holderPlaceholder: "Name on bank account",
      
      // Documents
      docsTitle: "Documentation",
      docsSubtitle: "Upload required documents",
      businessLicense: "Business License",
      taxCertificate: "Tax Certificate",
      bankStatement: "Bank Statement",
      ownershipDocs: "Ownership Documents",
      uploadFile: "Upload File",
      supportedFormats: "Supported: PDF, JPG, PNG (Max 5MB)"
    },
    ar: {
      steps: [
        { title: "معلومات الأعمال", subtitle: "أخبرنا عن عملك" },
        { title: "تفاصيل الاتصال", subtitle: "معلومات الاتصال الأساسية" },
        { title: "المعلومات المصرفية", subtitle: "تفاصيل الحساب للمدفوعات" },
        { title: "الوثائق", subtitle: "رفع الوثائق المطلوبة" }
      ],
      previous: "السابق",
      nextStep: "الخطوة التالية",
      
      // Business Info
      businessName: "اسم النشاط التجاري",
      businessNamePlaceholder: "أدخل اسم نشاطك التجاري",
      businessType: "نوع النشاط التجاري",
      businessTypePlaceholder: "مثال: التجارة الإلكترونية، التجزئة",
      registrationNumber: "رقم التسجيل",
      registrationPlaceholder: "رقم تسجيل النشاط التجاري",
      taxId: "الرقم الضريبي",
      taxIdPlaceholder: "رقم الهوية الضريبية",
      businessAddress: "عنوان النشاط التجاري",
      addressPlaceholder: "العنوان الكامل للنشاط التجاري",
      businessDescription: "وصف النشاط التجاري",
      descriptionPlaceholder: "صف أنشطة عملك",
      
      // Contact Details
      contactTitle: "تفاصيل الاتصال",
      contactSubtitle: "معلومات الاتصال الأساسية",
      contactName: "اسم جهة الاتصال",
      contactNamePlaceholder: "الاسم الكامل لجهة الاتصال الأساسية",
      contactEmail: "بريد جهة الاتصال",
      contactEmailPlaceholder: "البريد الإلكتروني للعمل الأساسي",
      contactPhone: "هاتف جهة الاتصال",
      contactPhonePlaceholder: "رقم هاتف العمل",
      contactPosition: "المنصب/الدور",
      positionPlaceholder: "مثال: الرئيس التنفيذي، المدير، المالك",
      
      // Banking Info
      bankingTitle: "المعلومات المصرفية",
      bankingSubtitle: "تفاصيل الحساب للمدفوعات",
      bankName: "اسم البنك",
      bankNamePlaceholder: "اسم البنك الخاص بك",
      accountNumber: "رقم الحساب",
      accountPlaceholder: "رقم الحساب المصرفي",
      iban: "رقم الآيبان",
      ibanPlaceholder: "رقم الحساب المصرفي الدولي",
      swiftCode: "رمز السويفت",
      swiftPlaceholder: "رمز تعريف البنك",
      accountHolder: "اسم صاحب الحساب",
      holderPlaceholder: "الاسم في الحساب المصرفي",
      
      // Documents
      docsTitle: "الوثائق",
      docsSubtitle: "رفع الوثائق المطلوبة",
      businessLicense: "رخصة العمل",
      taxCertificate: "شهادة ضريبية",
      bankStatement: "كشف حساب مصرفي",
      ownershipDocs: "وثائق الملكية",
      uploadFile: "رفع ملف",
      supportedFormats: "المدعوم: PDF, JPG, PNG (حد أقصى 5 ميجا)"
    }
  };

  const t = content[language];

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderBusinessInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Building className="w-6 h-6 text-primary mr-3" />
        <div>
          <h2 className="text-xl font-semibold text-foreground">Step 1: Business Information</h2>
          <p className="text-sm text-muted-foreground">Tell us about your business</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="businessName" className="text-foreground font-medium">
            {t.businessName} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="businessName"
            value={formData.businessName}
            onChange={(e) => handleInputChange('businessName', e.target.value)}
            placeholder={t.businessNamePlaceholder}
            className="mt-2 bg-background border-input focus:border-primary"
            required
          />
          {errors.businessName && (
            <p className="text-sm text-destructive mt-1">{errors.businessName}</p>
          )}
        </div>

        <div>
          <Label htmlFor="businessType" className="text-foreground font-medium">
            {t.businessType} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="businessType"
            value={formData.businessType}
            onChange={(e) => handleInputChange('businessType', e.target.value)}
            placeholder={t.businessTypePlaceholder}
            className="mt-2 bg-background border-input focus:border-primary"
            required
          />
          {errors.businessType && (
            <p className="text-sm text-destructive mt-1">{errors.businessType}</p>
          )}
        </div>

        <div>
          <Label htmlFor="registrationNumber" className="text-foreground font-medium">
            {t.registrationNumber} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="registrationNumber"
            value={formData.registrationNumber}
            onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
            placeholder={t.registrationPlaceholder}
            className="mt-2 bg-background border-input focus:border-primary"
            required
          />
          {errors.registrationNumber && (
            <p className="text-sm text-destructive mt-1">{errors.registrationNumber}</p>
          )}
        </div>

        <div>
          <Label htmlFor="taxId" className="text-foreground font-medium">
            {t.taxId}
          </Label>
          <Input
            id="taxId"
            value={formData.taxId}
            onChange={(e) => handleInputChange('taxId', e.target.value)}
            placeholder={t.taxIdPlaceholder}
            className="mt-2 bg-background border-input focus:border-primary"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="businessAddress" className="text-foreground font-medium">
          {t.businessAddress} <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="businessAddress"
          value={formData.businessAddress}
          onChange={(e) => handleInputChange('businessAddress', e.target.value)}
          placeholder={t.addressPlaceholder}
          className="mt-2 bg-background border-input focus:border-primary resize-none"
          rows={3}
          required
        />
        {errors.businessAddress && (
          <p className="text-sm text-destructive mt-1">{errors.businessAddress}</p>
        )}
      </div>

      <div>
        <Label htmlFor="businessDescription" className="text-foreground font-medium">
          {t.businessDescription} <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="businessDescription"
          value={formData.businessDescription}
          onChange={(e) => handleInputChange('businessDescription', e.target.value)}
          placeholder={t.descriptionPlaceholder}
          className="mt-2 bg-background border-input focus:border-primary resize-none"
          rows={4}
          required
        />
        {errors.businessDescription && (
          <p className="text-sm text-destructive mt-1">{errors.businessDescription}</p>
        )}
      </div>
    </div>
  );

  const renderContactDetails = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <User className="w-6 h-6 text-primary mr-3" />
        <div>
          <h2 className="text-xl font-semibold text-foreground">Step 2: Contact Details</h2>
          <p className="text-sm text-muted-foreground">Primary contact information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="contactName" className="text-foreground font-medium">
            {t.contactName} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contactName"
            value={formData.contactName}
            onChange={(e) => handleInputChange('contactName', e.target.value)}
            placeholder={t.contactNamePlaceholder}
            className="mt-2 bg-background border-input focus:border-primary"
            required
          />
          {errors.contactName && (
            <p className="text-sm text-destructive mt-1">{errors.contactName}</p>
          )}
        </div>

        <div>
          <Label htmlFor="contactPosition" className="text-foreground font-medium">
            {t.contactPosition} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contactPosition"
            value={formData.contactPosition}
            onChange={(e) => handleInputChange('contactPosition', e.target.value)}
            placeholder={t.positionPlaceholder}
            className="mt-2 bg-background border-input focus:border-primary"
            required
          />
          {errors.contactPosition && (
            <p className="text-sm text-destructive mt-1">{errors.contactPosition}</p>
          )}
        </div>

        <div>
          <Label htmlFor="contactEmail" className="text-foreground font-medium">
            {t.contactEmail} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contactEmail"
            type="email"
            value={formData.contactEmail}
            onChange={(e) => handleInputChange('contactEmail', e.target.value)}
            placeholder={t.contactEmailPlaceholder}
            className="mt-2 bg-background border-input focus:border-primary"
            required
          />
          {errors.contactEmail && (
            <p className="text-sm text-destructive mt-1">{errors.contactEmail}</p>
          )}
        </div>

        <div>
          <Label htmlFor="contactPhone" className="text-foreground font-medium">
            {t.contactPhone} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="contactPhone"
            type="tel"
            value={formData.contactPhone}
            onChange={(e) => handleInputChange('contactPhone', e.target.value)}
            placeholder={t.contactPhonePlaceholder}
            className="mt-2 bg-background border-input focus:border-primary"
            required
          />
          {errors.contactPhone && (
            <p className="text-sm text-destructive mt-1">{errors.contactPhone}</p>
          )}
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
          <p className="text-sm text-muted-foreground">Account details for payouts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="bankName" className="text-foreground font-medium">
            {t.bankName} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="bankName"
            value={formData.bankName}
            onChange={(e) => handleInputChange('bankName', e.target.value)}
            placeholder={t.bankNamePlaceholder}
            className="mt-2 bg-background border-input focus:border-primary"
            required
          />
          {errors.bankName && (
            <p className="text-sm text-destructive mt-1">{errors.bankName}</p>
          )}
        </div>

        <div>
          <Label htmlFor="accountHolder" className="text-foreground font-medium">
            {t.accountHolder} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="accountHolder"
            value={formData.accountHolder}
            onChange={(e) => handleInputChange('accountHolder', e.target.value)}
            placeholder={t.holderPlaceholder}
            className="mt-2 bg-background border-input focus:border-primary"
            required
          />
          {errors.accountHolder && (
            <p className="text-sm text-destructive mt-1">{errors.accountHolder}</p>
          )}
        </div>

        <div>
          <Label htmlFor="accountNumber" className="text-foreground font-medium">
            {t.accountNumber} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="accountNumber"
            value={formData.accountNumber}
            onChange={(e) => handleInputChange('accountNumber', e.target.value)}
            placeholder={t.accountPlaceholder}
            className="mt-2 bg-background border-input focus:border-primary"
            required
          />
          {errors.accountNumber && (
            <p className="text-sm text-destructive mt-1">{errors.accountNumber}</p>
          )}
        </div>

        <div>
          <Label htmlFor="iban" className="text-foreground font-medium">
            {t.iban}
          </Label>
          <Input
            id="iban"
            value={formData.iban}
            onChange={(e) => handleInputChange('iban', e.target.value)}
            placeholder={t.ibanPlaceholder}
            className="mt-2 bg-background border-input focus:border-primary"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="swiftCode" className="text-foreground font-medium">
            {t.swiftCode}
          </Label>
          <Input
            id="swiftCode"
            value={formData.swiftCode}
            onChange={(e) => handleInputChange('swiftCode', e.target.value)}
            placeholder={t.swiftPlaceholder}
            className="mt-2 bg-background border-input focus:border-primary"
          />
        </div>
      </div>
    </div>
  );

  const renderDocumentation = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <FileText className="w-6 h-6 text-primary mr-3" />
        <div>
          <h2 className="text-xl font-semibold text-foreground">Step 4: Documentation</h2>
          <p className="text-sm text-muted-foreground">Upload required documents</p>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { key: "businessLicense", label: t.businessLicense, required: true },
          { key: "taxCertificate", label: t.taxCertificate, required: false },
          { key: "bankStatement", label: t.bankStatement, required: true },
          { key: "ownershipDocs", label: t.ownershipDocs, required: false }
        ].map((doc) => (
          <div key={doc.key} className="border-2 border-dashed border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Upload className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="font-medium text-foreground">
                    {doc.label} {doc.required && <span className="text-destructive">*</span>}
                  </div>
                  <div className="text-xs text-muted-foreground">{t.supportedFormats}</div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                {t.uploadFile}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const getCurrentStepComponent = () => {
    switch (currentStep) {
      case 1:
        return renderBusinessInfo();
      case 2:
        return renderContactDetails();
      case 3:
        return renderBankingInfo();
      case 4:
        return renderDocumentation();
      default:
        return renderBusinessInfo();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <Building className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="text-xl font-bold text-foreground">Dalal Pay</div>
            </Link>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Merchant Onboarding</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="text-muted-foreground hover:text-foreground"
              >
                <Globe className="w-4 h-4 mr-2" />
                {language === "en" ? "العربية" : "English"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container max-w-5xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center space-x-8">
            {t.steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all ${
                    index + 1 === currentStep
                      ? 'bg-primary text-primary-foreground border-primary'
                      : index + 1 < currentStep
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-muted-foreground border-muted-foreground/30'
                  }`}>
                    {index + 1 < currentStep ? <CheckCircle className="w-5 h-5" /> : index + 1}
                  </div>
                  <div className="mt-2 text-center">
                    <div className={`text-sm font-medium ${
                      index + 1 <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {step.subtitle}
                    </div>
                  </div>
                </div>
                {index < t.steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 mt-[-20px] ${
                    index + 1 < currentStep ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="container max-w-3xl mx-auto px-6 py-12">
        <Card className="border-0 shadow-lg">
          <div className="p-8">
            {getCurrentStepComponent()}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between p-8 pt-0">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.previous}
            </Button>

            <Button
              onClick={handleNext}
              className="flex items-center bg-primary hover:bg-primary/90"
            >
              {currentStep === totalSteps ? "Submit Application" : t.nextStep}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default KYCOnboarding;