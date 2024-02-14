package iceimplements;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class SpotifyManagerImplement implements Spotify.SpotifyManager {
    public void upload(byte[] bytes ,
                       String nameMusic, com.zeroc.Ice.Current current) {
        try {
            System.out.println("uploading music new flow ...");
            //System.out.println("uploading music...");
            byte[] musicBytes = bytes;
            //System.out.println(musicBytes.length + " bytes");
            String destination = "/home/lyes/Bureau/middlwareApp/spotify/server-side/data/";
            Path path = Paths.get(destination);
            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }
            destination += nameMusic;
            Path pathMusic = Paths.get(destination);
            //si le fichier existe, on continue à ecrire dessus
            Files.write(pathMusic, musicBytes, StandardOpenOption.CREATE,
                    StandardOpenOption.APPEND);
            System.out.println("flow uploaded ");
            //System.out.println("musique enregistrée : " + destination);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
