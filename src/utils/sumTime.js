function sumTime(time1, time2) {
    // Function to convert time to minutes
    const convertToMinutes = (time) => {
        const [hours, minutes] = time.split(':');
        return parseInt(hours) * 60 + parseInt(minutes);
    };

    // Function to convert minutes to time
    const convertToTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
    };

    // Convert times to minutes, add them, and convert back to time
    const resultInMinutes = convertToMinutes(time1) + convertToMinutes(time2);
    const resultInTime = convertToTime(resultInMinutes);

    return resultInTime;
}

 module.exports = {
    sumTime
 }