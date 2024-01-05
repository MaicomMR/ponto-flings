const fs = require('fs');
const { config } = require('../../config');

function getDataFromCache() {
    const fileData = fs.readFileSync(`${config().cachePath}${config().cacheFileName}`, 'utf-8');
    return JSON.parse(fileData);
}

module.exports = {
    getDataFromCache
}