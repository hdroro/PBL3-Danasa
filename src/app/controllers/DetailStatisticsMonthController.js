const statistics = require('../models/Statistics');
class DetailStaticsMonthController {

    async index(req, res) {
        try{
            const statisticModel = new statistics();
            const obj = {
                title: 'Chi tiết thống kê doanh thu theo tháng',
                newsListStatistics: await statisticModel.listStatistics_month_arranged()
            };
            res.render('admin-CT-TKDT-thang', obj);
        }
        catch(err){
            const obj = {
                title: 'Chi tiết thống kê doanh thu theo tháng',
                message: 'Không có tuyến nào !'
            };
            res.render('admin-CT-TKDT-thang', obj);
        }
    }

    async loadData(req, res) {
        try {
            const statisticsModel = new statistics();
            var sortData = req.query.sortData;
            var obj;
            if (sortData === "1") {
                obj = {
                    // title: 'Chi tiết thống kê doanh thu theo tháng',
                    newsListStatistics: await statisticsModel.listStatistics_month_arranged(sortData)
                }
            }
            else {
                obj = {
                    // title: 'Chi tiết thống kê doanh thu theo tháng',
                    newsListStatistics: await statisticsModel.listStatistics_month_arrangedASC(sortData)
                }
            }
            console.log(obj)
            res.render('template-detailMonthStatistics', obj);
        }
        catch (err) {
            res.render('template-detailMonthStatistics');
        }
    }

}

module.exports = new DetailStaticsMonthController;
