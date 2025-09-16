import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-payment.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-foreground">Simplify</span>{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Payments
                </span>
                <br />
                <span className="text-foreground">For Your Business</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Dalal Pay provides a unified payment gateway that empowers merchants with 
                secure, scalable, and seamless payment processing. Built on enterprise-grade 
                infrastructure with KYC-first onboarding.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="gradient" size="lg" className="text-lg px-8 py-4">
                Start Integration
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">256-bit</div>
                <div className="text-sm text-muted-foreground">SSL Encryption</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-scale-in">
            <div className="relative">
              <img
                src={heroImage}
                alt="Dalal Pay Payment Gateway Platform"
                className="w-full h-auto rounded-2xl shadow-strong"
              />
              {/* Floating Cards */}
              <div className="absolute -top-6 -left-6 bg-card rounded-xl p-4 shadow-medium animate-slide-in">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-sm font-medium">Payment Secured</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-card rounded-xl p-4 shadow-medium animate-slide-in">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Real-time Processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default HeroSection;