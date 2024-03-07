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

import com.zeroc.Ice.Current;

public interface SpotifyManager extends com.zeroc.Ice.Object
{
    void upload(byte[] bytes, String nameMusic, String styleMusic, com.zeroc.Ice.Current current);


    void persistMusic(Spotify.Music music, String styleMusic, Current current);

    void deleteMusic(String nameMusic, String styleMusic, com.zeroc.Ice.Current current);

    void update(String musicName, String styleMusic, Spotify.Music music, Current current);

    Spotify.Music[] getMusicByStyle(String styleMusic, Current current);

    Spotify.Music[] getMusicByQuery(String choix, String query, Current current);

    String lireLaMusique(String musicName, String musicStyle, com.zeroc.Ice.Current current);

    int stopMusique(String urlDeDiffusion, com.zeroc.Ice.Current current);

    /** @hidden */
    static final String[] _iceIds =
    {
        "::Ice::Object",
        "::Spotify::SpotifyManager"
    };

    @Override
    default String[] ice_ids(com.zeroc.Ice.Current current)
    {
        return _iceIds;
    }

    @Override
    default String ice_id(com.zeroc.Ice.Current current)
    {
        return ice_staticId();
    }

    static String ice_staticId()
    {
        return "::Spotify::SpotifyManager";
    }

    /**
     * @hidden
     * @param obj -
     * @param inS -
     * @param current -
     * @return -
    **/
    static java.util.concurrent.CompletionStage<com.zeroc.Ice.OutputStream> _iceD_upload(SpotifyManager obj, final com.zeroc.IceInternal.Incoming inS, com.zeroc.Ice.Current current)
    {
        com.zeroc.Ice.Object._iceCheckMode(null, current.mode);
        com.zeroc.Ice.InputStream istr = inS.startReadParams();
        byte[] iceP_bytes;
        String iceP_nameMusic;
        String iceP_styleMusic;
        iceP_bytes = istr.readByteSeq();
        iceP_nameMusic = istr.readString();
        iceP_styleMusic = istr.readString();
        inS.endReadParams();
        obj.upload(iceP_bytes, iceP_nameMusic, iceP_styleMusic, current);
        return inS.setResult(inS.writeEmptyParams());
    }

    /**
     * @hidden
     * @param obj -
     * @param inS -
     * @param current -
     * @return -
    **/
    static java.util.concurrent.CompletionStage<com.zeroc.Ice.OutputStream> _iceD_persistMusic(SpotifyManager obj, final com.zeroc.IceInternal.Incoming inS, com.zeroc.Ice.Current current)
    {
        com.zeroc.Ice.Object._iceCheckMode(null, current.mode);
        com.zeroc.Ice.InputStream istr = inS.startReadParams();
        Music iceP_music;
        String iceP_styleMusic;
        iceP_music = Music.ice_read(istr);
        iceP_styleMusic = istr.readString();
        inS.endReadParams();
        obj.persistMusic(iceP_music, iceP_styleMusic, current);
        return inS.setResult(inS.writeEmptyParams());
    }

    /**
     * @hidden
     * @param obj -
     * @param inS -
     * @param current -
     * @return -
    **/
    static java.util.concurrent.CompletionStage<com.zeroc.Ice.OutputStream> _iceD_deleteMusic(SpotifyManager obj, final com.zeroc.IceInternal.Incoming inS, com.zeroc.Ice.Current current)
    {
        com.zeroc.Ice.Object._iceCheckMode(null, current.mode);
        com.zeroc.Ice.InputStream istr = inS.startReadParams();
        String iceP_nameMusic;
        String iceP_styleMusic;
        iceP_nameMusic = istr.readString();
        iceP_styleMusic = istr.readString();
        inS.endReadParams();
        obj.deleteMusic(iceP_nameMusic, iceP_styleMusic, current);
        return inS.setResult(inS.writeEmptyParams());
    }

    /**
     * @hidden
     * @param obj -
     * @param inS -
     * @param current -
     * @return -
    **/
    static java.util.concurrent.CompletionStage<com.zeroc.Ice.OutputStream> _iceD_update(SpotifyManager obj, final com.zeroc.IceInternal.Incoming inS, com.zeroc.Ice.Current current)
    {
        com.zeroc.Ice.Object._iceCheckMode(null, current.mode);
        com.zeroc.Ice.InputStream istr = inS.startReadParams();
        String iceP_musicName;
        String iceP_styleMusic;
        Music iceP_music;
        iceP_musicName = istr.readString();
        iceP_styleMusic = istr.readString();
        iceP_music = Music.ice_read(istr);
        inS.endReadParams();
        obj.update(iceP_musicName, iceP_styleMusic, iceP_music, current);
        return inS.setResult(inS.writeEmptyParams());
    }

    /**
     * @hidden
     * @param obj -
     * @param inS -
     * @param current -
     * @return -
    **/
    static java.util.concurrent.CompletionStage<com.zeroc.Ice.OutputStream> _iceD_getMusicByStyle(SpotifyManager obj, final com.zeroc.IceInternal.Incoming inS, com.zeroc.Ice.Current current)
    {
        com.zeroc.Ice.Object._iceCheckMode(null, current.mode);
        com.zeroc.Ice.InputStream istr = inS.startReadParams();
        String iceP_styleMusic;
        iceP_styleMusic = istr.readString();
        inS.endReadParams();
        Music[] ret = obj.getMusicByStyle(iceP_styleMusic, current);
        com.zeroc.Ice.OutputStream ostr = inS.startWriteParams();
        listOfMusicByStyleHelper.write(ostr, ret);
        inS.endWriteParams(ostr);
        return inS.setResult(ostr);
    }

