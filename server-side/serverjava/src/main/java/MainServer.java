import com.zeroc.Ice.Identity;
import com.zeroc.Ice.ObjectAdapter;
import com.zeroc.Ice.Properties;
import com.zeroc.Ice.Util;
import iceimplements.SpotifyManagerImplement;

public class MainServer {
    public static void main(String[] args){
        System.setProperty("jna.library.path", "C:\\Program Files\\VideoLAN\\VLC");
        try(com.zeroc.Ice.Communicator communicator = com.zeroc.Ice.Util.initialize(args))
        {
            Properties properties = communicator.getProperties();
            Identity id = Util.stringToIdentity(properties.getProperty("Identity"));
            System.out.println("Identity: " + id.name);
            System.out.println("program name: " + properties.getProperty("Ice.ProgramName"));
            String endpoint = args[0];
            System.out.println("Endpoint: " + endpoint);
            ObjectAdapter adapter = communicator.createObjectAdapterWithEndpoints(
                    "Spotify", endpoint);
            //liste des propriétés

            adapter.add(new SpotifyManagerImplement(properties.getProperty("Ice.ProgramName")), id);

            System.out.println("Server started");
            adapter.activate();
            communicator.waitForShutdown();
        }
    }
}