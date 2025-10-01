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
import { useTranslation } from "@/hooks/useTranslation";

const MerchantDashboard = () => {
  const { language, setLanguage, t } = useTranslation();

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
      default:
        return (
          <Badge className="bg-secondary/10 text-secondary border-secondary/20">
            <Clock className="w-4 h-4 mr-2" />
              {t("dashboard.kycPending")}
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
                {t("dashboard.brand")}
              </div>
              <Badge variant="secondary">{t("dashboard.dashboard")}</Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              >
                <Globe className="w-4 h-4 mr-2" />
                {t("nav.languageSwitch")}
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                {t("dashboard.settings")}
              </Button>
            </div>
          </div>
        </div>
      </div>

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
        {kycStatus === "pending" && (
          <Card className="p-6 mb-8 bg-secondary/5 border-secondary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <AlertCircle className="w-8 h-8 text-secondary" />
                <div>
                  <h3 className="font-semibold text-foreground">{t("dashboard.kycInProgress")}</h3>
                  <p className="text-muted-foreground">
                    {t("dashboard.kycInProgressDesc")}
                  </p>
                </div>
              </div>
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                {t("dashboard.viewDetails")}
              </Button>
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
                    ? t("dashboard.kycPendingDesc")
                    : kycStatus === "approved"
                    ? t("dashboard.kycApprovedDesc")
                    : t("dashboard.kycRejectedDesc")
                  }
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  {t("dashboard.viewDetails")}
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