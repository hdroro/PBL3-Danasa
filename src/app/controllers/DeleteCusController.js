const account = require('../models/Account');
const customer = require('../models/InforCustomer');
class DeleteCusController {

    // [GET] /home
    index(req, res) {
        res.render('admin-xoaTK', {title: 'Xóa tài khoản'});
        // else {
        //     const obj = {
        //         infoLogin: 'Đăng nhập', 
        //     }
        //     res.render('home', obj);
        // }
    }

    // [GET] /delete-cus/:id
    async indexDetail(req, res) {
        try {
            const idCus = req.params.id;
            const cus = new customer();
            const infoCus = await cus.getInfoByIdCustomer(idCus);
            res.render('admin-xoaTK', {
                username: infoCus.userName,
                name: infoCus.name,
                phonenumber: infoCus.phoneNumber,
                email: infoCus.email,
                title: 'Xóa tài khoản'
            });
        }
        catch(err) {
            console.log(err);
        }
    }

    deleteCus(req, res) {

    }

    // [GET] /delete-cus/search/:slug
    async loadData(req, res) {
        try {
            const phoneNumber = req.body.phonenumber;
            const cus = new customer();
            const infocus = await cus.getInfoByPhoneNumber(phoneNumber);
            res.render('admin-xoaTK', {
                username: infocus.userName,
                name: infocus.name,
                phonenumber: infocus.phoneNumber,
                email: infocus.email,
                title: 'Xóa tài khoản'
            });
        }
        catch(err) {
            // console.log("Lỗi server");
            res.render('admin-xoaTK', {
                title: 'Xóa tài khoản',
                message: 'Không tồn tại tài khoản!',
                titletoast: "Warning",
                statusMessage: "Oops...Có lỗi xảy ra!",
                icon: "fa-exclamation-circle",
                type: "toast--warning"
            })
        }
    }

    async delete(req, res) {
        try {
            const phonenumber = req.body.phonenumber;
            const cus = new customer();
            const infocus = await cus.getInfoByPhoneNumber(phonenumber);
            const username = infocus.userName;
            const acc = new account();
            // await cus.deleteInfo(phonenumber);
            await acc.deleteAccount(username);
            req.flash('success', 'Xóa thành công!');
            res.redirect('/admin/list-cus');
        }
        catch(err) {
            res.json({
                messageError: "lỗi",
            })
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

module.exports = new DeleteCusController;
