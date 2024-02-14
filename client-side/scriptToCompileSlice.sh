#!/bin/bash
#compiler les fichiers .ice

cd slicesfiles
#parcourir tout les fichiers .ice
for file in *.ice
do
    #compiler le fichier .ice

    slice2js --output-dir ../generated $file
done
echo "Le script a terminé avec succès."