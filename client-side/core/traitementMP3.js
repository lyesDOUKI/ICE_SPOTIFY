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
function deleteAllFiles() {
    fs.readdir(dataDirectory, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            fs.unlink(dataDirectory + file, err => {
                if (err) throw err;
            });
        }
    }
    );
}

module.exports = {
    traitementMP3, deleteAllFiles
};