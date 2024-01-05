const { getCurrentTimeFormatted } = require('./utils/getAndFormatNow');
const { subTime } = require('./utils/subTime');

function handleSingleRegister(startTime) {
    now = getCurrentTimeFormatted();
    hoursCount = subTime(now, startTime)
    return hoursCount;
}

module.exports = {
    handleSingleRegister
}