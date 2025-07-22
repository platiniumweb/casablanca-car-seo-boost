
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
      setScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleWhatsApp = () => {
    window.open("https://wa.me/212661202213", "_blank");
  };

  const navItems = [
    { href: "#accueil", label: t('nav.home') },
    { href: "#vehicules", label: t('nav.vehicles') },
    { href: "#reservation", label: "Réservation" },
    { href: "#services", label: t('nav.services') },
    { href: "#avis", label: t('nav.testimonials') },
    { href: "#contact", label: t('nav.contact') },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
      scrolled 
        ? 'bg-black/90 backdrop-blur-xl shadow-2xl border-b border-red-500/20' 
        : 'bg-gradient-to-r from-black via-gray-900 to-black shadow-lg'
    }`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo Section - Enhanced */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <div className="relative group">
              <div className={`absolute inset-0 bg-gradient-to-r from-red-500/30 to-orange-500/30 rounded-2xl blur-lg transition-all duration-300 ${
                scrolled ? 'opacity-60' : 'opacity-80'
              } group-hover:opacity-100`}></div>
              <img 
                src="/lovable-uploads/4bb512ef-31d0-4e0f-804b-339a71dba325.png" 
                alt="Platinium Ride Car Logo" 
                className={`relative h-16 w-auto lg:h-20 object-contain transition-all duration-300 ${
                  scrolled ? 'filter brightness-110' : ''
                } hover:scale-105`}
              />
            </div>
            <div className="hidden sm:block">
              <h1 className={`text-xl lg:text-3xl font-bold bg-gradient-to-r from-red-400 via-red-300 to-orange-400 bg-clip-text text-transparent transition-all duration-300 ${
                scrolled ? 'text-lg lg:text-2xl' : ''
              }`}>
                Platinium Ride Car
              </h1>
              <p className={`text-sm lg:text-base font-medium text-gray-300 transition-all duration-300 ${
                scrolled ? 'text-xs lg:text-sm opacity-80' : ''
              }`}>
                Location voiture Casablanca
              </p>
            </div>
          </div>

          {/* Desktop Navigation - Modernized */}
          <nav className={`hidden lg:flex items-center space-x-8 transition-all duration-300`}>
            {navItems.map((item) => (
              <a 
                key={item.href}
                href={item.href} 
                className="relative group text-white hover:text-red-400 transition-all duration-300 text-sm font-medium py-2"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons - Enhanced */}
          <div className="hidden md:flex items-center space-x-3 flex-shrink-0">
            <LanguageSelector />
            <Button 
              variant="outline" 
              size="sm"
              className={`border-red-500/50 text-red-400 hover:bg-red-500/20 hover:text-red-300 text-xs font-medium shadow-lg transition-all duration-300 bg-black/30 backdrop-blur-sm ${
                scrolled ? 'border-red-400/70 bg-black/50' : ''
              }`}
            >
              <Phone className="w-3 h-3 mr-2" />
              <span className="hidden lg:inline">06 61 202 213</span>
            </Button>
            <Button 
              onClick={handleWhatsApp}
              className={`bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-lg transition-all duration-300 border border-red-500/30 ${
                scrolled ? 'shadow-red-500/20' : 'shadow-red-500/30'
              }`}
              size="sm"
            >
              <MessageCircle className="w-3 h-3 mr-2" />
              <span className="hidden lg:inline">WhatsApp</span>
            </Button>
          </div>

          {/* Mobile Menu Button - Enhanced */}
          <div className="flex items-center space-x-3 md:hidden">
            <LanguageSelector />
            <button
              onClick={toggleMenu}
              className={`p-2 hover:bg-red-500/20 rounded-lg transition-all duration-300 text-white ${
                scrolled ? 'bg-black/30' : ''
              }`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Enhanced */}
        {isMenuOpen && (
          <div className={`md:hidden py-6 border-t border-red-500/20 animate-fade-in transition-all duration-300 bg-gradient-to-b from-black/95 to-gray-900/95 backdrop-blur-xl`}>
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a 
                  key={item.href}
                  href={item.href} 
                  className="relative group text-white hover:text-red-400 transition-colors py-3 font-medium border-l-4 border-transparent hover:border-red-500 pl-4" 
                  onClick={toggleMenu}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col space-y-3 pt-6 border-t border-red-500/20">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-red-500/50 text-red-400 hover:bg-red-500/20 hover:text-red-300 bg-black/30"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  06 61 202 213
                </Button>
                <Button 
                  onClick={handleWhatsApp}
                  className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-lg"
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
