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
        res.render('admin-suaTT', obj);
    }

    async edit(req, res) {
        const { idNews, titleNews, contentNews } = req.body;
        const oldImage = req.body.oldImage;
        let newImage = oldImage;
        if (req.body.image != '') {
            newImage = req.body.image;
        }
        try {
            const news_edit = new news(idNews, titleNews, contentNews, newImage);
            console.log(news_edit)
            await news_edit.editNews();

            res.redirect('/admin/list-news')
        }
        catch (err) {
            console.log(err);
        }
    }

}

module.exports = new EditNewsController;
