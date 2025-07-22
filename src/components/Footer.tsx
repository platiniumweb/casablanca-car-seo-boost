
import { MessageCircle, Phone, Mail, MapPin, Car, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/212661202213", "_blank");
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-base sm:text-lg">P</span>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold">Platinium Ride Car</h3>
                <p className="text-xs sm:text-sm opacity-80">Location voiture Casablanca</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Votre partenaire de confiance pour la location de voiture à Casablanca. 
              Service professionnel, véhicules récents et assistance 7j/7.
            </p>
            <Button 
              onClick={handleWhatsApp}
              className="bg-accent hover:bg-accent/90 text-accent-foreground w-full sm:w-auto"
              size="sm"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Réserver maintenant
            </Button>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Nos Services</h4>
            <ul className="space-y-2 sm:space-y-3 text-primary-foreground/80 text-sm sm:text-base">
              <li className="flex items-center">
                <Car className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-accent flex-shrink-0" />
                Location véhicules économiques
              </li>
              <li className="flex items-center">
                <Car className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-accent flex-shrink-0" />
                Location SUV et 4x4
              </li>
              <li className="flex items-center">
                <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-accent flex-shrink-0" />
                Location véhicules de luxe
              </li>
              <li className="flex items-center">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-accent flex-shrink-0" />
                Livraison aéroport/hôtel
              </li>
              <li className="flex items-center">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-accent flex-shrink-0" />
                Service 7j/7
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Navigation</h4>
            <ul className="space-y-2 sm:space-y-3 text-primary-foreground/80 text-sm sm:text-base">
              <li>
                <a href="#accueil" className="hover:text-accent transition-colors">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#vehicules" className="hover:text-accent transition-colors">
                  Nos Véhicules
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-accent transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#avis" className="hover:text-accent transition-colors">
                  Avis Clients
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Contact</h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm sm:text-base">WhatsApp 7j/7</p>
                  <p className="text-primary-foreground/80 text-sm">+212 6 61 202 213</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm sm:text-base">Téléphone</p>
                  <p className="text-primary-foreground/80 text-sm">0661 202 213</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm sm:text-base">Email</p>
                  <p className="text-primary-foreground/80 text-xs sm:text-sm break-all">platinium.ride.web@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm sm:text-base">Localisation</p>
                  <p className="text-primary-foreground/80 text-sm">Casablanca, Maroc</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center">
            <div className="text-primary-foreground/80 text-xs sm:text-sm text-center md:text-left">
              © {currentYear} Platinium Ride Car. Tous droits réservés. Location de voiture à Casablanca.
            </div>
            <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-4 md:space-x-6 text-xs sm:text-sm text-primary-foreground/80 text-center">
              <a href="#" className="hover:text-accent transition-colors">
                Conditions générales
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Mentions légales
              </a>
            </div>
            <div className="text-primary-foreground/60 text-xs text-center md:text-right">
              Site créé par{" "}
              <a 
                href="https://webmaroc.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors underline"
              >
                WebMaroc
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
