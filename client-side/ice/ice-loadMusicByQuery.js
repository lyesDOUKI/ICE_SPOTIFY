
const Ice = require("ice").Ice;
const Spotify = require("../generated/Spotify").Spotify;


async function loadMusicsByQuery(choix, query) {
    let communicator;
    try {
        
        communicator = Ice.initialize();
        const base = communicator.stringToProxy("spotify-0:default -p 10000");
        const SpotifyManager = await Spotify.SpotifyManagerPrx.checkedCast(base);
        if(SpotifyManager) {
            console.log("Je récupère SpotifyManager");
            
            const musics = await SpotifyManager.getMusicByQuery(choix, query);
            return musics;
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

module.exports = loadMusicsByQuery;
