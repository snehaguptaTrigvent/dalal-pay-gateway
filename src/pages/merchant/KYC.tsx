import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Building, 
  CreditCard, 
  FileText, 
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Upload,
  Globe,
  MapPin,
  Calendar,
  Briefcase
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const KYCOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();
  const { toast } = useToast();

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  // Form data state
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nationality: "",
    idNumber: "",
    address: "",
    city: "",
    country: "",
    
    // Business Info
    businessType: "",
    businessCategory: "",
    businessDescription: "",
    businessAddress: "",
    businessCity: "",
    businessCountry: "",
    taxNumber: "",
    
    // Bank Details
    bankName: "",
    accountNumber: "",
    iban: "",
    swiftCode: "",
    accountHolder: "",
    
    // Documents
    idDocument: null,
    businessLicense: null,
    bankStatement: null,
    additionalDocs: null
  });

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const content = {
    en: {
      title: "KYC Verification",
      subtitle: "Complete your verification to start accepting payments",
      steps: [
        "Personal Information",
        "Business Details", 
        "Bank Account",
        "Document Upload",
        "Review & Submit"
      ],
      continue: "Continue",
      back: "Back",
      submit: "Submit for Review",
      complete: "Complete KYC",
      
      // Personal Info
      personalTitle: "Personal Information",
      personalSubtitle: "Tell us about yourself",
      firstName: "First Name",
      lastName: "Last Name",
      dateOfBirth: "Date of Birth",
      nationality: "Nationality",
      idNumber: "ID Number",
      address: "Address",
      city: "City",
      country: "Country",
      
      // Business Info
      businessTitle: "Business Information",
      businessSubtitle: "Tell us about your business",
      businessType: "Business Type",
      businessCategory: "Business Category",
      businessDescription: "Business Description",
      businessAddress: "Business Address",
      taxNumber: "Tax Registration Number",
      
      // Bank Details
      bankTitle: "Bank Account Details",
      bankSubtitle: "Where you'll receive your payments",
      bankName: "Bank Name",
      accountNumber: "Account Number",
      iban: "IBAN",
      swiftCode: "SWIFT/BIC Code",
      accountHolder: "Account Holder Name",
      
      // Documents
      docsTitle: "Document Upload",
      docsSubtitle: "Upload required documents for verification",
      idDocument: "Government ID",
      businessLicense: "Business License",
      bankStatement: "Bank Statement",
      additionalDocs: "Additional Documents",
      
      // Review
      reviewTitle: "Review Your Information",
      reviewSubtitle: "Please review all information before submission"
    },
    ar: {
      title: "التحقق من الهوية",
      subtitle: "أكمل التحقق من هويتك لبدء قبول المدفوعات",
      steps: [
        "المعلومات الشخصية",
        "تفاصيل الأعمال",
        "الحساب المصرفي", 
        "تحميل المستندات",
        "المراجعة والإرسال"
      ],
      continue: "متابعة",
      back: "رجوع",
      submit: "إرسال للمراجعة",
      complete: "إكمال التحقق",
      
      // Personal Info
      personalTitle: "المعلومات الشخصية",
      personalSubtitle: "أخبرنا عن نفسك",
      firstName: "الاسم الأول",
      lastName: "الاسم الأخير",
      dateOfBirth: "تاريخ الميلاد",
      nationality: "الجنسية",
      idNumber: "رقم الهوية",
      address: "العنوان",
      city: "المدينة", 
      country: "البلد",
      
      // Business Info
      businessTitle: "معلومات الأعمال",
      businessSubtitle: "أخبرنا عن عملك",
      businessType: "نوع العمل",
      businessCategory: "فئة العمل",
      businessDescription: "وصف العمل",
      businessAddress: "عنوان العمل",
      taxNumber: "رقم التسجيل الضريبي",
      
      // Bank Details
      bankTitle: "تفاصيل الحساب المصرفي",
      bankSubtitle: "حيث ستتلقى مدفوعاتك",
      bankName: "اسم البنك",
      accountNumber: "رقم الحساب",
      iban: "الآيبان",
      swiftCode: "رمز السويفت",
      accountHolder: "اسم صاحب الحساب",
      
      // Documents
      docsTitle: "تحميل المستندات",
      docsSubtitle: "حمّل المستندات المطلوبة للتحقق",
      idDocument: "هوية حكومية",
      businessLicense: "رخصة العمل",
      bankStatement: "كشف حساب مصرفي",
      additionalDocs: "مستندات إضافية",
      
      // Review
      reviewTitle: "راجع معلوماتك",
      reviewSubtitle: "يرجى مراجعة جميع المعلومات قبل الإرسال"
    }
  };

  const t = content[language];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: language === "en" ? "KYC Submitted Successfully" : "تم إرسال التحقق بنجاح",
      description: language === "en" ? "Your application is under review. We'll notify you once approved." : "طلبك قيد المراجعة. سنخبرك عند الموافقة."
    });
    
    setTimeout(() => {
      navigate("/merchant/dashboard");
    }, 2000);
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <User className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">{t.personalTitle}</h2>
        <p className="text-muted-foreground">{t.personalSubtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="text-foreground font-medium">{t.firstName}</Label>
          <Input
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
            className="mt-2 bg-muted/30 border-border focus:border-primary"
          />
        </div>
        <div>
          <Label className="text-foreground font-medium">{t.lastName}</Label>
          <Input
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
            className="mt-2 bg-muted/30 border-border focus:border-primary"
          />
        </div>
        <div>
          <Label className="text-foreground font-medium">{t.dateOfBirth}</Label>
          <Input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
            className="mt-2 bg-muted/30 border-border focus:border-primary"
          />
        </div>
        <div>
          <Label className="text-foreground font-medium">{t.nationality}</Label>
          <Select onValueChange={(value) => setFormData({...formData, nationality: value})}>
            <SelectTrigger className="mt-2 bg-muted/30 border-border focus:border-primary">
              <SelectValue placeholder="Select nationality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ae">UAE</SelectItem>
              <SelectItem value="sa">Saudi Arabia</SelectItem>
              <SelectItem value="eg">Egypt</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-foreground font-medium">{t.idNumber}</Label>
          <Input
            value={formData.idNumber}
            onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
            className="mt-2 bg-muted/30 border-border focus:border-primary"
          />
        </div>
        <div>
          <Label className="text-foreground font-medium">{t.country}</Label>
          <Select onValueChange={(value) => setFormData({...formData, country: value})}>
            <SelectTrigger className="mt-2 bg-muted/30 border-border focus:border-primary">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ae">United Arab Emirates</SelectItem>
              <SelectItem value="sa">Saudi Arabia</SelectItem>
              <SelectItem value="eg">Egypt</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="text-foreground font-medium">{t.address}</Label>
        <Textarea
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
          className="mt-2 bg-muted/30 border-border focus:border-primary resize-none"
          rows={3}
        />
      </div>
    </div>
  );

  const renderBusinessInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Building className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">{t.businessTitle}</h2>
        <p className="text-muted-foreground">{t.businessSubtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="text-foreground font-medium">{t.businessType}</Label>
          <Select onValueChange={(value) => setFormData({...formData, businessType: value})}>
            <SelectTrigger className="mt-2 bg-muted/30 border-border focus:border-primary">
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="llc">LLC</SelectItem>
              <SelectItem value="corporation">Corporation</SelectItem>
              <SelectItem value="partnership">Partnership</SelectItem>
              <SelectItem value="sole">Sole Proprietorship</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-foreground font-medium">{t.businessCategory}</Label>
          <Select onValueChange={(value) => setFormData({...formData, businessCategory: value})}>
            <SelectTrigger className="mt-2 bg-muted/30 border-border focus:border-primary">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="services">Services</SelectItem>
              <SelectItem value="ecommerce">E-commerce</SelectItem>
              <SelectItem value="software">Software</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="text-foreground font-medium">{t.businessDescription}</Label>
        <Textarea
          value={formData.businessDescription}
          onChange={(e) => setFormData({...formData, businessDescription: e.target.value})}
          className="mt-2 bg-muted/30 border-border focus:border-primary resize-none"
          rows={4}
          placeholder="Describe your business activities..."
        />
      </div>

      <div>
        <Label className="text-foreground font-medium">{t.businessAddress}</Label>
        <Textarea
          value={formData.businessAddress}
          onChange={(e) => setFormData({...formData, businessAddress: e.target.value})}
          className="mt-2 bg-muted/30 border-border focus:border-primary resize-none"
          rows={3}
        />
      </div>

      <div>
        <Label className="text-foreground font-medium">{t.taxNumber}</Label>
        <Input
          value={formData.taxNumber}
          onChange={(e) => setFormData({...formData, taxNumber: e.target.value})}
          className="mt-2 bg-muted/30 border-border focus:border-primary"
        />
      </div>
    </div>
  );

  const renderBankDetails = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <CreditCard className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">{t.bankTitle}</h2>
        <p className="text-muted-foreground">{t.bankSubtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="text-foreground font-medium">{t.bankName}</Label>
          <Input
            value={formData.bankName}
            onChange={(e) => setFormData({...formData, bankName: e.target.value})}
            className="mt-2 bg-muted/30 border-border focus:border-primary"
          />
        </div>
        <div>
          <Label className="text-foreground font-medium">{t.accountHolder}</Label>
          <Input
            value={formData.accountHolder}
            onChange={(e) => setFormData({...formData, accountHolder: e.target.value})}
            className="mt-2 bg-muted/30 border-border focus:border-primary"
          />
        </div>
        <div>
          <Label className="text-foreground font-medium">{t.accountNumber}</Label>
          <Input
            value={formData.accountNumber}
            onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
            className="mt-2 bg-muted/30 border-border focus:border-primary"
          />
        </div>
        <div>
          <Label className="text-foreground font-medium">{t.iban}</Label>
          <Input
            value={formData.iban}
            onChange={(e) => setFormData({...formData, iban: e.target.value})}
            className="mt-2 bg-muted/30 border-border focus:border-primary"
          />
        </div>
      </div>

      <div>
        <Label className="text-foreground font-medium">{t.swiftCode}</Label>
        <Input
          value={formData.swiftCode}
          onChange={(e) => setFormData({...formData, swiftCode: e.target.value})}
          className="mt-2 bg-muted/30 border-border focus:border-primary"
        />
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">{t.docsTitle}</h2>
        <p className="text-muted-foreground">{t.docsSubtitle}</p>
      </div>

      <div className="space-y-6">
        {[
          { key: "idDocument", label: t.idDocument, required: true },
          { key: "businessLicense", label: t.businessLicense, required: true },
          { key: "bankStatement", label: t.bankStatement, required: true },
          { key: "additionalDocs", label: t.additionalDocs, required: false }
        ].map((doc) => (
          <div key={doc.key} className="border-2 border-dashed border-border rounded-lg p-6 hover:border-primary/50 transition-smooth">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Upload className="w-6 h-6 text-primary" />
                <div>
                  <div className="font-medium text-foreground">{doc.label}</div>
                  {doc.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                </div>
              </div>
              <Button variant="outline">
                Upload File
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Supported formats: PDF, JPG, PNG (Max 5MB)
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">{t.reviewTitle}</h2>
        <p className="text-muted-foreground">{t.reviewSubtitle}</p>
      </div>

      <div className="space-y-6">
        {/* Personal Info Summary */}
        <Card className="p-6 bg-gradient-card border-0">
          <h3 className="font-semibold text-foreground mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-primary" />
            {t.personalTitle}
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Name:</span>
              <div className="font-medium">{formData.firstName} {formData.lastName}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Nationality:</span>
              <div className="font-medium">{formData.nationality || "Not specified"}</div>
            </div>
          </div>
        </Card>

        {/* Business Info Summary */}
        <Card className="p-6 bg-gradient-card border-0">
          <h3 className="font-semibold text-foreground mb-4 flex items-center">
            <Building className="w-5 h-5 mr-2 text-primary" />
            {t.businessTitle}
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Type:</span>
              <div className="font-medium">{formData.businessType || "Not specified"}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Category:</span>
              <div className="font-medium">{formData.businessCategory || "Not specified"}</div>
            </div>
          </div>
        </Card>

        {/* Bank Details Summary */}
        <Card className="p-6 bg-gradient-card border-0">
          <h3 className="font-semibold text-foreground mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-primary" />
            {t.bankTitle}
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Bank:</span>
              <div className="font-medium">{formData.bankName || "Not specified"}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Account Holder:</span>
              <div className="font-medium">{formData.accountHolder || "Not specified"}</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderPersonalInfo();
      case 2: return renderBusinessInfo();
      case 3: return renderBankDetails();
      case 4: return renderDocuments();
      case 5: return renderReview();
      default: return renderPersonalInfo();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Dalal Pay
              </div>
              <Badge variant="secondary">{t.title}</Badge>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === "en" ? "العربية" : "English"}
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-background/50 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {/* Step Labels */}
          <div className="grid grid-cols-5 gap-2">
            {t.steps.map((step, index) => (
              <div 
                key={index}
                className={`text-center p-2 rounded-lg transition-smooth ${
                  index + 1 === currentStep 
                    ? "bg-primary/10 text-primary" 
                    : index + 1 < currentStep 
                    ? "bg-success/10 text-success"
                    : "text-muted-foreground"
                }`}
              >
                <div className="text-xs font-medium">{step}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-8 shadow-strong bg-card/95 backdrop-blur-sm border-0">
          {renderCurrentStep()}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.back}
            </Button>
            
            {currentStep === totalSteps ? (
              <Button variant="gradient" onClick={handleSubmit}>
                {t.complete}
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button variant="gradient" onClick={handleNext}>
                {t.continue}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default KYCOnboarding;