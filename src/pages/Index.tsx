import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VehicleSection from "@/components/VehicleSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { LanguageProvider } from "@/contexts/LanguageContext";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <Hero />
        <VehicleSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
        <WhatsAppFloat />
      </div>
    </LanguageProvider>
  );
};

export default Index;
