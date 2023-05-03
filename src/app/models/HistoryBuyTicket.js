const db = require('../../config/db');
const MyDate = require('../models/Date');
const moment = require('moment');

class HistoryBuyTicket {

    constructor(userName) {
        this.userName = userName;
    }

    async fillIn() {
        return new Promise((resolve, reject) => {
            var query = `SELECT * FROM accounts 
                                INNER JOIN inforcustomer ON accounts.idUser = inforcustomer.idCustomer
                                INNER JOIN tickets ON inforcustomer.idCustomer = tickets.idUser
                                INNER JOIN seats ON seats.idSeat = tickets.idSeat
                                INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule
                                INNER JOIN directedroutes ON directedroutes.iddirectedroutes = schedules.idDirectedRoute
                                INNER JOIN routes ON routes.idRoute = directedroutes.idRoute
                                INNER JOIN provinces as startProvince ON startProvince.idProvince = directedroutes.idStartProvince
                                INNER JOIN provinces as endProvince ON endProvince.idProvince = directedroutes.idEndProvince
                                INNER JOIN stations as startStation ON startStation.idStation = schedules.idStartStation
                                INNER JOIN stations as endStation ON endStation.idStation = schedules.idEndStation
                                WHERE accounts.userName = ? 
                                ORDER BY schedules.startTime DESC`;
            db.query(query, [this.userName], async (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    return reject(err);
                }
                else {
                    console.log(results)
                    const uniqueSchedule = [];
                    const history = await Promise.all(results.map(async historyItem => {
                        const startStation = await this.getStation(historyItem.idStartStation);
                        const endStation = await this.getStation(historyItem.idEndStation)

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
                            distance: historyItem.distance,
                            hour: historyItem.hours,
                            nameSeat: historyItem.nameSeat,
                            Totalprice: (parseInt(historyItem.price, 10)).toLocaleString('vi-VN', { minimumFractionDigits: 0 })
                        }
                        
                        // if (!uniqueSchedule.includes(historyItem.idSchedule)){
                        //     uniqueSchedule.push(historyItem.idSchedule)
                        //     return {
                        //         startTime: timeStart.toLocaleTimeString(),
                        //         endTime: timeEnd.toLocaleTimeString(),
                        //         startDate: startDate,
                        //         startStation: startStation.stationName,
                        //         endStation: endStation.stationName,
                        //         distance: historyItem.distance,
                        //         hour: historyItem.hours,
                        //         nameSeat: historyItem.nameSeat,
                        //         Totalprice: (parseInt(historyItem.price, 10)).toLocaleString('vi-VN', { minimumFractionDigits: 0 })
                        //     }
                        // }
                    })).then(res => res.filter(item => item));

                    const uniqueStartProvinces = [];
                    const startProvinces = await Promise.all(
                        results.map(async provinceItem => {
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
                    const endProvinces = await Promise.all(
                        results.map(async provinceItem => {
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


                    const uniqueStartTime = [];
                    let id_time = 0;

                    const startTime = await Promise.all(
                        results.map(async timeItem => {
                            var timeStart = new MyDate(timeItem.startTime.toString());
                            console.log((moment('06:00', 'HH:mm')))
                            var duration;
                            if((moment(timeStart.toLocaleTimeString(), 'HH:mm').valueOf() < (moment('06:00', 'HH:mm'))) && (moment(timeStart.toLocaleTimeString(), 'HH:mm').valueOf() >= (moment('00:00', 'HH:mm')))) duration = '0h - 6h';
                            else if((moment(timeStart.toLocaleTimeString(), 'HH:mm').valueOf() < (moment('12:00', 'HH:mm'))) && (moment(timeStart.toLocaleTimeString(), 'HH:mm').valueOf() >= (moment('06:00', 'HH:mm')))) duration = '6h - 12h';
                            else if((moment(timeStart.toLocaleTimeString(), 'HH:mm').valueOf() < (moment('18:00', 'HH:mm'))) && (moment(timeStart.toLocaleTimeString(), 'HH:mm').valueOf() >= (moment('12:00', 'HH:mm')))) duration = '12h - 18h';
                            else duration = '18h - 24h';
                            if (!uniqueStartTime.includes(duration)) {
                                uniqueStartTime.push(duration);
                                id_time ++;
                                return {
                                    id_time: id_time,
                                    startTime: duration
                                };
                            }
                        })
                    ).then(res => res.filter(item => item)); 

                    return resolve({
                        historyList: history,
                        provincesStartList: startProvinces,
                        provincesEndList: endProvinces,
                        timeList: startTime
                    });
                }
            });
        });
    }

    async fillIn2(idItemSearch) {
        return new Promise((resolve, reject) => {
            var query = `SELECT * FROM accounts 
                                INNER JOIN inforcustomer ON accounts.idUser = inforcustomer.idCustomer
                                INNER JOIN tickets ON inforcustomer.idCustomer = tickets.idUser
                                INNER JOIN seats ON seats.idSeat = tickets.idSeat
                                INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule
                                INNER JOIN directedroutes ON directedroutes.iddirectedroutes = schedules.idDirectedRoute
                                INNER JOIN routes ON routes.idRoute = directedroutes.idRoute
                                INNER JOIN provinces as startProvince ON startProvince.idProvince = directedroutes.idStartProvince
                                INNER JOIN provinces as endProvince ON endProvince.idProvince = directedroutes.idEndProvince
                                INNER JOIN stations as startStation ON startStation.idStation = schedules.idStartStation
                                INNER JOIN stations as endStation ON endStation.idStation = schedules.idEndStation
                                WHERE accounts.userName = ? AND idStartProvince = ?
                                ORDER BY schedules.startTime DESC`;
            db.query(query, [this.userName, idItemSearch], async (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    console.log("hi")
                    return reject(err);
                }
                else {
                    console.log(results)
                    const history = await Promise.all(results.map(async historyItem => {
                        const startStation = await this.getStation(historyItem.idStartStation);
                        const endStation = await this.getStation(historyItem.idEndStation)

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
                            distance: historyItem.distance,
                            hour: historyItem.hours,
                            nameSeat: historyItem.nameSeat,
                            Totalprice: parseInt(historyItem.price).toLocaleString('vi-VN', { minimumFractionDigits: 0 })
                        }
                    }));

                    const uniqueStartProvinces = [];
                    const startProvinces = await Promise.all(
                        results.map(async provinceItem => {
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
                    const endProvinces = await Promise.all(
                        results.map(async provinceItem => {
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


                    const uniqueStartTime = [];
                    let id_time = 0;

                    const startTime = await Promise.all(
                        results.map(async timeItem => {
                            var timeStart = new MyDate(timeItem.startTime.toString());
                            console.log((moment('06:00', 'HH:mm')))
                            var duration;
                            if((moment(timeStart.toLocaleTimeString(), 'HH:mm').valueOf() < (moment('06:00', 'HH:mm'))) && (moment(timeStart.toLocaleTimeString(), 'HH:mm').valueOf() >= (moment('00:00', 'HH:mm')))) duration = '0h - 6h';
                            else if((moment(timeStart.toLocaleTimeString(), 'HH:mm').valueOf() < (moment('12:00', 'HH:mm'))) && (moment(timeStart.toLocaleTimeString(), 'HH:mm').valueOf() >= (moment('06:00', 'HH:mm')))) duration = '6h - 12h';
                            else if((moment(timeStart.toLocaleTimeString(), 'HH:mm').valueOf() < (moment('18:00', 'HH:mm'))) && (moment(timeStart.toLocaleTimeString(), 'HH:mm').valueOf() >= (moment('12:00', 'HH:mm')))) duration = '12h - 18h';
                            else duration = '18h - 24h';
                            if (!uniqueStartTime.includes(duration)) {
                                uniqueStartTime.push(duration);
                                id_time ++;
                                return {
                                    id_time: id_time,
                                    startTime: duration
                                };
                            }
                        })
                    ).then(res => res.filter(item => item)); 

                    return resolve({
                        historyList: history,
                        provincesStartList: startProvinces,
                        provincesEndList: endProvinces,
                        timeList: startTime
                    });
                }
            });
        });
    }

    async fillIn3(idItemSearch) {
        return new Promise((resolve, reject) => {
            var query = `SELECT * FROM accounts 
                                INNER JOIN inforcustomer ON accounts.idUser = inforcustomer.idCustomer
                                INNER JOIN tickets ON inforcustomer.idCustomer = tickets.idUser
                                INNER JOIN seats ON seats.idSeat = tickets.idSeat
                                INNER JOIN schedules ON tickets.idSchedule = schedules.idSchedule
                                INNER JOIN directedroutes ON directedroutes.iddirectedroutes = schedules.idDirectedRoute
                                INNER JOIN routes ON routes.idRoute = directedroutes.idRoute
                                INNER JOIN provinces as startProvince ON startProvince.idProvince = directedroutes.idStartProvince
                                INNER JOIN provinces as endProvince ON endProvince.idProvince = directedroutes.idEndProvince
                                INNER JOIN stations as startStation ON startStation.idStation = schedules.idStartStation
                                INNER JOIN stations as endStation ON endStation.idStation = schedules.idEndStation
                                WHERE accounts.userName = ? AND idEndProvince = ?
                                ORDER BY schedules.startTime DESC`;
            db.query(query, [this.userName, idItemSearch], async (err, results) => {
                if (err) {
                    return reject(err);
                }
                if (results.length === 0) {
                    console.log("hi")
                    return reject(err);
                }
                else {
                    console.log(results)
                    const history = await Promise.all(results.map(async historyItem => {
                        const startStation = await this.getStation(historyItem.idStartStation);
                        const endStation = await this.getStation(historyItem.idEndStation)

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
                            distance: historyItem.distance,
                            hour: historyItem.hours,
                            nameSeat: historyItem.nameSeat,
                            Totalprice: parseInt(historyItem.price).toLocaleString('vi-VN', { minimumFractionDigits: 0 })
                        }
                    }));

                    const uniqueStartProvinces = [];
                    const startProvinces = await Promise.all(
                        results.map(async provinceItem => {
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
                    const endProvinces = await Promise.all(
                        results.map(async provinceItem => {
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


                    const uniqueStartTime = [];
                    let id_time = 0;

                    const startTime = await Promise.all(
                        results.map(async timeItem => {
                            var timeStart = new MyDate(timeItem.startTime.toString());
                            console.log((moment('06:00', 'HH:mm')))
                            var duration;
                            if((moment(timeStart.toLocaleTimeString(), 'HH:mm').valueOf() < (moment('06:00', 'HH:mm'))) && (moment(timeStart.toLocaleTimeString(), 'HH:mm').valueOf() >= (moment('00:00', 'HH:mm')))) duration = '0h - 6h';
                            else if((moment(timeStart.toLocaleTimeString(), 'HH:mm').valueOf() < (moment('12:00', 'HH:mm'))) && (moment(timeStart.toLocaleTimeString(), 'HH:mm').valueOf() >= (moment('06:00', 'HH:mm')))) duration = '6h - 12h';
                            else if((moment(timeStart.toLocaleTimeString(), 'HH:mm').valueOf() < (moment('18:00', 'HH:mm'))) && (moment(timeStart.toLocaleTimeString(), 'HH:mm').valueOf() >= (moment('12:00', 'HH:mm')))) duration = '12h - 18h';
                            else duration = '18h - 24h';
                            if (!uniqueStartTime.includes(duration)) {
                                uniqueStartTime.push(duration);
                                id_time ++;
                                return {
                                    id_time: id_time,
                                    startTime: duration
                                };
                            }
                        })
                    ).then(res => res.filter(item => item)); 

                    return resolve({
                        historyList: history,
                        provincesStartList: startProvinces,
                        provincesEndList: endProvinces,
                        timeList: startTime
                    });
                }
            });
        });
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
                // console.log(results[0])
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
