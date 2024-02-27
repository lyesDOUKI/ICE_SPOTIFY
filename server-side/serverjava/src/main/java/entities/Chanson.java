package entities;

import org.bson.codecs.pojo.annotations.BsonProperty;

public class Chanson {
    @BsonProperty("titre")
    private String titre;

    @BsonProperty("auteur")
    private String auteur;

    @BsonProperty("annee")
    private int annee;

    @BsonProperty("chemin")
    private String chemin;

    // Constructeur
    public Chanson() {
    }
    public Chanson(String titre, String auteur, int annee, String chemin) {
        this.titre = titre;
        this.auteur = auteur;
        this.annee = annee;
        this.chemin = chemin;
    }

    public String getTitre() {
        return titre;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public String getAuteur() {
        return auteur;
    }

    public void setAuteur(String auteur) {
        this.auteur = auteur;
    }

    public int getAnnee() {
        return annee;
    }

    public void setAnnee(int annee) {
        this.annee = annee;
    }

    public String getChemin() {
        return chemin;
    }

    public void setChemin(String chemin) {
        this.chemin = chemin;
    }

    // Méthode toString (pour l'affichage)
    @Override
    public String toString() {
        return "Chanson{" +
                "titre='" + titre + '\'' +
                ", auteur='" + auteur + '\'' +
                ", année=" + annee +
                ", chemin='" + chemin + '\'' +
                '}';
    }
}
