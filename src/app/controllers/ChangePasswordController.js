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
        const info = req.body;
        if(info.old === info.new) {
            res.render('changepassword', {
                message: "Mật khẩu mới trùng mật khẩu cũ!",
                infoLogin: passedVariable, 
                title: 'Thay đổi mật khẩu',
            })
            return;
        }

        try {
            
            // if(info) {
                const username = req.session.userName;
                const ac = new account(username);
                const tmp = await ac.checkPassword(info.old);
                await ac.updatePassword(info.new);
                res.render('changepassword', {
                    message: "Cập nhật mật khẩu thành công!",
                    infoLogin: passedVariable, 
                    title: 'Thay đổi mật khẩu',
                })
            // }
        } catch(err) {
            console.log(err);
            res.render('changepassword', {
                message: "Mật khẩu cũ không chính xác!",
                infoLogin: passedVariable, 
                title: 'Thay đổi mật khẩu',
            })
        }
    }
}

module.exports = new ChangePasswordController;