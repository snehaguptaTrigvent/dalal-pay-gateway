import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/hooks/useTranslation";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageCircle,
  Headphones,
  BookOpen
} from "lucide-react";

const ContactSection = () => {
  const { t } = useTranslation();
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">{t('contact.title')}</span>{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Get Started?
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 bg-gradient-card border-0 shadow-soft animate-scale-in">
              <h3 className="text-xl font-semibold mb-6 text-foreground">Get in Touch</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Email</div>
                    <div className="text-sm text-muted-foreground">contact@dalalpay.com</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Phone</div>
                    <div className="text-sm text-muted-foreground">+1 (555) 123-4567</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Address</div>
                    <div className="text-sm text-muted-foreground">123 Business District<br />Dubai, UAE</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Support Hours</div>
                    <div className="text-sm text-muted-foreground">24/7 Available</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-4 animate-fade-in">
              <Button variant="outline" className="w-full justify-start" size="lg">
                <MessageCircle className="mr-3 w-5 h-5" />
                {t('contact.startToday')}
              </Button>
              <Button variant="outline" className="w-full justify-start" size="lg">
                <Headphones className="mr-3 w-5 h-5" />
                {t('contact.talkToExpert')}
              </Button>
              <Button variant="outline" className="w-full justify-start" size="lg">
                <BookOpen className="mr-3 w-5 h-5" />
                View Documentation
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-card border-0 shadow-soft animate-scale-in">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Send us a Message</h3>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Full Name *</label>
                    <Input 
                      placeholder="Enter your full name"
                      className="bg-muted/30 border-border focus:border-primary transition-smooth"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email Address *</label>
                    <Input 
                      type="email" 
                      placeholder="Enter your email"
                      className="bg-muted/30 border-border focus:border-primary transition-smooth"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Company</label>
                    <Input 
                      placeholder="Enter your company name"
                      className="bg-muted/30 border-border focus:border-primary transition-smooth"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Phone Number</label>
                    <Input 
                      placeholder="Enter your phone number"
                      className="bg-muted/30 border-border focus:border-primary transition-smooth"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Subject *</label>
                  <Input 
                    placeholder="What can we help you with?"
                    className="bg-muted/30 border-border focus:border-primary transition-smooth"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Message *</label>
                  <Textarea 
                    placeholder="Tell us more about your requirements..."
                    rows={5}
                    className="bg-muted/30 border-border focus:border-primary transition-smooth resize-none"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <Button variant="gradient" size="lg" className="flex-1 sm:flex-initial">
                    <Send className="mr-2 w-5 h-5" />
                    Send Message
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    We'll get back to you within 24 hours
                  </div>
                </div>
              </form>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center animate-fade-in">
          <Card className="p-12 bg-gradient-hero text-center shadow-strong">
            <h3 className="text-3xl font-bold mb-4 text-primary-foreground">
              {t('contact.title')}
            </h3>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" className="bg-background text-foreground hover:bg-background/90">
                {t('contact.startToday')}
              </Button>
              <Button variant="outline" size="lg" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                {t('contact.talkToExpert')}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;