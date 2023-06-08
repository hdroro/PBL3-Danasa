const { render } = require('node-sass');
const Account = require('../models/Account');


class LoginController {

    // [GET] /home
    index(req, res) {
        if (!req.session.userName) {
            const obj = {
                title: 'Đăng nhập',
                infoLogin: "Đăng nhập"

            }
            res.render('login', obj);
        } else {
            req.session.destroy();
            const obj = {
                title: 'Đăng nhập',
                infoLogin: "Đăng nhập"

            }
            res.render('login', obj);
        }
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
            await account.checkUsername();
        }
        catch (err) {
            res.render('login', {
                title: 'Đăng nhập',
                infoLogin: "Đăng nhập",
                message: "Tài khoản không tồn tại",
                success: "Failed",
                statusMessage: "Đăng nhập không thành công!",
                icon: "fa-exclamation-circle",
                type: "toast--error"
            });
            return;
        }

        try {
            const account = new Account(userName, passWord);
            const authenticatedUser = await account.authenticate();
            req.session.userName = userName;
            if (authenticatedUser == 1) {
                const name = await account.match();
                req.session.nameCustomer = name;
                req.session.statusMessage = req.flash('success', 'Đăng nhập thành công!');
                res.redirect('/');
            }
            else {
                req.flash('success', 'Đăng nhập thành công!');
                res.redirect('/admin/statistics');
            }

        } catch (err) {
            res.render('login', {
                title: 'Đăng nhập',
                infoLogin: "Đăng nhập",
                message: "Mật khẩu không đúng",
                success: "Failed",
                statusMessage: "Đăng nhập không thành công!",
                icon: "fa-exclamation-circle",
                type: "toast--error"
            });
        }
    }
}

module.exports = new LoginController;