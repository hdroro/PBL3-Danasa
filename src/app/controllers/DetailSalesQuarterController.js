const sales = require('../models/Sales');

class DetailSalesQuarterController {

    // [GET] /home
    async index(req, res) {
        const salesModel = new sales();
        const obj = {
            title: 'Chi tiết thống kê doanh số theo quý',
            newsListSales: await salesModel.listSales_quarter_arranged()
        }
        res.render('admin-CT-TKDS-quy', obj);
    }

    async loadData(req, res){
        try {
            const salesModel = new sales();
            var sortData = req.query.sortData;
            console.log(sortData)
            var obj;
            if (sortData === "1") {
                obj = {
                    // title: 'Chi tiết thống kê doanh thu theo quý',
                    newsListSales: await salesModel.listSales_quarter_arranged(sortData)
                }
            }
            else {
                obj = {
                    // title: 'Chi tiết thống kê doanh thu theo quý',
                    newsListSales: await salesModel.listSales_quarter_arrangedASC(sortData)
                }
            }
            console.log(obj)
            res.render('template-detailQuarterSales', obj);
        }
        catch (err) {
            res.render('template-detailQuarterSales');
        }
    }
}

module.exports = new DetailSalesQuarterController;
