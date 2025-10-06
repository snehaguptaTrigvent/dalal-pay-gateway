import { useState, useEffect } from "react";
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
  ChevronDown
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth"
// Removed unused locale JSON imports
// import kycEn from "@/locales/en/kyc.json";
// import kycAr from "@/locales/ar/kyc.json";
import { useTranslation } from "@/hooks/useTranslation";
import AfterLoginNav from "@/components/AfterLoginNav";

const DALAL_API_BASE_URL = import.meta.env.VITE_DALAL_API_BASE_URL;

interface FormData {
  // Basic Information
  type: string;
  country: string;
  email: string;
  business_type: string;
  business_profile_url: string;
  business_profile_mcc: string;
  statement_descriptor: string;
  industry_type: string;  
  individual_id_number: string;
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

interface IndustryType {
  id: number;
  name: string;
}

interface OnboardingData {
  id: number;
  business_email: string;
  website_url: string;
  statement_descriptor: string;
  mcc: number;
  social_security_num: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  bank_details: {
    account_holder_name: string;
    account_number: string;
    routing_number: string;
  };
  documents: Array<{
    document_name: string;
    document_url: string;
  }>;
  stripe_status: {
    stripe_account_id: string | null;
    is_active: boolean;
    message: string;
  };
}

const KYCOnboarding = () => {
  // State and hooks
  const [currentStep, setCurrentStep] = useState(1);
  const { token, user, isAuthenticated } = useAuth();
  const [industryTypes, setIndustryTypes] = useState<IndustryType[]>([]);
  const [loadingIndustries, setLoadingIndustries] = useState(false);
  const [existingData, setExistingData] = useState<OnboardingData | null>(null);
  const [loadingExistingData, setLoadingExistingData] = useState(true);

  const [formData, setFormData] = useState<FormData>({
    // Step 1: Basic Information
    type: "individual",
    country: "US",
    email: "",
    business_type: "",
    business_profile_url: "",
    business_profile_mcc: "",
    statement_descriptor: "",
    industry_type: "",
    // Step 2: Individual Information
    individual_id_number: "",
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

  const urlLang = window.location.pathname.split('/')[1] || 'en';
  const { language, setLanguage, t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  //const t = language === 'ar' ? kycAr : kycEn;
  const totalSteps = 4;

  // Build steps text from translation function
  const stepsTexts = [
    { title: t("kyc.steps[0].title"), subtitle: t("kyc.steps[0].subtitle") },
    { title: t("kyc.steps[1].title"), subtitle: t("kyc.steps[1].subtitle") },
    { title: t("kyc.steps[2].title"), subtitle: t("kyc.steps[2].subtitle") },
    { title: t("kyc.steps[3].title"), subtitle: t("kyc.steps[3].subtitle") }
  ];

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchExistingData = async () => {
      if (!token) return;      
      setLoadingExistingData(true);
      try {
        const response = await fetch(`${DALAL_API_BASE_URL}/merchant-onboarding/`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const result = await response.json();
          if (result.status === 'success' && result.data && Object.keys(result.data).length > 0) {
            setExistingData(result.data);
            prefilleFormData(result.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch existing onboarding data:", error);
      } finally {
        setLoadingExistingData(false);
      }
    };

    fetchExistingData();
  }, [token]);

  const prefilleFormData = (data: OnboardingData) => {
    setFormData(prev => ({
      ...prev,
      email: data.business_email || "",
      business_profile_url: data.website_url || "",
      statement_descriptor: data.statement_descriptor || "",
      industry_type: data.mcc ? data.mcc.toString() : "",

      individual_id_number: data.social_security_num || "",
      individual_address_line1: data.address || "",
      individual_address_city: data.city || "",
      individual_address_state: data.state || "",
      individual_address_postal_code: data.postal_code || "",

      external_account_account_holder_name: data.bank_details?.account_holder_name || "",
      external_account_account_number: data.bank_details?.account_number || "",
      external_account_routing_number: data.bank_details?.routing_number || "",
    }));
  };

  useEffect(() => {
    const fetchIndustryTypes = async () => {
      setLoadingIndustries(true);
      try {
        const response = await fetch(`${DALAL_API_BASE_URL}/merchant-onboarding/category-list/`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setIndustryTypes(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch industry types:", error);
        setIndustryTypes([
          { id: 1, name: "A/C, Refrigeration Repair" },
          { id: 2, name: "Accounting/Bookkeeping Services" },
          { id: 3, name: "Advertising Services" }
        ]);
      } finally {
        setLoadingIndustries(false);
      }
    };

    if (token) {
      fetchIndustryTypes();
    }
  }, [token]);


  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => {
        setFormData(prev => ({
          ...prev,
          tos_acceptance_ip: data.ip
        }));
      })
      .catch(err => {
        console.error('Error fetching IP address:', err);
      });
  }, []);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ar" : "en";
    setLanguage(newLang);
    const pathParts = window.location.pathname.split('/');
    pathParts[1] = newLang;
    const newPath = pathParts.join('/');
    navigate(newPath);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateStep = (step: number) => {
    const newErrors: {[key: string]: string} = {};
    
    switch (step) {
      case 1:
        if (!formData.email.trim()) {
          newErrors.email = "validation.emailRequired";
        } else if (!validateEmail(formData.email)) {
          newErrors.email = "validation.emailInvalid";
        }
        if (!formData.business_profile_url.trim()) {
          newErrors.business_profile_url = "validation.urlRequired";
        } else {
          try {
            new URL(formData.business_profile_url);
          } catch {
            newErrors.business_profile_url = "validation.urlInvalid";
          }
        }
        if (!formData.statement_descriptor.trim()) {
          newErrors.statement_descriptor = "validation.statementRequired";
        } else if (!/^[a-zA-Z0-9\s]+$/.test(formData.statement_descriptor)) {
          newErrors.statement_descriptor = "validation.statementInvalidChars";
        }
        if (!formData.industry_type) newErrors.industry_type = "validation.industryTypeRequired";
        break;

      case 2:
        if (!formData.individual_id_number.trim()) {newErrors.individual_id_number = "validation.idRequired";}
        else if(!/^[a-zA-Z0-9]+$/.test(formData.individual_id_number.trim())|| formData.individual_id_number.trim().length > 25) 
          {newErrors.individual_id_number = "validation.idAlphaNumericOnly"; }
        if (!formData.individual_address_line1.trim()) newErrors.individual_address_line1 = "validation.addressRequired";
        if (!formData.individual_address_city.trim()) newErrors.individual_address_city = "validation.cityRequired";
        if (!formData.individual_address_state.trim()) newErrors.individual_address_state = "validation.stateRequired";
        if (!formData.individual_address_postal_code.trim()) {newErrors.individual_address_postal_code = "validation.postalRequired";
        } else if (!/^[a-zA-Z0-9]+$/.test(formData.individual_address_postal_code.trim()) || formData.individual_address_postal_code.trim().length > 11) {
          newErrors.individual_address_postal_code = "validation.postalAlphaNumericOnly";
        }
        break;

      case 3:
        if (!formData.external_account_account_number.trim()) newErrors.external_account_account_number = "validation.accountNumberRequired";
        else if(!/^[a-zA-Z0-9]+$/.test(formData.external_account_account_number.trim())) {newErrors.external_account_account_number = "validation.ValidAccountNumber"; }
        if (!formData.external_account_routing_number.trim()) newErrors.external_account_routing_number = "validation.routingNumberRequired";
        else if(!/^[a-zA-Z0-9]+$/.test(formData.external_account_routing_number.trim())) {newErrors.external_account_routing_number = "validation.ValidRoutingNumber"; }
        if (!formData.external_account_account_holder_name.trim()) newErrors.external_account_account_holder_name = "validation.accountHolderRequired";
        else if(!/^[a-zA-Z0-9\s]+$/.test(formData.external_account_account_holder_name.trim())) {newErrors.external_account_account_holder_name = "validation.ValidAccountHolderName"; }
        break;
        
      case 4:
        if (!formData.individual_verification_document_front &&  (!existingData?.documents || existingData.documents.length === 0)) {
          newErrors.individual_verification_document_front = "validation.documentRequired";
        }else if (formData.individual_verification_document_front){
          const fileExtension = formData.individual_verification_document_front.name.split('.').pop().toLowerCase();
          const maxFileSizeBytes = 5 * 1024 * 1024;
          if (!['jpg', 'jpeg', 'png', 'pdf'].includes(fileExtension)) {
            newErrors.individual_verification_document_front = "validation.invalidFileType";
          }
          else if (formData.individual_verification_document_front.size > maxFileSizeBytes) {
            newErrors.individual_verification_document_front = "validation.fileTooLarge";
          }
        }

        break;
    }
    
    return newErrors;
  };

  const handleInputChange = (field, value) => {
    setFormData({...formData, [field]: value});
    
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
      setSubmitting(true);
      const formPayload = new FormData();
      const accountsData = {
        business_email: formData.email,
        website_url: formData.business_profile_url,
        statement_descriptor: formData.statement_descriptor,
        address: formData.individual_address_line1,
        city: formData.individual_address_city,
        state: formData.individual_address_state,
        postal_code: formData.individual_address_postal_code,
        social_security_num: formData.individual_id_number,
        ip_address: formData.tos_acceptance_ip,
        country_code: formData.country || "US",
        mcc: formData.industry_type
      };
      formPayload.append('accounts_data', JSON.stringify(accountsData));

      const bankDetails = {
        account_holder_name: formData.external_account_account_holder_name,
        account_number: formData.external_account_account_number,
        routing_number: formData.external_account_routing_number
      };
      formPayload.append('bank_details', JSON.stringify(bankDetails));
      
      if (formData.individual_verification_document_front) {
        formPayload.append('documents', formData.individual_verification_document_front);
      }
      
      try {
        const method = existingData ? "PUT" : "POST";
        const response = await fetch(`${DALAL_API_BASE_URL}/merchant-onboarding/`, {
          method: method,
          headers: {
            "Authorization": `Bearer ${token}`,
          },
          body: formPayload
        });
        const result = await response.json();
        console.log(result);
        if (!response.ok) {
          if (result.message && result.message.includes("user already exists.")) {
            toast({
              title: language === "en" ? "Submission Error" : "خطأ في الإرسال",
              description: language === "en"
                ? "You have already submitted the application. Please wait for approval."
                : "لقد قمت بإرسال الطلب مسبقًا. يرجى انتظار الموافقة.",
              variant: "destructive"
            });
          }else{
            throw new Error("Submission failed");
          }
        }
        toast({
          title: language === "en" ? "Application Submitted Successfully" : "تم إرسال الطلب بنجاح",
          description: language === "en"
            ? existingData 
              ? "Your application has been updated successfully!" 
              : "Your application is under review. We'll notify you once approved."
            : existingData
              ? "تم تحديث طلبك بنجاح!"
              : "طلبك قيد المراجعة. سنخبرك عند الموافقة."
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

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (loadingExistingData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your application data...</p>
        </div>
      </div>
    );
  }

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <Building className="w-6 h-6 text-primary mr-3" />
        <div>
          <h2 className="text-xl font-semibold text-foreground">{t("kyc.steps[0].title")}</h2>
          <p className="text-sm text-muted-foreground">{t("kyc.steps[0].subtitle")}</p>
          {existingData && (
            <p className="text-sm text-green-600 mt-1">
              ✓ You have existing application data. You can update your information.
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="email" className="text-foreground font-medium">
            {t("kyc.email")} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder={t("kyc.emailPlaceholder")}
            className="mt-2 bg-background border-input focus:border-primary"
            required
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{t(`kyc.${errors.email}`)}</p>
          )}
        </div>

        <div>
          <Label htmlFor="business_profile_url" className="text-foreground font-medium">
            {t("kyc.businessUrl")} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="business_profile_url"
            type="url"
            value={formData.business_profile_url}
            onChange={(e) => handleInputChange('business_profile_url', e.target.value)}
            placeholder={t("kyc.urlPlaceholder")}
            className="mt-2 bg-background border-input focus:border-primary"
            required
          />
          {errors.business_profile_url && (
            <p className="text-sm text-destructive mt-1">{t(`kyc.${errors.business_profile_url}`)}</p>
          )}
        </div>

        <div>
          <Label htmlFor="industry_type" className="text-foreground font-medium">
            {t("kyc.industryType")} <span className="text-destructive">*</span>
          </Label>
          <div className="mt-2 relative">
            <select
              id="industry_type"
              value={formData.industry_type}
              onChange={(e) => handleInputChange('industry_type', e.target.value)}
              className="w-full px-3 py-2 bg-background border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary appearance-none"
              required
            >
              <option value="">{t("kyc.selectIndustry")}</option>
              {industryTypes.map((industry) => (
                <option key={industry.id} value={industry.id}>
                  {industry.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
          {errors.industry_type && (
            <p className="text-sm text-destructive mt-1">{t(`kyc.${errors.industry_type}`)}</p>
          )}
        </div>

        <div>
          <Label htmlFor="statement_descriptor" className="text-foreground font-medium">
            {t("kyc.statementDescriptor")} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="statement_descriptor"
            value={formData.statement_descriptor}
            onChange={(e) => handleInputChange('statement_descriptor', e.target.value)}
            placeholder={t("kyc.descriptorPlaceholder")}
            className="mt-2 bg-background border-input focus:border-primary"
            maxLength={22}
            required
          />
          {errors.statement_descriptor && (
            <p className="text-sm text-destructive mt-1">{t(`kyc.${errors.statement_descriptor}`)}</p>
          )}
          <p className="text-xs text-muted-foreground mt-1">{t("kyc.max22Chars")}</p>
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>{t("kyc.accountTypeLabel")}</strong> {t("kyc.accountTypeIndividual")}<br/>
          <strong>{t("kyc.countryLabel")}</strong> {t("kyc.countryUnitedStates")}<br/>
          <strong>{t("kyc.capabilitiesLabel")}</strong> {t("kyc.capabilitiesList")}
        </p>
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center mb-6">
        <User className="w-6 h-6 text-primary mr-3" />
        <div>
          <h2 className="text-xl font-semibold text-foreground">{t("kyc.steps[1].title")}</h2>
          <p className="text-sm text-muted-foreground">{t("kyc.steps[1].subtitle")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <Label htmlFor="individual_id_number" className="text-foreground font-medium">
            {t("kyc.idNumber")} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="individual_id_number"
            value={formData.individual_id_number}
            onChange={(e) => handleInputChange('individual_id_number', e.target.value)}
            placeholder={t("kyc.idPlaceholder")}
            className="mt-2 bg-background border-input focus:border-primary"
            required
          />
          {errors.individual_id_number && (
            <p className="text-sm text-destructive mt-1">{t(`kyc.${errors.individual_id_number}`)}</p>
          )}
        </div>
      </div>

      <div>
        <Label className="text-foreground font-medium">
          {t("kyc.address")} <span className="text-destructive">*</span>
        </Label>
        <div className="space-y-4 mt-2">
          <div>
            <Input
              id="individual_address_line1"
              value={formData.individual_address_line1}
              onChange={(e) => handleInputChange('individual_address_line1', e.target.value)}
              placeholder={t("kyc.addressPlaceholder")}
              className="bg-background border-input focus:border-primary"
              required
            />
            {errors.individual_address_line1 && (
              <p className="text-sm text-destructive mt-1">{t(`kyc.${errors.individual_address_line1}`)}</p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Input
                id="individual_address_city"
                value={formData.individual_address_city}
                onChange={(e) => handleInputChange('individual_address_city', e.target.value)}
                placeholder={t("kyc.cityPlaceholder")}
                className="bg-background border-input focus:border-primary"
                required
              />
              {errors.individual_address_city && (
                <p className="text-sm text-destructive mt-1">{t(`kyc.${errors.individual_address_city}`)}</p>
              )}
            </div>
            <div>
              <Input
                id="individual_address_state"
                value={formData.individual_address_state}
                onChange={(e) => handleInputChange('individual_address_state', e.target.value)}
                placeholder={t("kyc.statePlaceholder")}
                className="bg-background border-input focus:border-primary"
                required
              />
              {errors.individual_address_state && (
                <p className="text-sm text-destructive mt-1">{t(`kyc.${errors.individual_address_state}`)}</p>
              )}
            </div>
            <div>
              <Input
                id="individual_address_postal_code"
                value={formData.individual_address_postal_code}
                onChange={(e) => handleInputChange('individual_address_postal_code', e.target.value)}
                placeholder={t("kyc.postalPlaceholder")}
                className="bg-background border-input focus:border-primary"
                required
              />
              {errors.individual_address_postal_code && (
                <p className="text-sm text-destructive mt-1">{t(`kyc.${errors.individual_address_postal_code}`)}</p>
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
          <h2 className="text-xl font-semibold text-foreground">{t("kyc.steps[2].title")}</h2>
          <p className="text-sm text-muted-foreground">{t("kyc.steps[2].subtitle")}</p>
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg mb-6">
        <p className="text-sm text-muted-foreground">
          <strong>{t("kyc.accountTypeLabel")}</strong> {t("kyc.accountTypeUs")}<br/>
          <strong>{t("kyc.currencyLabel")}</strong> {t("kyc.currencyUsd")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="external_account_account_number" className="text-foreground font-medium">
            {t("kyc.accountNumber")} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="external_account_account_number"
            value={formData.external_account_account_number}
            onChange={(e) => handleInputChange('external_account_account_number', e.target.value)}
            placeholder={t("kyc.accountPlaceholder")}
            className="mt-2 bg-background border-input focus:border-primary"
            required
          />
          {errors.external_account_account_number && (
            <p className="text-sm text-destructive mt-1">{t(`kyc.${errors.external_account_account_number}`)}</p>
          )}
        </div>

        <div>
          <Label htmlFor="external_account_routing_number" className="text-foreground font-medium">
            {t("kyc.routingNumber")} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="external_account_routing_number"
            value={formData.external_account_routing_number}
            onChange={(e) => handleInputChange('external_account_routing_number', e.target.value)}
            placeholder={t("kyc.routingPlaceholder")}
            className="mt-2 bg-background border-input focus:border-primary"
            required
          />
          {errors.external_account_routing_number && (
            <p className="text-sm text-destructive mt-1">{t(`kyc.${errors.external_account_routing_number}`)}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="external_account_account_holder_name" className="text-foreground font-medium">
            {t("kyc.accountHolder")} <span className="text-destructive">*</span>
          </Label>
          <Input
            id="external_account_account_holder_name"
            value={formData.external_account_account_holder_name}
            onChange={(e) => handleInputChange('external_account_account_holder_name', e.target.value)}
            placeholder={t("kyc.holderPlaceholder")}
            className="mt-2 bg-background border-input focus:border-primary"
            required
          />
          {errors.external_account_account_holder_name && (
            <p className="text-sm text-destructive mt-1">{t(`kyc.${errors.external_account_account_holder_name}`)}</p>
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
            <h2 className="text-xl font-semibold text-foreground">{t("kyc.steps[3].title")}</h2>
            <p className="text-sm text-muted-foreground">{t("kyc.steps[3].subtitle")}</p>
          </div>
        </div>

        <div>
          <Label htmlFor="individual_verification_document_front" className="text-foreground font-medium">
            {t("kyc.identityDocument")} <span className="text-destructive">*</span>
          </Label>
          <div className="mt-2">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
              <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                {t("kyc.uploadPhotoHelp")}
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
                {t("kyc.uploadDocument")}
              </Button>
              {formData.individual_verification_document_front && (
                <p className="text-sm text-primary mt-2">
                  ✓ {formData.individual_verification_document_front.name}
                </p>
              )}
              {existingData?.documents && existingData.documents.length > 0 && (
                <>
                  <p className="text-sm text-green-600 mt-2">
                    {t("kyc.alreadyUploadedPrefix")} <b>{existingData.documents[0].document_name}</b> {t("kyc.documentWord")}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t("kyc.newUploadReplaces")}
                  </p>
                </>
              )}
            </div>
            {errors.individual_verification_document_front && (
              <p className="text-sm text-destructive mt-1">{t(`kyc.${errors.individual_verification_document_front}`)}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">{t("kyc.supportedFormats")}</p>
          </div>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <Label className="text-foreground font-medium">
                {t("kyc.termsAcceptance")}
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                {t("kyc.acceptTerms")}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>{t("kyc.nextStepsTitle")}</strong><br/>
            • {t("kyc.nextStepsReview")}<br/>
            • {t("kyc.nextStepsDocs")}<br/>
            • {t("kyc.nextStepsEmail")}
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
      <AfterLoginNav language={language} setLanguage={setLanguage} />

      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link to={`/${language}/merchant/dashboard`} className="flex items-center space-x-3">
              <ArrowLeft className="w-5 h-5" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                 {t("kyc.kycHeaderTitle")}
                </h1>
                <p className="text-sm text-muted-foreground">
                    {t("kyc.kycHeaderDesc")} </p>
              </div>
            </Link>
           
           
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="border-b border-border bg-card">
        <div className="container max-w-5xl mx-auto px-6 py-4 ">
          <div className="flex flex-col md:flex-row md:items-center items-start justify-between gap-6 md:gap-0 ">
            {stepsTexts.map((step, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index < stepsTexts.length - 1 ? "flex-1" : ""
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
                {index < stepsTexts.length - 1 && (
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
          <div className="flex flex-col md:flex-row justify-between mt-8 pt-6 border-t border-border gap-4 md:gap-0">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t("kyc.previous")}</span>
            </Button>

            <Button
              onClick={handleNext}
              disabled={submitting}
              className="flex items-center space-x-2"
            >
              <span>
                {currentStep === totalSteps 
                  ? (submitting 
                      ? t("kyc.submitting")
                      : existingData 
                        ? t("kyc.updateApplication")
                        : (t("kyc.submit") || "Submit Application"))
                  : (t("kyc.nextStep") || "Next Step")
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