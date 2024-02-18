package iceimplements;

import com.zeroc.Ice.Current;

import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.*;
import java.util.Properties;
import java.io.ByteArrayOutputStream;

import javazoom.jl.decoder.JavaLayerException;
import javazoom.jl.player.advanced.AdvancedPlayer;
public class SpotifyManagerImplement implements Spotify.SpotifyManager {

    private static final String CONFIG_FILE = "config.properties";
    private static final String DESTINATION_PROPERTY = "destination.directory";
    private String destination = "";

    public SpotifyManagerImplement() {
        loadConfiguration();
    }

    private void loadConfiguration() {
        try {
            Properties properties = new Properties();
            properties.load(getClass().getClassLoader().getResourceAsStream(CONFIG_FILE));
            destination = properties.getProperty(DESTINATION_PROPERTY);
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
    public byte[] lireLaMusique(String musicName, String musicStyle, Current current) {
        String fullPath = destination + "/" + musicStyle + "/" + musicName + ".mp3";
        Path path = Paths.get(fullPath);
        try {
            FileInputStream fileInputStream = new FileInputStream(path.toFile());
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            byte[] buffer = new byte[4096];
            int bytesRead;
            // Envoyer le flux audio au client via ICE
            while ((bytesRead = fileInputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, bytesRead);
            }

            // Fermer le lecteur audio après la fin du flux audio
            fileInputStream.close();
            return null;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
