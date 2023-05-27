const db = require('../../config/db');

class Province {
    constructor(idProvince, provinceName) {
        this.idProvince = idProvince;
        this.provinceName = provinceName;
    }
    getProvince() {
        return new Promise(function (resolve, reject) {
            db.query('SELECT * FROM provinces', function (err, rows) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            })
        })
    }

    async getNameProvinceByID(idProvince) {
        return new Promise(function (resolve, reject) {
            var query = `SELECT provinceName FROM provinces WHERE idProvince = ?`;
            db.query(query, [idProvince], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) return reject(err);
                else {
                    return resolve(results[0].provinceName);
                }
            });
        })
    }

    async checkProvinceName(provinceName) {
        return new Promise(function(resolve, reject){
            db.query(`select * from provinces where provinceName = ?`, [provinceName] ,function (err, rows) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            })
        })
    }

    async addProvince(provinceName) {
        return new Promise(function(resolve, reject){
            db.query(`insert into provinces (provinceName) values(?)`, [provinceName] ,function (err, rows) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            })
        })
    }

    async getIdProvinceByName(provinceName) {
        return new Promise(function (resolve, reject) {
            var query = `SELECT idProvince FROM provinces WHERE provinceName = ?`;
            db.query(query, [provinceName], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) return reject(err);
                else {
                    return resolve(results[0].idProvince);
                }
            });
        })
    }
}
module.exports = Province;