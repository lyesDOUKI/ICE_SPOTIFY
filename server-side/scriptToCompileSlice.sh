#!/bin/bash

# Déplacement vers le dossier slicesfiles
cd slicesfiles || exit

#parcourir tous les fichiers .ice
for fichier in *.ice; do
    # Récupération du nom du fichier sans l'extension
    nom_fichier=$(basename "$fichier" .ice)
    # Exécution de la commande slice2java avec le nom de fichier
    slice2java "$nom_fichier.ice"
    # Parcours de tous les répertoires créés
    for dossier in */; do
        # Vérification si le dossier contient des fichiers .java
        if [ -n "$(find "$dossier" -type f -name "*.java")" ]; then
            #revenir en arriere, créé le dossier et copier les fichiers .java
            cd ..
            mkdir "$dossier"
            cd "$dossier"
            mkdir -p src/main/java
            cd ..
            cd slicesfiles
            cp "$dossier"*.java "../$dossier/src/main/java/"
        fi
        # Suppression du dossier
        rm -r "$dossier"
    done
done

echo "Le script a terminé avec succès."