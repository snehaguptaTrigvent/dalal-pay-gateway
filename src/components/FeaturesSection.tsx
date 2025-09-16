import { Card } from "@/components/ui/card";
import { 
  Shield, 
  Zap, 
  Globe, 
  Users, 
  BarChart3, 
  Lock, 
  CreditCard, 
  Settings,
  CheckCircle 
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "KYC-First Onboarding",
      description: "Comprehensive merchant verification and compliance management with encrypted data storage.",
      color: "text-primary"
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Lightning-fast payment processing with instant confirmations and real-time status updates.",
      color: "text-secondary"
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Native Arabic and English support with culturally-adapted payment flows.",
      color: "text-success"
    },
    {
      icon: Users,
      title: "Unified API Gateway",
      description: "Single integration point for all payment operations, abstracting complex backend systems.",
      color: "text-primary"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive merchant dashboards with transaction insights and performance metrics.",
      color: "text-secondary"
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Bank-grade security with 256-bit SSL encryption and compliance with international standards.",
      color: "text-success"
    }
  ];

  const benefits = [
    "Reduced integration complexity",
    "Faster time to market", 
    "Comprehensive dispute management",
    "Automated compliance checks",
    "24/7 technical support",
    "Scalable infrastructure"
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Everything You Need</span>{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              To Scale
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Built for merchants who demand reliability, security, and simplicity. 
            Our platform handles the complexity so you can focus on growing your business.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-8 hover:shadow-medium transition-smooth bg-gradient-card border-0 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center mb-6`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Benefits List */}
        <div className="bg-card rounded-2xl p-8 shadow-soft animate-fade-in">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-3 animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                <span className="text-foreground font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Preview */}
        <div className="mt-16 bg-card rounded-2xl p-8 shadow-soft animate-fade-in">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Simple Integration
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Get started with just a few lines of code. Our SDK handles authentication, 
                error handling, and provides real-time status updates.
              </p>
              <div className="flex items-center space-x-4">
                <CreditCard className="w-8 h-8 text-primary" />
                <span className="text-2xl text-muted-foreground">→</span>
                <Settings className="w-8 h-8 text-secondary" />
                <span className="text-2xl text-muted-foreground">→</span>
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-6 font-mono text-sm">
              <div className="text-muted-foreground mb-2">// Initialize Dalal Pay</div>
              <div>
                <span className="text-primary">const</span>{" "}
                <span className="text-foreground">dalalPay</span>{" "}
                <span className="text-muted-foreground">=</span>{" "}
                <span className="text-secondary">new</span>{" "}
                <span className="text-foreground">DalalPay</span>
              </div>
              <div className="text-muted-foreground">({"{"}</div>
              <div className="ml-4 text-foreground">apiKey: 'your-api-key'</div>
              <div className="text-muted-foreground">{"});"}</div>
              <br />
              <div className="text-muted-foreground mb-2">// Process payment</div>
              <div>
                <span className="text-foreground">dalalPay.payments.create</span>
              </div>
              <div className="text-muted-foreground">({"{"}</div>
              <div className="ml-4 text-foreground">amount: 1000,</div>
              <div className="ml-4 text-foreground">currency: 'USD'</div>
              <div className="text-muted-foreground">{"});"}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;