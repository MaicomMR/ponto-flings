const { verifyHasAndCanUseCache } = require('./data/verifyHasAndCanUseCache');
const { handleSingleRegister } = require('./handleSingleRegister');
const { handlePairRegister } = require('./handlePairRegister');
const { handleOddRegister } = require('./handleOddRegister');
const { getDataFromAPI } = require('./data/getDataFromAPI');
const { getDataFromCache } = require('./data/getDataFromCache');

let data;
let pontos;

let printResponse = ''


async function fetchData() {

    if (verifyHasAndCanUseCache()) {
        data = getDataFromCache()
        printResponse = '○ ';
    } else {
        data = await getDataFromAPI()
        printResponse = '☁ '
    }
    pontos = data.pontos;

    // Se não tiver nenhum ponto
    if (Object.keys(pontos).length === 0) {
        console.log(printResponse + ' 🖑 Marcar o ponto');
        return;
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

   // Se tiver pontos ímpares
    if (Object.keys(pontos).length % 2 !== 0) {
        hoursCount = handleOddRegister(pontos);
        console.log(printResponse + ' ' + hoursCount);
        return;
    }
}

fetchData()
