const db = require('../../config/db');

class DirectedRoute{
    constructor(iddirectedroutes,idRoute,idStartProvince,idEndProvince){
        this.iddirectedroutes = iddirectedroutes;
        this.idRoute = idRoute;
        this.idStartProvince = idStartProvince;
        this.idEndProvince = idEndProvince;
    }
}
module.exports = DirectedRoute;