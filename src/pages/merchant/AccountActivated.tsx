import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, XCircle } from "lucide-react";

const DALAL_API_BASE_URL = import.meta.env.VITE_DALAL_API_BASE_URL;

const AccountActivated = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tid = searchParams.get("tid");
    const vt = searchParams.get("vt");

    if (!tid || !vt) {
      setStatus("error");
      setMessage(t("accountActivated.invalidLink"));
      return;
    }

    const verifyAccount = async () => {
      try {
        const res = await fetch(`${DALAL_API_BASE_URL}/accounts/confirm/${tid}/${vt}/`);
        const data = await res.json();

        if (res.ok && data.status === "success") {
          setStatus("success");
        } else {
          setStatus("error");
          setMessage(t("accountActivated.verificationFailed"));
        }
      } catch (err) {
        setStatus("error");
        setMessage(t("accountActivated.verificationFailed"));
      }
    };

    verifyAccount();
  }, [location.search, t]);

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 py-20">
        <Card className="p-8 shadow-strong bg-card/95 backdrop-blur-sm border-0 flex flex-col items-center gap-4">
          <Loader2 className="animate-spin w-12 h-12 text-primary" />
          <p className="text-lg font-medium">{t("accountActivated.verifying")}</p>
        </Card>
      </div>
    );
  }

  // Error state
  if (status === "error") {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 py-20">
        <Card className="p-8 shadow-strong bg-card/95 backdrop-blur-sm border-0 flex flex-col items-center gap-4">
          <XCircle className="w-14 h-14 text-red-600" />
          <h1 className="text-xl font-semibold text-center">
            {t("accountActivated.verificationFailed")}
          </h1>
          {message && (
            <p className="text-sm text-muted-foreground text-center">{message}</p>
          )}
        </Card>
      </div>
    );
  }

  // Success state
  return (
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
          <Button className="w-full" onClick={() => navigate("/en/merchant/login")}>
            {t("accountActivated.login")}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default AccountActivated;
