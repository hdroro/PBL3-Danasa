const db = require('../../config/db');
class SchedulePublic {
    getStation__Province() {
        var p2 = new Promise(function (resolve, reject) {
            db.query('SELECT * FROM stations', function (err, rows) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            })
        })
        var p3 = new Promise(function (resolve, reject) {
            db.query('SELECT * FROM provinces', function (err, rows) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            })
        })
        return Promise.all([p2, p3]);
    }
    getSchedule(query) {
        return new Promise(function (resolve, reject) {
            db.query(query, function (err, rows) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            })
        })
    }
    deleteSchedule(id) {
        return new Promise(function (resolve, reject) {
            db.query(`delete from danasa.schedules where idSchedule = ${id}`, function (err) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve();
                }
            })
        })
    }
    // getSchedule(id){
    //     var p1 = new Promise(function(resolve, reject){
    //         db.query(`SELECT * FROM (((danasa.schedules as sch join danasa.directedroutes as dr on idDirectedRoute = iddirectedroutes) join danasa.coachs as s on s.idCoach = sch.idCoach) join danasa.typeofcoachs as tp on s.idType = tp.idType) join danasa.routes as r on r.idRoute = dr.idRoute where sch.idSchedule = ${id}`, function (err, rows) {
    //             if (err) {
    //                 return reject(err);
    //             } else {
    //                 return resolve(rows);
    //             }
    //         })
    //         })
    //     var p2 = new Promise(function(resolve, reject){
    //         db.query('SELECT * FROM stations', function (err, rows) {
    //             if (err) {
    //                 return reject(err);
    //             } else {
    //                 return resolve(rows);
    //             }
    //         })
    //         })
    //     var p3 = new Promise(function(resolve, reject){
    //         db.query('SELECT * FROM provinces', function (err, rows) {
    //             if (err) {
    //                 return reject(err);
    //             } else {
    //                 return resolve(rows);
    //             }
    //         })
    //         })
    //     return Promise.all([p1,p2,p3])
    // }


}
module.exports = new SchedulePublic;