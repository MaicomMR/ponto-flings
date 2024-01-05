const fs = require('fs');
const { config } = require('../../config');
const { getPontoMaisData } = require('../utils/pontoMaisRequest');

async function getDataFromAPI() {
    data = await getPontoMaisData();
    saveRequestToLocal(data);
    const fileData = fs.readFileSync(`${config().cachePath}${config().cacheFileName}`, 'utf-8');
    return JSON.parse(fileData);
}

async function saveRequestToLocal(data){
    saveData = {
        'timestamp' : new Date(),
        'pontos' : data.work_day.time_cards,
    };
    fs.writeFileSync(`${config().cachePath}${config().cacheFileName}`, JSON.stringify(saveData));
}

module.exports = {
    getDataFromAPI
}