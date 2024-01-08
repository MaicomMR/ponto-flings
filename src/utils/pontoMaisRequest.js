
const { getTodayDateFormated } = require('./getCurrentDayAndFormat');
const { config } = require('../../config');

// Request tokens
const client = config().client
const accessToken = config().accessToken
const token = config().token
const uid = config().uid
const uuid = config().uuid

let todayDate = getTodayDateFormated();
let requestRoute = `https://api.pontomais.com.br/api/time_card_control/current/work_days/${todayDate}`

async function getPontoMaisData() {

    validateTokens();

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

function validateTokens(){
    if (client === null ||
        accessToken === null ||
        token === null ||
        uid === null ||
        uuid === null)
    {
        throw new Error('Há um erro nas suas credenciais');
    }
}

module.exports = {
    getPontoMaisData
}