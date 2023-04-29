const statistics = require('../models/Statistics');
class DetailStaticsMonthController {
    
    // [GET] /home
    async index(req, res) {
        const statisticModel = new statistics();
        const obj = {
            title: 'Chi tiết thống kê doanh thu theo tháng',
            newsListStatistics: await statisticModel.listStatistics_month_arranged()
        };
        res.render('admin-CT-TKDT-thang', obj);
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

module.exports = new DetailStaticsMonthController;
