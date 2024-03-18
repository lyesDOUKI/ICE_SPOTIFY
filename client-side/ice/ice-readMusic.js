const Ice = require("ice").Ice;
const Spotify = require("../generated/Spotify").Spotify;

async function readMusic(musicName, musicStyle, proxy, endPoint) {
    let communicator;
    try {
        communicator = Ice.initialize();
        const base = communicator.stringToProxy(proxy + ":" + endPoint);
        const SpotifyManager = await Spotify.SpotifyManagerPrx.checkedCast(base);
        if (SpotifyManager) {
            console.log("Je récupère SpotifyManager");
            const music = await SpotifyManager.lireLaMusique(musicName, musicStyle);
            console.log(music);
            return music;
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
