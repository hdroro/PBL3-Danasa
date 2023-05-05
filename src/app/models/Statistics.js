const db = require('../../config/db');
const ticket = require('../models/Ticket');
const schedule = require('../models/Schedule');


class Statistics {
    async listStatistics_quarter_arrangedASC() {
        return new Promise((resolve, reject) => {
            const statistic_quarter_arranged = `SELECT firstProvince, secondProvince, SUM(price) as totalPrice
                                                FROM tickets 
                                                INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule
                                                INNER JOIN directedroutes ON directedroutes.iddirectedroutes = schedules.idDirectedRoute
                                                INNER JOIN routes ON routes.idRoute = directedroutes.idRoute
                                                WHERE quarter(startTime) = quarter(CURDATE()) AND YEAR(startTime) = YEAR(CURDATE()) AND schedules.isDeleted = 0
                                                GROUP BY firstProvince, secondProvince
                                                ORDER BY totalPrice ASC`
            db.query(statistic_quarter_arranged, (err, results) => {
                if (err) {
                    return reject(err);
                }
                else if(results.length === 0){
                    return resolve(null);
                }
                let STT = 0;
                const statistics = results.map(statisticsItem => {
                    STT++;
                    return {
                        STT: STT,
                        firstProvince: statisticsItem.firstProvince,
                        secondProvince: statisticsItem.secondProvince,
                        totalPrice: parseInt(statisticsItem.totalPrice).toLocaleString(),
                    };
                });
                return resolve(statistics);
            })
        })
    }
    

    async listStatistics_month_arrangedASC(sortData) {
        return new Promise((resolve, reject) => {
            const statistic_month_arranged = `SELECT firstProvince, secondProvince, SUM(price) as totalPrice
                                                FROM tickets 
                                                INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule
                                                INNER JOIN directedroutes ON directedroutes.iddirectedroutes = schedules.idDirectedRoute
                                                INNER JOIN routes ON routes.idRoute = directedroutes.idRoute
                                                WHERE MONTH(startTime) = MONTH(CURDATE()) AND YEAR(startTime) = YEAR(CURDATE()) AND schedules.isDeleted = 0
                                                GROUP BY firstProvince, secondProvince
                                                ORDER BY totalPrice ASC` 

            db.query(statistic_month_arranged, (err, results) => {
                if (err) {
                    return reject(err);
                }
                if(results.length === 0){
                    return reject(err);
                }
                let STT = 0;
                const statistics = results.map(statisticsItem => {
                    STT++;
                    return {
                        STT: STT,
                        firstProvince_month: statisticsItem.firstProvince,
                        secondProvince_month: statisticsItem.secondProvince,
                        totalPrice_month: parseInt(statisticsItem.totalPrice).toLocaleString(),
                    };
                });

                return resolve(statistics);
            })
        })
    }

    async totalStatisctics() {
        return new Promise((resolve, reject) => {
            const total = `SELECT SUM(price) FROM tickets INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule WHERE schedules.isDeleted = 0`;
            db.query(total, (err, results) => {
                if (err) {
                    return reject(err);
                }
                else if(results.length === 0){
                    return reject(new Error('No data found'));
                }
                return resolve((parseInt(results[0]['SUM(price)'])).toLocaleString());
            })
        })
    }

    async totalStatisctics_year() {
        return new Promise((resolve, reject) => {
            const total = `SELECT SUM(price) FROM tickets INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule WHERE YEAR(startTime) = YEAR(CURDATE()) AND schedules.isDeleted = 0`;
            db.query(total, (err, results) => {
                if (err) {
                    return reject(err);
                }
                else if(results.length === 0){
                    return reject(new Error('No data found for this year'));
                }
                return resolve((parseInt(results[0]['SUM(price)'])).toLocaleString());
            })
        })
    }

    async totalStatisctics_yearPrevious() {
        return new Promise((resolve, reject) => {
            const total = `SELECT SUM(price) FROM tickets INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule WHERE YEAR(startTime) = (YEAR(CURDATE()) - 1) AND schedules.isDeleted = 0`;
            db.query(total, (err, results) => {
                if (err) {
                    return reject(err);
                }
                else if(results.length === 0){
                    return reject(new Error('No data found for this year'));
                }
                return resolve((parseInt(results[0]['SUM(price)'])).toLocaleString());
            })
        })
    }

    /*---------------*/
    async totalStatisctics_quarter() {
        return new Promise((resolve, reject) => {
            const total = `SELECT SUM(price) FROM tickets INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule WHERE QUARTER(startTime) = QUARTER(CURDATE()) AND YEAR(startTime) = YEAR(CURDATE()) AND schedules.isDeleted = 0`;
            db.query(total, (err, results) => {
                if (err) {
                    return reject(err);
                }
                else if(results.length === 0){
                    return reject(new Error('No data found for this quarter'));
                }
                return resolve((parseInt(results[0]['SUM(price)'])).toLocaleString());
            })
        })
    }

    async totalStatisctics_quarterPrevious() {
        return new Promise((resolve, reject) => {
            const total = `SELECT SUM(price) FROM tickets INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule WHERE QUARTER(startTime) = (QUARTER(CURDATE()) - 1) AND YEAR(startTime) = YEAR(CURDATE()) AND schedules.isDeleted = 0`;
            db.query(total, (err, results) => {
                if (err) {
                    return reject(err);
                }
                else if(results.length === 0){
                    return reject(new Error('No data found for this quarter'));
                }
                return resolve((parseInt(results[0]['SUM(price)'])).toLocaleString());
            })
        })
    }

