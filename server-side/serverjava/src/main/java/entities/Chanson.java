package entities;

import org.bson.codecs.pojo.annotations.BsonProperty;

public class Chanson {
    @BsonProperty("titre")
    private String titre;

    @BsonProperty("auteur")
    private String auteur;

    @BsonProperty("style")
    private String style;
    @BsonProperty("annee")
    private String annee;

    @BsonProperty("chemin")
    private String chemin;

    // Constructeur
    public Chanson() {
    }
    public Chanson(String titre, String auteur,
                   String style, String annee, String chemin) {
        this.titre = titre;
        this.auteur = auteur;
        this.style = style;
        this.annee = annee;
        this.chemin = chemin;
    }
    public Chanson(String titre, String auteur, String style, String annee) {
        this.titre = titre;
        this.auteur = auteur;
        this.style = style;
        this.annee = annee;
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

    public String getAnnee() {
        return annee;
    }

    public void setAnnee(String annee) {
        this.annee = annee;
    }

    public String getChemin() {
        return chemin;
    }

    public void setChemin(String chemin) {
        this.chemin = chemin;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
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
