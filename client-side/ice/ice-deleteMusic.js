
const Ice = require("ice").Ice;
const Spotify = require("../generated/Spotify").Spotify;


async function deleteMusic(musicName, musicStyle, proxy, endPoint) {
    let communicator;
    try {
        
        communicator = Ice.initialize();
        const base = communicator.stringToProxy(proxy+":"+endPoint);
        const SpotifyManager = await Spotify.SpotifyManagerPrx.checkedCast(base);
        if(SpotifyManager) {
            console.log("Je récupère SpotifyManager");
            
            await SpotifyManager.deleteMusic(musicName, musicStyle);
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

module.exports = deleteMusic;
