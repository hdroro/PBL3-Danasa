const sales = require('../models/Sales');

class DetailSalesMonthController {

    // [GET] /home
    async index(req, res) {
        const salesModel = new sales();
        const obj = {
            title: 'Chi tiết thống kê doanh số theo tháng',
            newsListSales: await salesModel.listSales_month_arranged()
        }
        res.render('admin-CT-TKDS-thang', obj);
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

module.exports = new DetailSalesMonthController;
