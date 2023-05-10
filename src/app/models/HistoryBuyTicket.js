const db = require('../../config/db');
const MyDate = require('../models/Date');
const moment = require('moment');
const seat = require('../models/Seat')

class HistoryBuyTicket {

    constructor(userName) {
        this.userName = userName;
    }

    async fillIn(idStart, idEnd) {
        return new Promise((resolve, reject) => {
            var startProvinces, endProvinces;
            var query_pro = `SELECT * FROM accounts 
                            INNER JOIN inforcustomer ON accounts.idUser = inforcustomer.idCustomer
                            INNER JOIN tickets ON inforcustomer.idCustomer = tickets.idUser
                            INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule
                            WHERE accounts.userName = ? AND schedules.isDeleted = 0`;
            db.query(query_pro, [this.userName], async (err, results1) => {
                if (err) {
                    return reject(err);
                }
                if (results1.length === 0) {
                    return reject(err);
                }
                else {
                    const uniqueStartProvinces = [];
                    startProvinces = await Promise.all(
                        results1.map(async provinceItem => {
                            const startProvince = await this.getProvinces(provinceItem.idStartStation);
                            if (!uniqueStartProvinces.includes(startProvince.provinceName)) {
                                uniqueStartProvinces.push(startProvince.provinceName);
                                return {
                                    id_start: startProvince.idProvince,
                                    startProvinceName: startProvince.provinceName
                                };
                            }
                        })
                    ).then(res => res.filter(item => item));


                    const uniqueEndProvinces = [];
                    endProvinces = await Promise.all(
                        results1.map(async provinceItem => {
                            const endProvince = await this.getProvinces(provinceItem.idEndStation);
                            if (!uniqueEndProvinces.includes(endProvince.provinceName)) {
                                uniqueEndProvinces.push(endProvince.provinceName);
                                return {
                                    id_end: endProvince.idProvince,
                                    endProvinceName: endProvince.provinceName
                                };
                            }
                        })
                    ).then(res => res.filter(item => item));
                }
            })

            var query = `SELECT * FROM accounts 
                            INNER JOIN inforcustomer ON accounts.idUser = inforcustomer.idCustomer
                            INNER JOIN tickets ON inforcustomer.idCustomer = tickets.idUser
                            INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule
                            INNER JOIN directedroutes ON directedroutes.iddirectedroutes = schedules.idDirectedRoute
                            WHERE accounts.userName = ? AND schedules.isDeleted = 0`;
            if (idStart > 0) query += ` AND idStartProvince = ${idStart}`;
            if (idEnd > 0) query += ` AND idEndProvince = ${idEnd}`;

            query += ` ORDER BY schedules.startTime DESC`;

            db.query(query, [this.userName], async (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return reject(err);
                }
                else {
                    const history = await Promise.all(results.map(async historyItem => {
                        const startStation = await this.getStation(historyItem.idStartStation);
                        const endStation = await this.getStation(historyItem.idEndStation)
                        const getDistance = await this.getDistance(historyItem.idDirectedRoute)
                        const getNameSeat = await this.getNameSeat(historyItem.idSeat, historyItem.idSchedule)
                        var timeStart = new MyDate(historyItem.startTime.toString());
                        var timeEnd = new MyDate(historyItem.endTime.toString());
                        const dateParts = await timeStart.toDate().split('-');
                        const startDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

                        return {
                            startTime: timeStart.toLocaleTimeString(),
                            endTime: timeEnd.toLocaleTimeString(),
                            startDate: startDate,
                            startStation: startStation.stationName,
                            endStation: endStation.stationName,
                            distance: getDistance.distance,
                            hour: getDistance.hours,
                            nameSeat: getNameSeat.nameSeat,
                            Totalprice: (parseInt(historyItem.price, 10)).toLocaleString()
                        }
                    })).then(res => res.filter(item => item)).catch(error => {
                        console.error(error);
                    });


                    return resolve({
                        historyList: history,
                        provincesStartList: startProvinces,
                        provincesEndList: endProvinces,
                    });
                }
            });
        });
    }

    // async fillIn2(idItemSearch) {
    //     return new Promise((resolve, reject) => {
    //         var query = `SELECT * FROM accounts 
    //                     INNER JOIN inforcustomer ON accounts.idUser = inforcustomer.idCustomer
    //                     INNER JOIN tickets ON inforcustomer.idCustomer = tickets.idUser
    //                     INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule
    //                     INNER JOIN directedroutes ON directedroutes.iddirectedroutes = schedules.idDirectedRoute
    //                     WHERE accounts.userName = ? and idStartProvince = 1 AND schedules.isDeleted = 0 
    //                     ORDER BY schedules.startTime DESC`;
    //         db.query(query, [this.userName, idItemSearch], async (err, results) => {
    //             if (err) {
    //                 return reject(err);
    //             }
    //             if (results.length === 0) {
    //                 return reject(err);
    //             }
    //             else {
    //                 const history = await Promise.all(results.map(async historyItem => {
    //                     const startStation = await this.getStation(historyItem.idStartStation);
    //                     const endStation = await this.getStation(historyItem.idEndStation)
    //                     const getDistance = await this.getDistance(historyItem.idDirectedRoute)
    //                     const getNameSeat = await this.getNameSeat(historyItem.idSeat, historyItem.idSchedule)
    //                     var timeStart = new MyDate(historyItem.startTime.toString());
    //                     var timeEnd = new MyDate(historyItem.endTime.toString());
    //                     const dateParts = await timeStart.toDate().split('-');
    //                     const startDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

    //                     return {
    //                         startTime: timeStart.toLocaleTimeString(),
    //                         endTime: timeEnd.toLocaleTimeString(),
    //                         startDate: startDate,
    //                         startStation: startStation.stationName,
    //                         endStation: endStation.stationName,
    //                         distance: getDistance.distance,
    //                         hour: getDistance.hours,
    //                         nameSeat: getNameSeat.nameSeat,
    //                         Totalprice: (parseInt(historyItem.price, 10)).toLocaleString('vi-VN', { minimumFractionDigits: 0 })
    //                     }
    //                 })).then(res => res.filter(item => item)).catch(error => {
    //                     console.error(error);
    //                 });

    //                 const uniqueStartProvinces = [];
    //                 const startProvinces = await Promise.all(
    //                     results.map(async provinceItem => {
    //                         const startProvince = await this.getProvinces(provinceItem.idStartStation);
    //                         if (!uniqueStartProvinces.includes(startProvince.provinceName)) {
    //                             uniqueStartProvinces.push(startProvince.provinceName);
    //                             return {
    //                                 id_start: startProvince.idProvince,
    //                                 startProvinceName: startProvince.provinceName
    //                             };
    //                         }
    //                     })
    //                 ).then(res => res.filter(item => item));


    //                 const uniqueEndProvinces = [];
    //                 const endProvinces = await Promise.all(
    //                     results.map(async provinceItem => {
    //                         const endProvince = await this.getProvinces(provinceItem.idEndStation);
    //                         if (!uniqueEndProvinces.includes(endProvince.provinceName)) {
    //                             uniqueEndProvinces.push(endProvince.provinceName);
    //                             return {
    //                                 id_end: endProvince.idProvince,
    //                                 endProvinceName: endProvince.provinceName
    //                             };
    //                         }
    //                     })
    //                 ).then(res => res.filter(item => item));

    //                 return resolve({
    //                     historyList: history,
    //                     provincesStartList: startProvinces,
    //                     provincesEndList: endProvinces,
    //                 });
    //             }
    //         });
    //     });
    // }

    // async fillIn3(idItemSearch) {
    //     return new Promise((resolve, reject) => {
    //         var query = `SELECT * FROM accounts 
    //                     INNER JOIN inforcustomer ON accounts.idUser = inforcustomer.idCustomer
    //                     INNER JOIN tickets ON inforcustomer.idCustomer = tickets.idUser
    //                     INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule
    //                     INNER JOIN directedroutes ON directedroutes.iddirectedroutes = schedules.idDirectedRoute
    //                     WHERE accounts.userName = ? and idEndProvince = ? AND schedules.isDeleted = 0 
    //                     ORDER BY schedules.startTime DESC`;
    //         db.query(query, [this.userName, idItemSearch], async (err, results) => {
    //             if (err) {
    //                 return reject(err);
    //             }
    //             if (results.length === 0) {
    //                 return reject(err);
    //             }
    //             else {
    //                 const history = await Promise.all(results.map(async historyItem => {
    //                     const startStation = await this.getStation(historyItem.idStartStation);
    //                     const endStation = await this.getStation(historyItem.idEndStation)
    //                     const getDistance = await this.getDistance(historyItem.idDirectedRoute)
    //                     const getNameSeat = await this.getNameSeat(historyItem.idSeat, historyItem.idSchedule)
    //                     var timeStart = new MyDate(historyItem.startTime.toString());
    //                     var timeEnd = new MyDate(historyItem.endTime.toString());
    //                     const dateParts = await timeStart.toDate().split('-');
    //                     const startDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

    //                     return {
    //                         startTime: timeStart.toLocaleTimeString(),
    //                         endTime: timeEnd.toLocaleTimeString(),
    //                         startDate: startDate,
    //                         startStation: startStation.stationName,
    //                         endStation: endStation.stationName,
    //                         distance: getDistance.distance,
    //                         hour: getDistance.hours,
    //                         nameSeat: getNameSeat.nameSeat,
    //                         Totalprice: (parseInt(historyItem.price, 10)).toLocaleString('vi-VN', { minimumFractionDigits: 0 })
    //                     }
    //                 })).then(res => res.filter(item => item)).catch(error => {
    //                     console.error(error);
    //                 });

    //                 const uniqueStartProvinces = [];
    //                 const startProvinces = await Promise.all(
    //                     results.map(async provinceItem => {
    //                         const startProvince = await this.getProvinces(provinceItem.idStartStation);
    //                         if (!uniqueStartProvinces.includes(startProvince.provinceName)) {
    //                             uniqueStartProvinces.push(startProvince.provinceName);
    //                             return {
    //                                 id_start: startProvince.idProvince,
    //                                 startProvinceName: startProvince.provinceName
    //                             };
    //                         }
    //                     })
    //                 ).then(res => res.filter(item => item));


    //                 const uniqueEndProvinces = [];
    //                 const endProvinces = await Promise.all(
    //                     results.map(async provinceItem => {
    //                         const endProvince = await this.getProvinces(provinceItem.idEndStation);
    //                         if (!uniqueEndProvinces.includes(endProvince.provinceName)) {
    //                             uniqueEndProvinces.push(endProvince.provinceName);
    //                             return {
    //                                 id_end: endProvince.idProvince,
    //                                 endProvinceName: endProvince.provinceName
    //                             };
    //                         }
    //                     })
    //                 ).then(res => res.filter(item => item));

    //                 return resolve({
    //                     historyList: history,
    //                     provincesStartList: startProvinces,
    //                     provincesEndList: endProvinces,
    //                 });
    //             }
    //         });
    //     });
    // }

    async getNameSeat(idSeat, idSchedule) {
        return new Promise((resolve, reject) => {
            var query = `SELECT * from seats INNER JOIN schedules ON seats.idSchedule = schedules.idSchedule WHERE idSeat = ? and seats.idSchedule = ? `;
            db.query(query, [idSeat, idSchedule], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return reject(err);
                }
                return resolve(results[0]);
            })
        })
    }

    async getDistance(idDirectedRoute) {
        return new Promise((resolve, reject) => {
            var query = `SELECT * from routes INNER JOIN directedroutes ON routes.idRoute = directedroutes.idRoute WHERE directedroutes.iddirectedroutes = ?`;
            db.query(query, [idDirectedRoute], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return reject(err);
                }
                return resolve(results[0]);
            })
        })
    }

    async getStation(idStation) {
        return new Promise((resolve, reject) => {
            var query = `SELECT stationName FROM stations WHERE idStation = ?`;
            db.query(query, [idStation], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return reject(err);
                }
                return resolve(results[0]);
            });
        });
    }

    async getProvinces(idStation) {
        return new Promise((resolve, reject) => {
            var query = `SELECT * FROM stations INNER JOIN provinces ON stations.idProvince = provinces.idProvince WHERE idStation = ?`;
            db.query(query, [idStation], (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return reject(err);
                }
                return resolve(results[0]);
            });
        });
    }
}

module.exports = HistoryBuyTicket
