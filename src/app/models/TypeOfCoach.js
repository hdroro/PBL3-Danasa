const db = require('../../config/db');

class TypeOfCoach{
    constructor(idType,typeName,numberOfSeat){
        this.idType = idType;
        this.typeName = typeName;
        this.numberOfSeat = numberOfSeat;
    }
}
module.exports = TypeOfCoach;