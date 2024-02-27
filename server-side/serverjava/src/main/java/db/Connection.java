package db;

import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;

import java.io.IOException;
import java.util.Properties;

public class Connection {
    private static final String CONFIG_FILE = "config.properties";
    private static final String DATABASE_NAME = "db.name";
    private static final String CONNECTION_STRING = "db.url";

    private static String databaseName;
    private static String connectionString;
    private static MongoClient mongoClient;
    private static MongoDatabase database;

    private Connection() {
        this.loadConfiguration();
    }
    // Méthode pour établir la connexion à MongoDB
    public static MongoDatabase connect() {
        if (database == null) {
            Connection connection = new Connection();
            System.out.println("Connection to MongoDB ...");
            System.out.println("Database name: " + databaseName);
            System.out.println("Connection string: " + connectionString);

            // Configuration des codecs MongoDB avec les codecs pour les classes POJO
            CodecRegistry codecRegistries = CodecRegistries.fromRegistries(
                    MongoClientSettings.getDefaultCodecRegistry(),
                    CodecRegistries.fromProviders(PojoCodecProvider.builder().automatic(true).build())
            );

            MongoClientSettings settings = MongoClientSettings.builder()
                    .codecRegistry(codecRegistries)
                    .build();

            mongoClient = MongoClients.create(settings);
            database = mongoClient.getDatabase(databaseName);
        }
        return database;
    }

    // Méthode pour fermer la connexion à MongoDB
    public static void close() {
        if (mongoClient != null) {
            mongoClient.close();
            database = null;
        }
    }
    private void loadConfiguration() {
        try {
            Properties properties = new Properties();
            properties.load(getClass().getClassLoader().getResourceAsStream(CONFIG_FILE));
            databaseName = properties.getProperty(DATABASE_NAME);
            connectionString = properties.getProperty(CONNECTION_STRING);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
