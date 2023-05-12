const db = require('../../config/db');
class Coach{
    constructor(idCoach,idRoute,licensePlate,idType,isDelete){
        this.idCoach = idCoach;
        this.idRoute = idRoute;
        this.licensePlate = licensePlate;
        this.idType = idType;
        this.isDelete = isDelete;
    };
    GetIDCoach(id){
        return new Promise(function(resolve, reject){
            db.query(`select idCoach from danasa.schedules where idSchedule = ${id}`, function (err, rows) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows[0]);
                }
            })
            })
    }
    GetCoachBusy(query){
        return new Promise(function(resolve, reject){
            db.query(query, function (err, rows) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            })
            })
    }
    getInfoCoach(id){
        return new Promise(function(resolve, reject){
            db.query(`select * from coachs as c join typeofcoachs as tc on c.idType = tc.idType where c.idCoach = ${id}`, function (err, rows) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows[0]);
                }
            })
            })
    }
    getAllCoachByIDTypeAndRoute(idType,idRoute){
        return new Promise(function(resolve, reject){
            db.query(`select idCoach from coachs where idType = ${idType} and idRoute = ${idRoute} and isDelete = 0`, function (err, rows) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            })
            })
    }
    getAllCoach(){
        return new Promise(function(resolve, reject){
            db.query(`select * from coachs  where isDelete = 0`, function (err, rows) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            })
            })
    }
}
module.exports = Coach;