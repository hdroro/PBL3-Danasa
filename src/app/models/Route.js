const db = require('../../config/db');

class Route{
    constructor(idRoute,firstProvince,secondProvince,distance,hour){
        this.idRoute = idRoute;
        this.firstProvince = firstProvince;
        this.secondProvince = secondProvince;
        this.distance = distance;
        this.hour = hour;
    }

    GetRoute(id){
        return new Promise(function(resolve, reject){
            db.query(`select dr.idRoute from danasa.schedules as sch join danasa.directedroutes as dr on sch.idDirectedRoute = dr.iddirectedroutes where sch.idSchedule = ${id}`, function (err, rows) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            })
            })
    }
}
module.exports = Route;
