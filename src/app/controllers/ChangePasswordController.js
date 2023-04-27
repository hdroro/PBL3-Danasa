const account = require('../models/Account');

class ChangePasswordController{

    // [GET] /change-password
    index(req, res){
        // const obj = {
        //     infoLogin: 'Đăng nhập', 
        // }
        // res.render('changepassword', obj);
        const passedVariable = req.session.nameCustomer;
        if(passedVariable != null) {
            const obj = {
                title: 'Thay đổi mật khẩu',
                infoLogin: passedVariable, 
            }
            res.render('changepassword', obj);
        } 
        // else {
        //     const obj = {
        //         infoLogin: 'Đăng nhập', 
        //     }
        //     res.render('home', obj);
        // }
    }

    //[POST] /change-password
    async update(req, res){
        // res.send('Detail');
        const passedVariable = req.session.nameCustomer;
        try {
            const info = req.body;
            if(info) {
                const username = req.session.userName;
                const ac = new account(username);
                const tmp = await ac.checkPassword(info.old);
                await ac.updatePassword(info.new);
                res.render('changepassword', {
                    message: "Cập nhật mật khẩu thành công!",
                    infoLogin: passedVariable, 
                    title: 'Thay đổi mật khẩu',
                })
            }
        } catch(err) {
            res.render('changepassword', {
                message: "Mật khẩu cũ không chính xác!",
                infoLogin: passedVariable, 
                title: 'Thay đổi mật khẩu',
            })
        }
    }
}

module.exports = new ChangePasswordController;