const Account = require('../models/Account');
const customer = require('../models/InforCustomer');
class RegisterController {

    // [GET] /home
    index(req, res) {
        const obj = {
            title: 'Đăng ký',
            infoLogin: 'Đăng nhập', 
        }
        res.render('register', obj);
    }

    //[GET]/course/:slug
    show(req, res) {
        Login.findOne();
    }

    //[POST] /course/success
    async checkUser(req,res,next){
        const { username, password, phonenumber, fullname, email } = req.body;
        try {
            const account = new Account(username, password);
            const saveAcc = await account.save();

            const inforCustomer = new customer(saveAcc, phonenumber, fullname, email);
            const saveCus = await inforCustomer.save();

            req.session.userName = req.body.fullname;
            res.redirect('/');
        } catch (err) {
            res.render('register', {
                title: 'Đăng ký',
                infoLogin: "Đăng nhập",
                message: "Tài khoản đã tồn tại"
            });
        }
    }
}

module.exports = new RegisterController;
