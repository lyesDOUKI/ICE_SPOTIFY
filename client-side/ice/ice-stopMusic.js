const Ice = require("ice").Ice;
const Spotify = require("../generated/Spotify").Spotify;

async function stopMusic(musicName, musicStyle) {
    let communicator;
    try {
        communicator = Ice.initialize();
        const base = communicator.stringToProxy("SpotifyAdapter:default -p 10000");
        const SpotifyManager = await Spotify.SpotifyManagerPrx.checkedCast(base);
        if (SpotifyManager) {
            console.log("Je récupère SpotifyManager");
            const result = await SpotifyManager.stopMusique(musicName, musicStyle);
            console.log("action stop : " + result);
            return result;
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

module.exports = stopMusic;
