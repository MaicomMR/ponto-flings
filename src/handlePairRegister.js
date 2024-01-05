const { sumTime } = require('./utils/sumTime');
const { subTime } = require('./utils/subTime');

function handlePairRegister(pontos) {

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

    return hoursCount;
}

module.exports = {
    handlePairRegister
}