const fs = require('fs');

let data;
let response;
let pontos;
let todayDate = getTodayDateFormated();
let requestRoute = `https://api.pontomais.com.br/api/time_card_control/current/work_days/${todayDate}`
let printResponse = ''

// Request tokens
const client = 'a'
const accessToken = 'a'
const token = 'a'
const uid = 'a'
const uuid = 'a'

async function getPontoMaisData() {
    try {
        response = await fetch(requestRoute, {
            "headers": {
              "accept": "application/json, text/plain, */*",
              "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
              "access-token": accessToken,
              "api-version": "2",
              "client": client,
              "content-type": "application/json",
              "if-none-match": "W/\"dcdd4d3d9b27701ddbd207255bcef58a\"",
              "reset": "true",
              "sec-ch-ua": "\"Not_A Brand\";v=\"8\", \"Chromium\";v=\"120\", \"Google Chrome\";v=\"120\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-site",
              "token": token,
              "uid": uid,
              "uuid": uuid,
              "Referer": "https://app2.pontomais.com.br/",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
          })

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return await response.json();

    } catch (error) {
        console.error('Ops', error);
    }
}

function getTodayDateFormated(){
    const dataAtual = new Date();

    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Mês começa do zero
    const ano = dataAtual.getFullYear();

    const dataFormatada = `${ano}-${mes}-${dia}`;
    return dataFormatada;
}

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
    getCurrentTimeFormatted()

    // Se não tiver nenhum ponto
    if (Object.keys(pontos).length === 0) {
        console.log(printResponse + ' 🖑 Marcar o ponto');
    }

    // Se tiver só o primeiro ponto
    if (Object.keys(pontos).length === 1) {
        hoursCount = subtractTime(now, pontos[0].time)

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
            addTime = subtractTime(saida[i], entrada[i])
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
            addTime = subtractTime(saida[i], entrada[i])
            hoursCount = sumTime(hoursCount, addTime)
        }

        lastRegister = entrada.slice(-1)[0];
        FromLastToNow = subtractTime(now, lastRegister)
        hoursCount = sumTime(hoursCount, FromLastToNow)

        console.log(printResponse + ' ' + hoursCount);
    }
}

function subtractTime(time1, time2) {
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);

    // Convert both times to total minutes
    const totalMinutes1 = hours1 * 60 + minutes1;
    const totalMinutes2 = hours2 * 60 + minutes2;

    // Subtract the minutes
    const resultMinutes = totalMinutes1 - totalMinutes2;

    // Convert the result back to hours and minutes
    const resultHours = Math.floor(resultMinutes / 60);
    const resultMinutesRemainder = resultMinutes % 60;

    // Format the result
    const result = `${String(resultHours).padStart(2, '0')}:${String(resultMinutesRemainder).padStart(2, '0')}`;

    return result;
}

function sumTime(time1, time2) {
    // Função para converter horário para minutos
    const converterParaMinutos = (horario) => {
        const [horas, minutos] = horario.split(':');
        return parseInt(horas) * 60 + parseInt(minutos);
    };

    // Função para converter minutos para horário
    const converterParaHorario = (minutos) => {
        const horas = Math.floor(minutos / 60);
        const minutosRestantes = minutos % 60;
        return `${String(horas).padStart(2, '0')}:${String(minutosRestantes).padStart(2, '0')}`;
    };

    // Converter horários para minutos, somar e converter de volta para horário
    const resultadoEmMinutos = converterParaMinutos(time1) + converterParaMinutos(time2);
    const resultadoEmHorario = converterParaHorario(resultadoEmMinutos);

    return resultadoEmHorario;
}

fetchData()