    /**
     * @hidden
     * @param obj -
     * @param inS -
     * @param current -
     * @return -
    **/
    static java.util.concurrent.CompletionStage<com.zeroc.Ice.OutputStream> _iceD_getMusicByQuery(SpotifyManager obj, final com.zeroc.IceInternal.Incoming inS, com.zeroc.Ice.Current current)
    {
        com.zeroc.Ice.Object._iceCheckMode(null, current.mode);
        com.zeroc.Ice.InputStream istr = inS.startReadParams();
        String iceP_choix;
        String iceP_query;
        iceP_choix = istr.readString();
        iceP_query = istr.readString();
        inS.endReadParams();
        Music[] ret = obj.getMusicByQuery(iceP_choix, iceP_query, current);
        com.zeroc.Ice.OutputStream ostr = inS.startWriteParams();
        listOfMusicByStyleHelper.write(ostr, ret);
        inS.endWriteParams(ostr);
        return inS.setResult(ostr);
    }

    /**
     * @hidden
     * @param obj -
     * @param inS -
     * @param current -
     * @return -
    **/
    static java.util.concurrent.CompletionStage<com.zeroc.Ice.OutputStream> _iceD_lireLaMusique(SpotifyManager obj, final com.zeroc.IceInternal.Incoming inS, com.zeroc.Ice.Current current)
    {
        com.zeroc.Ice.Object._iceCheckMode(null, current.mode);
        com.zeroc.Ice.InputStream istr = inS.startReadParams();
        String iceP_musicName;
        String iceP_musicStyle;
        iceP_musicName = istr.readString();
        iceP_musicStyle = istr.readString();
        inS.endReadParams();
        String ret = obj.lireLaMusique(iceP_musicName, iceP_musicStyle, current);
        com.zeroc.Ice.OutputStream ostr = inS.startWriteParams();
        ostr.writeString(ret);
        inS.endWriteParams(ostr);
        return inS.setResult(ostr);
    }

    /**
     * @hidden
     * @param obj -
     * @param inS -
     * @param current -
     * @return -
    **/
    static java.util.concurrent.CompletionStage<com.zeroc.Ice.OutputStream> _iceD_stopMusique(SpotifyManager obj, final com.zeroc.IceInternal.Incoming inS, com.zeroc.Ice.Current current)
    {
        com.zeroc.Ice.Object._iceCheckMode(null, current.mode);
        com.zeroc.Ice.InputStream istr = inS.startReadParams();
        String iceP_urlDeDiffusion;
        iceP_urlDeDiffusion = istr.readString();
        inS.endReadParams();
        int ret = obj.stopMusique(iceP_urlDeDiffusion, current);
        com.zeroc.Ice.OutputStream ostr = inS.startWriteParams();
        ostr.writeInt(ret);
        inS.endWriteParams(ostr);
        return inS.setResult(ostr);
    }

    /** @hidden */
    final static String[] _iceOps =
    {
        "deleteMusic",
        "getMusicByQuery",
        "getMusicByStyle",
        "ice_id",
        "ice_ids",
        "ice_isA",
        "ice_ping",
        "lireLaMusique",
        "persistMusic",
        "stopMusique",
        "update",
        "upload"
    };

    /** @hidden */
    @Override
    default java.util.concurrent.CompletionStage<com.zeroc.Ice.OutputStream> _iceDispatch(com.zeroc.IceInternal.Incoming in, com.zeroc.Ice.Current current)
        throws com.zeroc.Ice.UserException
    {
        int pos = java.util.Arrays.binarySearch(_iceOps, current.operation);
        if(pos < 0)
        {
            throw new com.zeroc.Ice.OperationNotExistException(current.id, current.facet, current.operation);
        }

        switch(pos)
        {
            case 0:
            {
                return _iceD_deleteMusic(this, in, current);
            }
            case 1:
            {
                return _iceD_getMusicByQuery(this, in, current);
            }
            case 2:
            {
                return _iceD_getMusicByStyle(this, in, current);
            }
            case 3:
            {
                return com.zeroc.Ice.Object._iceD_ice_id(this, in, current);
            }
            case 4:
            {
                return com.zeroc.Ice.Object._iceD_ice_ids(this, in, current);
            }
            case 5:
            {
                return com.zeroc.Ice.Object._iceD_ice_isA(this, in, current);
            }
            case 6:
            {
                return com.zeroc.Ice.Object._iceD_ice_ping(this, in, current);
            }
            case 7:
            {
                return _iceD_lireLaMusique(this, in, current);
            }
            case 8:
            {
                return _iceD_persistMusic(this, in, current);
            }
            case 9:
            {
                return _iceD_stopMusique(this, in, current);
            }
            case 10:
            {
                return _iceD_update(this, in, current);
            }
            case 11:
            {
                return _iceD_upload(this, in, current);
            }
        }

        assert(false);
        throw new com.zeroc.Ice.OperationNotExistException(current.id, current.facet, current.operation);
    }
}
