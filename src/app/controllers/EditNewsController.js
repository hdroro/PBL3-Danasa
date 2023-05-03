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
        const { idNews, titleNews, contentNews } = req.body;
        const oldImage = req.body.oldImage;
        let newImage = null; // Khởi tạo giá trị ban đầu là null
        
        upload(req, res, async function (err) {
            if (req.file) {
                console.log(1);
                newImage = req.file.filename; // Gán giá trị nếu có file được tải lên
            }
            else if(req.body.image != ''){
                newImage = req.body.image;
            }
            
            try {
                if (newImage !== null) { // Kiểm tra nếu có file mới thì tạo mới đối tượng news
                    const news_edit = new news(idNews, titleNews, contentNews, newImage);
                    console.log(news_edit);
                    await news_edit.editNews();
                }
                else { // Ngược lại thì chỉnh sửa tin tức mà không thay đổi ảnh
                    const news_edit = new news(idNews, titleNews, contentNews, oldImage);
                    console.log(news_edit);
                    await news_edit.editNews();
                }

                res.redirect('/admin/list-news')
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}

module.exports = new EditNewsController;
