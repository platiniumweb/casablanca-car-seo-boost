
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Send, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SimpleContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    whatsapp: '',
    pays: '',
    vehicule: '',
    dateDebut: '',
    dateFin: '',
    transfert: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const countryCodeMap = {
    'Maroc': '+212',
    'France': '+33',
    'Espagne': '+34',
    'Belgique': '+32',
    'Suisse': '+41',
    'Canada': '+1',
    'Allemagne': '+49',
    'Italie': '+39',
    'Pays-Bas': '+31',
    'Royaume-Uni': '+44',
    'Autre': ''
  };

  const vehicles = [
    'Dacia Sandero',
    'Dacia Duster 4x4',
    'BMW Série 3',
    'Dacia Lodgy 7 places',
    'Autre véhicule'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // URL de votre Google Apps Script (à remplacer par votre URL)
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
      
      const indicatif = countryCodeMap[formData.pays as keyof typeof countryCodeMap] || '';
      const whatsappComplet = `${indicatif}${formData.whatsapp}`;
      
      const dataToSend = {
        ...formData,
        whatsapp: whatsappComplet,
        timestamp: new Date().toISOString(),
        email: 'platinium.ride.web@gmail.com'
      };

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });

      toast({
        title: "Demande envoyée !",
        description: "Votre demande de réservation a été transmise. Nous vous contacterons rapidement.",
      });

      // Réinitialiser le formulaire
      setFormData({
        nom: '',
        prenom: '',
        whatsapp: '',
        pays: '',
        vehicule: '',
        dateDebut: '',
        dateFin: '',
        transfert: '',
        message: ''
      });

    } catch (error) {
      console.error('Erreur:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite. Veuillez réessayer ou nous contacter par WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppContact = () => {
    const indicatif = countryCodeMap[formData.pays as keyof typeof countryCodeMap] || '';
    const whatsappComplet = `${indicatif}${formData.whatsapp}`;
    
    const message = `🚗 DEMANDE DE RÉSERVATION

👤 Client: ${formData.prenom} ${formData.nom}
📱 WhatsApp: ${whatsappComplet}
🌍 Pays: ${formData.pays}
🚙 Véhicule: ${formData.vehicule}
📅 Période: du ${formData.dateDebut} au ${formData.dateFin}
✈️ Transfert: ${formData.transfert}
💬 Message: ${formData.message}`;

    window.open(`https://wa.me/212661202213?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Demande de réservation</CardTitle>
            <p className="text-center text-muted-foreground">
              Remplissez ce formulaire pour votre réservation
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="nom">Nom *</Label>
                  <Input
                    id="nom"
                    name="nom"
                    required
                    value={formData.nom}
                    onChange={handleInputChange}
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <Label htmlFor="prenom">Prénom *</Label>
                  <Input
                    id="prenom"
                    name="prenom"
                    required
                    value={formData.prenom}
                    onChange={handleInputChange}
                    placeholder="Votre prénom"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pays">Pays *</Label>
                  <Select value={formData.pays} onValueChange={(value) => handleSelectChange('pays', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre pays" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(countryCodeMap).map((pays) => (
                        <SelectItem key={pays} value={pays}>
                          {pays} {countryCodeMap[pays as keyof typeof countryCodeMap]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp *</Label>
                  <div className="flex">
                    <div className="flex items-center px-3 bg-muted rounded-l-md border border-r-0">
                      <span className="text-sm font-medium">
                        {countryCodeMap[formData.pays as keyof typeof countryCodeMap] || '+212'}
                      </span>
                    </div>
                    <Input
                      id="whatsapp"
                      name="whatsapp"
                      type="tel"
                      required
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      placeholder="661202213"
                      className="rounded-l-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="vehicule">Véhicule *</Label>
                  <Select value={formData.vehicule} onValueChange={(value) => handleSelectChange('vehicule', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un véhicule" />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicles.map((vehicle) => (
                        <SelectItem key={vehicle} value={vehicle}>
                          {vehicle}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dateDebut">Date de début *</Label>
                  <Input
                    id="dateDebut"
                    name="dateDebut"
                    type="date"
                    required
                    value={formData.dateDebut}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="dateFin">Date de fin *</Label>
                  <Input
                    id="dateFin"
                    name="dateFin"
                    type="date"
                    required
                    value={formData.dateFin}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="transfert">Transfert souhaité</Label>
                <Select value={formData.transfert} onValueChange={(value) => handleSelectChange('transfert', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un transfert" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aeroport">Aéroport Mohammed V</SelectItem>
                    <SelectItem value="hotel">Hôtel / Riad</SelectItem>
                    <SelectItem value="domicile">Domicile</SelectItem>
                    <SelectItem value="gare">Gare</SelectItem>
                    <SelectItem value="autre">Autre lieu</SelectItem>
                    <SelectItem value="aucun">Aucun transfert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Message additionnel</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Informations complémentaires..."
                  rows={4}
                />
              </div>

              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Envoi...' : 'Envoyer la demande'}
                </Button>
                
                <Button 
                  type="button"
                  onClick={handleWhatsAppContact}
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact WhatsApp
                </Button>
              </div>
            </form>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                Formulaire envoyé vers platinium.ride.web@gmail.com
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SimpleContactForm;
