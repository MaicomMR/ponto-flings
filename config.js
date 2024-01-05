function config() {
    configData = {
        'cachePath' : './src/cache/',
        'cacheFileName' : 'data.json',
        'cacheTime': 10, //min
        'client' : null,
        'accessToken' : null,
        'token' :  null,
        'uid' :  null,
        'uuid' :  null,
    }

    return configData;
}

module.exports = {
    config
}