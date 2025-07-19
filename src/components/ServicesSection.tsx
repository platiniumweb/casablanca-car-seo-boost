import { MapPin, Clock, Shield, Users, Car, Star, MessageCircle, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ServicesSection = () => {
  const services = [
    {
      icon: MapPin,
      title: "Livraison gratuite",
      description: "Livraison de votre véhicule à l'aéroport Mohammed V, votre hôtel ou adresse à Casablanca",
      features: ["Aéroport Mohammed V", "Hôtels de Casablanca", "Domicile ou bureau", "Sans frais supplémentaires"]
    },
    {
      icon: Clock,
      title: "Service 7j/7",
      description: "Assistance et support client disponible tous les jours de la semaine, 24h/24",
      features: ["Support 24h/24", "Réservation instantanée", "Urgences couvertes", "Weekends inclus"]
    },
    {
      icon: Shield,
      title: "Assurance tous risques",
      description: "Tous nos véhicules sont couverts par une assurance complète pour votre tranquillité",
      features: ["Assurance tous risques", "Franchise réduite", "Assistance panne", "Véhicule de remplacement"]
    },
    {
      icon: Users,
      title: "Service personnalisé",
      description: "Équipe dédiée pour vous accompagner dans le choix et la réservation de votre véhicule",
      features: ["Conseils experts", "Réservation sur mesure", "Équipe bilingue", "Suivi client"]
    },
    {
      icon: Car,
      title: "Véhicules récents",
      description: "Flotte moderne et bien entretenue, tous les véhicules ont moins de 2 ans",
      features: ["Véhicules récents", "Entretien régulier", "Contrôle technique", "Nettoyage complet"]
    },
    {
      icon: Star,
      title: "Tarifs préférentiels",
      description: "Tarifs dégressifs pour les locations longue durée et offres spéciales régulières",
      features: ["Prix compétitifs", "Remises fidélité", "Offres spéciales", "Devis gratuit"]
    }
  ];

  const handleWhatsApp = () => {
    window.open("https://wa.me/212661202213?text=Bonjour, j'aimerais en savoir plus sur vos services de location de voiture à Casablanca", "_blank");
  };

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="secondary">Nos Services</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Pourquoi choisir <span className="text-accent">Platinium Ride Car</span> ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Service de location de voiture à Casablanca avec un accompagnement personnalisé. 
            Nous mettons tout en œuvre pour que votre expérience soit parfaite.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 group">
                <CardHeader>
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                    <IconComponent className="w-8 h-8 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  <ul className="space-y-2 text-sm">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-left">
                        <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Process Section */}
        <div className="bg-card rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Comment ça marche ?</h3>
            <p className="text-muted-foreground text-lg">
              Réservez votre voiture à Casablanca en 3 étapes simples
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h4 className="text-xl font-semibold mb-3">Choisissez votre véhicule</h4>
              <p className="text-muted-foreground">
                Parcourez notre gamme de véhicules et sélectionnez celui qui correspond à vos besoins
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h4 className="text-xl font-semibold mb-3">Contactez-nous</h4>
              <p className="text-muted-foreground">
                Envoyez-nous un message WhatsApp ou appelez-nous pour confirmer votre réservation
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h4 className="text-xl font-semibold mb-3">Récupérez votre voiture</h4>
              <p className="text-muted-foreground">
                Nous livrons votre véhicule à l'adresse de votre choix à Casablanca
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleWhatsApp}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Réserver sur WhatsApp
              </Button>
              <Button 
                variant="outline"
                size="lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Appeler maintenant
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;