
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Send, MessageCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// 🌍 CODES PAYS AVEC INDICATIFS
const PAYS_OPTIONS = [
  { value: 'Maroc', text: 'Maroc +212', code: '+212' },
  { value: 'France', text: 'France +33', code: '+33' },
  { value: 'Espagne', text: 'Espagne +34', code: '+34' },
  { value: 'Belgique', text: 'Belgique +32', code: '+32' },
  { value: 'Suisse', text: 'Suisse +41', code: '+41' },
  { value: 'Canada', text: 'Canada +1', code: '+1' },
  { value: 'Allemagne', text: 'Allemagne +49', code: '+49' },
  { value: 'Italie', text: 'Italie +39', code: '+39' },
  { value: 'Pays-Bas', text: 'Pays-Bas +31', code: '+31' },
  { value: 'Royaume-Uni', text: 'Royaume-Uni +44', code: '+44' },
  { value: 'Autre', text: 'Autre', code: '+212' }
];

// 🚙 OPTIONS DE VÉHICULES
const VEHICULE_OPTIONS = [
  { value: '', text: 'Choisir un véhicule' },
  { value: 'Dacia Sandero', text: 'Dacia Sandero' },
  { value: 'Dacia Duster 4x4', text: 'Dacia Duster 4x4' },
  { value: 'BMW Série 3', text: 'BMW Série 3' },
  { value: 'Dacia Lodgy 7 places', text: 'Dacia Lodgy 7 places' },
  { value: 'Autre véhicule', text: 'Autre véhicule' }
];

// 🚌 OPTIONS DE TRANSFERT
const TRANSFERT_OPTIONS = [
  { value: '', text: 'Sélectionnez un transfert' },
  { value: 'Aéroport Mohammed V', text: 'Aéroport Mohammed V' },
  { value: 'Hôtel / Riad', text: 'Hôtel / Riad' },
  { value: 'Domicile', text: 'Domicile' },
  { value: 'Gare', text: 'Gare' },
  { value: 'Autre lieu', text: 'Autre lieu' },
  { value: 'Aucun transfert', text: 'Aucun transfert' }
];

// URL Google Apps Script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz4f0Ue2o18F7lVHolmNWn7uU1t_0UFHD1WGiqPFZMqm5K9qSks8YAdb8wHmvtjVh_j/exec';

const SimpleContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    whatsapp: '',
    pays: '',
    vehicule: '',
    dateDebut: '',
    dateFin: '',
    transfert: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🔄 Configuration des dates minimum au chargement
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const dateDebutInput = document.getElementById('dateDebut') as HTMLInputElement;
    const dateFinInput = document.getElementById('dateFin') as HTMLInputElement;
    
    if (dateDebutInput) dateDebutInput.min = today;
    if (dateFinInput) dateFinInput.min = today;
  }, []);

  // 🌍 Obtenir l'indicatif téléphonique du pays sélectionné
  const getCountryCode = (pays: string) => {
    const paysData = PAYS_OPTIONS.find(p => p.value === pays);
    return paysData ? paysData.code : '+212';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });

    // 📅 Gestion dynamique des dates
    if (name === 'dateDebut') {
      const dateFinInput = document.getElementById('dateFin') as HTMLInputElement;
      if (dateFinInput) {
        dateFinInput.min = value;
        // Réinitialiser la date de fin si elle est antérieure à la nouvelle date de début
        if (formData.dateFin && formData.dateFin <= value) {
          setFormData(prev => ({
            ...prev,
            [name]: value,
            dateFin: ''
          }));
        }
      }
    }
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const validateForm = () => {
    const requiredFields = ['nom', 'prenom', 'email', 'whatsapp', 'pays', 'vehicule', 'dateDebut', 'dateFin'];
    const missingField = requiredFields.find(field => !formData[field as keyof typeof formData]?.trim());
    
    if (missingField) {
      toast({
        title: "Champ manquant",
        description: `Veuillez remplir le champ: ${missingField}`,
        variant: "destructive",
      });
      return false;
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email invalide",
        description: "Veuillez saisir une adresse email valide",
        variant: "destructive",
      });
      return false;
    }

    // Validation dates
    const startDate = new Date(formData.dateDebut);
    const endDate = new Date(formData.dateFin);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      toast({
        title: "Date invalide",
        description: "La date de début ne peut pas être dans le passé",
        variant: "destructive",
      });
      return false;
    }

    if (endDate <= startDate) {
      toast({
        title: "Dates invalides",
        description: "La date de fin doit être après la date de début",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // URL de déploiement Google Apps Script - REMPLACEZ PAR VOTRE URL
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz4f0Ue2o18F7lVHolmNWn7uU1t_0UFHD1WGiqPFZMqm5K9qSks8YAdb8wHmvtjVh_j/exec';
      
      const indicatif = getCountryCode(formData.pays);
      const whatsappComplet = `${indicatif}${formData.whatsapp}`;
      
      const dataToSend = {
        nom: formData.nom.trim(),
        prenom: formData.prenom.trim(),
        email: formData.email.trim().toLowerCase(),
        whatsapp: whatsappComplet,
        pays: formData.pays,
        vehicule: formData.vehicule,
        dateDebut: formData.dateDebut,
        dateFin: formData.dateFin,
        transfert: formData.transfert || 'Non spécifié',
        message: formData.message.trim() || 'Aucun message additionnel'
      };

      console.log('Envoi des données:', dataToSend);

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });

      // Tenter de lire la réponse JSON
      let result;
      try {
        const responseText = await response.text();
        console.log('Réponse brute:', responseText);
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.warn('Impossible de parser la réponse JSON, mais requête envoyée');
        result = { success: true }; // Considérer comme succès si pas d'erreur réseau
      }

      if (result.success !== false) {
        toast({
          title: "Réservation envoyée !",
          description: "Votre demande a été transmise avec succès. Nous vous contacterons rapidement.",
        });

        // Réinitialiser le formulaire
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          whatsapp: '',
          pays: '',
          vehicule: '',
          dateDebut: '',
          dateFin: '',
          transfert: '',
          message: ''
        });

        // Scroll vers le haut pour voir le message
        window.scrollTo({ top: 0, behavior: 'smooth' });

      } else {
        throw new Error(result.error || 'Erreur lors de l\'envoi');
      }

    } catch (error) {
      console.error('Erreur envoi formulaire:', error);
      
      toast({
        title: "Erreur d'envoi",
        description: "Problème de connexion. Essayez le contact WhatsApp ou réessayez plus tard.",
        variant: "destructive",
      });

      // Proposer automatiquement WhatsApp en cas d'erreur
      setTimeout(() => {
        if (window.confirm("Voulez-vous contacter directement par WhatsApp ?")) {
          handleWhatsAppContact();
        }
      }, 2000);

    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppContact = () => {
    const indicatif = getCountryCode(formData.pays);
    const whatsappComplet = `${indicatif}${formData.whatsapp}`;
    
    const message = `🚗 DEMANDE DE RÉSERVATION

👤 Client: ${formData.prenom} ${formData.nom}
📧 Email: ${formData.email}
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
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="nom">Nom *</Label>
                  <Input
                    id="nom"
                    name="nom"
                    required
                    value={formData.nom}
                    onChange={handleInputChange}
                    placeholder="Votre nom"
                    className="h-12"
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
                    className="h-12"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="votre.email@example.com"
                  className="h-12"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="pays">Pays *</Label>
                  <Select value={formData.pays} onValueChange={(value) => handleSelectChange('pays', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Sélectionnez votre pays" />
                    </SelectTrigger>
                    <SelectContent>
                      {PAYS_OPTIONS.map((pays) => (
                        <SelectItem key={pays.value} value={pays.value}>
                          {pays.text}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp *</Label>
                  <div className="flex">
                    <div className="flex items-center px-3 bg-muted rounded-l-md border border-r-0 h-12">
                      <span className="text-sm font-medium">
                        {getCountryCode(formData.pays)}
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
                      className="rounded-l-none h-12"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
                <div>
                  <Label htmlFor="vehicule">Véhicule *</Label>
                  <Select value={formData.vehicule} onValueChange={(value) => handleSelectChange('vehicule', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Choisir un véhicule" />
                    </SelectTrigger>
                    <SelectContent>
                      {VEHICULE_OPTIONS.filter(v => v.value !== '').map((vehicle) => (
                        <SelectItem key={vehicle.value} value={vehicle.value}>
                          {vehicle.text}
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
                    className="h-12"
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
                    className="h-12"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="transfert">Transfert souhaité</Label>
                <Select value={formData.transfert} onValueChange={(value) => handleSelectChange('transfert', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Sélectionnez un transfert" />
                  </SelectTrigger>
                  <SelectContent>
                    {TRANSFERT_OPTIONS.filter(t => t.value !== '').map((transfert) => (
                      <SelectItem key={transfert.value} value={transfert.value}>
                        {transfert.text}
                      </SelectItem>
                    ))}
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

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 h-12 bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      📤 Envoyer la réservation
                    </>
                  )}
                </Button>
                
                <Button 
                  type="button"
                  onClick={handleWhatsAppContact}
                  className="flex-1 h-12 bg-accent hover:bg-accent/90 text-accent-foreground"
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
