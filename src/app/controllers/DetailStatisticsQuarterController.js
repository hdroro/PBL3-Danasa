const statistics = require('../models/Statistics');
class DetailStaticsQuarterController {
    
    // [GET] /home
    async index(req, res) {
        const statisticModel = new statistics();
        const obj = {
            title: 'Chi tiết thống kê doanh thu theo quý',
            newsListStatistics: await statisticModel.listStatistics_quarter_arranged()
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
