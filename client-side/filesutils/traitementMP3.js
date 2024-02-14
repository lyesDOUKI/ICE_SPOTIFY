const fs = require('fs');
const dataDirectory = './data/';
function traitementMP3(nomChanson) {
    console.log('traitement mp3');
    const mp3File = nomChanson;
    const filePath = dataDirectory + mp3File;
    console.log('Fichier MP3 trouvé :', filePath);
    fileData = fs.readFileSync(filePath);
    return fileData;
}
module.exports = {
    traitementMP3
};