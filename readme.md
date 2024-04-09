# Présentation général du projet
## client side ICE
Le client ICE est implementé en JavaScript avec un branchement sur un front basé sur Angular
## server side ICE
Le serveur ICE est implementé en Java avec gradle pour l'aide ou build et gestion de dépendences
## Description
L'application se base sur une communication via le canal ICE entre le client et le serveur et un échange HTTP entre le client JavaScript (node) et Angular pour l'affichage, on est dans sur une application WEB.
L'utilisateur veut lister les chansons "Rap"? le navigateur envoi une requete HTTP au serveur Node(javaScript), qui lui établie une connexion client/serveur ICE et fait appel au méthode du serveur java pour récuperer un tableau qui contient le nom des chansons présente.
Coté Serveur, une base de données mongoDB a été mis en place pour stocké les chansons de manière persistante afin de gérer les modifications des meta-données tel que le nom de l'auteur, le titre...
Pour pousser le concepte d'architecture distribué, j'ai mis en place ICEGRID qui s'occupe donc de lancer 5 serveurs tel que : 
- serveur 0 ==> gestion des recherche (par auteur et par titre)
- serveur 1 ==> gestion de la musique RAP (lancement, pause, arret, upload...)
- serveur 2 ==> gestion de la musique KABYLE (lancement, pause, arret, upload...)
- serveur 3 ==> gestion de la musique ROCK (lancement, pause, arret, upload...)
- serveur 4 ==> gestion de la musique AUTRES (lancement, pause, arret, upload...)

# mode d'emploi 
## Installation de la base de données
- Pour tester le projet, il faut installer en local mongoDB (mongoDBCompass) et créer une base de donnée nommé : spotify et une collection nommé : chansons

## client Side
- Ouvrir le dossier client-side et lancer la commande : npm install pour installer les packages et dépendances node necessaires.
- Lancer la commande : node client.js pour lancer le serveur.

## serveur side
- ouvrir le fichier config.properties (dans server-side/serverjava/src/main/ressources/), modifier la variable destination.directory pour pointer vers le dossier data de server-side depuis votre machine.
- Si vlc n'est pas installer dans votre C:\Program Files\VideoLAN\VLC, modifier la classe MainServer en mettant l'endroit de votre Vlc et lancer la commande gradle build, puis aller dans build/lib/ et copier le jar et mettez le dans le dossier iceGrid. 
- accèder au dossier icegrid.
- Lancer la commande : icegridnode --Ice.Config=config.grid ==> cette commande lancera le node IceGrid 
- Lancer ensuite la commande : icegridadmin --Ice.Config=config.grid -e "application add application.xml" ==> cette commande va deployer le fichier application.xml sur le serveur IceGrid
- Pour pouvoir manager et voir l'état des différents serveur, accéder à la console icegrid avec la commande icegridadmin, user : admin, mot de passe : admin
- 
## Pour tester 
- Ouvrir un navigateur, accèder à l'url : https://localhost:3000 et voilà !!!
