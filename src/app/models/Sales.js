const db = require('../../config/db');
const ticket = require('./Ticket');
const schedule = require('./Schedule');


class Sales {
    async listSales_quarter_arrangedASC() {
        return new Promise((resolve, reject) => {
            const sales_quarter_arranged = `SELECT firstProvince, secondProvince, COUNT(idTicket) as totalTicket
                                            FROM tickets 
                                            INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule
                                            INNER JOIN directedroutes ON directedroutes.iddirectedroutes = schedules.idDirectedRoute
                                            INNER JOIN routes ON routes.idRoute = directedroutes.idRoute
                                            WHERE quarter(startTime) = quarter(CURDATE()) AND YEAR(startTime) = YEAR(CURDATE()) AND schedules.isDeleted = 0
                                            GROUP BY firstProvince, secondProvince
                                            ORDER BY totalTicket ASC`
            db.query(sales_quarter_arranged, (err, results) => {
                if (err) {
                    return reject(err);
                }
                else if(results.length === 0){
                    return resolve(null);
                }
                let STT = 0;
                const sales = results.map(salesItem => {
                    STT++;
                    return {
                        STT: STT,
                        firstProvince: salesItem.firstProvince,
                        secondProvince: salesItem.secondProvince,
                        totalTicket: parseInt(salesItem.totalTicket ).toLocaleString(),
                    };
                });
                return resolve(sales);
            })
        })
    }

    /*---------------*/
    async listSales_month_arrangedASC() {
        return new Promise((resolve, reject) => {
            const sales_month_arranged = `SELECT firstProvince, secondProvince, COUNT(idTicket) as totalTicket
                                            FROM tickets 
                                            INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule
                                            INNER JOIN directedroutes ON directedroutes.iddirectedroutes = schedules.idDirectedRoute
                                            INNER JOIN routes ON routes.idRoute = directedroutes.idRoute
                                            WHERE MONTH(startTime) = MONTH(CURDATE()) AND YEAR(startTime) = YEAR(CURDATE()) AND schedules.isDeleted = 0
                                            GROUP BY firstProvince, secondProvince
                                            ORDER BY totalTicket ASC`
            db.query(sales_month_arranged, (err, results) => {
                if (err) {
                    return reject(err);
                }
                else if(results.length === 0){
                    return resolve(null);
                }
                let STT = 0;
                const sales = results.map(salesItem => {
                    STT++;
                    return {
                        STT: STT,
                        firstProvince_month: salesItem.firstProvince,
                        secondProvince_month: salesItem.secondProvince,
                        totalTicket_month: parseInt(salesItem.totalTicket).toLocaleString(),
                    };
                });

                return resolve(sales);
            })
        })
    }

    async totalSales() {
        return new Promise((resolve, reject) => {
            const total = `SELECT COUNT(idTicket) FROM tickets INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule AND schedules.isDeleted = 0`;
            db.query(total, (err, results) => {
                if (err) {
                    return reject(err);
                }
                else if(results.length === 0){
                    return reject(new Error('No data found'));
                }
                return resolve((parseInt(results[0]['COUNT(idTicket)'])).toLocaleString());
            })
        })
    }

    async totalSales_year() {
        return new Promise((resolve, reject) => {
            const total = `SELECT COUNT(idTicket) FROM tickets INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule WHERE YEAR(startTime) = YEAR(CURDATE()) AND schedules.isDeleted = 0`;
            db.query(total, (err, results) => {
                if (err) {
                    return reject(err);
                }
                else if(results.length === 0){
                    return reject(new Error('No data found for this year'));
                }
                return resolve((parseInt(results[0]['COUNT(idTicket)']) ).toLocaleString());
            })
        })
    }

    async totalSales_yearPrevious() {
        return new Promise((resolve, reject) => {
            const total = `SELECT COUNT(idTicket) FROM tickets INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule WHERE YEAR(startTime) = (YEAR(CURDATE()) - 1) AND schedules.isDeleted = 0`;
            db.query(total, (err, results) => {
                if (err) {
                    return reject(err);
                }
                else if(results.length === 0){
                    return reject(new Error('No data found for this year'));
                }
                return resolve((parseInt(results[0]['COUNT(idTicket)'])).toLocaleString());
            })
        })
    }

    /*---------------*/
    async totalSales_quarter() {
        return new Promise((resolve, reject) => {
            const total = `SELECT COUNT(idTicket) FROM tickets INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule WHERE QUARTER(startTime) = QUARTER(CURDATE()) AND YEAR(startTime) = YEAR(CURDATE()) AND schedules.isDeleted = 0`;
            db.query(total, (err, results) => {
                if (err) {
                    return reject(err);
                }
                else if(results.length === 0){
                    return reject(new Error('No data found for this quarter'));
                }
                return resolve((parseInt(results[0]['COUNT(idTicket)']) ).toLocaleString());
            })
        })
    }

    async totalSales_quarterPrevious() {
        return new Promise((resolve, reject) => {
            const total = `SELECT COUNT(idTicket) FROM tickets INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule WHERE QUARTER(startTime) = (QUARTER(CURDATE()) - 1)  AND YEAR(startTime) = YEAR(CURDATE()) AND schedules.isDeleted = 0`;
            db.query(total, (err, results) => {
                if (err) {
                    return reject(err);
                }
                else if(results.length === 0){
                    return reject(new Error('No data found for this quarter'));
                }
                return resolve((parseInt(results[0]['COUNT(idTicket)']) ).toLocaleString());
            })
        })
    }

