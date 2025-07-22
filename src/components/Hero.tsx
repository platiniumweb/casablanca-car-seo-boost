
import { MessageCircle, MapPin, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-cars.jpg";

const Hero = () => {
  const { t } = useLanguage();
  
  const handleWhatsApp = () => {
    window.open("https://wa.me/212661202213?text=Bonjour, je souhaite louer une voiture à Casablanca", "_blank");
  };

  const handleReservation = () => {
    document.getElementById('vehicules')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="accueil" className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-primary/80 backdrop-blur-sm"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-primary-foreground">
            <div className="mb-6">
              <span className="inline-block bg-accent text-accent-foreground px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4">
                {t('hero.badge')}
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
                {t('hero.title')}
              </h1>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 opacity-90">
                {t('hero.subtitle')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
              <Button 
                onClick={handleWhatsApp}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                {t('hero.whatsapp')}
              </Button>
              <Button 
                onClick={handleReservation}
                variant="outline"
                size="lg"
                className="border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto"
              >
                {t('hero.vehicles')}
              </Button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <Card className="p-3 sm:p-4 bg-card/10 backdrop-blur-sm border-primary-foreground/20">
                <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-accent mb-2" />
                <h3 className="font-semibold text-primary-foreground text-sm sm:text-base">{t('hero.delivery')}</h3>
                <p className="text-xs sm:text-sm text-primary-foreground/80">{t('hero.deliveryDesc')}</p>
              </Card>
              <Card className="p-3 sm:p-4 bg-card/10 backdrop-blur-sm border-primary-foreground/20">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-accent mb-2" />
                <h3 className="font-semibold text-primary-foreground text-sm sm:text-base">{t('hero.service')}</h3>
                <p className="text-xs sm:text-sm text-primary-foreground/80">{t('hero.serviceDesc')}</p>
              </Card>
              <Card className="p-3 sm:p-4 bg-card/10 backdrop-blur-sm border-primary-foreground/20">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-accent mb-2" />
                <h3 className="font-semibold text-primary-foreground text-sm sm:text-base">{t('hero.insurance')}</h3>
                <p className="text-xs sm:text-sm text-primary-foreground/80">{t('hero.insuranceDesc')}</p>
              </Card>
              <Card className="p-3 sm:p-4 bg-card/10 backdrop-blur-sm border-primary-foreground/20">
                <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-accent mb-2" />
                <h3 className="font-semibold text-primary-foreground text-sm sm:text-base">WhatsApp</h3>
                <p className="text-xs sm:text-sm text-primary-foreground/80">{t('hero.whatsappDesc')}</p>
              </Card>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="lg:flex justify-center">
            <Card className="p-6 sm:p-8 bg-card/95 backdrop-blur-sm max-w-md w-full mx-auto lg:mx-0">
              <div className="text-center mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-card-foreground mb-2">{t('hero.pricing')}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{t('hero.pricingDesc')}</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="font-medium text-sm sm:text-base">{t('hero.economic')}</span>
                  <div className="text-right">
                    <div className="font-bold text-base sm:text-lg">300 DH / 30€</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{t('hero.perDay')}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="font-medium text-sm sm:text-base">{t('hero.suv')}</span>
                  <div className="text-right">
                    <div className="font-bold text-base sm:text-lg">500 DH / 50€</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{t('hero.perDay')}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-medium text-sm sm:text-base">{t('hero.luxury')}</span>
                  <div className="text-right">
                    <div className="font-bold text-base sm:text-lg text-luxury">800 DH / 80€</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">{t('hero.perDay')}</div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleWhatsApp} 
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {t('hero.quote')}
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
