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
    getCount(query){
        return new Promise(function(resolve, reject){
            db.query(query, function (err, rows) {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(rows);
                }
            })
        })
    }
}

module.exports = Ticket