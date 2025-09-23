import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TranslationProvider } from "@/components/TranslationProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MerchantLogin from "./pages/merchant/Login";
import MerchantRegister from "./pages/merchant/Register";
import KYCOnboarding from "./pages/merchant/KYC";
import MerchantDashboard from "./pages/merchant/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <TranslationProvider>
          <Routes>
            {/* Redirect root to /en */}
            <Route path="/" element={<Navigate to="/en" replace />} />
            
            {/* English routes */}
            <Route path="/en" element={<Index />} />
            <Route path="/en/merchant/login" element={<MerchantLogin />} />
            <Route path="/en/merchant/register" element={<MerchantRegister />} />
            <Route path="/en/merchant/kyc" element={<KYCOnboarding />} />
            <Route path="/en/merchant/dashboard" element={<MerchantDashboard />} />
            
            {/* Arabic routes */}
            <Route path="/ar" element={<Index />} />
            <Route path="/ar/merchant/login" element={<MerchantLogin />} />
            <Route path="/ar/merchant/register" element={<MerchantRegister />} />
            <Route path="/ar/merchant/kyc" element={<KYCOnboarding />} />
            <Route path="/ar/merchant/dashboard" element={<MerchantDashboard />} />
            
            {/* Legacy routes redirect to English */}
            <Route path="/merchant/login" element={<Navigate to="/en/merchant/login" replace />} />
            <Route path="/merchant/register" element={<Navigate to="/en/merchant/register" replace />} />
            <Route path="/merchant/kyc" element={<Navigate to="/en/merchant/kyc" replace />} />
            <Route path="/merchant/dashboard" element={<Navigate to="/en/merchant/dashboard" replace />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TranslationProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
