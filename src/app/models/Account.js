const db = require('../../config/db');


class Account {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.isDelete = 0;
        this.idRole = 1;
    }

    async authenticate() {
        return new Promise((resolve, reject) => {
            var query = `SELECT * FROM accounts WHERE userName = ? AND passWord = ?`;
            db.query(query, [this.username, this.password], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return reject(err);
                }
                return resolve(results[0].idRole);
            });
        });
    }

    async save() {
        return new Promise((resolve, reject) => {
            const checkQuery = `SELECT * FROM accounts WHERE userName = ?`;
            db.query(checkQuery, [this.username], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length > 0) {
                    return reject(err);
                } else {
                    var query = `INSERT INTO accounts (userName, passWord, isDelete, idRole) VALUES (?, ?, ?, ?)`;
                    db.query(query, [this.username, this.password, this.isDelete, this.idRole], (err, results) => {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(results.insertId);
                    });
                }
            });
        });
    }

    
    async match(){
        return new Promise((resolve, reject) => {
            const checkQuery = `SELECT name FROM accounts INNER JOIN inforcustomer ON idUser = idCustomer WHERE userName = ?`;
            db.query(checkQuery, [this.username], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results[0].name);
            });
        });
    }

    async fillInfo(){
        return new Promise((resolve, reject)=>{
            const fetchQuery = `SELECT * FROM accounts INNER JOIN inforcustomer ON idUser = idCustomer WHERE name = ?`;
            db.query(fetchQuery, [this.username], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results[0]);
            });
        })
    }
}
module.exports = Account;
