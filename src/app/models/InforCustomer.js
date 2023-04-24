const db = require('../../config/db');

class InforCustomer {
    constructor(idCustomer, phoneNumber, name, email) {
        this.idCustomer = idCustomer;
        this.phoneNumber = phoneNumber;
        this.name = name;
        this.email = email;
    }

    async checkConflict(){
        return new Promise((resolve, reject)=>{
            const query = `SELECT * FROM inforcustomer where phoneNumber = ? OR email = ?`;
            db.query(query, [this.phoneNumber, this.email], (err, results)=>{
                if(err){
                    return reject(err);
                }
                if(results.length > 0){
                    return reject(err); 
                }
                return resolve(results)
            })
        })
    }

    async save() {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO inforcustomer (idCustomer, phoneNumber, name, email) VALUES (?, ?, ?, ?)`;
            db.query(query, [this.idCustomer, this.phoneNumber, this.name, this.email], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        });
    }

    async update() {
        return new Promise((resolve, reject) => {
            var query = `UPDATE inforcustomer SET name = ?, phoneNumber = ?, email = ? WHERE idCustomer = ?`;
            db.query(query, [this.name, this.phoneNumber, this.email, this.idCustomer], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
        })
    }

    async search() {
        return new Promise((resolve, reject) => {
            var query = `SELECT * FROM inforcustomer WHERE name = ?`;
            db.query(query, [this.name], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results[0].idCustomer);
            });
        })
    }
}

module.exports = InforCustomer;
