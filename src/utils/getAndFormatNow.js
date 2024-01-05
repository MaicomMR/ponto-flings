function getCurrentTimeFormatted() {
    const currentTime = new Date();

    const hours = String(currentTime.getHours()).padStart(2, '0');
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');

    const formattedTime = `${hours}:${minutes}`;
    return formattedTime;
}

module.exports = {
    getCurrentTimeFormatted
}