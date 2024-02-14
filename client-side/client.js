const traitementMP3 = require('./filesutils/traitementMP3');
const Ice = require("ice").Ice;
const Spotify = require("./generated/Spotify").Spotify;
//appeler la fonction
(async function()
{
    let communicator;
    try
    {
        const fileData = traitementMP3.traitementMP3();
        const nomFichier = traitementMP3.nomFichier();
        communicator = Ice.initialize();
        const base = communicator.stringToProxy("SpotifyAdapter:default -p 10000");
        const SpotifyManager = await Spotify.SpotifyManagerPrx.checkedCast(base);
        if(SpotifyManager)
        {
            console.log("je récupere spotifyManager");
            console.log("uploading...");
            const buffer = Buffer.from(fileData);
            chunkSize = 1024;
            for (let i = 0; i < buffer.length; i += chunkSize) {
                sequence = buffer.slice(i, i + chunkSize);
                await SpotifyManager.upload(sequence, nomFichier);
            }
            await SpotifyManager.upload(sequence, nomFichier);
            console.log("upload OK");
        }
        else
        {
            console.log("Invalid proxy");
        }
    }
    catch(ex)
    {
        console.log(ex.toString());
        process.exitCode = 1;
    }
    finally
    {
        if(communicator)
        {
            await communicator.destroy();
        }
    }
})();
