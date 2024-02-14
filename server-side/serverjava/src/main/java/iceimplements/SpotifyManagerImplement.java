package iceimplements;

import java.io.IOException;
import java.nio.file.*;
import java.util.Properties;

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

    public void upload(byte[] bytes, String nameMusic, com.zeroc.Ice.Current current) {
        try {
            System.out.println("uploading music new flow ... : " + nameMusic);
            Path destinationPath = Paths.get(destination, nameMusic);
            Files.write(destinationPath, bytes, StandardOpenOption.CREATE, StandardOpenOption.APPEND);
            System.out.println("Flow uploaded");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