    /*---------------*/
    async totalSales_month() {
        return new Promise((resolve, reject) => {
            const total = `SELECT COUNT(idTicket) FROM tickets INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule WHERE MONTH(startTime) = MONTH(CURDATE()) AND YEAR(startTime) = YEAR(CURDATE()) AND schedules.isDeleted = 0`;
            db.query(total, (err, results) => {
                if (err) {
                    return reject(err);
                }
                else if(results.length === 0){
                    return reject(new Error('No data found for this month'));
                }
                return resolve((parseInt(results[0]['COUNT(idTicket)'])).toLocaleString());
            })
        })
    }

    async totalSales_monthPrevious() {
        return new Promise((resolve, reject) => {
            const total = `SELECT COUNT(idTicket) FROM tickets INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule WHERE MONTH(startTime) = (MONTH(CURDATE()) - 1) AND YEAR(startTime) = YEAR(CURDATE()) AND schedules.isDeleted = 0`;
            db.query(total, (err, results) => {
                if (err) {
                    return reject(err);
                }
                else if(results.length === 0){
                    return reject(new Error('No data found for this month'));
                }
                return resolve((parseInt(results[0]['COUNT(idTicket)']) ).toLocaleString());
            })
        })
    }

    /*---------------*/
    async totalSales_quarter_arranged() {
        return new Promise((resolve, reject) => {
            const sales_quarter_arranged = `SELECT firstProvince, secondProvince, COUNT(idTicket) as totalTicket
                                            FROM tickets 
                                            INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule
                                            INNER JOIN directedroutes ON directedroutes.iddirectedroutes = schedules.idDirectedRoute
                                            INNER JOIN routes ON routes.idRoute = directedroutes.idRoute
                                            WHERE quarter(startTime) = quarter(CURDATE()) AND YEAR(startTime) = YEAR(CURDATE()) AND schedules.isDeleted = 0
                                            GROUP BY firstProvince, secondProvince
                                            ORDER BY totalTicket desc
                                            LIMIT 1`;
            db.query(sales_quarter_arranged, (err, results) => {
                if (err) {
                    return reject(err);
                }
                else if(results.length === 0){
                    return resolve(null);
                }
                return resolve(results[0]);
            })
        })
    }

    /*---------------*/
    async totalSales_month_arranged() {
        return new Promise((resolve, reject) => {
            const sales_month_arranged = `SELECT firstProvince, secondProvince, COUNT(idTicket) as totalTicket
                                            FROM tickets 
                                            INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule
                                            INNER JOIN directedroutes ON directedroutes.iddirectedroutes = schedules.idDirectedRoute
                                            INNER JOIN routes ON routes.idRoute = directedroutes.idRoute
                                            WHERE MONTH(startTime) = MONTH(CURDATE()) AND YEAR(startTime) = YEAR(CURDATE()) AND schedules.isDeleted = 0
                                            GROUP BY firstProvince, secondProvince
                                            ORDER BY totalTicket desc
                                            LIMIT 1`;
            db.query(sales_month_arranged, (err, results) => {
                if (err) {
                    return reject(err);
                }
                else if(results.length === 0){
                    return resolve(null);
                }
                return resolve(results[0]);
            })
        })
    }

    /*---------------*/
    async listSales_quarter_arranged() {
        return new Promise((resolve, reject) => {
            const sales_quarter_arranged = `SELECT firstProvince, secondProvince, COUNT(idTicket) as totalTicket
                                            FROM tickets 
                                            INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule
                                            INNER JOIN directedroutes ON directedroutes.iddirectedroutes = schedules.idDirectedRoute
                                            INNER JOIN routes ON routes.idRoute = directedroutes.idRoute
                                            WHERE quarter(startTime) = quarter(CURDATE()) AND YEAR(startTime) = YEAR(CURDATE()) AND schedules.isDeleted = 0
                                            GROUP BY firstProvince, secondProvince
                                            ORDER BY totalTicket desc`
            db.query(sales_quarter_arranged, (err, results) => {
                if (err) {
                    return reject(err);
                }
                else if(results.length === 0){
                    return resolve(null);
                }
                let STT = 0;
                const sales = results.map(salesItem => {
                    STT++;
                    return {
                        STT: STT,
                        firstProvince: salesItem.firstProvince,
                        secondProvince: salesItem.secondProvince,
                        totalTicket: parseInt(salesItem.totalTicket ).toLocaleString(),
                    };
                });
                return resolve(sales);
            })
        })
    }

    /*---------------*/
    async listSales_month_arranged() {
        return new Promise((resolve, reject) => {
            const sales_month_arranged = `SELECT firstProvince, secondProvince, COUNT(idTicket) as totalTicket
                                            FROM tickets 
                                            INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule
                                            INNER JOIN directedroutes ON directedroutes.iddirectedroutes = schedules.idDirectedRoute
                                            INNER JOIN routes ON routes.idRoute = directedroutes.idRoute
                                            WHERE MONTH(startTime) = MONTH(CURDATE()) AND YEAR(startTime) = YEAR(CURDATE()) AND schedules.isDeleted = 0
                                            GROUP BY firstProvince, secondProvince
                                            ORDER BY totalTicket desc`

            db.query(sales_month_arranged, (err, results) => {
                if (err) {
                    return reject(err);
                }
                else if(results.length === 0){
                    return resolve(null);
                }
                let STT = 0;
                const sales = results.map(salesItem => {
                    STT++;
                    return {
                        STT: STT,
                        firstProvince_month: salesItem.firstProvince,
                        secondProvince_month: salesItem.secondProvince,
                        totalTicket_month: parseInt(salesItem.totalTicket).toLocaleString(),
                    };
                });

                return resolve(sales);
            })
        })
    }
}

module.exports = Sales