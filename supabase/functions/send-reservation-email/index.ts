import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { nom, prenom, email, whatsapp, pays, vehicule, dateDebut, dateFin, transfert, message } = await req.json()

    // Créer le client Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Insérer la réservation en base de données
    const { data: reservationData, error: dbError } = await supabase
      .from('reservations')
      .insert({
        nom,
        prenom,
        email,
        whatsapp,
        pays,
        vehicule,
        date_debut: dateDebut,
        date_fin: dateFin,
        transfert: transfert || 'Non spécifié',
        message: message || 'Aucun message additionnel',
        created_at: new Date().toISOString()
      })
      .select()
      .single()

    if (dbError) {
      console.error('Erreur base de données:', dbError)
      throw new Error('Erreur lors de l\'enregistrement de la réservation')
    }

    console.log('Réservation enregistrée:', reservationData)

    // Envoyer email de confirmation au client via Supabase Auth
    const { error: emailError } = await supabase.auth.admin.generateLink({
      type: 'signup',
      email: email,
      options: {
        data: {
          nom,
          prenom,
          reservation_id: reservationData.id,
          custom_email_type: 'reservation_confirmation'
        }
      }
    })

    if (emailError) {
      console.error('Erreur envoi email de confirmation:', emailError)
      // Ne pas faire échouer la réservation si l'email ne part pas
    }

    // Envoyer notification interne (optionnel - vous pouvez configurer un webhook)
    console.log(`Nouvelle réservation reçue:
      Client: ${prenom} ${nom}
      Email: ${email}
      WhatsApp: ${whatsapp}
      Pays: ${pays}
      Véhicule: ${vehicule}
      Dates: ${dateDebut} - ${dateFin}
      Transfert: ${transfert || 'Non spécifié'}
      Message: ${message || 'Aucun message'}`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Votre demande de réservation a été reçue et enregistrée. Nous vous contacterons dans les 24 heures pour confirmer tous les détails de votre réservation.',
        reservationId: reservationData.id 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Erreur:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})