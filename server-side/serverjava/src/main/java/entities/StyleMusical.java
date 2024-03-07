package entities;

import org.bson.Document;
import org.bson.codecs.pojo.annotations.BsonProperty;

import java.util.ArrayList;
import java.util.List;

public class StyleMusical {
    @BsonProperty("style")
    private String style;

    @BsonProperty("chansons")
    private List<Chanson> chansons;

    public StyleMusical() {
        this.chansons = new ArrayList<>();
    }

    public StyleMusical(String style) {
        this.style = style;
        this.chansons = new ArrayList<>();
    }
    public StyleMusical(String style, List<Chanson> chansons) {
        this.style = style;
        this.chansons = chansons;
    }

    public String getStyle() {
        return style;
    }

    public void setStyle(String style) {
        this.style = style;
    }

    public List<Chanson> getChansons() {
        return chansons;
    }

    public void setChansons(List<Chanson> chansons) {
        this.chansons = chansons;
    }
}
