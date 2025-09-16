import { useState } from "react";
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
  Bell
} from "lucide-react";

const MerchantDashboard = () => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  // Mock data
  const kycStatus = "pending" as "pending" | "approved" | "rejected";
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

  const content = {
    en: {
      welcome: "Welcome back",
      dashboard: "Dashboard",
      profile: "Profile",
      transactions: "Transactions", 
      settings: "Settings",
      kycStatus: "KYC Status",
      kycPending: "Under Review",
      kycApproved: "Verified",
      kycRejected: "Needs Attention",
      viewDetails: "View Details",
      totalTransactions: "Total Transactions",
      totalRevenue: "Total Revenue",
      successRate: "Success Rate", 
      avgProcessingTime: "Avg Processing Time",
      recentTransactions: "Recent Transactions",
      viewAll: "View All",
      amount: "Amount",
      status: "Status",
      date: "Date",
      completed: "Completed",
      pending: "Pending",
      personalInfo: "Personal Information",
      businessInfo: "Business Information",
      bankDetails: "Bank Details",
      documents: "Documents"
    },
    ar: {
      welcome: "مرحباً بعودتك",
      dashboard: "لوحة التحكم",
      profile: "الملف الشخصي",
      transactions: "المعاملات",
      settings: "الإعدادات", 
      kycStatus: "حالة التحقق",
      kycPending: "قيد المراجعة",
      kycApproved: "تم التحقق",
      kycRejected: "يحتاج اهتمام",
      viewDetails: "عرض التفاصيل",
      totalTransactions: "إجمالي المعاملات",
      totalRevenue: "إجمالي الإيرادات",
      successRate: "معدل النجاح",
      avgProcessingTime: "متوسط وقت المعالجة",
      recentTransactions: "المعاملات الأخيرة",
      viewAll: "عرض الكل",
      amount: "المبلغ",
      status: "الحالة",
      date: "التاريخ",
      completed: "مكتملة",
      pending: "معلقة",
      personalInfo: "المعلومات الشخصية",
      businessInfo: "معلومات الأعمال",
      bankDetails: "التفاصيل المصرفية",
      documents: "المستندات"
    }
  };

  const t = content[language];

  const getKycStatusBadge = () => {
    switch (kycStatus) {
      case "approved":
        return (
          <Badge className="bg-success/10 text-success border-success/20">
            <CheckCircle className="w-4 h-4 mr-2" />
            {t.kycApproved}
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-destructive/10 text-destructive border-destructive/20">
            <XCircle className="w-4 h-4 mr-2" />
            {t.kycRejected}
          </Badge>
        );
      default:
        return (
          <Badge className="bg-secondary/10 text-secondary border-secondary/20">
            <Clock className="w-4 h-4 mr-2" />
            {t.kycPending}
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Dalal Pay
              </div>
              <Badge variant="secondary">{t.dashboard}</Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
              >
                <Globe className="w-4 h-4 mr-2" />
                {language === "en" ? "العربية" : "English"}
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                {t.settings}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t.welcome}, {merchantData.name}
          </h1>
          <p className="text-muted-foreground">
            {merchantData.companyName} • Member since {merchantData.joinDate}
          </p>
        </div>

        {/* KYC Status Alert */}
        {kycStatus === "pending" && (
          <Card className="p-6 mb-8 bg-secondary/5 border-secondary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <AlertCircle className="w-8 h-8 text-secondary" />
                <div>
                  <h3 className="font-semibold text-foreground">KYC Verification in Progress</h3>
                  <p className="text-muted-foreground">
                    Your account is under review. You'll receive an email once verification is complete.
                  </p>
                </div>
              </div>
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                {t.viewDetails}
              </Button>
            </div>
          </Card>
        )}

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">{t.dashboard}</TabsTrigger>
            <TabsTrigger value="profile">{t.profile}</TabsTrigger>
            <TabsTrigger value="transactions">{t.transactions}</TabsTrigger>
            <TabsTrigger value="settings">{t.settings}</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 bg-gradient-card border-0 shadow-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.totalTransactions}</p>
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
                    <p className="text-sm text-muted-foreground">{t.totalRevenue}</p>
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
                    <p className="text-sm text-muted-foreground">{t.successRate}</p>
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
                    <p className="text-sm text-muted-foreground">{t.avgProcessingTime}</p>
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
                <h3 className="text-lg font-semibold text-foreground">{t.recentTransactions}</h3>
                <Button variant="outline" size="sm">
                  {t.viewAll}
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
                        {tx.status === "completed" ? t.completed : t.pending}
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
                  <h3 className="text-lg font-semibold text-foreground">{t.kycStatus}</h3>
                  {getKycStatusBadge()}
                </div>
                <Progress 
                  value={
                    kycStatus === "approved" ? 100 : 
                    kycStatus === "pending" ? 75 : 
                    25
                  } 
                  className="mb-4" 
                />
                <p className="text-sm text-muted-foreground mb-4">
                  {kycStatus === "pending" 
                    ? "Your documents are being reviewed by our compliance team."
                    : kycStatus === "approved"
                    ? "Your account is fully verified and ready for payments."
                    : "Additional information required for verification."
                  }
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  {t.viewDetails}
                </Button>
              </Card>

              {/* Profile Sections */}
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Info */}
                <Card className="p-6 shadow-soft">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center">
                      <User className="w-5 h-5 mr-2 text-primary" />
                      {t.personalInfo}
                    </h3>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p className="font-medium text-foreground">{merchantData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">{merchantData.email}</p>
                    </div>
                  </div>
                </Card>

                {/* Business Info */}
                <Card className="p-6 shadow-soft">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground flex items-center">
                      <Building className="w-5 h-5 mr-2 text-primary" />
                      {t.businessInfo}
                    </h3>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Company</p>
                      <p className="font-medium text-foreground">{merchantData.companyName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
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
                <h3 className="text-lg font-semibold text-foreground mb-2">Transaction History</h3>
                <p className="text-muted-foreground mb-6">
                  View and manage all your payment transactions
                </p>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Transactions
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="p-6 shadow-soft">
              <div className="text-center py-12">
                <Settings className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Account Settings</h3>
                <p className="text-muted-foreground">
                  Manage your account preferences and security settings
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