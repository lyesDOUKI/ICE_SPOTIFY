module Spotify {
    sequence<byte> data;
    sequence<string> listOfMusicByStyle;
    interface SpotifyManager {
        void upload(data bytes, string nameMusic, string styleMusic);
        void deleteMusic(string nameMusic, string styleMusic);
        void update(string nameMusic, string newNameMusic, string styleMusic);
        listOfMusicByStyle getMusicByStyle(string styleMusic);
        string lireLaMusique(string musicName, string musicStyle);
    };
};
