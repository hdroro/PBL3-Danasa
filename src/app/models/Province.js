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
}
module.exports = Province;