const db = require('../../config/db');

class Province{
    constructor(idProvince,provinceName){
        this.idProvince = idProvince;
        this.provinceName = provinceName;
    }
}
module.exports = Province;