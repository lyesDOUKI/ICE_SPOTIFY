import spacy
from db.music_dao import MusiquesDAO

# Charger le modèle de langue en français
nlp = spacy.load("fr_core_news_sm")

# Définir les actions selon leurs types dans un dictionnaire
actions = {
    1: ["jouer", "joue", "lancer", "lance", "écouter", "écoute", 
        "mettre", "mets", "passer", "passe", "diffuser", "diffuse",],
    2: ["stopper", "stoppe", "arrêter", "arrête", "quitter", "quitte", 
        "sortir", "sors"],
    3: ["supprimer", "supprime", "effacer", "efface"],
    4:["pause", "pauser", "reprendre", "reprend", "continuer", "continue", "reprends", "continues"]
}

def analyser_requete(requete):
    # Se connecter à la base de données pour récupérer les chansons
    musiques_dao = MusiquesDAO()
    chansons_dict = musiques_dao.recuperer_musiques_par_style()

    # Analyser la requête avec spaCy
    doc = nlp(requete)
    
    action = None
    objet = None
    
    # Parcourir les tokens de la requête
    for token in doc:
        # Vérifier si le token est une action connue
        for action_type, action_list in actions.items():
            if token.text.lower() in action_list:
                action = action_type
                break
        
        # Si l'action est trouvée, vérifier si le token correspond à une chanson dans le dictionnaire
        if action:
            for style, chansons in chansons_dict.items():
                for chanson in chansons:
                    if " " in chanson:
                        if token.text.lower() in [mot.lower() for mot in chanson.split(" ")]:
                            objet = {"titre": chanson, "style": style}
                            break
                    elif token.text.lower() == chanson.lower():
                        objet = {"titre": chanson, "style": style}
                        break  # Sortir de la boucle interne si une correspondance est trouvée
                if objet:
                    break  # Sortir de la boucle externe si une correspondance est trouvée
    
    return action, objet
