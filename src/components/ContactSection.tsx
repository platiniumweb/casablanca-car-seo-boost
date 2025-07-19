import { MessageCircle, Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import GoogleMap from "@/components/GoogleMap";

const ContactSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWhatsAppContact = () => {
    window.open("https://wa.me/212661202213?text=Bonjour, je souhaite obtenir des informations sur vos services de location de voiture à Casablanca", "_blank");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Bonjour, je suis ${formData.name}. Email: ${formData.email}. Téléphone: ${formData.phone}. Message: ${formData.message}`;
    window.open(`https://wa.me/212661202213?text=${encodeURIComponent(message)}`, "_blank");
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
      value: "platinium.ride.car@gmail.com",
      description: t('contact.response24h'),
      action: () => window.open("mailto:platinium.ride.car@gmail.com"),
      primary: false
    },
    {
      icon: MapPin,
      title: t('contact.location'),
      value: "Casablanca, Maroc",
      description: t('contact.cityDelivery'),
      action: () => window.open("https://maps.app.goo.gl/qGCb7DseduoBMYX69?g_st=ac"),
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

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold mb-8">{t('nav.contact')}</h3>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <Card 
                    key={index} 
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      info.primary ? 'border-accent bg-accent/5' : ''
                    }`}
                    onClick={info.action}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          info.primary ? 'bg-accent text-accent-foreground' : 'bg-muted'
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  {t('contact.hours')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{t('contact.monToSun')}</span>
                    <span className="font-medium">24h/24</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('contact.support')}</span>
                    <span className="font-medium text-accent">7j/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('contact.vehicleDelivery')}</span>
                    <span className="font-medium">6h - 23h</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Google Map */}
            <div className="mt-8">
              <h4 className="text-xl font-bold mb-4">{t('contact.location')}</h4>
              <GoogleMap />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{t('contact.form.title')}</CardTitle>
                <p className="text-muted-foreground">
                  {t('contact.form.subtitle')}
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        {t('contact.form.name')} *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t('contact.form.placeholder.name')}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        {t('contact.form.phone')} *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder={t('contact.form.placeholder.phone')}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {t('contact.form.email')}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('contact.form.placeholder.email')}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      {t('contact.form.message')} *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t('contact.form.placeholder.message')}
                      rows={4}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    size="lg"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {t('contact.form.send')}
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    {t('contact.form.notice')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-primary text-primary-foreground p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">{t('contact.urgentBooking')}</h3>
            <p className="text-lg mb-6 opacity-90">
              {t('contact.urgentText')}
            </p>
            <Button 
              onClick={handleWhatsAppContact}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
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