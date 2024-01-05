const fs = require('fs');
const { config } = require('../../config');

function verifyHasAndCanUseCache() {
    if (fs.existsSync(`${config().cachePath}${config().cacheFileName}`)) {
        // Monta o arquivo
        const fileData = fs.readFileSync(`${config().cachePath}${config().cacheFileName}`, 'utf-8');
        data = JSON.parse(fileData);

        // Compara as datas entre o cache e o momento atual
        now = new Date();
        logTime = new Date(data.timestamp);
        const diferencaEmMilissegundos = Math.abs(now - logTime);
        const minutos = Math.floor(diferencaEmMilissegundos / (1000 * 60));

        // Se cache expirou
        if (minutos > config().cacheTime) {
            return false;
        }

        return true;
    }

    return false;
}

module.exports = {
    verifyHasAndCanUseCache
}