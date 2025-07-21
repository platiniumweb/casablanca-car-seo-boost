
// Script Google Apps Script à déployer
// Ce fichier est fourni pour référence - il doit être copié dans Google Apps Script

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // ID de votre Google Sheet (à remplacer)
    const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID';
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    
    // Ajouter les en-têtes si c'est la première ligne
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Nom', 'Prénom', 'WhatsApp', 'Pays', 
        'Véhicule', 'Date Début', 'Date Fin', 'Transfert', 'Message'
      ]);
    }
    
    // Ajouter les données
    sheet.appendRow([
      data.timestamp,
      data.nom,
      data.prenom,
      data.whatsapp,
      data.pays,
      data.vehicule,
      data.dateDebut,
      data.dateFin,
      data.transfert,
      data.message
    ]);
    
    // Envoyer un email de notification
    const subject = `Nouvelle demande de réservation - ${data.prenom} ${data.nom}`;
    const body = `
      Nouvelle demande de réservation reçue :
      
      Client: ${data.prenom} ${data.nom}
      WhatsApp: ${data.whatsapp}
      Pays: ${data.pays}
      Véhicule: ${data.vehicule}
      Période: du ${data.dateDebut} au ${data.dateFin}
      Transfert: ${data.transfert}
      Message: ${data.message}
      
      Timestamp: ${data.timestamp}
    `;
    
    MailApp.sendEmail({
      to: 'platinium.ride.web@gmail.com',
      subject: subject,
      body: body
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({result: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({result: 'error', message: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({result: 'success', method: 'GET'}))
    .setMimeType(ContentService.MimeType.JSON);
}
