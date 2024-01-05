function subTime(time1, time2) {
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

module.exports = {
    subTime
 }