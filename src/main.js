const fs = require('fs');
const { sumTime } = require('./utils/sumTime');
const { subTime } = require('./utils/subTime');
const { getPontoMaisData } = require('./utils/pontoMaisRequest');
const { handleSingleRegister } = require('./handleSingleRegister');
const { handlePairRegister } = require('./handlePairRegister');
const { handleOddRegister } = require('./handleOddRegister');

let data;
let response;
let pontos;

let printResponse = ''

async function saveRequestToLocal(data){
    saveData = {
        'timestamp' : new Date(),
        'pontos' : data.work_day.time_cards,
    };
    fs.writeFileSync('data.json', JSON.stringify(saveData));
}

function useDataFromCache() {
    if (fs.existsSync('data.json')) {
        // Monta o arquivo
        const fileData = fs.readFileSync('data.json', 'utf-8');
        data = JSON.parse(fileData);

        // Compara as datas entre o cache e o momento atual
        now = new Date();
        logTime = new Date(data.timestamp);
        const diferencaEmMilissegundos = Math.abs(now - logTime);
        const minutos = Math.floor(diferencaEmMilissegundos / (1000 * 60));

        // Se cache expirou
        if (minutos > 10) {
            return false;
        }

        return true;
    }

    return false;
}

async function fetchData() {
    if (useDataFromCache()) {
        // Read the data from the file
        const fileData = fs.readFileSync('data.json', 'utf-8');
        data = JSON.parse(fileData);

        printResponse = '○ ';
    } else {
        // Fetch data from the API
        data = await getPontoMaisData();
        saveRequestToLocal(data);
        const fileData = fs.readFileSync('data.json', 'utf-8');
        data = JSON.parse(fileData);

        printResponse = '☁ '
    }

    pontos = data.pontos;

    // Se não tiver nenhum ponto
    if (Object.keys(pontos).length === 0) {
        console.log(printResponse + ' 🖑 Marcar o ponto');
    }

    // Se tiver só o primeiro ponto
    if (Object.keys(pontos).length === 1) {
        hoursCount = handleSingleRegister(pontos[0].time)
        console.log(printResponse + ' ' + hoursCount);
        return;
    }

    // Se tiver pontos pares
    if (Object.keys(pontos).length % 2 === 0) {
        hoursCount = handlePairRegister(pontos)
        console.log(printResponse + ' ' + hoursCount);
        return;
    }

   // TODO: Se tiver pontos ímpares
    if (Object.keys(pontos).length % 2 !== 0) {
        hoursCount = handleOddRegister(pontos);
        console.log(printResponse + ' ' + hoursCount);
        return;
    }
}

fetchData()
