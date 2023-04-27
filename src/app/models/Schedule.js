const db = require('../../config/db');

class Schedule{
    constructor(idSchedule,idDirectedRoute,idStartStation,idEndStation,startTime,endTime,price,idCoach){
        this.idSchedule = idSchedule;
        this.idDirectedRoute = idDirectedRoute;
        this.idStartStation = idStartStation;
        this.idEndStation = idEndStation;
        this.startTime = startTime;
        this.endTime = endTime;
        this.price = price;
        this.idCoach = idCoach;
    };
}
module.exports = new Schedule;