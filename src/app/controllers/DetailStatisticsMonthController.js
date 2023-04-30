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
    async loadData(req, res){
        const statisticsModel = new statistics();
        var sortData = req.query.sortData;
        var obj;
        if(sortData === "1"){
            obj = {
                // title: 'Chi tiết thống kê doanh thu theo tháng',
                newsListStatistics: await statisticsModel.listStatistics_month_arranged(sortData)
            }
        }
        else{
            obj = {
                // title: 'Chi tiết thống kê doanh thu theo tháng',
                newsListStatistics: await statisticsModel.listStatistics_month_arrangedESC(sortData)
            }
        }
        console.log(obj)
        res.render('template', obj);
    }
    
}

module.exports = new DetailStaticsMonthController;
