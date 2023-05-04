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
                const historyData = await historyModel.fillIn();
                const obj = {
                    title: 'Lịch sử đặt vé xe',
                    infoLogin: passedVariable,
                    historyList: historyData.historyList,
                    listStartProvince: historyData.provincesStartList,
                    listEndProvince: historyData.provincesEndList,
                    listTimeStart: historyData.timeList
                }
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

    async loadDataSearchByStartProvince(req, res){
        const passedVariable = req.session.nameCustomer;
        const userName = req.session.userName;
        var sortData = req.query.sortData;
        try {
            if (passedVariable != null) {
                const user = new historybuyticket(userName);
                const historyModel = new historybuyticket(userName);
                const historyData = await historyModel.fillIn2(parseInt(sortData));
                const obj = {
                    title: 'Lịch sử đặt vé xe',
                    infoLogin: passedVariable,
                    historyList: historyData.historyList,
                    listStartProvince: historyData.provincesStartList,
                    listEndProvince: historyData.provincesEndList,
                    listTimeStart: historyData.timeList
                }
                res.render('template-history-search-startProvince', obj);
            }
        }
        catch (err) {
            res.render('template-history-search-startProvince', {
                title: 'Lịch sử đặt vé',
                infoLogin: passedVariable,
                message: 'Bạn chưa đặt vé nào!'
            });
        }
    }

    async loadDataSearchByEndProvince(req, res){
        const passedVariable = req.session.nameCustomer;
        const userName = req.session.userName;
        var sortData = req.query.sortData;
        try {
            if (passedVariable != null) {
                const user = new historybuyticket(userName);
                const historyModel = new historybuyticket(userName);
                const historyData = await historyModel.fillIn3(parseInt(sortData));
                const obj = {
                    title: 'Lịch sử đặt vé xe',
                    infoLogin: passedVariable,
                    historyList: historyData.historyList,
                    listStartProvince: historyData.provincesStartList,
                    listEndProvince: historyData.provincesEndList,
                    listTimeStart: historyData.timeList
                }
                res.render('template-history-search-startProvince', obj);
            }
        }
        catch (err) {
            res.render('template-history-search-startProvince', {
                title: 'Lịch sử đặt vé',
                infoLogin: passedVariable,
                message: 'Bạn chưa đặt vé nào!'
            });
        }
    }
}

module.exports = new HistoryBuyTicketController;