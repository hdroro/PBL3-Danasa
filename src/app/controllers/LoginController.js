const { render } = require('node-sass');
const Account = require('../models/Account');


class LoginController {

    // [GET] /home
    index(req, res) {
        const obj = {
            title: 'Đăng nhập',
            infoLogin: "Đăng nhập"
            
        }
        res.render('login', obj);
    }

    //[GET]/course/:slug
    show(req, res) {
        req.session.destroy();
        res.redirect('/');
    }

    //[POST] /course/success
    async checkUser(req, res, next) {
        const { userName, passWord } = req.body;
        try {
            const account = new Account(userName, passWord);
            const authenticatedUser = await account.authenticate();
            
            if(authenticatedUser == 1){
                const name = await account.match();
                req.session.userName = name;
                res.redirect('/');
            }
            else res.redirect('/admin/statistics');
            
        } catch (err) {
            res.render('login', {
                title: 'Đăng nhập',
                infoLogin: "Đăng nhập",
                message: "Mật khẩu không đúng"
            });
        }
    }
}

module.exports = new LoginController;
