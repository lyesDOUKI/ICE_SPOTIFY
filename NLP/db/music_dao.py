from .mongo_manager import MongoDBManager

class MusiquesDAO:
    def __init__(self):
        self.mongo_manager = MongoDBManager()

    def recuperer_musiques_par_style(self):
        # Se connecter à la base de données
        self.mongo_manager.connect()

        # Récupération de tous les documents
        cursor = self.mongo_manager.get_database().chansons.find({}, { "chansons.titre": 1, "style": 1, "_id": 0 })

        # Initialisation du dictionnaire pour stocker les résultats
        resultats = {}

        # Parcours du curseur et construction du dictionnaire
        for document in cursor:
            style = document['style']
            chansons = [chanson['titre'] for chanson in document['chansons']]
            resultats[style] = chansons

        # Déconnexion de la base de données
        self.mongo_manager.disconnect()

        return resultats