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
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">P</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Platinium Ride Car</h3>
                <p className="text-sm opacity-80">Location voiture Casablanca</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Votre partenaire de confiance pour la location de voiture à Casablanca. 
              Service professionnel, véhicules récents et assistance 7j/7.
            </p>
            <Button 
              onClick={handleWhatsApp}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Réserver maintenant
            </Button>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Nos Services</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              <li className="flex items-center">
                <Car className="w-4 h-4 mr-2 text-accent" />
                Location véhicules économiques
              </li>
              <li className="flex items-center">
                <Car className="w-4 h-4 mr-2 text-accent" />
                Location SUV et 4x4
              </li>
              <li className="flex items-center">
                <Star className="w-4 h-4 mr-2 text-accent" />
                Location véhicules de luxe
              </li>
              <li className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-accent" />
                Livraison aéroport/hôtel
              </li>
              <li className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-accent" />
                Service 7j/7
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Navigation</h4>
            <ul className="space-y-3 text-primary-foreground/80">
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
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MessageCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">WhatsApp 7j/7</p>
                  <p className="text-primary-foreground/80">+212 6 61 202 213</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Téléphone</p>
                  <p className="text-primary-foreground/80">0661 202 213</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-primary-foreground/80 text-sm">plutonium.ride.car@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Localisation</p>
                  <p className="text-primary-foreground/80">Casablanca, Maroc</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-primary-foreground/80 text-sm">
              © {currentYear} Platinium Ride Car. Tous droits réservés. Location de voiture à Casablanca.
            </div>
            <div className="flex space-x-6 text-sm text-primary-foreground/80">
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;