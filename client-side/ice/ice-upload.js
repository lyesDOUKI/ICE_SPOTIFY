// fichier traitementChanson.js

const traitementMP3 = require('../core/traitementMP3');
const Ice = require("ice").Ice;
const Spotify = require("../generated/Spotify").Spotify;


async function traiterChanson(nomChanson, titre, auteur, annee, musicStyle, proxy, endPoint) {
    let communicator;
    try {
        const fileData = traitementMP3.traitementMP3(nomChanson);
        
        communicator = Ice.initialize();
        const base = communicator.stringToProxy(proxy + ":" + endPoint);
        const SpotifyManager = await Spotify.SpotifyManagerPrx.checkedCast(base);
        if(SpotifyManager) {
            console.log("Je récupère SpotifyManager");
            console.log("Uploading...");
            const buffer = Buffer.from(fileData);
            const chunkSize = 20480;
            const startTime = Date.now();
            const music = new Spotify.Music(titre, auteur, annee);
            for (let i = 0; i < buffer.length; i += chunkSize) {
                const sequence = buffer.slice(i, i + chunkSize);
                await SpotifyManager.upload(sequence, titre, musicStyle);
            }
            await SpotifyManager.persistMusic(music, musicStyle);
            const uploadTime = (Date.now() - startTime) / 1000;
            console.log("Upload terminé.");
            console.log("Chanson uploadée en", uploadTime, "secondes.");
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
}

module.exports = traiterChanson;
