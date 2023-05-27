const db = require('../../config/db');

class Station{
    constructor(idStation,stationName,idProvince){
        this.idStation = idStation;
        this.stationName = stationName;
        this.idProvince = idProvince;
    }
    getStation(){
        return new Promise(function(resolve, reject){
            db.query('SELECT * FROM stations', function (err, rows) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            })
            })
    }
    getStationByIdProvince(id){
        return new Promise(function(resolve, reject){
            db.query(`SELECT * FROM stations where idProvince = ${id} and isDelete = 0`, function (err, rows) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            })
            })
    }
}
module.exports = Station;