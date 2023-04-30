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
                const historyModel = new historybuyticket(userName);
                const obj = {
                    title: 'Lịch sử đặt vé xe',
                    infoLogin: passedVariable,
                    historyList: await historyModel.fillIn()
                    
                }
                console.log(obj)
                res.render('historybuyticket', obj);
            }
        }
        catch (err) {
            res.render('historybuyticket', {
                title: 'Lịch sử đặt vé',
                infoLogin: passedVariable,
                message: 'Bạn chưa đặt vé nào!'
            });
        }
    }

    //[GET]/buy-ticket-step2/:slug
    show(req, res) {
        res.send('Detail');
    }
}

module.exports = new HistoryBuyTicketController;