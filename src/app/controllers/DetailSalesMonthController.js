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

    async loadData(req, res){
        try {
            const salesModel = new sales();
            var sortData = req.query.sortData;
            var obj;
            if (sortData === "1") {
                obj = {
                    // title: 'Chi tiết thống kê doanh thu theo quý',
                    newsListSales: await salesModel.listSales_month_arranged(sortData)
                }
            }
            else {
                obj = {
                    // title: 'Chi tiết thống kê doanh thu theo quý',
                    newsListSales: await salesModel.listSales_month_arrangedASC(sortData)
                }
            }
            res.render('template-detailMonthSales', obj);
        }
        catch (err) {
            res.render('template-detailMonthSales');
        }
    }
}

module.exports = new DetailSalesMonthController;
