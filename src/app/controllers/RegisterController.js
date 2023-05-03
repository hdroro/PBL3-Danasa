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
            const infoCus = new customer();
            await infoCus.checkPhonenumber(phonenumber);
        }
        catch(err) {
            res.render('register', {
                title: 'Đăng ký',
                infoLogin: "Đăng nhập",
                message: "Số điện thoại đã tồn tại",
            });
            return;
        }

        try {
            const account = new Account(username, password);
            const saveAcc = await account.save();

            const inforCustomer = new customer(saveAcc, phonenumber, fullname, email);
            const saveCus = await inforCustomer.save()

            req.session.userName = req.body.fullname;
            res.redirect('back');
        } catch (err) {
            res.render('register', {
                title: 'Đăng ký',
                infoLogin: "Đăng nhập",
                message: "Tên tài khoản đã tồn tại",
            });
        }
    }
}

module.exports = new RegisterController;