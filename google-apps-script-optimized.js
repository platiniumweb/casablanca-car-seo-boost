/**
 * Script Google Apps Script optimisé pour Platinium Ride Car
 * À déployer comme application web avec accès à "Tout le monde"
 */

// Configuration - REMPLACEZ PAR VOS VRAIES VALEURS
const CONFIG = {
  SHEET_ID: 'VOTRE_GOOGLE_SHEET_ID', // Remplacez par l'ID de votre Google Sheet
  EMAIL_DESTINATAIRE: 'platinium.ride.web@gmail.com',
  SHEET_NAME: 'Réservations',
  TIMEZONE: 'Africa/Casablanca'
};

/**
 * Fonction principale pour traiter les requêtes POST
 */
function doPost(e) {
  try {
    // Configuration CORS
    const response = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
      }
    };

    // Parsing des données
    let donnees;
    try {
      donnees = JSON.parse(e.postData.contents);
    } catch (parseError) {
      console.error('Erreur parsing JSON:', parseError);
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Format de données invalide'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Validation des données obligatoires
    const champsObligatoires = ['nom', 'prenom', 'email', 'whatsapp', 'pays', 'vehicule', 'dateDebut', 'dateFin'];
    const champManquant = champsObligatoires.find(champ => !donnees[champ] || donnees[champ].toString().trim() === '');
    
    if (champManquant) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: `Champ obligatoire manquant: ${champManquant}`
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Ajout timestamp
    donnees.timestamp = new Date().toLocaleString('fr-FR', { timeZone: CONFIG.TIMEZONE });
    donnees.source = 'Site Web Platinium Ride';

    // Écriture dans Google Sheets
    const resultSheet = ecrireDansSheet(donnees);
    if (!resultSheet.success) {
      throw new Error(resultSheet.error);
    }

    // Envoi email de notification
    const resultEmail = envoyerEmailNotification(donnees);
    if (!resultEmail.success) {
      console.warn('Email non envoyé:', resultEmail.error);
    }

    // Réponse de succès
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Réservation enregistrée avec succès',
        id: resultSheet.id
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('Erreur doPost:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: 'Erreur serveur: ' + error.message
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Gestion des requêtes OPTIONS pour CORS
 */
function doOptions() {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

/**
 * Fonction pour écrire dans Google Sheets
 */
function ecrireDansSheet(donnees) {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);
    
    // Créer la feuille si elle n'existe pas
    if (!sheet) {
      sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
    }

    // Ajouter les en-têtes si c'est la première ligne
    if (sheet.getLastRow() === 0) {
      const entetes = [
        'Timestamp', 'Nom', 'Prénom', 'Email', 'WhatsApp', 'Pays',
        'Véhicule', 'Date Début', 'Date Fin', 'Transfert', 'Message', 'Source'
      ];
      sheet.getRange(1, 1, 1, entetes.length).setValues([entetes]);
      
      // Formatage des en-têtes
      const headerRange = sheet.getRange(1, 1, 1, entetes.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('white');
    }

    // Préparer les données pour insertion
    const ligne = [
      donnees.timestamp,
      donnees.nom,
      donnees.prenom,
      donnees.email,
      donnees.whatsapp,
      donnees.pays,
      donnees.vehicule,
      donnees.dateDebut,
      donnees.dateFin,
      donnees.transfert || 'Non spécifié',
      donnees.message || 'Aucun message',
      donnees.source
    ];

    // Insérer la nouvelle ligne
    const newRow = sheet.getLastRow() + 1;
    sheet.getRange(newRow, 1, 1, ligne.length).setValues([ligne]);

    // Auto-ajuster les colonnes
    sheet.autoResizeColumns(1, ligne.length);

    return { success: true, id: newRow };

  } catch (error) {
    console.error('Erreur écriture Sheet:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Fonction pour envoyer email de notification
 */
function envoyerEmailNotification(donnees) {
  try {
    const sujet = `🚗 Nouvelle réservation - ${donnees.prenom} ${donnees.nom}`;
    
    const corps = `
      <h2 style="color: #4285f4;">Nouvelle demande de réservation</h2>
      
      <h3>Informations client:</h3>
      <ul>
        <li><strong>Nom:</strong> ${donnees.nom}</li>
        <li><strong>Prénom:</strong> ${donnees.prenom}</li>
        <li><strong>Email:</strong> ${donnees.email}</li>
        <li><strong>WhatsApp:</strong> ${donnees.whatsapp}</li>
        <li><strong>Pays:</strong> ${donnees.pays}</li>
      </ul>
      
      <h3>Détails de la réservation:</h3>
      <ul>
        <li><strong>Véhicule:</strong> ${donnees.vehicule}</li>
        <li><strong>Date de début:</strong> ${donnees.dateDebut}</li>
        <li><strong>Date de fin:</strong> ${donnees.dateFin}</li>
        <li><strong>Transfert:</strong> ${donnees.transfert || 'Non spécifié'}</li>
      </ul>
      
      ${donnees.message ? `<h3>Message:</h3><p>${donnees.message}</p>` : ''}
      
      <hr>
      <p><small>Reçu le ${donnees.timestamp}</small></p>
      
      <p style="color: #666;">
        <a href="https://wa.me/${donnees.whatsapp.replace(/[^0-9]/g, '')}" 
           style="background: #25d366; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">
          Contacter via WhatsApp
        </a>
      </p>
    `;

    MailApp.sendEmail({
      to: CONFIG.EMAIL_DESTINATAIRE,
      subject: sujet,
      htmlBody: corps
    });

    return { success: true };

  } catch (error) {
    console.error('Erreur envoi email:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Fonction de test pour vérifier la configuration
 */
function testerConfiguration() {
  try {
    // Test d'accès au Sheet
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SHEET_ID);
    console.log('✅ Accès Google Sheet OK');
    
    // Test données factices
    const donneesTest = {
      nom: 'Test',
      prenom: 'Utilisateur',
      email: 'test@example.com',
      whatsapp: '+212661202213',
      pays: 'Maroc',
      vehicule: 'Dacia Sandero',
      dateDebut: '2024-01-01',
      dateFin: '2024-01-07',
      transfert: 'Aéroport',
      message: 'Test du script'
    };
    
    const result = ecrireDansSheet(donneesTest);
    if (result.success) {
      console.log('✅ Test écriture OK');
    } else {
      console.error('❌ Erreur test écriture:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Erreur configuration:', error.message);
  }
}

/**
 * Fonction GET pour tests
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: 'Script Platinium Ride Car actif',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}