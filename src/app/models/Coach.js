const db = require('../../config/db');
class Coach{
    constructor(idCoach,idRoute,licensePlate,idType){
        this.idCoach = idCoach;
        this.idRoute = idRoute;
        this.licensePlate = licensePlate;
        this.idType = idType;
    };
}
module.exports = Coach;