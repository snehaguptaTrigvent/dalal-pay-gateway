import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import heroImage from "@/assets/hero-payment.jpg";

const HeroSection = () => {
  const { t } = useTranslation();
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
                <span className="text-foreground">{t('hero.title')}</span>{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  {t('hero.titleHighlight')}
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                {t('hero.subtitle')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="gradient" size="lg" className="text-lg px-8 py-4">
                {t('hero.startIntegration')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                <Play className="mr-2 w-5 h-5" />
                {t('hero.watchDemo')}
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">{t('hero.uptime')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">256-bit</div>
                <div className="text-sm text-muted-foreground">{t('hero.encryption')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">{t('hero.support')}</div>
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
                  <span className="text-sm font-medium">{t('hero.paymentSecured')}</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-card rounded-xl p-4 shadow-medium animate-slide-in">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">{t('hero.realtimeProcessing')}</span>
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