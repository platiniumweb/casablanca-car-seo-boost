
import { useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleWhatsApp = () => {
    window.open("https://wa.me/212661202213", "_blank");
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Brand Image */}
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/be62d16e-4a6f-4f53-b55a-d0a1e39d173d.png" 
              alt="Platinium Ride Car Logo" 
              className="h-10 w-10 md:h-12 md:w-12 object-contain rounded-lg"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold">Platinium Ride Car</h1>
              <p className="text-xs opacity-80">Location voiture Casablanca</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <a href="#accueil" className="hover:text-accent transition-colors text-sm">{t('nav.home')}</a>
            <a href="#vehicules" className="hover:text-accent transition-colors text-sm">{t('nav.vehicles')}</a>
            <a href="#reservation" className="hover:text-accent transition-colors text-sm">Réservation</a>
            <a href="#services" className="hover:text-accent transition-colors text-sm">{t('nav.services')}</a>
            <a href="#avis" className="hover:text-accent transition-colors text-sm">{t('nav.testimonials')}</a>
            <a href="#contact" className="hover:text-accent transition-colors text-sm">{t('nav.contact')}</a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <LanguageSelector />
            <Button 
              variant="outline" 
              size="sm"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground text-xs"
            >
              <Phone className="w-3 h-3 mr-1" />
              <span className="hidden lg:inline">06 61 202 213</span>
            </Button>
            <Button 
              onClick={handleWhatsApp}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              size="sm"
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              <span className="hidden lg:inline">WhatsApp</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <LanguageSelector />
            <button
              onClick={toggleMenu}
              className="p-2 hover:bg-primary/20 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-primary-foreground/20">
            <nav className="flex flex-col space-y-3">
              <a href="#accueil" className="hover:text-accent transition-colors py-2" onClick={toggleMenu}>{t('nav.home')}</a>
              <a href="#vehicules" className="hover:text-accent transition-colors py-2" onClick={toggleMenu}>{t('nav.vehicles')}</a>
              <a href="#reservation" className="hover:text-accent transition-colors py-2" onClick={toggleMenu}>Réservation</a>
              <a href="#services" className="hover:text-accent transition-colors py-2" onClick={toggleMenu}>{t('nav.services')}</a>
              <a href="#avis" className="hover:text-accent transition-colors py-2" onClick={toggleMenu}>{t('nav.testimonials')}</a>
              <a href="#contact" className="hover:text-accent transition-colors py-2" onClick={toggleMenu}>{t('nav.contact')}</a>
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
