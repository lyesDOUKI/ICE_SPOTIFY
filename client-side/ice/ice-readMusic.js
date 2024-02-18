
const Ice = require("ice").Ice;
const Spotify = require("../generated/Spotify").Spotify;

async function readMusic() {
    let communicator;
    try {
        
        communicator = Ice.initialize();
        const base = communicator.stringToProxy("SpotifyAdapter:default -p 10000");
        const SpotifyManager = await Spotify.SpotifyManagerPrx.checkedCast(base);
        if(SpotifyManager) {

            // Lire le flux audio reçu en continu
            let continueStreaming = true;
            while (continueStreaming) {
                const result = await SpotifyManager.lireLaMusique("ameslub", "kabyle");
                console.log("result: ", result);

                if (result && result.length > 0) {
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
    } catch(ex) {
        console.log(ex.toString());
        process.exitCode = 1;
    } finally {
        if(communicator) {
            await communicator.destroy();
        }
    }
}

module.exports = readMusic;
