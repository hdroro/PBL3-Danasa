class ChangePasswordController{

    // [GET] /change-password
    index(req, res){
        // const obj = {
        //     infoLogin: 'Đăng nhập', 
        // }
        // res.render('changepassword', obj);
        const passedVariable = req.session.userName;
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

    //[GET]/buy-ticket-step2/:slug
    show(req, res){
        res.send('Detail');
    }
}

module.exports = new ChangePasswordController;
