module.exports = day

function day(){
    var today = new Date()
    var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    var months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var Day = [days[today.getDay()] ," "+ today.getDate() +" "+months[today.getMonth()]]
    return Day
}