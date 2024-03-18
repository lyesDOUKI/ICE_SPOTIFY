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


module.exports = {goodProxy, goodEndPoints};