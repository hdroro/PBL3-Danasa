const news = require('../models/News');

class NewsController {

    // [GET] /news
    async index(req, res) {
        try {
            const passedVariable = req.session.nameCustomer;

            if (passedVariable != null) {

                const page = parseInt(req.query.page) || 1;
                const perPage = 5;
                const start = (page - 1) * perPage;
                const end = page * perPage;
                const newsModel = new news();
                const listNews = await newsModel.loadNews();
                const prev = page === 1 ? 1 : page - 1;
                const lastPage = Math.ceil(listNews.length / perPage);
                const next = page === lastPage ? lastPage : page + 1;

                const obj = {
                    title: 'Tin tức',
                    infoLogin: passedVariable,
                    newsList: Array.from(listNews).slice(start, end),
                    current: page,
                    next: next,
                    prev: prev
                };
                res.render('news', obj);
            }
            else {
                const page = parseInt(req.query.page) || 1;
                const perPage = 5;
                const start = (page - 1) * perPage;
                const end = page * perPage;
                const newsModel = new news();
                const listNews = await newsModel.loadNews();
                const prev = page === 1 ? 1 : page - 1;
                const lastPage = Math.ceil(listNews.length / perPage);
                const next = page === lastPage ? lastPage : page + 1;

                const obj = {
                    title: 'Tin tức',
                    infoLogin: 'Đăng nhập',
                    newsList: Array.from(listNews).slice(start, end),
                    current: page,
                    next: next,
                    prev: prev
                };
                res.render('news', obj);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    //[GET]/news/:slug
    show(req, res) {
        res.send('Detail');
    }
}

module.exports = new NewsController;