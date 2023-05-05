const db = require('../../config/db');


class Account {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.isDelete = 0;
        this.idRole = 1;
    }

    async checkUsername() {
        return new Promise((resolve, reject) => {
            var query = `SELECT * FROM accounts WHERE userName = ? and isDelete = 0`;
            db.query(query, [this.username], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return reject(err);
                }
                return resolve(results);
            });
        });
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

    async getIdAccount() {
        return new Promise((resolve, reject) => {
            var query = `SELECT * FROM accounts WHERE userName = ?`;
            db.query(query, [this.username], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return reject(err);
                }
                return resolve(results[0].idUser);
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
            const fetchQuery = `SELECT * FROM accounts INNER JOIN inforcustomer ON idUser = idCustomer WHERE userName = ?`;
            db.query(fetchQuery, [this.username], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results[0]);
            });
        })
    }

    // async getPassword() {
    //     return new Promise((resolve, reject)=>{
    //         const fetchQuery = `SELECT * FROM accounts WHERE userName = ?`;
    //         db.query(fetchQuery, [this.username], (err, results) => {
    //             if (err) {
    //                 return reject(err);
    //             }
    //             return resolve(results[0].passWord);
    //         });
    //     })
    // }

    async checkPassword(password) {
        return new Promise((resolve, reject)=>{
            const fetchQuery = `SELECT * FROM accounts WHERE userName = ? and passWord = ?`;
            db.query(fetchQuery, [this.username, password], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return reject(err);
                }
                return resolve(results[0]);
            });
        })
    }

    async updatePassword(newPassword) {
        return new Promise((resolve, reject)=>{
            const fetchQuery = `UPDATE accounts SET passWord = ? WHERE userName = ?`;
            db.query(fetchQuery, [newPassword, this.username], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        })
    }

    async getAllAccount() {
        return new Promise((resolve, reject)=>{
            const fetchQuery = `select * FROM accounts INNER JOIN inforcustomer ON idUser = idCustomer where isDelete = 0`;
            db.query(fetchQuery, (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        })
    }

    async deleteAccount(username) {
        return new Promise((resolve, reject) => {
            var query = `UPDATE accounts SET isDelete = 1 WHERE userName = ?`;
            db.query(query, [username], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        })
    }

    async getCusAcc(username) {
        return new Promise((resolve, reject) => {
            var query = `select * from accounts where userName = ? and idRole = 1`;
            db.query(query, [username], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if(results.length === 0) return reject(err);
                return resolve(results);
            });
        })
    }

    async getAdminAcc(username) {
        return new Promise((resolve, reject) => {
            var query = `select * from accounts where userName = ? and idRole = 0`;
            db.query(query, [username], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if(results.length === 0) return reject(err);
                return resolve(results);
            });
        })
    }


}
module.exports = Account;