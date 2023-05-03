const sales = require('../models/Sales');

class DetailSalesMonthController {

    // [GET] /home
    async index(req, res) {
        const page = parseInt(req.query.page) || 1;
        const perPage = 5;
        const start = (page - 1) * perPage;
        const end = page * perPage;
        const salesModel = new sales();
        const listSales = await salesModel.listSales_month_arranged();
        const prev = page === 1 ? 1 : page - 1;
        const lastPage = Math.ceil(listSales.length / perPage);
        const next = page === lastPage ? lastPage : page + 1;
        const obj = {
            title: 'Chi tiết thống kê doanh số theo tháng',
            newsListSales: Array.from(listSales).slice(start, end),
            current: page,
            next: next,
            prev: prev
        };
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
