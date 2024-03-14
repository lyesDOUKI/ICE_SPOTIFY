import iceimplements.SpotifyManagerImplement;

public class MainServer {
    public static void main(String[] args){
        System.setProperty("jna.library.path", "C:\\Program Files\\VideoLAN\\VLC");
        try(com.zeroc.Ice.Communicator communicator = com.zeroc.Ice.Util.initialize(args))
        {
            com.zeroc.Ice.ObjectAdapter adapter =
                    communicator.createObjectAdapterWithEndpoints(
                            "SpotifyAdapter", "default -p 10000");
            com.zeroc.Ice.Object object = (com.zeroc.Ice.Object) new SpotifyManagerImplement();
            adapter.add(object, com.zeroc.Ice.Util.stringToIdentity("SpotifyAdapter"));

            adapter.activate();
            communicator.waitForShutdown();
        }
    }
}