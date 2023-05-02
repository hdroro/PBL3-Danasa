const db = require('../../config/db');

class Province{
    constructor(idProvince,provinceName){
        this.idProvince = idProvince;
        this.provinceName = provinceName;
    }
    getProvince(){
        return new Promise(function(resolve, reject){
            db.query('SELECT * FROM provinces', function (err, rows) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            })
        })
    }
}
module.exports = Province;