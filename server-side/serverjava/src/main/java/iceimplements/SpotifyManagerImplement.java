package iceimplements;

import com.zeroc.Ice.Current;


import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.nio.file.*;
import java.util.Properties;

import uk.co.caprica.vlcj.factory.MediaPlayerFactory;
import uk.co.caprica.vlcj.factory.discovery.NativeDiscovery;
import uk.co.caprica.vlcj.player.base.MediaPlayer;
import uk.co.caprica.vlcj.player.base.MediaPlayerEventAdapter;


public class SpotifyManagerImplement implements Spotify.SpotifyManager {

    private static final String CONFIG_FILE = "config.properties";
    private static final String DESTINATION_PROPERTY = "destination.directory";
    private static final String IP_PROPERTY = "ip.address";
    private String destination = "";
    private String ip = "";
    MediaPlayerFactory mediaPlayerFactory;
    MediaPlayer mediaPlayer;

    public SpotifyManagerImplement() {
        loadConfiguration();
        this.mediaPlayerFactory = new MediaPlayerFactory();
        this.mediaPlayer = mediaPlayerFactory.mediaPlayers().newMediaPlayer();
    }

    private void loadConfiguration() {
        try {
            Properties properties = new Properties();
            properties.load(getClass().getClassLoader().getResourceAsStream(CONFIG_FILE));
            destination = properties.getProperty(DESTINATION_PROPERTY);
            ip = properties.getProperty(IP_PROPERTY);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void upload(byte[] bytes, String nameMusic, String styleMusic, com.zeroc.Ice.Current current) {
        try {
            System.out.println("uploading music new flow ... : " + nameMusic);
            Path destinationPath = Paths.get((destination) + styleMusic , nameMusic);
            Files.write(destinationPath, bytes, StandardOpenOption.CREATE, StandardOpenOption.APPEND);
            System.out.println("Flow uploaded");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void deleteMusic(String nameMusic, String styleMusic, Current current) {
        // Supprimer le fichier
        System.out.println("Suppression du fichier " + nameMusic + " dans le répertoire " + styleMusic + " ...");
        Path path = Paths.get(destination, styleMusic, nameMusic);
        try {
            Files.delete(path);
            System.out.println("Fichier supprimé avec succès !");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void update(String nameMusic, String newNameMusic, String styleMusic, Current current) {
        System.out.println("Renommage du fichier " + nameMusic + " en " + newNameMusic + " dans le répertoire " + styleMusic + " ...");
        Path sourcePath = Paths.get(destination, styleMusic, nameMusic);
        Path targetPath = Paths.get(destination, styleMusic, newNameMusic);
        // Vérifier si le fichier cible existe déjà
        if (Files.exists(targetPath)) {
            System.err.println("Le fichier avec le nouveau nom existe déjà.");
            // Gérer cette situation selon vos besoins (générer un nouveau nom, demander à l'utilisateur de fournir un nom différent, etc.)
            return;
        }

        // Vérifier si le fichier source existe
        if (!Files.exists(sourcePath)) {
            System.err.println("Le fichier source n'existe pas.");
            // Gérer cette situation selon vos besoins
            return;
        }

        try {
            // Renommer le fichier
            Files.move(sourcePath, targetPath);
            System.out.println("Fichier renommé avec succès !");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public String[] getMusicByStyle(String styleMusic, Current current) {
        //aller chercher les musiques dans le repertoire styleMusic
        Path path = Paths.get(destination + styleMusic);
        String[] list = null;
        try {
            list = Files.list(path).map(p -> p.getFileName().toString()).toArray(String[]::new);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public String lireLaMusique(String musicName, String musicStyle, Current current) {
        new NativeDiscovery().discover();
        String cleanMusicName = musicName.endsWith(".mp3") ?
                musicName.substring(0, musicName.length() - 4) : musicName;
        String fullPath = destination + musicStyle + "\\" + cleanMusicName + ".mp3";
        Path path = Paths.get(fullPath);
        //verifier si media player est en cours de lecture
        if (mediaPlayer.status().isPlaying()) {
            System.out.println("Arrêt de la lecture en cours ...");
            mediaPlayer.controls().stop();
            mediaPlayer.release();
            System.out.println("Lecture arrêtée avec succès !");
            mediaPlayer = mediaPlayerFactory.mediaPlayers().newMediaPlayer();
        }
        try {
            int port = findAvailablePort();
            String streamUrl = this.ip + ":" + port; // Adresse de diffusion multicast
            String options =
                    ":sout=#transcode{acodec=mp3,ab=128,channels=2,samplerate=44100}:duplicate{dst=std{access=http,mux=mp3,dst=" + streamUrl + "}}";
            /*String url = "/" + musicName + ".mp3";
            String streamStr = "#transcode{acodec=mp3,ab=128,channels=2,samplerate=44100}:http{dst=:" + port + url + "}";*/
            mediaPlayer.events().addMediaPlayerEventListener(new MediaPlayerEventAdapter() {
                @Override
                public void playing(MediaPlayer mediaPlayer) {
                    System.out.println("Lien d'écoute : http://" + streamUrl);
                }
            });
            //mediaPlayer.audio().setVolume(0);
            mediaPlayer.media().play(fullPath, (String) options, ":no-sout-rtp-sap", ":no-sout-standard-sap", ":sout-all", ":sout-keep");
            return "http://" + streamUrl;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    private int findAvailablePort() {
        // Créer un socket IPv4 pour un protocole de type TCP
        try (java.net.ServerSocket socket = new java.net.ServerSocket(0)) {
            // Retourner le numéro de port attribué
            return socket.getLocalPort();
        } catch (java.io.IOException e) {
            throw new RuntimeException("Erreur lors de la recherche d'un port disponible", e);
        }
    }

}