    /*---------------*/
    async totalStatisctics_month() {
        return new Promise((resolve, reject) => {
            const total = `SELECT SUM(price) FROM tickets INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule WHERE MONTH(startTime) = MONTH(CURDATE()) AND YEAR(startTime) = YEAR(CURDATE()) AND schedules.isDeleted = 0`;
            db.query(total, (err, results) => {
                if (err) {
                    return reject(err);
                }
                else if(results.length === 0){
                    return reject(new Error('No data found for this month'));
                }
                return resolve((parseInt(results[0]['SUM(price)'])).toLocaleString());
            })
        })
    }

    async totalStatisctics_monthPrevious() {
        return new Promise((resolve, reject) => {
            const total = `SELECT SUM(price) FROM tickets INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule WHERE MONTH(startTime) = (MONTH(CURDATE()) - 1) AND YEAR(startTime) = YEAR(CURDATE()) AND schedules.isDeleted = 0`;
            db.query(total, (err, results) => {
                if (err) {
                    return reject(err);
                }
                else if(results.length === 0){
                    return reject(new Error('No data found for this month'));
                }
                return resolve((parseInt(results[0]['SUM(price)'])).toLocaleString());
            })
        })
    }

    /*---------------*/
    async totalStatistics_quarter_arranged() {
        return new Promise((resolve, reject) => {
            const statistic_quarter_arranged = `SELECT firstProvince, secondProvince, SUM(price) as totalPrice
                                                FROM tickets 
                                                INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule
                                                INNER JOIN directedroutes ON directedroutes.iddirectedroutes = schedules.idDirectedRoute
                                                INNER JOIN routes ON routes.idRoute = directedroutes.idRoute
                                                WHERE quarter(startTime) = quarter(CURDATE()) AND YEAR(startTime) = YEAR(CURDATE()) AND schedules.isDeleted = 0
                                                GROUP BY firstProvince, secondProvince
                                                ORDER BY totalPrice desc
                                                LIMIT 1`;
            db.query(statistic_quarter_arranged, (err, results) => {
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
    async totalStatistics_month_arranged() {
        return new Promise((resolve, reject) => {
            const statistic_month_arranged = `SELECT firstProvince, secondProvince, SUM(price) as totalPrice
                                                FROM tickets 
                                                INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule
                                                INNER JOIN directedroutes ON directedroutes.iddirectedroutes = schedules.idDirectedRoute
                                                INNER JOIN routes ON routes.idRoute = directedroutes.idRoute
                                                WHERE MONTH(startTime) = MONTH(CURDATE()) AND YEAR(startTime) = YEAR(CURDATE()) AND schedules.isDeleted = 0
                                                GROUP BY firstProvince, secondProvince
                                                ORDER BY totalPrice desc
                                                LIMIT 1`;
            db.query(statistic_month_arranged, (err, results) => {
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
    async listStatistics_quarter_arranged() {
        return new Promise((resolve, reject) => {
            const statistic_quarter_arranged = `SELECT firstProvince, secondProvince, SUM(price) as totalPrice
                                                FROM tickets 
                                                INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule
                                                INNER JOIN directedroutes ON directedroutes.iddirectedroutes = schedules.idDirectedRoute
                                                INNER JOIN routes ON routes.idRoute = directedroutes.idRoute
                                                WHERE quarter(startTime) = quarter(CURDATE()) AND YEAR(startTime) = YEAR(CURDATE()) AND schedules.isDeleted = 0
                                                GROUP BY firstProvince, secondProvince
                                                ORDER BY totalPrice desc`
            db.query(statistic_quarter_arranged, (err, results) => {
                if (err) {
                    return reject(err);
                }
                else if(results.length === 0){
                    return resolve(null);
                }
                let STT = 0;
                const statistics = results.map(statisticsItem => {
                    STT++;
                    return {
                        STT: STT,
                        firstProvince: statisticsItem.firstProvince,
                        secondProvince: statisticsItem.secondProvince,
                        totalPrice: parseInt(statisticsItem.totalPrice).toLocaleString(),
                    };
                });
                return resolve(statistics);
            })
        })
    }

    /*---------------*/
    async listStatistics_month_arranged() {
        return new Promise((resolve, reject) => {
            const statistic_month_arranged = `SELECT firstProvince, secondProvince, SUM(price) as totalPrice
                                            FROM tickets 
                                            INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule
                                            INNER JOIN directedroutes ON directedroutes.iddirectedroutes = schedules.idDirectedRoute
                                            INNER JOIN routes ON routes.idRoute = directedroutes.idRoute
                                            WHERE MONTH(startTime) = MONTH(CURDATE()) AND YEAR(startTime) = YEAR(CURDATE()) AND schedules.isDeleted = 0
                                            GROUP BY firstProvince, secondProvince
                                            ORDER BY totalPrice desc`

            db.query(statistic_month_arranged, (err, results) => {
                if (err) {
                    return reject(err);
                }
                else if(results.length === 0){
                    return resolve(null);
                }
                if(results.length === 0) return reject(new Error('No records found.'));
                let STT = 0;
                const statistics = results.map(statisticsItem => {
                    STT++;
                    return {
                        STT: STT,
                        firstProvince_month: statisticsItem.firstProvince,
                        secondProvince_month: statisticsItem.secondProvince,
                        totalPrice_month: parseInt(statisticsItem.totalPrice).toLocaleString(),
                    };
                });

                return resolve(statistics);
            })
        })
    }
}

module.exports = Statistics
