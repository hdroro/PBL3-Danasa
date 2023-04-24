const account = require('../models/Account');
const {mutipleMongooseToObject} = require('../../util/mongoose')
class ShowListCusController {

    // [GET] /home
    index(req, res) {
        res.render('admin-xemTK', {title: 'Xem tài khoản khách hàng'});
        // else {
        //     const obj = {
        //         infoLogin: 'Đăng nhập', 
        //     }
        //     res.render('home', obj);
        // }
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
