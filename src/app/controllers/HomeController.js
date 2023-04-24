const account = require('../models/Account');
const {mutipleMongooseToObject} = require('../../util/mongoose')
class HomeController {

    // [GET] /home
    index(req, res) {
        const passedVariable = req.session.nameCustomer;
        if(passedVariable != null) {
            const obj = {
                title: 'Trang chủ',
                infoLogin: passedVariable, 
            }
            res.render('home', obj);
        } else {
            const obj = {
                title: 'Trang chủ',
                infoLogin: 'Đăng nhập', 
            }
            res.render('home', obj);
        }
    }

    //[GET]/course/:slug
    show(req, res) {
        Login.findOne();
    }

}

module.exports = new HomeController;