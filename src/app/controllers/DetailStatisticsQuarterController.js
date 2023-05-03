const statistics = require('../models/Statistics');
class DetailStaticsQuarterController {
    
    // [GET] /home
    async index(req, res) {
        const page = parseInt(req.query.page) || 1;
            const perPage = 5;
            const start = (page - 1) * perPage;
            const end = page * perPage;
            const statisticModel = new statistics();
            const listStatistics = await statisticModel.listStatistics_quarter_arranged();
            const prev = page === 1 ? 1 : page - 1;
            const lastPage = Math.ceil(listStatistics.length / perPage);
            const next = page === lastPage ? lastPage : page + 1;
            const obj = {
                title: 'Chi tiết thống kê doanh thu theo quý',
                newsListStatistics: Array.from(listStatistics).slice(start, end),
                current: page,
                next: next,
                prev: prev
            };
        res.render('admin-CT-TKDT-quy', obj);
    }

    async loadData(req, res){
        try {
            const statisticsModel = new statistics();
            var sortData = req.query.sortData;
            console.log(sortData)
            var obj;
            if (sortData === "1") {
                obj = {
                    // title: 'Chi tiết thống kê doanh thu theo quý',
                    newsListStatistics: await statisticsModel.listStatistics_quarter_arranged(sortData)
                }
            }
            else {
                obj = {
                    // title: 'Chi tiết thống kê doanh thu theo quý',
                    newsListStatistics: await statisticsModel.listStatistics_quarter_arrangedASC(sortData)
                }
            }
            console.log(obj)
            res.render('template-detailQuarterStatistics', obj);
        }
        catch (err) {
            res.render('template-detailQuarterStatistics');
        }
    }
}

module.exports = new DetailStaticsQuarterController;
