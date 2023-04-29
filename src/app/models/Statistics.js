const db = require('../../config/db');
const ticket = require('../models/Ticket');
const schedule = require('../models/Schedule');


class Statistics {
    async totalStatisctics() {
        return new Promise((resolve, reject) => {
            const total = `SELECT SUM(price) FROM tickets INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule`;
            db.query(total, (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve((parseInt(results[0]['SUM(price)']) * 1000).toLocaleString());
            })
        })
    }

    async totalStatisctics_year() {
        return new Promise((resolve, reject) => {
            const total = `SELECT SUM(price) FROM tickets INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule WHERE YEAR(startTime) = YEAR(CURDATE())`;
            db.query(total, (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve((parseInt(results[0]['SUM(price)']) * 1000).toLocaleString());
            })
        })
    }

    async totalStatisctics_yearPrevious() {
        return new Promise((resolve, reject) => {
            const total = `SELECT SUM(price) FROM tickets INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule WHERE YEAR(startTime) = (YEAR(CURDATE()) - 1)`;
            db.query(total, (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve((parseInt(results[0]['SUM(price)']) * 1000).toLocaleString());
            })
        })
    }

    /*---------------*/
    async totalStatisctics_quarter() {
        return new Promise((resolve, reject) => {
            const total = `SELECT SUM(price) FROM tickets INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule WHERE QUARTER(startTime) = QUARTER(CURDATE()) AND YEAR(startTime) = YEAR(CURDATE())`;
            db.query(total, (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve((parseInt(results[0]['SUM(price)']) * 1000).toLocaleString());
            })
        })
    }

    async totalStatisctics_quarterPrevious() {
        return new Promise((resolve, reject) => {
            const total = `SELECT SUM(price) FROM tickets INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule WHERE QUARTER(startTime) = (QUARTER(CURDATE()) - 1) AND YEAR(startTime) = YEAR(CURDATE())`;
            db.query(total, (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve((parseInt(results[0]['SUM(price)']) * 1000).toLocaleString());
            })
        })
    }

    /*---------------*/
    async totalStatisctics_month() {
        return new Promise((resolve, reject) => {
            const total = `SELECT SUM(price) FROM tickets INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule WHERE MONTH(startTime) = MONTH(CURDATE()) AND YEAR(startTime) = YEAR(CURDATE())`;
            db.query(total, (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve((parseInt(results[0]['SUM(price)']) * 1000).toLocaleString());
            })
        })
    }

    async totalStatisctics_monthPrevious() {
        return new Promise((resolve, reject) => {
            const total = `SELECT SUM(price) FROM tickets INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule WHERE MONTH(startTime) = (MONTH(CURDATE()) - 1) AND YEAR(startTime) = YEAR(CURDATE())`;
            db.query(total, (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve((parseInt(results[0]['SUM(price)']) * 1000).toLocaleString());
            })
        })
    }

    /*---------------*/
    async totalStatistics_quarter_arranged() {
        return new Promise((resolve, reject) => {
            const statistic_quarter_arranged = `SELECT firstProvince, secondProvince, SUM(price)  as totalPrice 
                                                FROM tickets INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule \
                                                INNER JOIN coachs ON coachs.idCoach = schedules.idCoach \
                                                INNER JOIN routes ON routes.idRoute = coachs.idRoute \ 
                                                WHERE quarter(startTime) = quarter(CURDATE()) AND YEAR(startTime) = YEAR(CURDATE()) \ 
                                                GROUP BY firstProvince, secondProvince
                                                ORDER BY totalPrice desc
                                                LIMIT 1`;
            db.query(statistic_quarter_arranged, (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results[0]);
            })
        })
    }

    /*---------------*/
    async totalStatistics_month_arranged() {
        return new Promise((resolve, reject) => {
            const statistic_month_arranged = `SELECT firstProvince, secondProvince, SUM(price)  as totalPrice 
                                                FROM tickets INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule \
                                                INNER JOIN coachs ON coachs.idCoach = schedules.idCoach \
                                                INNER JOIN routes ON routes.idRoute = coachs.idRoute \ 
                                                WHERE MONTH(startTime) = MONTH(CURDATE()) AND YEAR(startTime) = YEAR(CURDATE())\ 
                                                GROUP BY firstProvince, secondProvince
                                                ORDER BY totalPrice desc
                                                LIMIT 1`;
            db.query(statistic_month_arranged, (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results[0]);
            })
        })
    }

    /*---------------*/
    async listStatistics_quarter_arranged() {
        return new Promise((resolve, reject) => {
            const statistic_quarter_arranged = `SELECT firstProvince, secondProvince, SUM(price)  as totalPrice 
                                                FROM tickets INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule \
                                                INNER JOIN coachs ON coachs.idCoach = schedules.idCoach \
                                                INNER JOIN routes ON routes.idRoute = coachs.idRoute \ 
                                                WHERE quarter(startTime) = quarter(CURDATE()) AND YEAR(startTime) = YEAR(CURDATE())\ 
                                                GROUP BY firstProvince, secondProvince
                                                ORDER BY totalPrice desc`
            db.query(statistic_quarter_arranged, (err, results) => {
                if (err) {
                    return reject(err);
                }
                let STT = 0;
                const statistics = results.map(statisticsItem => {
                    STT++;
                    return {
                        STT: STT,
                        firstProvince: statisticsItem.firstProvince,
                        secondProvince: statisticsItem.secondProvince,
                        totalPrice: parseInt(statisticsItem.totalPrice * 1000).toLocaleString(),
                    };
                });
                return resolve(statistics);
            })
        })
    }

    /*---------------*/
    async listStatistics_month_arranged() {
        return new Promise((resolve, reject) => {
            const statistic_month_arranged = `SELECT firstProvince, secondProvince, SUM(price)  as totalPrice 
                                                FROM tickets INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule \
                                                INNER JOIN coachs ON coachs.idCoach = schedules.idCoach \
                                                INNER JOIN routes ON routes.idRoute = coachs.idRoute \ 
                                                WHERE MONTH(startTime) = MONTH(CURDATE()) AND YEAR(startTime) = YEAR(CURDATE())\ 
                                                GROUP BY firstProvince, secondProvince
                                                ORDER BY totalPrice desc`

            db.query(statistic_month_arranged, (err, results) => {
                if (err) {
                    return reject(err);
                }
                
                let STT = 0;
                const statistics = results.map(statisticsItem => {
                    STT++;
                    return {
                        STT: STT,
                        firstProvince_month: statisticsItem.firstProvince,
                        secondProvince_month: statisticsItem.secondProvince,
                        totalPrice_month: parseInt(statisticsItem.totalPrice * 1000).toLocaleString(),
                    };
                });

                return resolve(statistics);
            })
        })
    }
}

module.exports = Statistics