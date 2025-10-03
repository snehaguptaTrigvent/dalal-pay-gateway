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
import MerchantForgotPassword from "./pages/merchant/ForgotPassword";
import MerchantResetPassword from "./pages/merchant/ResetPassword";
import KYCOnboarding from "./pages/merchant/KYC";
import MerchantDashboard from "./pages/merchant/Dashboard";
// import ActivateAccount from "./pages/merchant/ActivateAccount";
import AccountActivated from "./pages/merchant/AccountActivated";
import PrivateRoute from "@/components/PrivateRoute";


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
            <Route path="/en/merchant/forgot-password" element={<MerchantForgotPassword />} />
            <Route path="/en/merchant/reset-password/:uid/:token" element={<MerchantResetPassword />} />
            <Route path="/en/merchant/kyc" element={<PrivateRoute><KYCOnboarding /></PrivateRoute>} />
            <Route path="/en/merchant/dashboard" element={<PrivateRoute><MerchantDashboard /></PrivateRoute>} />
            {/* <Route path="/en/merchant/activate-account" element={<ActivateAccount />} /> */}
            <Route path="/en/merchant/verify-account" element={<AccountActivated />} />
            
            {/* Arabic routes */}
            <Route path="/ar" element={<Index />} />
            <Route path="/ar/merchant/login" element={<MerchantLogin />} />
            <Route path="/ar/merchant/register" element={<MerchantRegister />} />
            <Route path="/ar/merchant/forgot-password" element={<MerchantForgotPassword />} />
            <Route path="/ar/merchant/reset-password/:uid/:token" element={<MerchantResetPassword />} />
            <Route path="/ar/merchant/kyc" element={<PrivateRoute><KYCOnboarding /></PrivateRoute>} />
            <Route path="/ar/merchant/dashboard" element={<PrivateRoute><MerchantDashboard /></PrivateRoute>} />
            {/* <Route path="/ar/merchant/activate-account" element={<ActivateAccount />} /> */}
            <Route path="/ar/merchant/verify-account" element={<AccountActivated />} />
            
            {/* Legacy routes redirect to English */}
            <Route path="/merchant/login" element={<Navigate to="/en/merchant/login" replace />} />
            <Route path="/merchant/register" element={<Navigate to="/en/merchant/register" replace />} />
            <Route path="/merchant/forgot-password" element={<Navigate to="/en/merchant/forgot-password" replace />} />
            <Route path="/merchant/reset-password/:uid/:token" element={<Navigate to="/en/merchant/reset-password/:token" replace />} />
            <Route path="/merchant/kyc" element={<PrivateRoute><Navigate to="/en/merchant/kyc" replace /></PrivateRoute>} />
            <Route path="/merchant/dashboard" element={<PrivateRoute><Navigate to="/en/merchant/dashboard" replace /></PrivateRoute>} />
            {/* <Route path="/merchant/activate-account" element={<Navigate to="/en/merchant/activate-account" replace />} /> */}
            <Route path="/merchant/verify-account" element={<Navigate to="/en/merchant/account-activated" replace />} />
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TranslationProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
