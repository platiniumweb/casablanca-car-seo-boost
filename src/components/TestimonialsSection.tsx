import { Star, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Youssef M.",
      location: "Touriste français",
      rating: 5,
      comment: "Service impeccable ! Véhicule livré à l'heure à l'aéroport Mohammed V. La voiture était propre et en parfait état. Je recommande vivement Platinium Ride Car pour toute location de voiture à Casablanca.",
      vehicle: "Dacia Duster 4x4"
    },
    {
      id: 2,
      name: "Fatima B.",
      location: "Résidente Casablanca",
      rating: 5,
      comment: "Excellente expérience avec l'équipe. Réservation très facile via WhatsApp. Prix très compétitifs et service client au top. Je loue régulièrement chez eux pour mes déplacements professionnels.",
      vehicle: "BMW Série 3"
    },
    {
      id: 3,
      name: "Ahmed K.",
      location: "Homme d'affaires",
      rating: 5,
      comment: "Location de voiture de luxe pour mes réunions d'affaires. Service professionnel, véhicule impeccable. L'équipe de Platinium Ride Car comprend parfaitement les besoins des clients d'affaires.",
      vehicle: "Mercedes Classe C"
    },
    {
      id: 4,
      name: "Sophie L.",
      location: "Famille en vacances",
      rating: 5,
      comment: "Parfait pour nos vacances en famille au Maroc ! Le Lodgy 7 places était spacieux et confortable. Service WhatsApp très réactif, nous avons pu modifier notre réservation facilement.",
      vehicle: "Dacia Lodgy 7 places"
    },
    {
      id: 5,
      name: "Karim R.",
      location: "Entrepreneur",
      rating: 5,
      comment: "Je travaille avec Platinium Ride Car depuis 2 ans. Toujours satisfait de leur service. Flotte bien entretenue, prix justes et équipe disponible. Mon choix #1 pour la location à Casablanca.",
      vehicle: "Dacia Sandero"
    },
    {
      id: 6,
      name: "Elena G.",
      location: "Expatriée",
      rating: 5,
      comment: "Nouvelle à Casablanca, j'avais besoin d'une voiture rapidement. L'équipe m'a parfaitement conseillée et le processus était très simple. Livraison directe à mon domicile !",
      vehicle: "Duster 4x4"
    }
  ];

  const handleWhatsAppTestimonial = () => {
    window.open("https://wa.me/212661202213?text=Bonjour, j'aimerais laisser un avis sur votre service de location", "_blank");
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`w-4 h-4 ${index < rating ? 'text-accent fill-accent' : 'text-muted-foreground'}`} 
      />
    ));
  };

  return (
    <section id="avis" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="secondary">Avis Clients</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ce que disent nos clients sur notre <span className="text-accent">service</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Plus de 500 clients satisfaits nous font confiance pour leur location de voiture à Casablanca. 
            Découvrez leurs témoignages authentiques.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">500+</div>
            <div className="text-muted-foreground">Clients satisfaits</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">4.9/5</div>
            <div className="text-muted-foreground">Note moyenne</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">98%</div>
            <div className="text-muted-foreground">Clients qui recommandent</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-accent mb-2">2 ans</div>
            <div className="text-muted-foreground">D'expérience</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Comment */}
                <blockquote className="text-muted-foreground mb-6 italic">
                  "{testimonial.comment}"
                </blockquote>

                {/* Author Info */}
                <div className="border-t border-border pt-4">
                  <div className="font-semibold text-card-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  <Badge variant="outline" className="mt-2 text-xs">
                    {testimonial.vehicle}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-muted/50 rounded-2xl p-8 lg:p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">Vous aussi, partagez votre expérience !</h3>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Votre avis compte pour nous et aide d'autres clients à choisir Platinium Ride Car 
            pour leur location de voiture à Casablanca.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleWhatsAppTestimonial}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Laisser un avis
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => document.getElementById('vehicules')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Découvrir nos véhicules
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;