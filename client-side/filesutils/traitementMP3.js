const fs = require('fs');
const dataDirectory = './data/';
function traitementMP3() {
    console.log('traitement mp3');
    const mp3File = nomFichier();
    const filePath = dataDirectory + mp3File;
    console.log('Fichier MP3 trouvé :', filePath);
    fileData = fs.readFileSync(filePath);
    return fileData;
}
function nomFichier() {
    
    const fichiersDansData = fs.readdirSync(dataDirectory);
    
    // Vérifier si le répertoire contient un seul fichier
    if (fichiersDansData.length !== 1) {
        console.error('Le répertoire data doit contenir exactement un fichier MP3.');
        return null;
    }
    const mp3File = fichiersDansData[0];
    return mp3File;
}
module.exports = {
    traitementMP3, nomFichier
};