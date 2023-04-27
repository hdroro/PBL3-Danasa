const account = require('../models/Account');
const {mutipleMongooseToObject} = require('../../util/mongoose')
class ShowListCusController {

    // [GET] /home
    async index(req, res) {
        try {
            const ac = new account();
            const obj = {};
            const accountList = await ac.getAllAccount();
            res.render('admin-xemTK', {
                accountList: accountList,
                title: 'Xem tài khoản khách hàng',
            });
        }
        catch(err) {
            console.log(err);
        }
    }

    //[GET]/updateinfo/:slug
    show(req, res) {
        Login.findOne();
    }

    //[POST] /updateinfo/success
    checkUser(req,res,next){
        account.findOne({
            userName: req.body.userName,
            passWord: req.body.passWord,
        })
            .then((account)=>{
                if(account!==null) res.render('home');
                res.send("Tên tài khoản hoặc mật khẩu không chính xác");
            })
            .catch(err => next(err))
    }
}

module.exports = new ShowListCusController;
