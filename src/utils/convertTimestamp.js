export default function timeConverter(unixTime, isHourlyForecast = false){
    let currentData = new Date(unixTime * 1000),
        months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        month = months[currentData.getMonth()],
        date = currentData.getDate(),
        hour = currentData.getHours(),
        h = hour,
        min = currentData.getMinutes(),
        m = min < 10 ? '0'+min : min,
        ampm = 'am';
    
    if (hour > 12) {
        h = hour - 12;
        ampm = 'pm';
    } else if (hour === 12) {
        h = 12;
        ampm = 'pm';
    } else if (hour === 0) {
        h = 12;
    }
    
    return isHourlyForecast ? h + ampm :date + ' ' + month  + ' ' + h + ':' + m + ampm;
}