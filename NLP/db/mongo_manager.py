from pymongo import MongoClient

class MongoDBManager:
    def __init__(self, uri='mongodb://localhost:27017', db_name='spotify'):
        self.uri = uri
        self.db_name = db_name
        self.client = None
        self.db = None

    def connect(self):
        try:
            self.client = MongoClient(self.uri)
            self.db = self.client[self.db_name]
            print("Connexion à la base de données MongoDB réussie.")
        except Exception as e:
            print(f"Erreur lors de la connexion à la base de données MongoDB : {e}")

    def disconnect(self):
        if self.client:
            self.client.close()
            print("Déconnexion de la base de données MongoDB.")

    def get_database(self):
        return self.db