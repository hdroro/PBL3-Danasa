const news = require('../models/News');
class DeleteNewsController {

    // [GET] /home
    index(req, res) {
        try{
            const obj = {
                title: 'Xóa tin tức',
                idNews: req.query.idNews,
                titleNews: req.query.titleNews,
                contentNews: req.query.contentNews,
                urlImg: req.query.urlImg,
            }
            res.render('admin-xoaTT', obj);
        }
        catch(err){
            res.json(err)
        }
    }

    //[GET]/updateinfo/:slug
    async delete(req, res) {
        try {
            const { idNews, titleNews, contentNews, urlImg } = req.query;
            const news_delete = new news(idNews, titleNews, contentNews, urlImg);
            await news_delete.deleteNews();

            res.redirect('/admin/list-news')

        }
        catch(err){
            console.log(err);
        }
    }
}

module.exports = new DeleteNewsController;
