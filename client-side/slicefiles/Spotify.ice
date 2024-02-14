module Spotify {
    sequence<byte> data;
    interface SpotifyManager {
        void upload(data bytes, string nameMusic);
    };
};
