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

    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY not configured')
    }

    // Créer le client Supabase pour insérer en base
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!
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

    // Envoi de l'email via Resend
    const emailData = {
      from: 'Platinium Ride Car <noreply@platiniumride.com>',
      to: ['platinium.ride.web@gmail.com'],
      subject: `🚗 Nouvelle réservation - ${prenom} ${nom}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a365d; border-bottom: 2px solid #3182ce; padding-bottom: 10px;">
            🚗 Nouvelle demande de réservation
          </h2>
          
          <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d3748; margin-top: 0;">👤 Informations client</h3>
            <p><strong>Nom complet:</strong> ${prenom} ${nom}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>WhatsApp:</strong> ${whatsapp}</p>
            <p><strong>Pays:</strong> ${pays}</p>
          </div>
          
          <div style="background: #edf2f7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d3748; margin-top: 0;">🚙 Détails de la réservation</h3>
            <p><strong>Véhicule:</strong> ${vehicule}</p>
            <p><strong>Date de début:</strong> ${dateDebut}</p>
            <p><strong>Date de fin:</strong> ${dateFin}</p>
            <p><strong>Transfert:</strong> ${transfert || 'Non spécifié'}</p>
          </div>
          
          ${message ? `
          <div style="background: #f0fff4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #2d3748; margin-top: 0;">💬 Message du client</h3>
            <p style="font-style: italic;">${message}</p>
          </div>
          ` : ''}
          
          <div style="background: #2d3748; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <p style="margin: 0;">
              <a href="https://wa.me/${whatsapp.replace('+', '')}" 
                 style="color: #68d391; text-decoration: none; font-weight: bold;">
                📱 Contacter le client sur WhatsApp
              </a>
            </p>
          </div>
          
          <p style="color: #718096; font-size: 12px; text-align: center; margin-top: 30px;">
            Email envoyé automatiquement depuis le site web Platinium Ride Car
          </p>
        </div>
      `
    }

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    })

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text()
      console.error('Erreur Resend:', errorText)
      throw new Error('Erreur lors de l\'envoi de l\'email')
    }

    const emailResult = await emailResponse.json()
    console.log('Email envoyé avec succès:', emailResult)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Réservation enregistrée et email envoyé',
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