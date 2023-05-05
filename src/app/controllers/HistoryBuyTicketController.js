const historybuyticket = require('../models/HistoryBuyTicket');
const MyDate = require('../models/Date');

class HistoryBuyTicketController {

    // [GET] /buy-ticket-step2
    async index(req, res) {
        const passedVariable = req.session.nameCustomer;
        const userName = req.session.userName;
        const page = parseInt(req.query.page) || 1;
        const perPage = 5;
        const start = (page - 1) * perPage;
        const end = page * perPage;
        const prev = page === 1 ? false : page - 1;
        try {
            const historyModel = new historybuyticket(userName);
            const historyData = await historyModel.fillIn();
            const lastPage = Math.ceil(historyData.historyList.length / perPage);
            const next = page === lastPage ? false : page + 1;
            if (passedVariable != null) {
                const obj = {
                    title: 'Lịch sử đặt vé xe',
                    infoLogin: passedVariable,
                    historyList: Array.from(historyData.historyList).slice(start, end),
                    listStartProvince: historyData.provincesStartList,
                    listEndProvince: historyData.provincesEndList,
                    current: page,
                    prev: prev,
                    next: next
                }
                res.render('historybuyticket', obj);
            }
        }
        catch (err) {
            res.render('historybuyticket', {
                title: 'Lịch sử đặt vé',
                infoLogin: passedVariable,
                message: 'Bạn chưa đặt vé nào!',
            });
        }
    }

    async loadDataSearchByStartProvince(req, res) {
        const passedVariable = req.session.nameCustomer;
        const userName = req.session.userName;
        var sortData = req.query.sortData;
        const page = parseInt(req.query.page) || 1;
        const perPage = 5;
        const start = (page - 1) * perPage;
        const end = page * perPage;
        const prev = page === 1 ? false : page - 1;
        try {
            const historyModel = new historybuyticket(userName);
            const historyData = await historyModel.fillIn2(parseInt(sortData));
            const lastPage = Math.ceil(historyData.historyList.length / perPage);
            const next = page === lastPage ? false : page + 1;
            console.log(lastPage)
            if (passedVariable != null) {
                const obj = {
                    title: 'Lịch sử đặt vé xe',
                    infoLogin: passedVariable,
                    historyList: Array.from(historyData.historyList).slice(start, end),
                    listStartProvince: historyData.provincesStartList,
                    listEndProvince: historyData.provincesEndList,
                    current: page,
                    prev: prev,
                    next: next
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

    async loadDataSearchByEndProvince(req, res) {
        const passedVariable = req.session.nameCustomer;
        const userName = req.session.userName;
        var sortData = req.query.sortData;
        const page = parseInt(req.query.page) || 1;
        const perPage = 5;
        const start = (page - 1) * perPage;
        const end = page * perPage;
        const prev = page === 1 ? false : page - 1;
        try {
            const historyModel = new historybuyticket(userName);
            const historyData = await historyModel.fillIn3(parseInt(sortData));
            const lastPage = Math.ceil(historyData.historyList.length / perPage);
            const next = page === lastPage ? false : page + 1;
            console.log(lastPage)
            if (passedVariable != null) {
                const obj = {
                    title: 'Lịch sử đặt vé xe',
                    infoLogin: passedVariable,
                    historyList: Array.from(historyData.historyList).slice(start, end),
                    listStartProvince: historyData.provincesStartList,
                    listEndProvince: historyData.provincesEndList,
                    current: page,
                    prev: prev,
                    next: next
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