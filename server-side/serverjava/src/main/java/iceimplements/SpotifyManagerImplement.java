package iceimplements;

import Spotify.Music;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Filters;
import com.zeroc.Ice.Current;


import java.io.IOException;
import java.nio.file.*;
import java.util.*;

import db.Connection;
import entities.Chanson;
import entities.StyleMusical;
import org.bson.Document;
import org.bson.conversions.Bson;
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
    private MediaPlayerFactory mediaPlayerFactory;
    private HashMap<String, MediaPlayer> mediaPlayerHashMap;
    private String actualUploadedMusic = "";
    private String property;
    public SpotifyManagerImplement() {
        loadConfiguration();
        this.mediaPlayerFactory = new MediaPlayerFactory();
        this.mediaPlayerHashMap = new HashMap<>();
        this.property = "";

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


    @Override
    public void upload(byte[] bytes, String musicName, String styleMusic, Current current) {
        String chemin = "";
        try {
            System.out.println("uploading music new flow ... : " + musicName);
            Path destinationPath = Paths.get((destination) + styleMusic ,
                    musicName + ".mp3");
            chemin = destinationPath.toString();
            Files.write(destinationPath, bytes, StandardOpenOption.CREATE, StandardOpenOption.APPEND);
            System.out.println("Flow uploaded");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private Document getDocument(StyleMusical styleMusical) {
        Document styleMusicalDocument = new Document();
        styleMusicalDocument.append("style", styleMusical.getStyle());
        // Créer une liste de documents BSON pour les chansons
        List<Document> chansonsDocuments = new ArrayList<>();
        for (Chanson chanson : styleMusical.getChansons()) {
            Document chansonDocument = new Document("titre", chanson.getTitre())
                    .append("auteur", chanson.getAuteur())
                    .append("style", chanson.getStyle())
                    .append("annee", chanson.getAnnee())
                    .append("chemin", chanson.getChemin());
            chansonsDocuments.add(chansonDocument);
        }
        styleMusicalDocument.append("chansons", chansonsDocuments);
        System.out.println("musique enregistrée avec succès");
        return styleMusicalDocument;
    }

    @Override
    public void persistMusic(Music music, String styleMusic, Current current) {
    //enregister la chanson en base
        System.out.println("Enregistrement de la musique " + music.titre + " dans le style " + styleMusic + " ...");
        MongoDatabase database = Connection.connect();
        MongoCollection<Document> collection = database.getCollection("chansons");
        String style = styleMusic.toLowerCase(Locale.ROOT);
        Bson filter = new Document("style", style);
        StyleMusical styleMusical = collection.find(filter, StyleMusical.class).first();
        if (styleMusical == null) {
            styleMusical = new StyleMusical(style);
        }
        Chanson chanson = new Chanson(music.titre, music.auteur, styleMusic, music.annee, destination + styleMusic + "\\" + music.titre + ".mp3");
        styleMusical.getChansons().add(chanson);
        Document styleMusicalDocument = getDocument(styleMusical);
        collection.findOneAndReplace(filter, styleMusicalDocument);
        Connection.close();
    }

    @Override
    public void deleteMusic(String nameMusic, String styleMusic, Current current) {
        //go chercher le chemin de la musique dans la base
        System.out.println("Suppression de la musique " + nameMusic + " ...");
        String fullPath = "";
        MongoDatabase database = Connection.connect();
        MongoCollection<Document> collection = database.getCollection("chansons");
        String style = styleMusic.toLowerCase(Locale.ROOT);
        Bson filter = new Document("style", style);
        StyleMusical styleMusical = collection.find(filter, StyleMusical.class).first();
        if(styleMusical != null) {
            List<Chanson> chansons = styleMusical.getChansons();
            for (Chanson chanson : chansons) {
                if (chanson.getTitre().equals(nameMusic)) {
                    fullPath = chanson.getChemin();
                    break;
                }
            }
        }
        // Supprimer le fichier
        System.out.println("Suppression du fichier " + nameMusic + " dans le répertoire " + styleMusic + " ...");
        Path path = Paths.get(fullPath);
        try {
            Files.delete(path);
            System.out.println("Fichier supprimé avec succès !");
        } catch (IOException e) {
            e.printStackTrace();
        }
        // Supprimer la musique en base
        System.out.println("Suppression de la musique " + nameMusic + " dans la base ...");
        if (styleMusical != null) {
            List<Chanson> chansons = styleMusical.getChansons();
            for (Chanson chanson : chansons) {
                if (chanson.getTitre().equals(nameMusic)) {
                    chansons.remove(chanson);
                    break;
                }
            }
            Document styleMusicalDocument = getDocument(styleMusical);
            collection.findOneAndReplace(filter, styleMusicalDocument);
        }
        System.out.println("Musique supprimée avec succès !");
        Connection.close();
    }

    @Override
    public void update(String musicName, String styleMusic, Music music, Current current) {
        // Mettre à jour la musique en base
        System.out.println("Mise à jour de la musique " + music.titre + " ...");
        MongoDatabase database = Connection.connect();
        MongoCollection<Document> collection = database.getCollection("chansons");
        String style = styleMusic.toLowerCase(Locale.ROOT);
        Bson filter = new Document("style", style);
        StyleMusical styleMusical = collection.find(filter, StyleMusical.class).first();
        if (styleMusical != null) {
            List<Chanson> chansons = styleMusical.getChansons();
            for (Chanson chanson : chansons) {
                if (chanson.getTitre().equals(musicName)) {
                    chanson.setTitre(music.titre);
                    chanson.setAuteur(music.auteur);
                    System.out.println("l 'annee : " + music.annee);
                    chanson.setAnnee(music.annee);
                    break;
                }
            }
            Document styleMusicalDocument = getDocument(styleMusical);
            collection.findOneAndReplace(filter, styleMusicalDocument);
        }
        System.out.println("Mise à jour effectuée avec succès !");
        Connection.close();
    }


    @Override
    public Music[] getMusicByStyle(String styleMusic, Current current) {
        System.out.println("Récupération des musiques du style " + styleMusic + " ...");
       // recuperer la liste des musiques en base

        MongoDatabase database = Connection.connect();
        MongoCollection<Document> collection = database.getCollection("chansons");
        String style = styleMusic.toLowerCase(Locale.ROOT);
        Bson filter = new Document("style", style);
        StyleMusical styleMusical = collection.find(filter, StyleMusical.class).first();
        if(styleMusical == null || styleMusical.getChansons() == null) {
            // Gérer le cas où la liste des chansons est null
            System.out.println("Aucune chanson trouvée pour le style musical " + styleMusic);
            Connection.close();
            return new Music[0]; // Retourner un tableau vide
        }

        int size = styleMusical.getChansons().size();
        Music[] musics = new Music[size];
        for (int i = 0; i < size; i++) {
            Chanson chanson = styleMusical.getChansons().get(i);
            String titre = chanson.getTitre();
            String auteur = chanson.getAuteur();
            String styleMus = chanson.getStyle();
            String annee = chanson.getAnnee();
            musics[i] = new Music(titre, auteur, styleMus, annee);
        }
        Connection.close();
        return musics;
    }

    @Override
    public Music[] getMusicByQuery(String choix, String query, Current current) {
        System.out.println("Récupération des musiques du query " + query + " ...");
        // Connecter à la base de données MongoDB
        MongoDatabase database = Connection.connect();
        MongoCollection<Document> collection = database.getCollection("chansons");
        System.out.println("query : " + query);
        System.out.println("choix : " + choix);
        Bson filter = Filters.regex("chansons."+choix, ".*" + query + ".*", "i");

        // Exécutez la requête en utilisant le filtre
        List<StyleMusical> styleMusicals = collection.aggregate(Arrays.asList(
                Aggregates.unwind("$chansons"),
                Aggregates.match(filter)
        )).map(document -> {

            StyleMusical styleMusical = new StyleMusical();

            styleMusical.setStyle(document.getString("style"));

            Document chansonDoc = document.get("chansons", Document.class);
            Chanson chanson = new Chanson();
            chanson.setTitre(chansonDoc.getString("titre"));
            chanson.setAuteur(chansonDoc.getString("auteur"));
            chanson.setAnnee(chansonDoc.getString("annee"));
            chanson.setStyle(chansonDoc.getString("style"));
            styleMusical.getChansons().add(chanson);

            return styleMusical;
        }).into(new ArrayList<>());

        List<Music> musicsList = new ArrayList<>();
        for (StyleMusical styleMusical : styleMusicals) {
            for (Chanson chanson : styleMusical.getChansons()) {
                musicsList.add(new Music(chanson.getTitre(), chanson.getAuteur(),
                        chanson.getStyle(),
                        chanson.getAnnee()));
            }
        }

        Music[] musics = musicsList.toArray(new Music[0]);
        Connection.close();
        return musics;
    }


    @Override
    public String lireLaMusique(String musicName, String musicStyle, Current current) {
        new NativeDiscovery().discover();
        String cleanMusicName = musicName.endsWith(".mp3") ?
                musicName.substring(0, musicName.length() - 4) : musicName;
        //String fullPath = destination + musicStyle + "\\" + cleanMusicName + ".mp3";
        String fullPath = "";
        //go chercher le chemin de la musique dans la base
        MongoDatabase database = Connection.connect();
        MongoCollection<Document> collection = database.getCollection("chansons");
        String style = musicStyle.toLowerCase(Locale.ROOT);
        Bson filter = new Document("style", style);

        StyleMusical styleMusical = collection.find(filter, StyleMusical.class).first();
        if(styleMusical != null) {
            List<Chanson> chansons = styleMusical.getChansons();
            for (Chanson chanson : chansons) {
                if (chanson.getTitre().equals(cleanMusicName)) {
                    fullPath = chanson.getChemin();
                    break;
                }
            }
        }
        Connection.close();
        System.out.println("Lecture de la musique ... : " + fullPath);
        Path path = Paths.get(fullPath);
        MediaPlayer mediaPlayer = mediaPlayerFactory.mediaPlayers().newMediaPlayer();
        try {
            int port = findAvailablePort();
            String streamUrl = this.ip + ":" + port; // Adresse de diffusion multicast
            String options =
                    ":sout=#transcode{acodec=mp3,ab=128,channels=2,samplerate=44100}:duplicate{dst=std{access=http,mux=mp3,dst=" + streamUrl + "}}";
            eventsMediaPlayer(mediaPlayer, streamUrl);
            mediaPlayer.media().play(fullPath, (String) options, ":no-sout-rtp-sap", ":no-sout-standard-sap", ":sout-all", ":sout-keep");
            mediaPlayerHashMap.put(("http://" + streamUrl), mediaPlayer);
            return "http://" + streamUrl;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public int stopMusique(String urlDeDiffusion, Current current) {
        int result = 0; // 1 = action effectuée, 0 = action non effectuée
        //chercher le media player dans la hashmap
        System.out.println("Arrêt de la musique ... : " + urlDeDiffusion);
        MediaPlayer mediaPlayer = mediaPlayerHashMap.get(urlDeDiffusion);
        if (mediaPlayer != null && mediaPlayer.status().isPlaying()) {
            mediaPlayer.controls().stop();
            mediaPlayer.release();
            mediaPlayerHashMap.remove(urlDeDiffusion);
            result = 1;
        }else {
            System.out.println("Aucun media player trouvé dans la hashmap ...");
        }
        return result;
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
    private void eventsMediaPlayer(MediaPlayer mediaPlayer, String streamUrl)
    {
        final int[] checkMediaStatus = {0}; // 0 à garder dans la hashmap, 1 à supprimer de la hashmap
        mediaPlayer.events().addMediaPlayerEventListener(new MediaPlayerEventAdapter() {
            @Override
            public void playing(MediaPlayer mediaPlayer) {
                System.out.println("Lien d'écoute : http://" + streamUrl);
            }
        });
        mediaPlayer.events().addMediaPlayerEventListener(new MediaPlayerEventAdapter() {
            @Override
            public void finished(MediaPlayer mediaPlayer) {
                System.out.println("Musique terminée ...");
                mediaPlayer.release();
                checkMediaStatus[0] = 1;
            }
        });
        mediaPlayer.events().addMediaPlayerEventListener(new MediaPlayerEventAdapter() {
            @Override
            public void error(MediaPlayer mediaPlayer) {
                System.out.println("Erreur lors de la lecture de la musique ...");
                mediaPlayer.release();
                checkMediaStatus[0] = 1;
            }
        });
        mediaPlayer.events().addMediaPlayerEventListener(new MediaPlayerEventAdapter() {
            @Override
            public void stopped(MediaPlayer mediaPlayer) {
                System.out.println("Musique arrêtée ...");
            }
        });
        //check si le media est à supprier de la hashmap
        if(checkMediaStatus[0] == 1)
        {
            System.out.println("Suppression de la musique de la hashmap ...");
            mediaPlayerHashMap.remove(streamUrl);
        }
    }
}
