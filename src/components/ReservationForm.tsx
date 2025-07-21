
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Upload, MessageCircle, Calendar, Car } from "lucide-react";

const ReservationForm = () => {
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

  const [files, setFiles] = useState<FileList | null>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const indicatif = countryCodeMap[formData.pays as keyof typeof countryCodeMap] || '';
    const whatsappComplet = `${indicatif}${formData.whatsapp}`;
    
    const message = `🚗 RÉSERVATION PLATINIUM RIDE CAR 🚗

👤 Client: ${formData.prenom} ${formData.nom}
📱 WhatsApp: ${whatsappComplet}
🌍 Pays: ${formData.pays}

🚙 Véhicule souhaité: ${formData.vehicule}
📅 Période: du ${formData.dateDebut} au ${formData.dateFin}
✈️ Transfert: ${formData.transfert}

💬 Message: ${formData.message}

📄 Pièces d'identité: ${files ? files.length + ' fichier(s) à envoyer' : 'Aucun fichier joint'}`;

    window.open(`https://wa.me/212661202213?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section id="reservation" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4" variant="secondary">Réservation</Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Réservez votre véhicule à <span className="text-accent">Casablanca</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Remplissez ce formulaire pour réserver votre véhicule. Nous vous contacterons rapidement pour confirmer votre réservation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5 text-accent" />
                Formulaire de réservation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Informations personnelles */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nom">Nom *</Label>
                    <Input
                      id="nom"
                      name="nom"
                      type="text"
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
                      type="text"
                      required
                      value={formData.prenom}
                      onChange={handleInputChange}
                      placeholder="Votre prénom"
                    />
                  </div>
                </div>

                {/* Contact */}
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

                {/* Véhicule et dates */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="vehicule">Véhicule souhaité *</Label>
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

                {/* Transfert */}
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

                {/* Upload de documents */}
                <div>
                  <Label htmlFor="documents">Pièces d'identité (Passeport, CNI, Permis)</Label>
                  <div className="mt-2 flex items-center justify-center w-full">
                    <label htmlFor="documents" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:bg-muted/50">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Cliquez pour uploader</span> ou glissez-déposez
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG, PDF (MAX. 10MB)
                        </p>
                      </div>
                      <input
                        id="documents"
                        type="file"
                        multiple
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {files && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {files.length} fichier(s) sélectionné(s)
                    </p>
                  )}
                </div>

                {/* Message */}
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

                {/* Paiement accepté */}
                <div className="p-4 bg-accent/10 rounded-lg">
                  <h4 className="font-semibold mb-2">Modes de paiement acceptés :</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Western Union</Badge>
                    <Badge variant="outline">Wafa Cash</Badge>
                    <Badge variant="outline">MoneyGram</Badge>
                    <Badge variant="outline">Espèces</Badge>
                    <Badge variant="outline">Virement</Badge>
                  </div>
                </div>

                {/* Submit */}
                <Button 
                  type="submit" 
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  size="lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Envoyer la réservation via WhatsApp
                </Button>
              </form>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  Votre formulaire sera envoyé via WhatsApp pour un traitement rapide. 
                  Nous vous contacterons dans les plus brefs délais.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ReservationForm;
