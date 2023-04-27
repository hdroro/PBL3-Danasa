const db = require('../../config/db');

class Station{
    constructor(idStation,stationName,idProvince){
        this.idStation = idStation;
        this.stationName = stationName;
        this.idProvince = idProvince;
    }
}
module.exports = Station;