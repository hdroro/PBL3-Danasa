const news = require('../models/News');

class NewsController {

    // [GET] /news
    async index(req, res) {
        const passedVariable = req.session.nameCustomer;
        if (passedVariable != null) {
            const obj = {
                title: 'Tin tức',
                infoLogin: passedVariable
            };
            const newsModel = new news();
            obj.newsList = await newsModel.loadNews();
            res.render('news', obj);
        }
        else {
            const obj = {
                title: 'Tin tức',
                infoLogin: 'Đăng nhập'
            };
            const newsModel = new news();
            obj.newsList = await newsModel.loadNews();
            res.render('news', obj);
        }
    }
    //[GET]/news/:slug
    show(req, res) {
        res.send('Detail');
    }
}

module.exports = new NewsController;