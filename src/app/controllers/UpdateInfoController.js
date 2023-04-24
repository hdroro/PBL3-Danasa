const customer = require('../models/InforCustomer');
const account = require('../models/Account');

class LoginController {

    // [GET] /home
    async index(req, res) {
        const passedVariable = req.session.userName;
        if (passedVariable != null) {
            const username = new account(passedVariable);
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
            const passedVariable = req.session.userName;
            const customer_1 = new customer(0, "", passedVariable, "");
            const idCus = await customer_1.search(); 

            const { name, email, sdt } = req.body;
            const customerInfo = new customer(idCus, sdt, name, email);
            await customerInfo.update({idCus, sdt, name, email });
            req.session.userName = name;
            res.redirect('/updateinfo');
        } catch (err) {
            console.error(err);
            res.send('Lỗi server');
        }
    }
}

module.exports = new LoginController;
