const { sumTime } = require('./utils/sumTime');
const { subTime } = require('./utils/subTime');
const { getCurrentTimeFormatted } = require('./utils/getAndFormatNow');

function handleOddRegister(pontos) {
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
    FromLastToNow = subTime(now, lastRegister);
    hoursCount = sumTime(hoursCount, FromLastToNow);

    return hoursCount;
}

module.exports = {
    handleOddRegister
}