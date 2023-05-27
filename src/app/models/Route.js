const db = require('../../config/db');

class Route{
    constructor(idRoute,idFirstProvince,idSecondProvince,distance,hour,isDelete){
        this.idRoute = idRoute;
        this.idFirstProvince = idFirstProvince;
        this.idSecondProvince = idSecondProvince;
        this.distance = distance;
        this.hour = hour;
        this.isDelete = isDelete;
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
    getAllRouteNotDelete(){
        return new Promise(function(resolve, reject){
            db.query(`select * from danasa.routes where isDelete = 0`, function (err, rows) {
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
