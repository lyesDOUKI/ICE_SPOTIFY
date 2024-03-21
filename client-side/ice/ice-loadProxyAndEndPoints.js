const fs = require('fs');

function getProxyConfig() {
    try {
        const configFile = fs.readFileSync('config/proxy.json', 'utf8');
        return JSON.parse(configFile);
    } catch (err) {
        console.error('Error reading proxy config file:', err);
        return {};
    }
}

function getEndpointsConfig() {
    try {
        const configFile = fs.readFileSync('config/endpoints.json', 'utf8');
        return JSON.parse(configFile);
    } catch (err) {
        console.error('Error reading endpoints config file:', err);
        return {};
    }
}

function goodProxy(musicStyle) {
    const proxyConfig = getProxyConfig();
    console.log("proxyConfig: ", proxyConfig);
    const proxy = proxyConfig[musicStyle];
    console.log("proxy: ", proxy);
    return proxyConfig[musicStyle] || "spotify-0";
}

function goodEndPoints(proxy) {
    const endpointsConfig = getEndpointsConfig();
    console.log("endpointsConfig: ", endpointsConfig);
    const endPoint = endpointsConfig[proxy];
    console.log("endPoint: ", endPoint);
    return endpointsConfig[proxy] || "default -p 10000";
}

module.exports = { goodProxy, goodEndPoints };
