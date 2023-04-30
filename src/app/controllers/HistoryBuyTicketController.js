const historybuyticket = require('../models/HistoryBuyTicket');
const MyDate = require('../models/Date');

class HistoryBuyTicketController {

    // [GET] /buy-ticket-step2
    async index(req, res) {
        const passedVariable = req.session.nameCustomer;
        const userName = req.session.userName;

        try {
            if (passedVariable != null) {
                const user = new historybuyticket(userName);

                // const userBuyTicket = await user.fillIn();
                // const startStation = await user.getStation(userBuyTicket.idStartStation);
                // const endStation = await user.getStation(userBuyTicket.idEndStation)

                // var timeStart = new MyDate(userBuyTicket.startTime.toString());
                // var timeEnd = new MyDate(userBuyTicket.endTime.toString());
                // const dateParts  = timeStart.toDate().split('-');
                // const startDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
                const historyModel = new historybuyticket(userName);
                const obj = {
                    title: 'Lịch sử đặt vé xe',
                    infoLogin: passedVariable,
                    historyList: await historyModel.fillIn()
                    // startTime: timeStart.toLocaleTimeString(),
                    // endTime: timeEnd.toLocaleTimeString(),
                    // startDate: startDate,
                    // startStation: startStation.stationName,
                    // endStation: endStation.stationName,
                    // distance: userBuyTicket.distance,
                    // hour: userBuyTicket.hours,
                    // nameSeat: userBuyTicket.nameSeat,
                    // Totalprice: parseInt(userBuyTicket.price).toLocaleString('vi-VN', { minimumFractionDigits: 0 })
                }
                console.log(obj)
                res.render('historybuyticket', obj);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    //[GET]/buy-ticket-step2/:slug
    show(req, res) {
        res.send('Detail');
    }
}

module.exports = new HistoryBuyTicketController;