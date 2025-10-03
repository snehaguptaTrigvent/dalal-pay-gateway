import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Building, 
  CreditCard, 
  FileText, 
  Settings,
  BarChart3,
  DollarSign,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
  Download,
  Globe,
  Bell,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import AfterLoginNav from "@/components/AfterLoginNav";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const DALAL_API_BASE_URL = import.meta.env.VITE_DALAL_API_BASE_URL;

interface KYCStatusResponse {
  status: "success" | "error";
  message: string;
  data: {
    account_info?: {
      charges_enabled: boolean;
      payouts_enabled: boolean;
      details_submitted: boolean;
      capabilities: Record<string, string>;
      requirements: {
        alternatives: any[];
        current_deadline: string | null;
        currently_due: string[];
        disabled_reason: string | null;
        errors: any[];
        eventually_due: string[];
        past_due: string[];
        pending_verification: string[];
      };
    };
    account_status?: string;
    onboarding_data?: boolean;
  };
}

const MerchantDashboard = () => {
  const { language, setLanguage, t } = useTranslation();
  const { token } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [kycStatus, setKycStatus] = useState<"pending" | "approved" | "rejected" | "not_started">("not_started");
  const [kycData, setKycData] = useState<KYCStatusResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [kycDialogOpen, setKycDialogOpen] = useState(false);

  const merchantData = {
    name: "John Doe",
    companyName: "TechCorp Solutions",
    email: "john@techcorp.com",
    phone: "+971 50 123 4567",
    joinDate: "2024-01-15"
  };

  const stats = {
    totalTransactions: 1247,
    totalRevenue: 125670.50,
    successRate: 98.5,
    avgProcessingTime: "2.3s"
  };

  const recentTransactions = [
    { id: "TX001", amount: 250.00, status: "completed", date: "2024-01-15 14:30" },
    { id: "TX002", amount: 150.75, status: "pending", date: "2024-01-15 13:45" },
    { id: "TX003", amount: 500.00, status: "completed", date: "2024-01-15 12:20" },
  ];

  useEffect(() => {
    const fetchKYCStatus = async () => {
      if (!token) return;
      
      setLoading(true);
      try {
        const response = await fetch(`${DALAL_API_BASE_URL}/merchant-onboarding/initiate/`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        
        const data: KYCStatusResponse = await response.json();
        setKycData(data);
        
        if (data.data.onboarding_data === false) {
          setKycStatus("not_started");
        } 
        else if (data.status === "success" && data.data.account_status === "Active") {
          setKycStatus("approved");
        } 
        else if (data.status === "error" || 
                (data.data.account_info && 
                 (data.data.account_info.requirements?.currently_due.length > 0 || 
                  data.data.account_info.requirements?.past_due.length > 0))) {
          setKycStatus("pending");
        } 
        // Default to pending if we have onboarding data but no clear status
        else if (data.data.onboarding_data === true) {
          setKycStatus("pending");
        }
        // Fallback
        else {
          setKycStatus("not_started");
        }
      } catch (error) {
        console.error("Failed to fetch KYC status:", error);
        toast({
          title: "Error",
          description: "Failed to load KYC status",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchKYCStatus();
  }, [token, toast]);

  const getKycStatusBadge = () => {
    switch (kycStatus) {
      case "approved":
        return (
          <Badge className="bg-success/10 text-success border-success/20">
            <CheckCircle className="w-4 h-4 mr-2" />
            {t("dashboard.kycApproved")}
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20">
            <XCircle className="w-4 h-4 mr-2" />
            {t("dashboard.kycRejected")}
          </Badge>
        );
      case "not_started":
        return (
          <Badge className="bg-muted/10 text-muted-foreground border-muted/20">
            <Clock className="w-4 h-4 mr-2" />
            {t("dashboard.kycNotStarted")}
          </Badge>
        );
      default:
        return (
          <Badge className="bg-warning/10 text-warning border-warning/20">
            <AlertCircle className="w-4 h-4 mr-2" />
            {t("dashboard.kycPending")}
          </Badge>
        );
    }
  };

  const getKycProgressValue = () => {
    switch (kycStatus) {
      case "approved": return 100;
      case "not_started": return 0;
      case "rejected": return 25;
      default: return 75; // pending
    }
  };

  const getRequirementsList = () => {
    if (!kycData?.data?.account_info?.requirements) return [];
    
    const requirements = kycData.data.account_info.requirements;
    return [
      ...requirements.currently_due,
      ...requirements.past_due,
      ...requirements.eventually_due,
      ...requirements.pending_verification
    ];
  };

  const handleStartOnboarding = () => {
    navigate(`/${language}/merchant/kyc`);
  };

  const renderKYCAlert = () => {
    if (loading) {
      return (
        <Card className="p-6 mb-8 bg-secondary/5 border-secondary/20">
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-secondary"></div>
            <div>
              <h3 className="font-semibold text-foreground">Loading KYC Status...</h3>
              <p className="text-muted-foreground">Checking your verification status</p>
            </div>
          </div>
        </Card>
      );
    }

    // Show "Start Onboarding" only when onboarding_data is false
    if (kycData?.data?.onboarding_data === false) {
      return (
        <Card className="p-6 mb-8 bg-secondary/5 border-secondary/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <AlertCircle className="w-8 h-8 text-secondary" />
              <div>
                <h3 className="font-semibold text-foreground">KYC Verification Required</h3>
                <p className="text-muted-foreground">
                  You need to complete KYC verification to start accepting payments.
                </p>
              </div>
            </div>
            <Button onClick={handleStartOnboarding}>
              Start Onboarding
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Card>
      );
    }

    if (kycStatus === "pending") {
      const requirements = getRequirementsList();
      const hasRequirements = requirements.length > 0;
      
      return (
        <Card className="p-6 mb-8 bg-warning/5 border-warning/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <AlertCircle className="w-8 h-8 text-warning" />
              <div>
                <h3 className="font-semibold text-foreground">KYC Verification In Progress</h3>
                <p className="text-muted-foreground">
                  {hasRequirements 
                    ? "Additional information required to complete your verification."
                    : "Your verification is being processed. We'll notify you once completed."
                  }
                </p>
                {hasRequirements && (
                  <p className="text-sm text-warning mt-1">
                    {requirements.length} requirement(s) pending
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {(hasRequirements || kycData?.message) && (
                <Dialog open={kycDialogOpen} onOpenChange={setKycDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Verification Requirements</DialogTitle>
                      <div className="text-sm text-muted-foreground mt-2">
                        {kycData?.data?.account_info?.requirements?.disabled_reason 
                          ? kycData.data.account_info.requirements.disabled_reason
                          : "Please provide the following information to complete your verification."
                        }
                      </div>
                    </DialogHeader>
                    <div className="space-y-4">
                      {/* API Error Message */}
                      {kycData?.message && kycData.status === "error" && (
                        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                          <div className="flex items-center space-x-2 text-destructive">
                            <AlertCircle className="w-4 h-4" />
                            <span className="font-medium">Action Required</span>
                          </div>
                          <p className="text-sm mt-1 text-destructive">
                            {Array.isArray(kycData.message) 
                              ? kycData.message.join(", ")
                              : kycData.message
                            }
                          </p>
                        </div>
                      )}
                      
                      {/* Requirements List */}
                      {hasRequirements && (
                        <div className="space-y-2">
                          <h4 className="font-medium text-foreground">Pending Requirements:</h4>
                          <ul className="space-y-2">
                            {requirements.map((requirement, index) => (
                              <li key={index} className="flex items-center space-x-2 text-sm">
                                <div className="w-2 h-2 bg-warning rounded-full"></div>
                                <span className="text-muted-foreground">{requirement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Capabilities Status */}
                      {kycData?.data?.account_info?.capabilities && (
                        <div className="space-y-2">
                          <h4 className="font-medium text-foreground">Payment Capabilities:</h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            {Object.entries(kycData.data.account_info.capabilities).map(([key, value]) => (
                              <div key={key} className="flex items-center justify-between">
                                <span className="text-muted-foreground capitalize">
                                  {key.replace('_', ' ')}:
                                </span>
                                <Badge variant={value === "active" ? "secondary" : "outline"}>
                                  {value}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setKycDialogOpen(false)}>
                        Close
                      </Button>
                      <Button onClick={handleStartOnboarding}>
                        Update Information
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
              <Button onClick={handleStartOnboarding} variant="default">
                Update KYC
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      );
    }

    if (kycStatus === "approved") {
      return (
        <Card className="p-6 mb-8 bg-success/5 border-success/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <CheckCircle className="w-8 h-8 text-success" />
              <div>
                <h3 className="font-semibold text-foreground">KYC Verification Complete</h3>
                <p className="text-muted-foreground">
                  Your account is fully verified and ready to accept payments.
                </p>
              </div>
            </div>
            <Dialog open={kycDialogOpen} onOpenChange={setKycDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  View Status
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Verification Status</DialogTitle>
                  <div className="text-sm text-muted-foreground mt-2">
                    Your account is fully verified and all capabilities are active.
                  </div>
                </DialogHeader>
                <div className="space-y-4">
                  {/* Account Status */}
                  <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-success">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">Account Status: Active</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Charges:</span>
                        <Badge className="ml-2 bg-success/20 text-success">
                          {kycData?.data?.account_info?.charges_enabled ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Payouts:</span>
                        <Badge className="ml-2 bg-success/20 text-success">
                          {kycData?.data?.account_info?.payouts_enabled ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {/* Capabilities */}
                  {kycData?.data?.account_info?.capabilities && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">Active Capabilities:</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {Object.entries(kycData.data.account_info.capabilities)
                          .filter(([_, value]) => value === "active")
                          .map(([key, value]) => (
                            <div key={key} className="flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-success" />
                              <span className="text-muted-foreground capitalize">
                                {key.replace('_', ' ')}
                              </span>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <AfterLoginNav language={language} setLanguage={setLanguage} />
      {/* Header */}


      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t("dashboard.welcome")}, {merchantData.name}
          </h1>
          <p className="text-muted-foreground">
            {merchantData.companyName} • {t("dashboard.memberSince")} {merchantData.joinDate}
          </p>
        </div>

        {/* KYC Status Alert */}
        {/* {renderKYCAlert()} */}
        {kycStatus === "pending" && (
          <Card className="p-6 mb-8 bg-secondary/5 border-secondary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <AlertCircle className="w-8 h-8 text-secondary" />
                <div>
                  <h3 className="font-semibold text-foreground">{t("dashboard.kycInProgress")}</h3>
                  <p className="text-muted-foreground">
                    {t("dashboard.kycInProgressDesc")}
                   
                    <br />
                    <a
                      href={`/${language}/merchant/kyc`}
                      className="text-primary underline hover:text-primary/80 transition-colors"
                    >
                      Click here to update your KYC information
                    </a>
                  </p>
                </div>
              </div>
              <Dialog open={kycDialogOpen} onOpenChange={setKycDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" onClick={() => { setKycData(sampleKycErrorMultiple); }}>
                    <Eye className="w-4 h-4 mr-2" />
                    {t("dashboard.viewDetails")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Actions required</DialogTitle>
                    <div className="text-sm text-muted-foreground mt-2">
                      {infoMessage}
                    </div>
                  </DialogHeader>
                  <pre className="bg-muted p-4 rounded text-sm overflow-x-auto">
                    {Array.isArray(kycData?.message)
                      ? kycData.message.map((msg: string, idx: number) => (
                          <div key={idx} className="mb-2 text-destructive">{msg}</div>
                        ))
                      : JSON.stringify(kycData, null, 2)}
                  </pre>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        )}

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">{t("dashboard.dashboard")}</TabsTrigger>
            <TabsTrigger value="profile">{t("dashboard.profile")}</TabsTrigger>
            <TabsTrigger value="transactions">{t("dashboard.transactions")}</TabsTrigger>
            <TabsTrigger value="settings">{t("dashboard.settings")}</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 bg-gradient-card border-0 shadow-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t("dashboard.totalTransactions")}</p>
                    <p className="text-2xl font-bold text-foreground">{stats.totalTransactions.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card border-0 shadow-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t("dashboard.totalRevenue")}</p>
                    <p className="text-2xl font-bold text-foreground">${stats.totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-success" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card border-0 shadow-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t("dashboard.successRate")}</p>
                    <p className="text-2xl font-bold text-foreground">{stats.successRate}%</p>
                  </div>
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Activity className="w-6 h-6 text-secondary" />
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card border-0 shadow-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t("dashboard.avgProcessingTime")}</p>
                    <p className="text-2xl font-bold text-foreground">{stats.avgProcessingTime}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card className="p-6 shadow-soft">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">{t("dashboard.recentTransactions")}</h3>
                <Button variant="outline" size="sm">
                  {t("dashboard.viewAll")}
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{tx.id}</p>
                        <p className="text-sm text-muted-foreground">{tx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">${tx.amount.toFixed(2)}</p>
                      <Badge variant={tx.status === "completed" ? "secondary" : "outline"}>
                        {tx.status === "completed" ? t("dashboard.completed") : t("dashboard.pending")}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* KYC Status */}
              <Card className="p-6 shadow-soft">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">{t("dashboard.kycStatus")}</h3>
                  {getKycStatusBadge()}
                </div>
                <Progress value={getKycProgressValue()} className="mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  {kycStatus === "not_started" 
                    ? "Start the KYC process to enable payment processing"
                    : kycStatus === "pending"
                    ? "Your verification is in progress. Additional information may be required."
                    : kycStatus === "approved"
                    ? "Your account is fully verified and ready for transactions"
                    : "Your verification requires attention. Please update your information."
                  }
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={handleStartOnboarding}
                  disabled={loading}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {kycStatus === "not_started" ? "Start KYC" : "View Details"}
                </Button>
              </Card>

              {/* Profile Sections */}
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Info */}
                <Card className="p-6 shadow-soft">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center">
                      <User className="w-5 h-5 mr-2 text-primary" />
                      {t("dashboard.personalInfo")}
                    </h3>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{t("dashboard.name")}</p>
                      <p className="font-medium text-foreground">{merchantData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("dashboard.email")}</p>
                      <p className="font-medium text-foreground">{merchantData.email}</p>
                    </div>
                  </div>
                </Card>

                {/* Business Info */}
                <Card className="p-6 shadow-soft">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center">
                      <Building className="w-5 h-5 mr-2 text-primary" />
                      {t("dashboard.businessInfo")}
                    </h3>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{t("dashboard.company")}</p>
                      <p className="font-medium text-foreground">{merchantData.companyName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t("dashboard.type")}</p>
                      <p className="font-medium text-foreground">LLC</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <Card className="p-6 shadow-soft">
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{t("dashboard.transactionHistory")}</h3>
                <p className="text-muted-foreground mb-6">
                  {t("dashboard.transactionHistoryDesc")}
                </p>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  {t("dashboard.exportTransactions")}
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="p-6 shadow-soft">
              <div className="text-center py-12">
                <Settings className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{t("dashboard.accountSettings")}</h3>
                <p className="text-muted-foreground">
                  {t("dashboard.accountSettingsDesc")}
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MerchantDashboard;