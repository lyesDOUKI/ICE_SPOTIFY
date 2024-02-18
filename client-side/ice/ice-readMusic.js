const Ice = require("ice").Ice;
const Spotify = require("../generated/Spotify").Spotify;
const Speaker = require('speaker');

async function readMusic() {
    let communicator;
    try {
        communicator = Ice.initialize();
        const base = communicator.stringToProxy("SpotifyAdapter:default -p 10000");
        const SpotifyManager = await Spotify.SpotifyManagerPrx.checkedCast(base);
        if (SpotifyManager) {
            console.log("Je récupère SpotifyManager");

            // Créer un nouvel objet Speaker pour lire le flux audio
            const speaker = new Speaker({
                channels: 2,          // Nombre de canaux audio
                bitDepth: 16,         // Profondeur de bits
                sampleRate: 44100     // Taux d'échantillonnage en Hz
            });

            // Lire le flux audio reçu en continu
            let continueStreaming = true;
            while (continueStreaming) {
                const result = await SpotifyManager.lireLaMusique("ayen", "kabyle");
                console.log("result: ", result);

                if (result && result.length > 0) {
                    // Écrire le flux audio dans le haut-parleur
                    speaker.write(Buffer.from(result));
                } else {
                    continueStreaming = false;
                }
            }

            // Fermer le haut-parleur après la lecture
            speaker.end();
        } else {
            console.log("Proxy invalide");
        }
    } catch (ex) {
        console.log(ex.toString());
        process.exitCode = 1;
    } finally {
        if (communicator) {
            await communicator.destroy();
        }
    }
}

module.exports = readMusic;
