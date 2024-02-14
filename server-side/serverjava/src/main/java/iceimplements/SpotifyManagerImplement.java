package iceimplements;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Properties;

public class SpotifyManagerImplement implements Spotify.SpotifyManager {
    private static final String CONFIG_FILE = "config.properties";
    private String destination = "";
    public SpotifyManagerImplement() {
        loadConfiguration();
    }

    private void loadConfiguration() {
        try {
            Properties properties = new Properties();
            properties.load(getClass().getClassLoader().getResourceAsStream(CONFIG_FILE));
            destination = properties.getProperty("destination.directory");
        } catch (IOException e) {
            e.printStackTrace();
            // Default value or handle exception accordingly
        }
    }
    public void upload(byte[] bytes ,
                       String nameMusic, com.zeroc.Ice.Current current) {
        try {
            System.out.println("uploading music new flow ... : " + nameMusic);
            //System.out.println("uploading music...");
            byte[] musicBytes = bytes;
            //System.out.println(musicBytes.length + " bytes");
            Path path = Paths.get(destination);
            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }
            if(!destination.endsWith(".mp3"))
                destination += nameMusic;
            Path pathMusic = Paths.get(destination);
            //si le fichier existe, on continue à ecrire dessus
            Files.write(pathMusic, musicBytes, StandardOpenOption.CREATE,
                    StandardOpenOption.APPEND);
            System.out.println("flow uploaded ");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
