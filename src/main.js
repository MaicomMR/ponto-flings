const fs = require('fs');
const { sumTime } = require('./utils/sumTime');
const { subTime } = require('./utils/subTime');
const { getPontoMaisData } = require('./utils/pontoMaisRequest');

let data;
let response;
let pontos;

let printResponse = ''

function getCurrentTimeFormatted() {
    const currentTime = new Date();

    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');

    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
  }

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
    now = getCurrentTimeFormatted();

    // Se não tiver nenhum ponto
    if (Object.keys(pontos).length === 0) {
        console.log(printResponse + ' 🖑 Marcar o ponto');
    }

    // Se tiver só o primeiro ponto
    if (Object.keys(pontos).length === 1) {
        hoursCount = subTime(now, pontos[0].time)

        console.log(printResponse + ' ' + hoursCount);
    }

    // Se tiver pontos pares
    if (Object.keys(pontos).length % 2 === 0) {
        hoursCount = '00:00';
        entrada = [];
        saida = [];

        for(let i = 0; i < pontos.length; i = i + 1 ) {
            if (i % 2 === 0) {
                entrada.push(pontos[i].time)
            } else {
                saida.push(pontos[i].time)
            }
        }

        for(let i = 0; i < saida.length; i = i + 1 ) {
            addTime = subTime(saida[i], entrada[i])
            hoursCount = sumTime(hoursCount, addTime)
        }

        console.log(printResponse + ' ' + hoursCount);
    }

   // TODO: Se tiver pontos ímpares
    if (Object.keys(pontos).length % 2 !== 0) {
        now = getCurrentTimeFormatted();
        hoursCount = '00:00';
        entrada = [];
        saida = [];

        for(let i = 0; i < pontos.length; i = i + 1 ) {
            if (i % 2 === 0) {
                entrada.push(pontos[i].time)
            } else {
                saida.push(pontos[i].time)
            }
        }

        for(let i = 0; i < saida.length; i = i + 1 ) {
            addTime = subTime(saida[i], entrada[i])
            hoursCount = sumTime(hoursCount, addTime)
        }

        lastRegister = entrada.slice(-1)[0];
        FromLastToNow = subTime(now, lastRegister)
        hoursCount = sumTime(hoursCount, FromLastToNow)

        console.log(printResponse + ' ' + hoursCount);
    }
}

fetchData()
