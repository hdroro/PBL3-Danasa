const statistics = require('../models/Statistics');
class DetailStaticsMonthController {

    async index(req, res) {
        try{
            const page = parseInt(req.query.page) || 1;
            const perPage = 5;
            const start = (page - 1) * perPage;
            const end = page * perPage;
            const statisticModel = new statistics();
            const listStatistics = await statisticModel.listStatistics_month_arranged();
            const prev = page === 1 ? false : page - 1;
            const lastPage = Math.ceil(listStatistics.length / perPage);
            const next = page === lastPage ? false : page + 1;
            const obj = {
                title: 'Chi tiết thống kê doanh thu theo tháng',
                newsListStatistics: Array.from(listStatistics).slice(start, end),
                current: page,
                next: next,
                prev: prev
            };
            res.render('admin-CT-TKDT-thang', obj);
        }
        catch(err){
            res.render('admin-CT-TKDT-thang',{
                title: 'Chi tiết thống kê doanh thu theo tháng'
            });
        }
    }

    async loadData(req, res) {
        try {
            const statisticsModel = new statistics();
            var sortData = req.query.sortData;
            var obj;
            if (sortData === "1") {
                obj = {
                    title: 'Chi tiết thống kê doanh thu theo tháng',
                    newsListStatistics: await statisticsModel.listStatistics_month_arranged(sortData)
                }
            }
            else {
                obj = {
                    title: 'Chi tiết thống kê doanh thu theo tháng',
                    newsListStatistics: await statisticsModel.listStatistics_month_arrangedASC(sortData)
                }
            }
            console.log(obj)
            res.render('template-detailMonthStatistics', obj);
        }
        catch (err) {
            res.render('template-detailMonthStatistics', {
                title: 'Chi tiết thống kê doanh thu theo tháng'
            });
        }
    }

}

module.exports = new DetailStaticsMonthController;
