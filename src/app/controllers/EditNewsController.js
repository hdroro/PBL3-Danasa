const news = require('../models/News');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/img')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage }).single('image');

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
        upload(req, res, async function (err) {
            const { idNews, titleNews, contentNews } = req.body;
            const oldImage = req.body.oldImage;
            let newImage = null;
            if (req.file) {
                newImage = req.file.filename;
            }
            else {
                newImage = oldImage;
            }
            const news_edit = new news(idNews, titleNews, contentNews, newImage);
            console.log(news_edit);
            await news_edit.editNews();
            res.redirect('/admin/list-news')

        });
    }
}

module.exports = new EditNewsController;
