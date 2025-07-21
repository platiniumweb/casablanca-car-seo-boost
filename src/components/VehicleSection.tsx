
import { Car, Users, Fuel, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const VehicleSection = () => {
  const vehicles = [
    {
      id: 1,
      category: "Économique",
      name: "Dacia Sandero",
      image: "/lovable-uploads/89e0f81d-8ddb-40ef-9049-ff38bdee096c.png",
      dailyPriceDH: 300,
      dailyPriceEUR: 30,
      weeklyPriceDH: 1800,
      weeklyPriceEUR: 180,
      monthlyPriceDH: 6500,
      monthlyPriceEUR: 650,
      features: ["5 places", "Climatisation", "Direction assistée"],
      transmission: "Manuelle",
      fuel: "Essence",
      popular: false
    },
    {
      id: 2,
      category: "SUV",
      name: "Dacia Duster 4x4",
      image: "/lovable-uploads/c1a7dd5f-f93d-4c97-9ee0-b83dd14bab6c.png",
      dailyPriceDH: 500,
      dailyPriceEUR: 50,
      weeklyPriceDH: 3000,
      weeklyPriceEUR: 300,
      monthlyPriceDH: 11000,
      monthlyPriceEUR: 1100,
      features: ["5 places", "4x4", "GPS", "Climatisation"],
      transmission: "Manuelle/Auto",
      fuel: "Diesel",
      popular: true
    },
    {
      id: 3,
      category: "Luxe",
      name: "BMW Série 3",
      image: "/lovable-uploads/df107e53-c1e6-48ff-a564-c1b540445fbe.png",
      dailyPriceDH: 800,
      dailyPriceEUR: 80,
      weeklyPriceDH: 5000,
      weeklyPriceEUR: 500,
      monthlyPriceDH: 18000,
      monthlyPriceEUR: 1800,
      features: ["5 places", "Cuir", "GPS Premium", "Climatisation auto"],
      transmission: "Automatique",
      fuel: "Diesel/Essence",
      popular: false
    },
    {
      id: 4,
      category: "Familial",
      name: "Dacia Lodgy 7 places",
      image: "/lovable-uploads/15cd9717-848d-4496-8fca-c53bb86c3129.png",
      dailyPriceDH: 450,
      dailyPriceEUR: 45,
      weeklyPriceDH: 2700,
      weeklyPriceEUR: 270,
      monthlyPriceDH: 9500,
      monthlyPriceEUR: 950,
      features: ["7 places", "Grand coffre", "Climatisation", "Sièges modulables"],
      transmission: "Manuelle",
      fuel: "Diesel",
      popular: false
    }
  ];

  const handleWhatsAppReservation = (vehicleName: string) => {
    const message = `Bonjour, je souhaite réserver le véhicule ${vehicleName} à Casablanca. Pouvez-vous me donner plus d'informations ?`;
    window.open(`https://wa.me/212661202213?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="vehicules" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="secondary">Nos Véhicules</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Découvrez notre gamme de véhicules à louer à <span className="text-accent">Casablanca</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Large choix de véhicules pour tous vos besoins : citadines économiques, SUV 4x4, voitures familiales 
            et véhicules de luxe. Tous nos véhicules sont récents, entretenus et assurés tous risques.
          </p>
        </div>

        {/* Vehicles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {vehicles.map((vehicle) => (
            <Card key={vehicle.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="relative">
                <img 
                  src={vehicle.image} 
                  alt={`Location ${vehicle.name} à Casablanca`}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {vehicle.popular && (
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                    Populaire
                  </Badge>
                )}
                <Badge 
                  variant="secondary" 
                  className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm"
                >
                  {vehicle.category}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-xl">{vehicle.name}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{vehicle.features[0]}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Fuel className="w-4 h-4" />
                    <span>{vehicle.fuel}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Car className="w-4 h-4" />
                    <span>{vehicle.transmission}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Équipements inclus :</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {vehicle.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>

                {/* Pricing */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="font-medium">Prix journalier</span>
                    <div className="text-right">
                      <div className="font-bold text-lg">{vehicle.dailyPriceDH} DH</div>
                      <div className="text-sm text-muted-foreground">{vehicle.dailyPriceEUR}€ / jour</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Prix semaine</span>
                    <span className="font-semibold">{vehicle.weeklyPriceDH} DH ({vehicle.weeklyPriceEUR}€)</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Prix mensuel</span>
                    <span className="font-semibold text-accent">{vehicle.monthlyPriceDH} DH ({vehicle.monthlyPriceEUR}€)</span>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="mb-6 p-3 bg-accent/10 rounded-lg">
                  <h4 className="font-semibold mb-2 text-sm">Paiement accepté :</h4>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Badge variant="outline">Western Union</Badge>
                    <Badge variant="outline">Wafa Cash</Badge>
                    <Badge variant="outline">MoneyGram</Badge>
                    <Badge variant="outline">Espèces</Badge>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Button 
                    onClick={() => handleWhatsAppReservation(vehicle.name)}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Réserver sur WhatsApp
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MapPin className="w-4 h-4 mr-2" />
                    Voir disponibilité
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-primary text-primary-foreground p-8 rounded-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Véhicule spécifique en tête ?</h3>
            <p className="text-lg mb-6 opacity-90">
              Contactez-nous directement pour connaître la disponibilité et obtenir un devis personnalisé 
              pour votre location de voiture à Casablanca.
            </p>
            <Button 
              onClick={() => handleWhatsAppReservation("un véhicule spécifique")}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Demander un devis personnalisé
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleSection;
