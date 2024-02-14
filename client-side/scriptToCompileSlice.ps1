# Compiler les fichiers .ice

Set-Location slicefiles
# Parcourir tous les fichiers .ice
foreach ($file in Get-ChildItem *.ice) {
    # Compiler le fichier .ice
    & slice2js --output-dir ../generated $file
}
Write-Host "Le script a terminé avec succès."
