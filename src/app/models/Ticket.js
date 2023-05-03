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


    async save() {
        return new Promise((resolve, reject) => {
            var query = `INSERT INTO tickets (idSchedule, idUser, idSeat, phoneNumber, name, email) VALUES (?, ?, ?, ?, ?, ?)`;
            db.query(query, [this.idSchedule, this.idUser, this.idSeat, this.phoneNumber, this.name, this.email], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        });
    }
    
    async check(idSeat, idSchedule) {
        return new Promise((resolve, reject) => {
            var query = `select * from tickets WHERE idSeat = ? and idSchedule = ?`;
            db.query(query, [idSeat, idSchedule], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        });
    }
}

module.exports = Ticket;
