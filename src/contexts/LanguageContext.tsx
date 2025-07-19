import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'fr' | 'en' | 'es' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.vehicles': 'Nos Véhicules',
    'nav.services': 'Services',
    'nav.testimonials': 'Avis',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.badge': '#1 Location de voiture à Casablanca',
    'hero.title': 'Votre Liberté de Mouvement à Casablanca',
    'hero.subtitle': 'Location de voiture à Casablanca avec Platinium Ride Car. Véhicules économiques, SUV, 4x4 et voitures de luxe. Livraison rapide à l\'aéroport Mohammed V ou votre hôtel. Service 7j/7 avec assistance WhatsApp instantanée.',
    'hero.whatsapp': 'Réserver sur WhatsApp',
    'hero.vehicles': 'Voir nos Véhicules',
    'hero.delivery': 'Livraison',
    'hero.deliveryDesc': 'Aéroport & Hôtel',
    'hero.service': 'Service 7j/7',
    'hero.serviceDesc': 'Assistance 24h',
    'hero.insurance': 'Assurance',
    'hero.insuranceDesc': 'Tous risques',
    'hero.whatsappDesc': 'Réponse rapide',
    'hero.pricing': 'Tarifs Compétitifs',
    'hero.pricingDesc': 'Prix transparents, sans frais cachés',
    'hero.economic': 'Citadine Économique',
    'hero.suv': 'SUV / 4x4',
    'hero.luxury': 'Véhicule Luxe',
    'hero.perDay': 'par jour',
    'hero.quote': 'Demander un Devis',
    
    // Contact
    'contact.title': 'Réservez votre voiture à Casablanca',
    'contact.subtitle': 'Contactez Platinium Ride Car pour réserver votre véhicule. Notre équipe est disponible 7j/7 pour vous accompagner dans votre location de voiture à Casablanca.',
    'contact.whatsapp247': 'WhatsApp 7j/7',
    'contact.phone': 'Téléphone',
    'contact.email': 'Email',
    'contact.location': 'Localisation',
    'contact.instantHelp': 'Assistance instantanée',
    'contact.directCall': 'Appel direct',
    'contact.response24h': 'Réponse sous 24h',
    'contact.cityDelivery': 'Livraison dans toute la ville',
    'contact.hours': 'Horaires de service',
    'contact.monToSun': 'Lundi - Dimanche',
    'contact.support': 'Support WhatsApp',
    'contact.vehicleDelivery': 'Livraison véhicules',
    'contact.form.title': 'Demande de renseignements',
    'contact.form.subtitle': 'Remplissez ce formulaire et nous vous répondrons rapidement sur WhatsApp',
    'contact.form.name': 'Nom complet',
    'contact.form.phone': 'Téléphone',
    'contact.form.email': 'Email',
    'contact.form.message': 'Message',
    'contact.form.placeholder.name': 'Votre nom',
    'contact.form.placeholder.phone': '+212 6XX XXX XXX',
    'contact.form.placeholder.email': 'votre@email.com',
    'contact.form.placeholder.message': 'Précisez vos besoins : type de véhicule, dates, lieu de livraison...',
    'contact.form.send': 'Envoyer sur WhatsApp',
    'contact.form.notice': 'En soumettant ce formulaire, vous serez redirigé vers WhatsApp pour finaliser votre demande. Réponse garantie sous 30 minutes pendant les heures d\'ouverture.',
    'contact.urgentBooking': 'Besoin d\'une réservation urgente ?',
    'contact.urgentText': 'Contactez-nous directement sur WhatsApp pour une réponse immédiate et une réservation express.',
    'contact.expressBooking': 'WhatsApp : Réservation Express',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.vehicles': 'Our Vehicles',
    'nav.services': 'Services',
    'nav.testimonials': 'Reviews',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.badge': '#1 Car Rental in Casablanca',
    'hero.title': 'Your Freedom of Movement in Casablanca',
    'hero.subtitle': 'Car rental in Casablanca with Platinium Ride Car. Economy vehicles, SUVs, 4x4s and luxury cars. Fast delivery to Mohammed V airport or your hotel. 7/7 service with instant WhatsApp assistance.',
    'hero.whatsapp': 'Book on WhatsApp',
    'hero.vehicles': 'View our Vehicles',
    'hero.delivery': 'Delivery',
    'hero.deliveryDesc': 'Airport & Hotel',
    'hero.service': '7/7 Service',
    'hero.serviceDesc': '24h Assistance',
    'hero.insurance': 'Insurance',
    'hero.insuranceDesc': 'Full coverage',
    'hero.whatsappDesc': 'Quick response',
    'hero.pricing': 'Competitive Rates',
    'hero.pricingDesc': 'Transparent prices, no hidden fees',
    'hero.economic': 'Economy Car',
    'hero.suv': 'SUV / 4x4',
    'hero.luxury': 'Luxury Vehicle',
    'hero.perDay': 'per day',
    'hero.quote': 'Request Quote',
    
    // Contact
    'contact.title': 'Book your car in Casablanca',
    'contact.subtitle': 'Contact Platinium Ride Car to book your vehicle. Our team is available 7/7 to assist you with your car rental in Casablanca.',
    'contact.whatsapp247': 'WhatsApp 7/7',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.location': 'Location',
    'contact.instantHelp': 'Instant assistance',
    'contact.directCall': 'Direct call',
    'contact.response24h': 'Response within 24h',
    'contact.cityDelivery': 'Delivery throughout the city',
    'contact.hours': 'Service hours',
    'contact.monToSun': 'Monday - Sunday',
    'contact.support': 'WhatsApp Support',
    'contact.vehicleDelivery': 'Vehicle delivery',
    'contact.form.title': 'Information request',
    'contact.form.subtitle': 'Fill out this form and we will respond quickly on WhatsApp',
    'contact.form.name': 'Full name',
    'contact.form.phone': 'Phone',
    'contact.form.email': 'Email',
    'contact.form.message': 'Message',
    'contact.form.placeholder.name': 'Your name',
    'contact.form.placeholder.phone': '+212 6XX XXX XXX',
    'contact.form.placeholder.email': 'your@email.com',
    'contact.form.placeholder.message': 'Specify your needs: vehicle type, dates, delivery location...',
    'contact.form.send': 'Send on WhatsApp',
    'contact.form.notice': 'By submitting this form, you will be redirected to WhatsApp to finalize your request. Response guaranteed within 30 minutes during business hours.',
    'contact.urgentBooking': 'Need an urgent booking?',
    'contact.urgentText': 'Contact us directly on WhatsApp for an immediate response and express booking.',
    'contact.expressBooking': 'WhatsApp: Express Booking',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.vehicles': 'Nuestros Vehículos',
    'nav.services': 'Servicios',
    'nav.testimonials': 'Opiniones',
    'nav.contact': 'Contacto',
    
    // Hero
    'hero.badge': '#1 Alquiler de coches en Casablanca',
    'hero.title': 'Tu Libertad de Movimiento en Casablanca',
    'hero.subtitle': 'Alquiler de coches en Casablanca con Platinium Ride Car. Vehículos económicos, SUVs, 4x4 y coches de lujo. Entrega rápida al aeropuerto Mohammed V o tu hotel. Servicio 7/7 con asistencia WhatsApp instantánea.',
    'hero.whatsapp': 'Reservar en WhatsApp',
    'hero.vehicles': 'Ver nuestros Vehículos',
    'hero.delivery': 'Entrega',
    'hero.deliveryDesc': 'Aeropuerto y Hotel',
    'hero.service': 'Servicio 7/7',
    'hero.serviceDesc': 'Asistencia 24h',
    'hero.insurance': 'Seguro',
    'hero.insuranceDesc': 'Todo riesgo',
    'hero.whatsappDesc': 'Respuesta rápida',
    'hero.pricing': 'Tarifas Competitivas',
    'hero.pricingDesc': 'Precios transparentes, sin tarifas ocultas',
    'hero.economic': 'Coche Económico',
    'hero.suv': 'SUV / 4x4',
    'hero.luxury': 'Vehículo de Lujo',
    'hero.perDay': 'por día',
    'hero.quote': 'Solicitar Presupuesto',
    
    // Contact
    'contact.title': 'Reserva tu coche en Casablanca',
    'contact.subtitle': 'Contacta con Platinium Ride Car para reservar tu vehículo. Nuestro equipo está disponible 7/7 para acompañarte en tu alquiler de coche en Casablanca.',
    'contact.whatsapp247': 'WhatsApp 7/7',
    'contact.phone': 'Teléfono',
    'contact.email': 'Email',
    'contact.location': 'Ubicación',
    'contact.instantHelp': 'Asistencia instantánea',
    'contact.directCall': 'Llamada directa',
    'contact.response24h': 'Respuesta en 24h',
    'contact.cityDelivery': 'Entrega en toda la ciudad',
    'contact.hours': 'Horarios de servicio',
    'contact.monToSun': 'Lunes - Domingo',
    'contact.support': 'Soporte WhatsApp',
    'contact.vehicleDelivery': 'Entrega de vehículos',
    'contact.form.title': 'Solicitud de información',
    'contact.form.subtitle': 'Completa este formulario y te responderemos rápidamente en WhatsApp',
    'contact.form.name': 'Nombre completo',
    'contact.form.phone': 'Teléfono',
    'contact.form.email': 'Email',
    'contact.form.message': 'Mensaje',
    'contact.form.placeholder.name': 'Tu nombre',
    'contact.form.placeholder.phone': '+212 6XX XXX XXX',
    'contact.form.placeholder.email': 'tu@email.com',
    'contact.form.placeholder.message': 'Especifica tus necesidades: tipo de vehículo, fechas, lugar de entrega...',
    'contact.form.send': 'Enviar por WhatsApp',
    'contact.form.notice': 'Al enviar este formulario, serás redirigido a WhatsApp para finalizar tu solicitud. Respuesta garantizada en 30 minutos durante horario de atención.',
    'contact.urgentBooking': '¿Necesitas una reserva urgente?',
    'contact.urgentText': 'Contáctanos directamente en WhatsApp para una respuesta inmediata y reserva express.',
    'contact.expressBooking': 'WhatsApp: Reserva Express',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.vehicles': 'سياراتنا',
    'nav.services': 'الخدمات',
    'nav.testimonials': 'التقييمات',
    'nav.contact': 'اتصل بنا',
    
    // Hero
    'hero.badge': '#1 كراء السيارات في الدار البيضاء',
    'hero.title': 'حريتك في التنقل بالدار البيضاء',
    'hero.subtitle': 'كراء السيارات في الدار البيضاء مع بلاتينيوم رايد كار. سيارات اقتصادية، دفع رباعي، 4x4 وسيارات فاخرة. تسليم سريع لمطار محمد الخامس أو فندقك. خدمة 7/7 مع مساعدة فورية عبر واتساب.',
    'hero.whatsapp': 'احجز عبر واتساب',
    'hero.vehicles': 'شاهد سياراتنا',
    'hero.delivery': 'التوصيل',
    'hero.deliveryDesc': 'المطار والفندق',
    'hero.service': 'خدمة 7/7',
    'hero.serviceDesc': 'مساعدة 24 ساعة',
    'hero.insurance': 'التأمين',
    'hero.insuranceDesc': 'شامل المخاطر',
    'hero.whatsappDesc': 'رد سريع',
    'hero.pricing': 'أسعار تنافسية',
    'hero.pricingDesc': 'أسعار شفافة، بدون رسوم خفية',
    'hero.economic': 'سيارة اقتصادية',
    'hero.suv': 'دفع رباعي / 4x4',
    'hero.luxury': 'سيارة فاخرة',
    'hero.perDay': 'في اليوم',
    'hero.quote': 'طلب عرض سعر',
    
    // Contact
    'contact.title': 'احجز سيارتك في الدار البيضاء',
    'contact.subtitle': 'اتصل ببلاتينيوم رايد كار لحجز سيارتك. فريقنا متاح 7/7 لمساعدتك في كراء السيارات في الدار البيضاء.',
    'contact.whatsapp247': 'واتساب 7/7',
    'contact.phone': 'الهاتف',
    'contact.email': 'البريد الإلكتروني',
    'contact.location': 'الموقع',
    'contact.instantHelp': 'مساعدة فورية',
    'contact.directCall': 'اتصال مباشر',
    'contact.response24h': 'رد في 24 ساعة',
    'contact.cityDelivery': 'توصيل في جميع أنحاء المدينة',
    'contact.hours': 'ساعات الخدمة',
    'contact.monToSun': 'الاثنين - الأحد',
    'contact.support': 'دعم واتساب',
    'contact.vehicleDelivery': 'توصيل السيارات',
    'contact.form.title': 'طلب معلومات',
    'contact.form.subtitle': 'املأ هذا النموذج وسنرد عليك بسرعة عبر واتساب',
    'contact.form.name': 'الاسم الكامل',
    'contact.form.phone': 'الهاتف',
    'contact.form.email': 'البريد الإلكتروني',
    'contact.form.message': 'الرسالة',
    'contact.form.placeholder.name': 'اسمك',
    'contact.form.placeholder.phone': '+212 6XX XXX XXX',
    'contact.form.placeholder.email': 'your@email.com',
    'contact.form.placeholder.message': 'حدد احتياجاتك: نوع السيارة، التواريخ، مكان التسليم...',
    'contact.form.send': 'إرسال عبر واتساب',
    'contact.form.notice': 'بإرسال هذا النموذج، ستتم إعادة توجيهك إلى واتساب لإنهاء طلبك. رد مضمون في 30 دقيقة خلال ساعات العمل.',
    'contact.urgentBooking': 'تحتاج حجز عاجل؟',
    'contact.urgentText': 'اتصل بنا مباشرة عبر واتساب للحصول على رد فوري وحجز سريع.',
    'contact.expressBooking': 'واتساب: حجز سريع',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};