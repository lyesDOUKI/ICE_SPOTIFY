const traitementMP3 = require('./filesutils/traitementMP3');
const Ice = require("ice").Ice;
const Spotify = require("./generated/Spotify").Spotify;
//appeler la fonction
const readline = require('readline');

let nomChanson = ""; // Utilisation de let pour permettre la réassignation
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Saisir le nom d'une chanson : ", (name) => {
  nomChanson = name + ".mp3";
  rl.close();
});

(async function() {
  let communicator;
  try {
    // Attendre que l'utilisateur saisisse une valeur avant de continuer
    await new Promise((resolve) => rl.on('close', resolve));

    const fileData = traitementMP3.traitementMP3(nomChanson);
    
    communicator = Ice.initialize();
    const base = communicator.stringToProxy("SpotifyAdapter:default -p 10000");
    const SpotifyManager = await Spotify.SpotifyManagerPrx.checkedCast(base);
    if(SpotifyManager) {
      console.log("Je récupère SpotifyManager");
      console.log("Uploading...");
      const buffer = Buffer.from(fileData);
      const chunkSize = 1024;
      for (let i = 0; i < buffer.length; i += chunkSize) {
        const sequence = buffer.slice(i, i + chunkSize);
        await SpotifyManager.upload(sequence, nomChanson);
      }
      
      console.log("Upload terminé.");
    } else {
      console.log("Proxy invalide");
    }
  } catch(ex) {
    console.log(ex.toString());
    process.exitCode = 1;
  } finally {
    if(communicator) {
      await communicator.destroy();
    }
  }
})();
