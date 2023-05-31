const db = require('../../config/db');

class Station {
    constructor(idStation, stationName, idProvince) {
        this.idStation = idStation;
        this.stationName = stationName;
        this.idProvince = idProvince;
    }
    getStation() {
        return new Promise(function (resolve, reject) {
            db.query('SELECT * FROM stations', function (err, rows) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            })
        })
    }
    getStationExisted() {
        return new Promise(function (resolve, reject) {
            db.query('SELECT * FROM stations where isDelete = 0', function (err, rows) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            })
        })
    }
    getStationByIdProvince(id) {
        return new Promise(function (resolve, reject) {
            db.query(`SELECT * FROM stations where idProvince = ${id} and isDelete = 0`, function (err, rows) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            })
        })
    }

    async countStation() {
        return new Promise((resolve, reject) => {
            const maxID = `SELECT MAX(idStation) FROM stations`;
            db.query(maxID, (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return reject(err);
                }
                else {
                    return resolve(results[0]['MAX(idStation)'] + 1);
                }
            });
        });
    }

    async checkStationName() {
        return new Promise((resolve, reject) => {
            db.query(`select * from stations where stationName = ? and idProvince = ? and isDelete = 0`, [this.stationName, this.idProvince], async (err, rows) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows.length);
                }
            })
        })
    }

    async saveStation() {
        return new Promise( (resolve, reject) => {
            db.query(`insert into stations (stationName, idProvince, isDelete) values( ?, ?, ?)`, [ this.stationName, this.idProvince, 0], (err, rows) => {
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