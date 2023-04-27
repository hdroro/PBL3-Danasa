const schedule = require('../models/Schedule');
const schedulePublic = require('../models/SchedulePublic');
const MyDate = require('../models/Date');
class ShowListScheduleController {

    // [GET] /admin/
    // async index(req, res) {
    //     var info = [];
    //     scheduleController.getAllSchedule()
    //         .then((schedules) => {
    //             info = schedules;
    //             for(var x of info) {
    //                 var time = new MyDate(x.startTime.toString());
    //                 var time2 = new MyDate(x.endTime.toString());
    //                 x.start = `${time.toLocaleTimeString()}`;
    //                 x.end = `${time2.toLocaleTimeString()}`;
    //                 x.day = `${time.toLocaleDateString()}`;
    //                 //info.gio = info.startTime.get
    //             }
    //             //console.log(info.idStartStation);
    //             //res.send(info.idStartStation);
    //             info.startStationName = await scheduleController.getStation(info.idStartStation);
    //             //res.json(info);
    //             res.render('admin-xemLT', {
    //                     schedule: info,
    //                     title: 'Xem lịch trình',
    //                 });
    //         })
    //         .catch(err => res.send("Lỗi"))
    //     // res.render('admin-xemLT', {
    //     //     schedule: await schedule.load() ,
    //     //     title: 'Xem lịch trình',
    //     // });
    //     // else {
    //     //     const obj = {
    //     //         infoLogin: 'Đăng nhập', 
    //     //     }
    //     //     res.render('home', obj);
    //     // }
    // }


    // async index(req, res,next) {
    //     var info = [];
    //     schedulePublic.getSchedule('SELECT * FROM ((danasa.schedules as sch join danasa.directedroutes as dr on idDirectedRoute = iddirectedroutes) join danasa.coachs as s on s.idCoach = sch.idCoach) join danasa.typeofcoachs as tp on s.idType = tp.idType')
    //     .then(([schedules,stations,provinces]) => {
    //         info = schedules;
    //         req.session.stations = stations;
    //         req.session.provinces = provinces;
    //         for(var x of info) {
    //             var time = new MyDate(x.startTime.toString());
    //             var time2 = new MyDate(x.endTime.toString());
    //             x.start = `${time.toLocaleTimeString()}`;
    //             x.end = `${time2.toLocaleTimeString()}`;
    //             x.day = `${time.toLocaleDateString()}`;
    //             x.startStation = stations.find(station => station.idStation === x.idStartStation).stationName;
    //             x.endStation = stations.find(station => station.idStation === x.idEndStation).stationName;
    //             x.startProvince = provinces.find(province => province.idProvince === x.idStartProvince).provinceName;
    //             x.endProvince = provinces.find(province => province.idProvince === x.idEndProvince).provinceName;
    //         }
    //         res.render('admin-xemLT', {
    //                 schedule: info,
    //                 title: 'Xem lịch trình',
    //             });
    //     })
    //     .catch(next);
    // }
    async index(req, res,next) {
        var info = [];
        if(!req.session.stations){
            schedulePublic.getStation__Province()
                .then(([stations,provinces])=>{
                    req.session.stations = stations;
                    req.session.provinces = provinces;
                })
                .catch(next);
        }
        schedulePublic.getSchedule('SELECT * FROM ((danasa.schedules as sch join danasa.directedroutes as dr on idDirectedRoute = iddirectedroutes) join danasa.coachs as s on s.idCoach = sch.idCoach) join danasa.typeofcoachs as tp on s.idType = tp.idType order by sch.idSchedule')
        .then((schedules) => {
            info = schedules;
            // req.session.stations = stations;
            // req.session.provinces = provinces;
            for(var x of info) {
                var time = new MyDate(x.startTime.toString());
                var time2 = new MyDate(x.endTime.toString());
                x.start = `${time.toLocaleTimeString()}`;
                x.end = `${time2.toLocaleTimeString()}`;
                x.day = `${time.toLocaleDateString()}`;
                x.startStation = req.session.stations.find(station => station.idStation === x.idStartStation).stationName;
                x.endStation = req.session.stations.find(station => station.idStation === x.idEndStation).stationName;
                x.startProvince = req.session.provinces.find(province => province.idProvince === x.idStartProvince).provinceName;
                x.endProvince = req.session.provinces.find(province => province.idProvince === x.idEndProvince).provinceName;
            }
            res.render('admin-xemLT', {
                    schedule: info,
                    title: 'Xem lịch trình',
                });
        })
        .catch(next);
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

module.exports = new ShowListScheduleController;
