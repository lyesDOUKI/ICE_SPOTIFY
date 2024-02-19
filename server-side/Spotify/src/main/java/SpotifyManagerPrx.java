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

public interface SpotifyManagerPrx extends com.zeroc.Ice.ObjectPrx
{
    default void upload(byte[] bytes, String nameMusic, String styleMusic)
    {
        upload(bytes, nameMusic, styleMusic, com.zeroc.Ice.ObjectPrx.noExplicitContext);
    }

    default void upload(byte[] bytes, String nameMusic, String styleMusic, java.util.Map<String, String> context)
    {
        _iceI_uploadAsync(bytes, nameMusic, styleMusic, context, true).waitForResponse();
    }

    default java.util.concurrent.CompletableFuture<Void> uploadAsync(byte[] bytes, String nameMusic, String styleMusic)
    {
        return _iceI_uploadAsync(bytes, nameMusic, styleMusic, com.zeroc.Ice.ObjectPrx.noExplicitContext, false);
    }

    default java.util.concurrent.CompletableFuture<Void> uploadAsync(byte[] bytes, String nameMusic, String styleMusic, java.util.Map<String, String> context)
    {
        return _iceI_uploadAsync(bytes, nameMusic, styleMusic, context, false);
    }

    /**
     * @hidden
     * @param iceP_bytes -
     * @param iceP_nameMusic -
     * @param iceP_styleMusic -
     * @param context -
     * @param sync -
     * @return -
     **/
    default com.zeroc.IceInternal.OutgoingAsync<Void> _iceI_uploadAsync(byte[] iceP_bytes, String iceP_nameMusic, String iceP_styleMusic, java.util.Map<String, String> context, boolean sync)
    {
        com.zeroc.IceInternal.OutgoingAsync<Void> f = new com.zeroc.IceInternal.OutgoingAsync<>(this, "upload", null, sync, null);
        f.invoke(false, context, null, ostr -> {
                     ostr.writeByteSeq(iceP_bytes);
                     ostr.writeString(iceP_nameMusic);
                     ostr.writeString(iceP_styleMusic);
                 }, null);
        return f;
    }

    default void deleteMusic(String nameMusic, String styleMusic)
    {
        deleteMusic(nameMusic, styleMusic, com.zeroc.Ice.ObjectPrx.noExplicitContext);
    }

    default void deleteMusic(String nameMusic, String styleMusic, java.util.Map<String, String> context)
    {
        _iceI_deleteMusicAsync(nameMusic, styleMusic, context, true).waitForResponse();
    }

    default java.util.concurrent.CompletableFuture<Void> deleteMusicAsync(String nameMusic, String styleMusic)
    {
        return _iceI_deleteMusicAsync(nameMusic, styleMusic, com.zeroc.Ice.ObjectPrx.noExplicitContext, false);
    }

    default java.util.concurrent.CompletableFuture<Void> deleteMusicAsync(String nameMusic, String styleMusic, java.util.Map<String, String> context)
    {
        return _iceI_deleteMusicAsync(nameMusic, styleMusic, context, false);
    }

    /**
     * @hidden
     * @param iceP_nameMusic -
     * @param iceP_styleMusic -
     * @param context -
     * @param sync -
     * @return -
     **/
    default com.zeroc.IceInternal.OutgoingAsync<Void> _iceI_deleteMusicAsync(String iceP_nameMusic, String iceP_styleMusic, java.util.Map<String, String> context, boolean sync)
    {
        com.zeroc.IceInternal.OutgoingAsync<Void> f = new com.zeroc.IceInternal.OutgoingAsync<>(this, "deleteMusic", null, sync, null);
        f.invoke(false, context, null, ostr -> {
                     ostr.writeString(iceP_nameMusic);
                     ostr.writeString(iceP_styleMusic);
                 }, null);
        return f;
    }

    default void update(String nameMusic, String newNameMusic, String styleMusic)
    {
        update(nameMusic, newNameMusic, styleMusic, com.zeroc.Ice.ObjectPrx.noExplicitContext);
    }

