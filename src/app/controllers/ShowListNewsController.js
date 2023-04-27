const news = require('../models/News');

class ShowListNewsController {

    // [GET] /home
    async index(req, res) {
        const newsModel = new news();
        const obj = {
            title: 'Xem tin tức',
            newsList: await newsModel.loadNews()
        };
        res.render('admin-xemTT', obj);
    }

    //[GET]/updateinfo/:slug
    async show(req, res) {
        const idNews = req.params.idNews;
        const new_s = new news(idNews);
        const newss = await new_s.searchNews();

        res.redirect('/admin/delete-news?idNews=' + newss.idNews + '&titleNews=' + newss.titleNews + '&contentNews=' + newss.contentNews + '&urlImg=' + newss.urlImg )
    }

    async show_del(req, res){
        const idNews = req.params.idNews;
        const new_s = new news(idNews);
        const newss = await new_s.searchNews();

        res.redirect('/admin/edit-news?idNews=' + newss.idNews + '&titleNews=' + newss.titleNews + '&contentNews=' + newss.contentNews + '&urlImg=' + newss.urlImg )
    }
    
}

module.exports = new ShowListNewsController;
