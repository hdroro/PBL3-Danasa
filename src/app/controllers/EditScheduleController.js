const schedulePublic= require('../models/SchedulePublic');
const MyDate = require('../models/Date');
const Route = require('../models/Route');
class EditScheduleController {

    // [GET] /admin/edit-schedule/:id
    // index(req, res,next) {
    //     var info;
    //     if(!req.session.stations){
    //         schedulePublic.getStation__Province()
    //             .then(([stations,provinces])=>{
    //                 req.session.stations = stations;
    //                 req.session.provinces = provinces;
    //             })
    //             .catch(next);
    //     }
    //     schedulePublic.getSchedule(`SELECT * FROM (((danasa.schedules as sch join danasa.directedroutes as dr on idDirectedRoute = iddirectedroutes) join danasa.coachs as s on s.idCoach = sch.idCoach) join danasa.typeofcoachs as tp on s.idType = tp.idType) join danasa.routes as r on r.idRoute = dr.idRoute where sch.idSchedule = ${req.params.id}`)
    //     .then((schedule) => {
    //         info = schedule[0];
    //         var time = new MyDate(info.startTime.toString());
    //         var time2 = new MyDate(info.endTime.toString());
    //         info.start = `${time.toLocaleTimeString()}`;
    //         info.end = `${time2.toLocaleTimeString()}`;
    //         info.day = `${time.toDate()}`;
    //         info.startStation = req.session.stations.find(station => station.idStation === info.idStartStation).stationName;
    //         info.endStation = req.session.stations.find(station => station.idStation === info.idEndStation).stationName;
    //         info.startProvince = req.session.provinces.find(province => province.idProvince === info.idStartProvince).provinceName;
    //         info.endProvince = req.session.provinces.find(province => province.idProvince === info.idEndProvince).provinceName;
    //         //res.json(info);
    //         res.render('admin-suaLT', {
    //                 schedule: info,
    //                 title: 'Sửa lịch trình',
    //             });
    //     })
    //     .catch(next);
    //     // else {
    //     //     const obj = {
    //     //         infoLogin: 'Đăng nhập', 
    //     //     }
    //     //     res.render('home', obj);
    //     // }
    // }
    index(req, res,next) {
        var info;
        var id = req.params.id;
        if(!req.session.stations){
            schedulePublic.getStation__Province()
                .then(([stations,provinces])=>{
                    req.session.stations = stations;
                    req.session.provinces = provinces;
                })
                .catch(next);
        }
        new Route().GetRoute(id)
            .then((idRoutes)=>{
                var idRoute = idRoutes[0].idRoute;
                return schedulePublic.getSchedule(`SELECT * FROM (((danasa.schedules as sch join danasa.directedroutes as dr on idDirectedRoute = iddirectedroutes) join danasa.coachs as s on s.idCoach = sch.idCoach) join danasa.typeofcoachs as tp on s.idType = tp.idType) join danasa.routes as r on r.idRoute = dr.idRoute where dr.idRoute = ${idRoute}`)
            })
            .then((schedules) => {
                var indexSch;
                var length = schedules.length;
                for(var index in schedules){
                    if (schedules[index].idSchedule == id){
                        indexSch = index;
                        break;
                    }
                }
                info = schedules[indexSch];
                var next =Number(indexSch) + 1;
                var previous = indexSch-1;
                var start,end,timeLength='';
                var time = new MyDate(info.startTime.toString());
                var time2 = new MyDate(info.endTime.toString());
                info.start = `${time.toLocaleTimeString()}`;
                info.end = `${time2.toLocaleTimeString()}`;
                info.day = `${time.toDate()}`;
                info.startStation = req.session.stations.find(station => station.idStation === info.idStartStation).stationName;
                info.endStation = req.session.stations.find(station => station.idStation === info.idEndStation).stationName;
                info.startProvince = req.session.provinces.find(province => province.idProvince === info.idStartProvince).provinceName;
                info.endProvince = req.session.provinces.find(province => province.idProvince === info.idEndProvince).provinceName;
                if(indexSch > 0) start = schedules[previous].endTime; else start =null
                if(indexSch < (length-1)) end = schedules[next].startTime; else end =null
                if(start){
                    var myTime = new MyDate(start.toString());
                    timeLength += `từ ${myTime.toLocaleTimeString()}`;
                }
                else{
                    timeLength += 'bất kì';
                }
                if(end){
                    var myTime = new MyDate(end.toString());
                    timeLength += ` đến ${myTime.toLocaleTimeString()}`
                }
                info.timeLength = timeLength;
                res.render('admin-suaLT', {
                        schedule: info,
                        title: 'Sửa lịch trình',
                    });
            })
            .catch(next);
        // else {
        //     const obj = {
        //         infoLogin: 'Đăng nhập', 
        //     }
        //     res.render('home', obj);
        // }
    }

    // [POST] /admin/edit-schedule/:id

    edit(req,res,next){
        var info;
        if(!req.session.stations){
            schedulePublic.getStation__Province()
                .then(([stations,provinces])=>{
                    req.session.stations = stations;
                    req.session.provinces = provinces;
                })
                .catch(next);
        }
        schedulePublic.getSchedule(`SELECT * FROM (((danasa.schedules as sch join danasa.directedroutes as dr on idDirectedRoute = iddirectedroutes) join danasa.coachs as s on s.idCoach = sch.idCoach) join danasa.typeofcoachs as tp on s.idType = tp.idType) join danasa.routes as r on r.idRoute = dr.idRoute where sch.idSchedule = ${req.params.id}`)
        .then((schedule) => {
            info = schedule[0];
            var time = new MyDate(info.startTime.toString());
            var time2 = new MyDate(info.endTime.toString());
            info.start = `${time.toLocaleTimeString()}`;
            info.end = `${time2.toLocaleTimeString()}`;
            info.day = `${time.toDate()}`;
            info.startStation = req.session.stations.find(station => station.idStation === info.idStartStation).stationName;
            info.endStation = req.session.stations.find(station => station.idStation === info.idEndStation).stationName;
            info.startProvince = req.session.provinces.find(province => province.idProvince === info.idStartProvince).provinceName;
            info.endProvince = req.session.provinces.find(province => province.idProvince === info.idEndProvince).provinceName;
            //res.json(info);
            res.render('admin-suaLT', {
                    schedule: info,
                    title: 'Sửa lịch trình',
                });
        })
        .catch(next);
    }

    save(req,res,next){
        
    }

    //[GET]/updateinfo/:slug
    show(req, res) {
        Login.findOne();
    }

    //[POST] /updateinfo/success
    checkUser(req,res,next){
        account.
        account.findOne({
            userName: req.body.userName,
            passWord: req.body.passWord,
        })
            .then((account)=>{
                if(account!==null) res.render('home');
                res.send("Tên tài khoản hoặc mật khẩu không chính xác");
            })
            .catch(err => next(err))

        console.log('kakak');
    }
}

module.exports = new EditScheduleController;