    default void update(String nameMusic, String newNameMusic, String styleMusic, java.util.Map<String, String> context)
    {
        _iceI_updateAsync(nameMusic, newNameMusic, styleMusic, context, true).waitForResponse();
    }

    default java.util.concurrent.CompletableFuture<Void> updateAsync(String nameMusic, String newNameMusic, String styleMusic)
    {
        return _iceI_updateAsync(nameMusic, newNameMusic, styleMusic, com.zeroc.Ice.ObjectPrx.noExplicitContext, false);
    }

    default java.util.concurrent.CompletableFuture<Void> updateAsync(String nameMusic, String newNameMusic, String styleMusic, java.util.Map<String, String> context)
    {
        return _iceI_updateAsync(nameMusic, newNameMusic, styleMusic, context, false);
    }

    /**
     * @hidden
     * @param iceP_nameMusic -
     * @param iceP_newNameMusic -
     * @param iceP_styleMusic -
     * @param context -
     * @param sync -
     * @return -
     **/
    default com.zeroc.IceInternal.OutgoingAsync<Void> _iceI_updateAsync(String iceP_nameMusic, String iceP_newNameMusic, String iceP_styleMusic, java.util.Map<String, String> context, boolean sync)
    {
        com.zeroc.IceInternal.OutgoingAsync<Void> f = new com.zeroc.IceInternal.OutgoingAsync<>(this, "update", null, sync, null);
        f.invoke(false, context, null, ostr -> {
                     ostr.writeString(iceP_nameMusic);
                     ostr.writeString(iceP_newNameMusic);
                     ostr.writeString(iceP_styleMusic);
                 }, null);
        return f;
    }

    default String[] getMusicByStyle(String styleMusic)
    {
        return getMusicByStyle(styleMusic, com.zeroc.Ice.ObjectPrx.noExplicitContext);
    }

    default String[] getMusicByStyle(String styleMusic, java.util.Map<String, String> context)
    {
        return _iceI_getMusicByStyleAsync(styleMusic, context, true).waitForResponse();
    }

    default java.util.concurrent.CompletableFuture<String[]> getMusicByStyleAsync(String styleMusic)
    {
        return _iceI_getMusicByStyleAsync(styleMusic, com.zeroc.Ice.ObjectPrx.noExplicitContext, false);
    }

    default java.util.concurrent.CompletableFuture<String[]> getMusicByStyleAsync(String styleMusic, java.util.Map<String, String> context)
    {
        return _iceI_getMusicByStyleAsync(styleMusic, context, false);
    }

    /**
     * @hidden
     * @param iceP_styleMusic -
     * @param context -
     * @param sync -
     * @return -
     **/
    default com.zeroc.IceInternal.OutgoingAsync<String[]> _iceI_getMusicByStyleAsync(String iceP_styleMusic, java.util.Map<String, String> context, boolean sync)
    {
        com.zeroc.IceInternal.OutgoingAsync<String[]> f = new com.zeroc.IceInternal.OutgoingAsync<>(this, "getMusicByStyle", null, sync, null);
        f.invoke(true, context, null, ostr -> {
                     ostr.writeString(iceP_styleMusic);
                 }, istr -> {
                     String[] ret;
                     ret = istr.readStringSeq();
                     return ret;
                 });
        return f;
    }

    default String lireLaMusique(String musicName, String musicStyle)
    {
        return lireLaMusique(musicName, musicStyle, com.zeroc.Ice.ObjectPrx.noExplicitContext);
    }

    default String lireLaMusique(String musicName, String musicStyle, java.util.Map<String, String> context)
    {
        return _iceI_lireLaMusiqueAsync(musicName, musicStyle, context, true).waitForResponse();
    }

    default java.util.concurrent.CompletableFuture<java.lang.String> lireLaMusiqueAsync(String musicName, String musicStyle)
    {
        return _iceI_lireLaMusiqueAsync(musicName, musicStyle, com.zeroc.Ice.ObjectPrx.noExplicitContext, false);
    }

