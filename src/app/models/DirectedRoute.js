const db = require('../../config/db');

class DirectedRoute{
    constructor(iddirectedroutes,idRoute,idStartProvince,idEndProvince){
        this.iddirectedroutes = iddirectedroutes;
        this.idRoute = idRoute;
        this.idStartProvince = idStartProvince;
        this.idEndProvince = idEndProvince;
    }
    getDirectedRouteByIDRoute(id){
        return new Promise(function(resolve, reject){
            db.query(`select * from directedroutes where idRoute = ${id}`, function (err, rows) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            })
            })
    }
    getDirectedRouteByIDDirect(idDirect){
        return new Promise(function(resolve, reject){
            db.query(`select * from directedroutes where iddirectedroutes = ${idDirect}`, function (err, rows) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows[0]);
                }
            })
            })
    }
}
module.exports = DirectedRoute;