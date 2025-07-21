
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VehicleSection from "@/components/VehicleSection";
import ReservationForm from "@/components/ReservationForm";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import SocialMedia from "@/components/SocialMedia";
import { LanguageProvider } from "@/contexts/LanguageContext";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <Hero />
        <VehicleSection />
        <ReservationForm />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
        <WhatsAppFloat />
        <SocialMedia />
      </div>
    </LanguageProvider>
  );
};

export default Index;
