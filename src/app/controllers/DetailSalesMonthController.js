const sales = require('../models/Sales');

class DetailSalesMonthController {

    // [GET] /home
    async index(req, res) {
        try {
            const page = parseInt(req.query.page) || 1;
            const perPage = 5;
            const start = (page - 1) * perPage;
            const end = page * perPage;
            const salesModel = new sales();
            const listSales = await salesModel.listSales_month_arranged();
            const prev = page === 1 ? false : page - 1;
            const lastPage = Math.ceil(listSales.length / perPage);
            const next = page === lastPage ? false : page + 1;
            const obj = {
                title: 'Chi tiết thống kê doanh số theo tháng',
                newsListSales: Array.from(listSales).slice(start, end),
                current: page,
                next: next,
                prev: prev
            };
            res.render('admin-CT-TKDS-thang', obj);
        }
        catch(err){
            res.render('admin-CT-TKDS-thang',{
                title: 'Chi tiết thống kê doanh số theo tháng'
            });
        }
    }

    async loadData(req, res) {
        try {
            var sortData = req.query.sortData;
            var obj;
            if (sortData === "1") {
                const page = parseInt(req.query.page) || 1;
                const perPage = 5;
                const start = (page - 1) * perPage;
                const end = page * perPage;
                const salesModel = new sales();
                const listSales = await salesModel.listSales_month_arranged(sortData);
                const prev = page === 1 ? false : page - 1;
                const lastPage = Math.ceil(listSales.length / perPage);
                const next = page === lastPage ? false : page + 1;
                obj = {
                    title: 'Chi tiết thống kê doanh số theo tháng',
                    newsListSales: Array.from(listSales).slice(start, end),
                    current: page,
                    next: next,
                    prev: prev
                }
            }
            else {
                const page = parseInt(req.query.page) || 1;
                const perPage = 5;
                const start = (page - 1) * perPage;
                const end = page * perPage;
                const salesModel = new sales();
                const listSales_asc = await salesModel.listSales_month_arrangedASC(sortData);
                const prev = page === 1 ? false : page - 1;
                const lastPage = Math.ceil(listSales_asc.length / perPage);
                const next = page === lastPage ? false : page + 1;
                obj = {
                    title: 'Chi tiết thống kê doanh số theo tháng',
                    newsListSales: Array.from(listSales_asc).slice(start, end),
                    current: page,
                    next: next,
                    prev: prev
                }
            }
            res.render('template-detailMonthSales', obj);
        }
        catch (err) {
            res.render('template-detailMonthSales', {
                title: 'Chi tiết thống kê doanh số theo tháng'
            });
        }
    }
}

module.exports = new DetailSalesMonthController;