    default java.util.concurrent.CompletableFuture<java.lang.String> lireLaMusiqueAsync(String musicName, String musicStyle, java.util.Map<String, String> context)
    {
        return _iceI_lireLaMusiqueAsync(musicName, musicStyle, context, false);
    }

    /**
     * @hidden
     * @param iceP_musicName -
     * @param iceP_musicStyle -
     * @param context -
     * @param sync -
     * @return -
     **/
    default com.zeroc.IceInternal.OutgoingAsync<java.lang.String> _iceI_lireLaMusiqueAsync(String iceP_musicName, String iceP_musicStyle, java.util.Map<String, String> context, boolean sync)
    {
        com.zeroc.IceInternal.OutgoingAsync<java.lang.String> f = new com.zeroc.IceInternal.OutgoingAsync<>(this, "lireLaMusique", null, sync, null);
        f.invoke(true, context, null, ostr -> {
                     ostr.writeString(iceP_musicName);
                     ostr.writeString(iceP_musicStyle);
                 }, istr -> {
                     String ret;
                     ret = istr.readString();
                     return ret;
                 });
        return f;
    }

    /**
     * Contacts the remote server to verify that the object implements this type.
     * Raises a local exception if a communication error occurs.
     * @param obj The untyped proxy.
     * @return A proxy for this type, or null if the object does not support this type.
     **/
    static SpotifyManagerPrx checkedCast(com.zeroc.Ice.ObjectPrx obj)
    {
        return com.zeroc.Ice.ObjectPrx._checkedCast(obj, ice_staticId(), SpotifyManagerPrx.class, _SpotifyManagerPrxI.class);
    }

    /**
     * Contacts the remote server to verify that the object implements this type.
     * Raises a local exception if a communication error occurs.
     * @param obj The untyped proxy.
     * @param context The Context map to send with the invocation.
     * @return A proxy for this type, or null if the object does not support this type.
     **/
    static SpotifyManagerPrx checkedCast(com.zeroc.Ice.ObjectPrx obj, java.util.Map<String, String> context)
    {
        return com.zeroc.Ice.ObjectPrx._checkedCast(obj, context, ice_staticId(), SpotifyManagerPrx.class, _SpotifyManagerPrxI.class);
    }

    /**
     * Contacts the remote server to verify that a facet of the object implements this type.
     * Raises a local exception if a communication error occurs.
     * @param obj The untyped proxy.
     * @param facet The name of the desired facet.
     * @return A proxy for this type, or null if the object does not support this type.
     **/
    static SpotifyManagerPrx checkedCast(com.zeroc.Ice.ObjectPrx obj, String facet)
    {
        return com.zeroc.Ice.ObjectPrx._checkedCast(obj, facet, ice_staticId(), SpotifyManagerPrx.class, _SpotifyManagerPrxI.class);
    }

    /**
     * Contacts the remote server to verify that a facet of the object implements this type.
     * Raises a local exception if a communication error occurs.
     * @param obj The untyped proxy.
     * @param facet The name of the desired facet.
     * @param context The Context map to send with the invocation.
     * @return A proxy for this type, or null if the object does not support this type.
     **/
    static SpotifyManagerPrx checkedCast(com.zeroc.Ice.ObjectPrx obj, String facet, java.util.Map<String, String> context)
    {
        return com.zeroc.Ice.ObjectPrx._checkedCast(obj, facet, context, ice_staticId(), SpotifyManagerPrx.class, _SpotifyManagerPrxI.class);
    }

    /**
     * Downcasts the given proxy to this type without contacting the remote server.
     * @param obj The untyped proxy.
     * @return A proxy for this type.
     **/
    static SpotifyManagerPrx uncheckedCast(com.zeroc.Ice.ObjectPrx obj)
    {
        return com.zeroc.Ice.ObjectPrx._uncheckedCast(obj, SpotifyManagerPrx.class, _SpotifyManagerPrxI.class);
    }

