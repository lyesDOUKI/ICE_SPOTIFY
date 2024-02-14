@echo off

rem Déplacement vers le dossier slicesfiles
cd slicefiles || exit /b

rem parcourir tous les fichiers .ice
for %%f in (*.ice) do (
rem Récupération du nom du fichier sans l'extension
set "nom_fichier=%%~nf"
rem Exécution de la commande slice2java avec le nom de fichier
slice2java "%%~f"
rem Parcours de tous les répertoires créés
for /d %%d in (*) do (
rem Vérification si le dossier contient des fichiers .java
if exist "%%~d\*.java" (
rem Revenir en arrière, créer le dossier et copier les fichiers .java
cd ..
mkdir "%%~d"
cd "%%~d"
mkdir src\main\java
cd ..
cd slicefiles
copy "%%~d\*.java" "..\%%~d\src\main\java\"
)
rem Suppression du dossier
rd /s /q "%%~d"
)
)

echo Le script a terminé avec succès.
