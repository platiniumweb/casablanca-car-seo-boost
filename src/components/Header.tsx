import { useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleWhatsApp = () => {
    window.open("https://wa.me/212661202213", "_blank");
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-lg">P</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Platinium Ride Car</h1>
              <p className="text-xs opacity-80">Location voiture Casablanca</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#accueil" className="hover:text-accent transition-colors">Accueil</a>
            <a href="#vehicules" className="hover:text-accent transition-colors">Nos Véhicules</a>
            <a href="#services" className="hover:text-accent transition-colors">Services</a>
            <a href="#avis" className="hover:text-accent transition-colors">Avis</a>
            <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              <Phone className="w-4 h-4 mr-2" />
              06 61 202 213
            </Button>
            <Button 
              onClick={handleWhatsApp}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              size="sm"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 hover:bg-primary/20 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary-foreground/20">
            <nav className="flex flex-col space-y-4">
              <a href="#accueil" className="hover:text-accent transition-colors">Accueil</a>
              <a href="#vehicules" className="hover:text-accent transition-colors">Nos Véhicules</a>
              <a href="#services" className="hover:text-accent transition-colors">Services</a>
              <a href="#avis" className="hover:text-accent transition-colors">Avis</a>
              <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  06 61 202 213
                </Button>
                <Button 
                  onClick={handleWhatsApp}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  size="sm"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp 7j/7
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;