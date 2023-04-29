const db = require('../../config/db');

class Ticket{
    constructor(idTicket, idSchedule, idUser, idSeat, phoneNumber, name, email){
        this.idTicket = idTicket,
        this.idSchedule = idSchedule,
        this.idUser = idUser,
        this.idSeat = idSeat,
        this.phoneNumber = phoneNumber,
        this.name = name,
        this.email = email
    }
}

module.exports = Ticket

