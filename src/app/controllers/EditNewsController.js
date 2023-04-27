const news = require('../models/News');
class EditNewsController {

    // [GET] /home
    index(req, res) {
        const obj = {
            title: 'Sửa tin tức',
            idNews: req.query.idNews,
            titleNews: req.query.titleNews,
            contentNews: req.query.contentNews,
            urlImg: req.query.urlImg,
        }
        console.log(obj)
        res.render('admin-suaTT', obj);
    }

    async edit(req, res) {
        try {
            const { idNews, titleNews, contentNews, image } = req.body;
            console.log(req.body.urlImg)
            console.log(req.body)
            const news_edit = new news(idNews, titleNews, contentNews, image);
            console.log(image)
            if(news_edit.urlImg === null){
                news_edit.urlImg = req.body.image;
            }
            console.log(news_edit)
            await news_edit.editNews();

            res.redirect('/admin/list-news')
        }
        catch(err){
            console.log(err);
        }
    }
    
}

module.exports = new EditNewsController;
