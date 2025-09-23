import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import { 
  Shield, 
  Lock, 
  Eye, 
  FileCheck, 
  Zap, 
  Globe2,
  Award,
  CheckCircle2
} from "lucide-react";

const SecuritySection = () => {
  const { t } = useTranslation();
  
  const securityFeatures = [
    {
      icon: Shield,
      title: t('security.pciCompliance'),
      description: t('security.pciComplianceDesc'),
    },
    {
      icon: Lock,
      title: t('security.endToEndEncryption'),
      description: t('security.endToEndEncryptionDesc'),
    },
    {
      icon: Eye,
      title: t('security.fraudDetection'),
      description: t('security.fraudDetectionDesc'),
    },
    {
      icon: FileCheck,
      title: t('security.secureTokenization'),
      description: t('security.secureTokenizationDesc'),
    }
  ];

  const compliance = [
    "PCI DSS Level 1",
    "SOC 2 Type II", 
    "ISO 27001",
    "GDPR Compliant",
    "Regional Banking Standards",
    "Anti-Money Laundering (AML)"
  ];

  return (
    <section id="security" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full mb-6">
            <Shield className="w-4 h-4" />
            <span className="font-medium">Enterprise Security</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">{t('security.title')}</span>{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Compliance
            </span>{" "}
            <span className="text-foreground">First</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('security.subtitle')}
          </p>
        </div>

        {/* Security Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {securityFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 text-center hover:shadow-medium transition-smooth bg-gradient-card border-0 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <h3 className="text-3xl font-bold mb-4 text-foreground">
                Trusted by Businesses Worldwide
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our platform is built on proven infrastructure that processes millions of 
                transactions daily. We maintain the highest standards of security and compliance 
                to protect your business and your customers.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">99.99%</div>
                <div className="text-sm text-muted-foreground">Uptime SLA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">0.01%</div>
                <div className="text-sm text-muted-foreground">Fraud Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success mb-2">&lt;2s</div>
                <div className="text-sm text-muted-foreground">Response Time</div>
              </div>
            </div>

            <Button variant="gradient" size="lg" className="w-full sm:w-auto">
              Learn More About Security
            </Button>
          </div>

          {/* Right Content - Compliance */}
          <div className="animate-scale-in">
            <Card className="p-8 bg-gradient-card border-0 shadow-medium">
              <div className="flex items-center space-x-3 mb-6">
                <Award className="w-8 h-8 text-primary" />
                <h3 className="text-2xl font-bold text-foreground">Compliance Certifications</h3>
              </div>
              
              <div className="space-y-4">
                {compliance.map((cert, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 animate-slide-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-foreground font-medium">{cert}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <Globe2 className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Global Coverage</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Operating in compliance with local regulations across multiple jurisdictions, 
                  ensuring your business can scale globally with confidence.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;