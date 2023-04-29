const sales = require('../models/Sales');
class SalesController {

    // [GET] /home
    async index(req, res) {
        const doanhso = new sales();
        const totalSalesYear = await doanhso.totalSales_year();
        const curYear = parseInt(totalSalesYear);
        const totalSalesYear_Previous = await doanhso.totalSales_yearPrevious();
        const prevYear = parseInt(totalSalesYear_Previous);
        var trendIcon_updown_year;
        if(await (curYear - prevYear )/(prevYear) < 0){
            trendIcon_updown_year = 'fa-caret-down'
        }
        else{
            trendIcon_updown_year = 'fa-caret-up'
        }

        const totalSalesQuarter = await doanhso.totalSales_quarter();
        const curQuarter = parseInt(totalSalesQuarter)
        const totalSalesQuarter_Previous = await doanhso.totalSales_quarterPrevious();
        const prevQuarter = parseInt(totalSalesQuarter_Previous);
        var trendIcon_updown_quarter;
        if(await (curQuarter - prevQuarter )/(prevQuarter) < 0){
            trendIcon_updown_quarter = 'fa-caret-down'
        }
        else{
            trendIcon_updown_quarter = 'fa-caret-up'
        }

        const totalSalesMonth = await doanhso.totalSales_quarter();
        const curMonth = parseInt(totalSalesMonth)
        const totalSalesMonth_Previous = await doanhso.totalSales_quarterPrevious();
        const prevMonth = parseInt(totalSalesMonth_Previous);
        var trendIcon_updown_month;
        if( await (curMonth - prevMonth )/(prevMonth) < 0){
            trendIcon_updown_month = 'fa-caret-down'
        }
        else{
            trendIcon_updown_month = 'fa-caret-up'
        }

        const arrange_quarter = await doanhso.totalSales_quarter_arranged();
        const arrange_month = await doanhso.totalSales_month_arranged();
        const obj = {
            title: 'Thống kê doanh số',
            total: await doanhso.totalSales(),

            total_year: await doanhso.totalSales_year(),
            salesRate_year: Math.abs(await (curYear - prevYear )/(prevYear)).toFixed(2),
            trendIcon_year: trendIcon_updown_year,

            total_quarter: await doanhso.totalSales_quarter(),
            salesRate_quarter: Math.abs(await (curQuarter - prevQuarter )/(prevQuarter)).toFixed(2),
            trendIcon_quarter: trendIcon_updown_quarter,

            total_month:  await doanhso.totalSales_month(),
            salesRate_month: await Math.abs((curMonth - prevMonth )/(prevMonth)).toFixed(2),
            trendIcon_month: trendIcon_updown_month,
            
            firstProvince:  arrange_quarter.firstProvince,
            secondProvince:  arrange_quarter.secondProvince,
            totalTicket: (parseInt(arrange_quarter.totalTicket)).toLocaleString(),

            firstProvince_month: arrange_month.firstProvince,
            secondProvince_month: arrange_month.secondProvince,
            totalTicket_month: (parseInt(arrange_month.totalTicket)).toLocaleString(),
        }
        res.render('admin-TKDS', obj);
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

module.exports = new SalesController;
