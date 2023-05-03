const db = require('../../config/db');

class Route{
    constructor(idRoute,firstProvince,secondProvince,distance,hour){
        this.idRoute = idRoute;
        this.firstProvince = firstProvince;
        this.secondProvince = secondProvince;
        this.distance = distance;
        this.hour = hour;
    }
    getAllRoute(){
        return new Promise(function(resolve, reject){
            db.query(`select * from danasa.routes`, function (err, rows) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            })
            })
    }
    getCountOfRoute(id){
        return new Promise(function(resolve, reject){
            db.query(`SELECT * FROM schedules as sch join directedroutes as dr on sch.idDirectedRoute = dr.iddirectedroutes where dr.idRoute = ${id} order by sch.idSchedule`, function (err, rows) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            })
            })
    }
    getInfoRoute(id){
        return new Promise(function(resolve, reject){
            db.query(`SELECT * FROM routes where idRoute = ${id}`, function (err, rows) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows[0]);
                }
            })
            })
    }
}
module.exports = Route;
