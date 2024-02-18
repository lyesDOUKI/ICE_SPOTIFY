const Spotify = require("../generated/Spotify").Spotify;

class StreamReceiverI extends Spotify.StreamReceiver {
    receiveAudioData(data) {
        // Traiter les données audio reçues, par exemple les jouer ou les enregistrer
        console.log("Received audio data:", data);
    }
}

module.exports = StreamReceiverI;
