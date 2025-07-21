
import { MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import OpenStreetMap from "@/components/OpenStreetMap";

const ContactSection = () => {
  const { t } = useLanguage();

  const handleWhatsAppContact = () => {
    window.open("https://wa.me/212661202213?text=Bonjour, je souhaite obtenir des informations sur vos services de location de voiture à Casablanca", "_blank");
  };

  const handlePhoneCall = () => {
    window.open("tel:+212661202213", "_self");
  };

  const contactInfo = [
    {
      icon: MessageCircle,
      title: t('contact.whatsapp247'),
      value: "+212 6 61 202 213",
      description: t('contact.instantHelp'),
      action: handleWhatsAppContact,
      primary: true
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      value: "0661 202 213",
      description: t('contact.directCall'),
      action: handlePhoneCall,
      primary: false
    },
    {
      icon: Mail,
      title: t('contact.email'),
      value: "platinium.ride.web@gmail.com",
      description: t('contact.response24h'),
      action: () => window.open("mailto:platinium.ride.web@gmail.com"),
      primary: false
    },
    {
      icon: MapPin,
      title: t('contact.location'),
      value: "Sidi Abderrahmane, Rue 27 N°11, El Oulfa, Casablanca",
      description: t('contact.cityDelivery'),
      action: () => window.open("https://www.openstreetmap.org/?#map=18/33.557965/-7.682694"),
      primary: false
    }
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="secondary">{t('nav.contact')}</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-1 gap-12 max-w-5xl mx-auto">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center">{t('nav.contact')}</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <Card 
                    key={index} 
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
                      info.primary ? 'border-accent bg-accent/5 shadow-md' : 'hover:border-accent/50'
                    }`}
                    onClick={info.action}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                          info.primary ? 'bg-accent text-accent-foreground' : 'bg-muted group-hover:bg-accent/20'
                        }`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{info.title}</h4>
                          <p className="text-lg font-medium text-primary">{info.value}</p>
                          <p className="text-sm text-muted-foreground">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Hours */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-center">
                  <Clock className="w-5 h-5 text-accent" />
                  {t('contact.hours')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-muted">
                    <span className="font-medium">{t('contact.monToSun')}</span>
                    <span className="font-bold text-accent">24h/24</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-muted">
                    <span className="font-medium">{t('contact.support')}</span>
                    <span className="font-bold text-accent">7j/7</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">{t('contact.vehicleDelivery')}</span>
                    <span className="font-bold">6h - 23h</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* OpenStreetMap */}
            <div className="mb-12">
              <OpenStreetMap />
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-primary text-primary-foreground p-8 rounded-2xl max-w-4xl mx-auto shadow-xl">
            <h3 className="text-2xl font-bold mb-4">{t('contact.urgentBooking')}</h3>
            <p className="text-lg mb-6 opacity-90">
              {t('contact.urgentText')}
            </p>
            <Button 
              onClick={handleWhatsAppContact}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-200 transform hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {t('contact.expressBooking')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
