module Spotify {
    sequence<byte> data;
    struct Music {
        string titre;
        string auteur;
        string style;
        string annee;
    };
    sequence<Music> listOfMusicByStyle;
    interface SpotifyManager {
        void upload(data bytes, string nameMusic, string styleMusic);
        void persistMusic(Music music, string styleMusic);
        void deleteMusic(string nameMusic, string styleMusic);
        void update(string musicName, string styleMusic, Music music);
        listOfMusicByStyle getMusicByStyle(string styleMusic);
        listOfMusicByStyle getMusicByQuery(string choix, string query);
        string lireLaMusique(string musicName, string musicStyle);
        int stopMusique(string urlDeDiffusion);
    };
};
