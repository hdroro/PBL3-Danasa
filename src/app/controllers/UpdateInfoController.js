const customer = require('../models/InforCustomer');
const account = require('../models/Account');

class LoginController {

    // [GET] /home
    async index(req, res) {
        const passedVariable = req.session.nameCustomer;
        if (passedVariable != null) {
            const username = new account(req.session.userName);
            const inforCustomer = await username.fillInfo();

            const obj = {
                title: 'Thông tin cá nhân',
                infoLogin: passedVariable,
                name: inforCustomer.name,
                email: inforCustomer.email,
                phoneNumber: inforCustomer.phoneNumber,
            }
            res.render('updateinfo', obj);
        }
    }

    //[GET]/updateinfo/:slug
    show(req, res) {
        Login.findOne();
    }

    //[POST] /updateinfo/success
    async update(req, res) {
        try {
            const passedVariable = req.session.nameCustomer;
            const accountUser = new account(req.session.userName);
            const idUser = await accountUser.getIdAccount();
            const idCus = idUser;

            const { name, email, sdt } = req.body;
            const customerInfo = new customer();
            const infoCus = await customerInfo.getInfoByIdCustomer(idUser);

            try {
                await customerInfo.checkExistedPhonenumber(sdt, infoCus.phoneNumber);
            }
            catch (err) {
                res.render('updateinfo', {
                    message: 'Số điện thoại đã tồn tại!',
                    title: 'Thông tin cá nhân',
                    infoLogin: passedVariable,
                    name: name,
                    email: email,
                    phoneNumber: sdt,
                    title: "Failed",
                    statusMessage: "Cập nhật không thành công!",
                    icon: "fa-exclamation-circle",
                    type: "toast--warning"
                })
                return;
            }

            try {
                await customerInfo.checkExistedEmail(email, infoCus.email);
            }
            catch (err) {
                res.render('updateinfo', {
                    message: 'Email đã tồn tại!',
                    title: 'Thông tin cá nhân',
                    infoLogin: passedVariable,
                    name: name,
                    email: email,
                    phoneNumber: sdt,
                    title: "Failed",
                    statusMessage: "Cập nhật không thành công!",
                    icon: "fa-exclamation-circle",
                    type: "toast--warning"
                })
                return;
            }

            await customerInfo.update(name, sdt, email, idCus);
            req.session.nameCustomer = name;
            res.render('updateinfo', {
                message: 'Cập nhật thành công!',
                title: 'Thông tin cá nhân',
                infoLogin: name,
                name: name,
                phoneNumber: sdt,
                email: email,
                titletoast: "Success",
                statusMessage: "Cập nhật thành công!",
                icon: "fa-check-circle",
                type: "toast--success"
            });
        } catch (err) {
            console.log(err);
            // const passedVariable = req.session.nameCustomer;
            // const username = new account(req.session.userName);
            // const inforCustomer = await username.fillInfo();
            // const { name, email, sdt } = req.body;
            // res.render('updateinfo', {
            //     message: 'Số điện thoại đã tồn tại!',
            //     title: 'Thông tin cá nhân',
            //     infoLogin: passedVariable,
            //     name: name,
            //     email: email,
            //     phoneNumber: sdt,
            // })
        }
    }
}

module.exports = new LoginController;