    /**
     * Downcasts the given proxy to this type without contacting the remote server.
     * @param obj The untyped proxy.
     * @param facet The name of the desired facet.
     * @return A proxy for this type.
     **/
    static SpotifyManagerPrx uncheckedCast(com.zeroc.Ice.ObjectPrx obj, String facet)
    {
        return com.zeroc.Ice.ObjectPrx._uncheckedCast(obj, facet, SpotifyManagerPrx.class, _SpotifyManagerPrxI.class);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for the per-proxy context.
     * @param newContext The context for the new proxy.
     * @return A proxy with the specified per-proxy context.
     **/
    @Override
    default SpotifyManagerPrx ice_context(java.util.Map<String, String> newContext)
    {
        return (SpotifyManagerPrx)_ice_context(newContext);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for the adapter ID.
     * @param newAdapterId The adapter ID for the new proxy.
     * @return A proxy with the specified adapter ID.
     **/
    @Override
    default SpotifyManagerPrx ice_adapterId(String newAdapterId)
    {
        return (SpotifyManagerPrx)_ice_adapterId(newAdapterId);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for the endpoints.
     * @param newEndpoints The endpoints for the new proxy.
     * @return A proxy with the specified endpoints.
     **/
    @Override
    default SpotifyManagerPrx ice_endpoints(com.zeroc.Ice.Endpoint[] newEndpoints)
    {
        return (SpotifyManagerPrx)_ice_endpoints(newEndpoints);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for the locator cache timeout.
     * @param newTimeout The new locator cache timeout (in seconds).
     * @return A proxy with the specified locator cache timeout.
     **/
    @Override
    default SpotifyManagerPrx ice_locatorCacheTimeout(int newTimeout)
    {
        return (SpotifyManagerPrx)_ice_locatorCacheTimeout(newTimeout);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for the invocation timeout.
     * @param newTimeout The new invocation timeout (in seconds).
     * @return A proxy with the specified invocation timeout.
     **/
    @Override
    default SpotifyManagerPrx ice_invocationTimeout(int newTimeout)
    {
        return (SpotifyManagerPrx)_ice_invocationTimeout(newTimeout);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for connection caching.
     * @param newCache <code>true</code> if the new proxy should cache connections; <code>false</code> otherwise.
     * @return A proxy with the specified caching policy.
     **/
    @Override
    default SpotifyManagerPrx ice_connectionCached(boolean newCache)
    {
        return (SpotifyManagerPrx)_ice_connectionCached(newCache);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for the endpoint selection policy.
     * @param newType The new endpoint selection policy.
     * @return A proxy with the specified endpoint selection policy.
     **/
    @Override
    default SpotifyManagerPrx ice_endpointSelection(com.zeroc.Ice.EndpointSelectionType newType)
    {
        return (SpotifyManagerPrx)_ice_endpointSelection(newType);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for how it selects endpoints.
     * @param b If <code>b</code> is <code>true</code>, only endpoints that use a secure transport are
     * used by the new proxy. If <code>b</code> is false, the returned proxy uses both secure and
     * insecure endpoints.
     * @return A proxy with the specified selection policy.
     **/
    @Override
    default SpotifyManagerPrx ice_secure(boolean b)
    {
        return (SpotifyManagerPrx)_ice_secure(b);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for the encoding used to marshal parameters.
     * @param e The encoding version to use to marshal request parameters.
     * @return A proxy with the specified encoding version.
     **/
    @Override
    default SpotifyManagerPrx ice_encodingVersion(com.zeroc.Ice.EncodingVersion e)
    {
        return (SpotifyManagerPrx)_ice_encodingVersion(e);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for its endpoint selection policy.
     * @param b If <code>b</code> is <code>true</code>, the new proxy will use secure endpoints for invocations
     * and only use insecure endpoints if an invocation cannot be made via secure endpoints. If <code>b</code> is
     * <code>false</code>, the proxy prefers insecure endpoints to secure ones.
     * @return A proxy with the specified selection policy.
     **/
    @Override
    default SpotifyManagerPrx ice_preferSecure(boolean b)
    {
        return (SpotifyManagerPrx)_ice_preferSecure(b);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for the router.
     * @param router The router for the new proxy.
     * @return A proxy with the specified router.
     **/
    @Override
    default SpotifyManagerPrx ice_router(com.zeroc.Ice.RouterPrx router)
    {
        return (SpotifyManagerPrx)_ice_router(router);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for the locator.
     * @param locator The locator for the new proxy.
     * @return A proxy with the specified locator.
     **/
    @Override
    default SpotifyManagerPrx ice_locator(com.zeroc.Ice.LocatorPrx locator)
    {
        return (SpotifyManagerPrx)_ice_locator(locator);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for collocation optimization.
     * @param b <code>true</code> if the new proxy enables collocation optimization; <code>false</code> otherwise.
     * @return A proxy with the specified collocation optimization.
     **/
    @Override
    default SpotifyManagerPrx ice_collocationOptimized(boolean b)
    {
        return (SpotifyManagerPrx)_ice_collocationOptimized(b);
    }

    /**
     * Returns a proxy that is identical to this proxy, but uses twoway invocations.
     * @return A proxy that uses twoway invocations.
     **/
    @Override
    default SpotifyManagerPrx ice_twoway()
    {
        return (SpotifyManagerPrx)_ice_twoway();
    }

    /**
     * Returns a proxy that is identical to this proxy, but uses oneway invocations.
     * @return A proxy that uses oneway invocations.
     **/
    @Override
    default SpotifyManagerPrx ice_oneway()
    {
        return (SpotifyManagerPrx)_ice_oneway();
    }

    /**
     * Returns a proxy that is identical to this proxy, but uses batch oneway invocations.
     * @return A proxy that uses batch oneway invocations.
     **/
    @Override
    default SpotifyManagerPrx ice_batchOneway()
    {
        return (SpotifyManagerPrx)_ice_batchOneway();
    }

    /**
     * Returns a proxy that is identical to this proxy, but uses datagram invocations.
     * @return A proxy that uses datagram invocations.
     **/
    @Override
    default SpotifyManagerPrx ice_datagram()
    {
        return (SpotifyManagerPrx)_ice_datagram();
    }

    /**
     * Returns a proxy that is identical to this proxy, but uses batch datagram invocations.
     * @return A proxy that uses batch datagram invocations.
     **/
    @Override
    default SpotifyManagerPrx ice_batchDatagram()
    {
        return (SpotifyManagerPrx)_ice_batchDatagram();
    }

    /**
     * Returns a proxy that is identical to this proxy, except for compression.
     * @param co <code>true</code> enables compression for the new proxy; <code>false</code> disables compression.
     * @return A proxy with the specified compression setting.
     **/
    @Override
    default SpotifyManagerPrx ice_compress(boolean co)
    {
        return (SpotifyManagerPrx)_ice_compress(co);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for its connection timeout setting.
     * @param t The connection timeout for the proxy in milliseconds.
     * @return A proxy with the specified timeout.
     **/
    @Override
    default SpotifyManagerPrx ice_timeout(int t)
    {
        return (SpotifyManagerPrx)_ice_timeout(t);
    }

    /**
     * Returns a proxy that is identical to this proxy, except for its connection ID.
     * @param connectionId The connection ID for the new proxy. An empty string removes the connection ID.
     * @return A proxy with the specified connection ID.
     **/
    @Override
    default SpotifyManagerPrx ice_connectionId(String connectionId)
    {
        return (SpotifyManagerPrx)_ice_connectionId(connectionId);
    }

    /**
     * Returns a proxy that is identical to this proxy, except it's a fixed proxy bound
     * the given connection.@param connection The fixed proxy connection.
     * @return A fixed proxy bound to the given connection.
     **/
    @Override
    default SpotifyManagerPrx ice_fixed(com.zeroc.Ice.Connection connection)
    {
        return (SpotifyManagerPrx)_ice_fixed(connection);
    }

    static String ice_staticId()
    {
        return "::Spotify::SpotifyManager";
    }
}
