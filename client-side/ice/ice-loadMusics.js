const Ice = require("ice").Ice;
const Spotify = require("../generated/Spotify").Spotify;


async function loadMusicsByStyle(musicStyle, proxy, endPoint) {
    let communicator;
    try {
        
        communicator = Ice.initialize();
        const base = communicator.stringToProxy(proxy+":"+endPoint);
        const SpotifyManager = await Spotify.SpotifyManagerPrx.checkedCast(base);
        if(SpotifyManager) {
            console.log("Je récupère SpotifyManager");
            
            const musics = await SpotifyManager.getMusicByStyle(musicStyle);
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

function goodProxy(musicStyle){
    let proxy;
    console.log("musicStyle : ", musicStyle);
    if(musicStyle === "kabyle"){
        proxy = "spotify-1";
    } else if(musicStyle === "rap"){
        proxy = "spotify-2";
    } else if(musicStyle === "rock"){
        proxy = "spotify-3";
    } else {
        proxy = "spotify-4";
    }
    return proxy;
}
function goodEndPoints(proxy)
{
    let endPoint;
    if(proxy === "spotify-1"){
        endPoint = "default -p 10001";
    } else if(proxy === "spotify-2"){
        endPoint = "default -p 10002";
    } else if(proxy === "spotify-3"){
        endPoint = "default -p 10003";
    } else {
        endPoint = "default -p 10004";
    }
    return endPoint;
}

module.exports = loadMusicsByStyle;