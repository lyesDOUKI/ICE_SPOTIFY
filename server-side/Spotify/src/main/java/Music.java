//
// Copyright (c) ZeroC, Inc. All rights reserved.
//
//
// Ice version 3.7.10
//
// <auto-generated>
//
// Generated from file `Spotify.ice'
//
// Warning: do not edit this file.
//
// </auto-generated>
//

package Spotify;

public class Music implements java.lang.Cloneable,
                              java.io.Serializable
{
    public String titre;

    public String auteur;

    public int annee;

    public Music()
    {
        this.titre = "";
        this.auteur = "";
    }

    public Music(String titre, String auteur, int annee)
    {
        this.titre = titre;
        this.auteur = auteur;
        this.annee = annee;
    }

    public boolean equals(java.lang.Object rhs)
    {
        if(this == rhs)
        {
            return true;
        }
        Music r = null;
        if(rhs instanceof Music)
        {
            r = (Music)rhs;
        }

        if(r != null)
        {
            if(this.titre != r.titre)
            {
                if(this.titre == null || r.titre == null || !this.titre.equals(r.titre))
                {
                    return false;
                }
            }
            if(this.auteur != r.auteur)
            {
                if(this.auteur == null || r.auteur == null || !this.auteur.equals(r.auteur))
                {
                    return false;
                }
            }
            if(this.annee != r.annee)
            {
                return false;
            }

            return true;
        }

        return false;
    }

    public int hashCode()
    {
        int h_ = 5381;
        h_ = com.zeroc.IceInternal.HashUtil.hashAdd(h_, "::Spotify::Music");
        h_ = com.zeroc.IceInternal.HashUtil.hashAdd(h_, titre);
        h_ = com.zeroc.IceInternal.HashUtil.hashAdd(h_, auteur);
        h_ = com.zeroc.IceInternal.HashUtil.hashAdd(h_, annee);
        return h_;
    }

    public Music clone()
    {
        Music c = null;
        try
        {
            c = (Music)super.clone();
        }
        catch(CloneNotSupportedException ex)
        {
            assert false; // impossible
        }
        return c;
    }

    public void ice_writeMembers(com.zeroc.Ice.OutputStream ostr)
    {
        ostr.writeString(this.titre);
        ostr.writeString(this.auteur);
        ostr.writeInt(this.annee);
    }

    public void ice_readMembers(com.zeroc.Ice.InputStream istr)
    {
        this.titre = istr.readString();
        this.auteur = istr.readString();
        this.annee = istr.readInt();
    }

    static public void ice_write(com.zeroc.Ice.OutputStream ostr, Music v)
    {
        if(v == null)
        {
            _nullMarshalValue.ice_writeMembers(ostr);
        }
        else
        {
            v.ice_writeMembers(ostr);
        }
    }

    static public Music ice_read(com.zeroc.Ice.InputStream istr)
    {
        Music v = new Music();
        v.ice_readMembers(istr);
        return v;
    }

    static public void ice_write(com.zeroc.Ice.OutputStream ostr, int tag, java.util.Optional<Music> v)
    {
        if(v != null && v.isPresent())
        {
            ice_write(ostr, tag, v.get());
        }
    }

    static public void ice_write(com.zeroc.Ice.OutputStream ostr, int tag, Music v)
    {
        if(ostr.writeOptional(tag, com.zeroc.Ice.OptionalFormat.FSize))
        {
            int pos = ostr.startSize();
            ice_write(ostr, v);
            ostr.endSize(pos);
        }
    }

    static public java.util.Optional<Music> ice_read(com.zeroc.Ice.InputStream istr, int tag)
    {
        if(istr.readOptional(tag, com.zeroc.Ice.OptionalFormat.FSize))
        {
            istr.skip(4);
            return java.util.Optional.of(Music.ice_read(istr));
        }
        else
        {
            return java.util.Optional.empty();
        }
    }

    private static final Music _nullMarshalValue = new Music();

    /** @hidden */
    public static final long serialVersionUID = -1511552194L;
}
