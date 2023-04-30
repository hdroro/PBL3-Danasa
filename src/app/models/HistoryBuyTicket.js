const db = require('../../config/db');
const MyDate = require('../models/Date');


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
                                                INNER JOIN routes ON routes.idRoute = directedroutes.iddirectedroutes
                                                INNER JOIN provinces as startProvince ON startProvince.idProvince = directedroutes.idStartProvince
                                                INNER JOIN provinces as endProvince ON endProvince.idProvince = directedroutes.idEndProvince
                                                INNER JOIN stations as startStation ON startStation.idStation = schedules.idStartStation
                                                INNER JOIN stations as endStation ON endStation.idStation = schedules.idEndStation
                                                WHERE accounts.userName = ?`;
             db.query(query, [this.userName], async (err, results) => {
                if (err) {
                    return reject(err);
                }
                else {
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
                    return resolve(history);
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
                console.log(results[0])
                return resolve(results[0]);
            });
        });
    }
}

module.exports = HistoryBuyTicket
