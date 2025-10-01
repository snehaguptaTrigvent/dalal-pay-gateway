import { useTranslation } from "@/hooks/useTranslation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AccountActivated = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen">
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 py-20">
        <div className="w-full max-w-md">
          <Card className="p-8 shadow-strong bg-card/95 backdrop-blur-sm border-0 flex flex-col items-center gap-6">
            <CheckCircle className="w-16 h-16 text-success mb-2" />
            <h1 className="text-2xl font-bold text-center mb-2">
              {t("accountActivated.title")}
            </h1>
            <p className="text-muted-foreground text-center mb-4">
              {t("accountActivated.successMessage")}
            </p>
            <Button className="w-full" onClick={() => navigate("/en/merchant/login")}>{t("accountActivated.login")}</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AccountActivated;
