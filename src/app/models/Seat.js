const db = require('../../config/db');
class Seat {
    constructor(idSeat, idSchedule, statusSeat, idCoach, nameSeat) {
        this.idSeat = idSeat;
        this.idSchedule = idSchedule;
        this.statusSeat = statusSeat;
        this.idCoach = idCoach;
        this.nameSeat = nameSeat;
    }
}
module.exports = Seat;