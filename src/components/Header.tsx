
import { useState, useEffect } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleWhatsApp = () => {
    window.open("https://wa.me/212661202213", "_blank");
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ease-in-out ${
      scrolled 
        ? 'bg-primary/70 backdrop-blur-lg shadow-lg border-b border-white/10' 
        : 'bg-primary shadow-lg'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with Brand Image - Enhanced visibility */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-xl blur-sm"></div>
              <img 
                src="/lovable-uploads/be62d16e-4a6f-4f53-b55a-d0a1e39d173d.png" 
                alt="Platinium Ride Car Logo" 
                className={`relative h-14 w-14 md:h-18 md:w-18 object-contain rounded-xl shadow-xl transition-all duration-300 ${
                  scrolled ? 'bg-white/30 p-2' : 'bg-white/20 p-2'
                }`}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className={`text-lg md:text-2xl font-bold transition-all duration-300 ${
                scrolled ? 'text-primary-foreground/90' : 'text-primary-foreground'
              }`}>
                Platinium Ride Car
              </h1>
              <p className={`text-xs md:text-sm font-medium transition-all duration-300 ${
                scrolled ? 'text-primary-foreground/70' : 'text-primary-foreground/90'
              }`}>
                Location voiture Casablanca
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className={`hidden lg:flex items-center space-x-8 transition-all duration-300 ${
            scrolled ? 'text-primary-foreground/90' : 'text-primary-foreground'
          }`}>
            <a href="#accueil" className="hover:text-accent transition-colors text-sm font-medium hover:scale-105 transform duration-200">{t('nav.home')}</a>
            <a href="#vehicules" className="hover:text-accent transition-colors text-sm font-medium hover:scale-105 transform duration-200">{t('nav.vehicles')}</a>
            <a href="#reservation" className="hover:text-accent transition-colors text-sm font-medium hover:scale-105 transform duration-200">Réservation</a>
            <a href="#services" className="hover:text-accent transition-colors text-sm font-medium hover:scale-105 transform duration-200">{t('nav.services')}</a>
            <a href="#avis" className="hover:text-accent transition-colors text-sm font-medium hover:scale-105 transform duration-200">{t('nav.testimonials')}</a>
            <a href="#contact" className="hover:text-accent transition-colors text-sm font-medium hover:scale-105 transform duration-200">{t('nav.contact')}</a>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3 flex-shrink-0">
            <LanguageSelector />
            <Button 
              variant="outline" 
              size="sm"
              className={`border-accent text-accent hover:bg-accent hover:text-accent-foreground text-xs font-medium shadow-sm transition-all duration-300 ${
                scrolled ? 'bg-white/10' : ''
              }`}
            >
              <Phone className="w-3 h-3 mr-1" />
              <span className="hidden lg:inline">06 61 202 213</span>
            </Button>
            <Button 
              onClick={handleWhatsApp}
              className={`bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm transition-all duration-300 ${
                scrolled ? 'shadow-lg' : ''
              }`}
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
              className={`p-2 hover:bg-primary/20 rounded-lg transition-all duration-300 ${
                scrolled ? 'bg-white/10' : ''
              }`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden py-4 border-t border-primary-foreground/20 animate-fade-in transition-all duration-300 ${
            scrolled ? 'bg-primary/80 backdrop-blur-sm' : ''
          }`}>
            <nav className="flex flex-col space-y-3">
              <a href="#accueil" className="hover:text-accent transition-colors py-2 font-medium" onClick={toggleMenu}>{t('nav.home')}</a>
              <a href="#vehicules" className="hover:text-accent transition-colors py-2 font-medium" onClick={toggleMenu}>{t('nav.vehicles')}</a>
              <a href="#reservation" className="hover:text-accent transition-colors py-2 font-medium" onClick={toggleMenu}>Réservation</a>
              <a href="#services" className="hover:text-accent transition-colors py-2 font-medium" onClick={toggleMenu}>{t('nav.services')}</a>
              <a href="#avis" className="hover:text-accent transition-colors py-2 font-medium" onClick={toggleMenu}>{t('nav.testimonials')}</a>
              <a href="#contact" className="hover:text-accent transition-colors py-2 font-medium" onClick={toggleMenu}>{t('nav.contact')}</a>
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
