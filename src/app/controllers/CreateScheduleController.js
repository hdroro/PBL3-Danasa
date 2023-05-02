const schedulePublic = require('../models/SchedulePublic');
const Schedule = require('../models/Schedule')
const Route = require('../models/Route');
const Station = require('../models/Station');
const Province = require('../models/Province');
const TypeCoach =require('../models/TypeOfCoach');
const DirectedRoute = require('../models/DirectedRoute');
const MyDate = require('../models/Date');
const account = require('../models/Account');
const Coach = require('../models/Coach');
const { response } = require('express');
const SchedulePublic = require('../models/SchedulePublic');
class CreateScheduleController {

    // [GET] /home
    index(req, res,next) {
        var id;
        Promise.all([new Route().getAllRoute(),new Schedule().getIDLast(),new TypeCoach().getTypeOfCoach()])
        .then(([routes,schedules,types])=>{
            id = Number(schedules[0].idSchedule)+1;
            //id = Number(schedules[0].idSchedule)+1;
            res.render('admin-taoLT', {
                idSch: id,
                //idSch: req.session.idNewSchedule,
                //idRoute: req.session.idRoute,
                routes: routes,
                types: types,
                // routeInfo: {
                //     hours: 0,  
                // },
                title: 'Tạo lịch trình',
            });
        })
        .catch(err => console.error(err));
        // schedulePublic.getToCreate()
            // .then(([stations,provinces,directs,routes,coachs,types,schedules])=>{
            //     req.session.stations = stations;
            //     req.session.provinces = provinces;
            //     req.session.directs = directs;
            //     req.session.routes = routes;
            //     req.session.coachs = coachs;
            //     req.session.types = types;
            //     //req.session.idNewSchedule = Number(schedules[0].idSchedule)+1;
            //     id = Number(schedules[0].idSchedule)+1;
            //     res.render('admin-taoLT', {
            //         idSch: id,
            //         stations: stations,
            //         provinces: provinces ,
            //         directs: directs,
            //         routes: routes,
            //         coachs: coachs,
            //         types: types,
            //         title: 'Tạo lịch trình',
            //     });
            // })
            // .catch(next);




        // else {
        //     const obj = {
        //         infoLogin: 'Đăng nhập', 
        //     }
        //     res.render('home', obj);
        // }
    }
    //[GET] /admin/create-schedule/getDirect
    findInfoRoute(req,res,next){
        var idRoute = req.query.route;
        var directRoute;
        //Tìm số chuyến của route đó
        // > 0 -> tự động mặc định 
        // Promise.all([new Route().getCountOfRoute(idRoute),new DirectedRoute().getDirectedRouteByIDRoute(idRoute),new Province().getProvince(),new Route().getInfoRoute(idRoute)])
        //     .then(([schedules,directedRoutes,provinces,routeChosed]) => {
        //         if(schedules.length > 0){
        //             var idDirect = schedules[schedules.length-1].idDirectedRoute;
        //             if(directedRoutes[0].idDirectedRoute === idDirect) directRoute = [directedRoutes[0]];
        //             else directRoute = [directedRoutes[1]];
        //             // đi tìm directedroute thôi
        //         }
        //         else directRoute = directedRoutes;
        //         for(var pr of directRoute){
        //             pr.startProvince = provinces.find(province => province.idProvince === pr.idStartProvince).provinceName;
        //             pr.endProvince = provinces.find(province => province.idProvince === pr.idEndProvince).provinceName;
        //         }
        //         req.session.distance = routeChosed["distance"];
        //         req.session.hours = routeChosed["hours"];
        //         res.render('admin-taoLT',{
        //             routes: req.session.routes,
        //             types: req.session.types,
        //             direct: directRoute,
        //             idSch: req.session.idNewSchedule,
        //             routeInfo: {
        //                 distance: req.session.distance,
        //                 hours: req.session.hours,
        //             },
        //             idRoute: idRoute,
        //         })
        //     })
        //     .catch(next)
        Promise.all([new DirectedRoute().getDirectedRouteByIDRoute(idRoute),new Province().getProvince(),new Route().getInfoRoute(idRoute)])
            .then(([directedRoutes,provinces,routeChosed]) => {
                directRoute = directedRoutes;
                for(var pr of directRoute){
                    pr.startProvince = provinces.find(province => province.idProvince === pr.idStartProvince).provinceName;
                    pr.endProvince = provinces.find(province => province.idProvince === pr.idEndProvince).provinceName;
                }
                // req.session.distance = routeChosed["distance"];
                // req.session.hours = routeChosed["hours"];
                var result ={
                    hours: routeChosed["hours"],
                    distance: routeChosed["distance"],
                    direct: directRoute,
                }
                res.json(result);
                // res.render('admin-taoLT',{
                //     routes: req.session.routes,
                //     types: req.session.types,
                //     direct: directRoute,
                //     idSch: req.session.idNewSchedule,
                //     routeInfo: {
                //         distance: req.session.distance,
                //         hours: req.session.hours,
                //     },
                //     idRoute: idRoute,
                //     title: 'Tạo lịch trình',
                // })
            })
            .catch(err => console.error(err))
    }
    getDataStation(req,res,next){
        var idDirect = req.query["route"];
        var idStartProvince,idEndProvince;
        new DirectedRoute().getDirectedRouteByIDDirect(idDirect)
            .then((direct)=>{
                idStartProvince = direct["idStartProvince"];
                idEndProvince = direct["idEndProvince"];
                return Promise.all([new Station().getStationByIdProvince(idStartProvince),new Station().getStationByIdProvince(idEndProvince)]);
            })
            .then(([start,end])=>{
                var AllStation = {
                    startStaion: start,
                    endStaion: end,
                };
                //res.json(AllStation);
                res.json(AllStation);
            })
            .catch(err => console.err(err))
    }
    getCoach(req,res,next){
        var idDirect = req.query["direct"];
        var idType = req.query["type"];
        var time = req.query["time"];
        var day = req.query["day"];
        var result = {
            message: "",
            coach: [],
        }
        var coach = [],busyCoach = []
        if(idDirect===0 || time==="" || day===""){
            new TypeCoach().getTypeByID(idType)
                .then((type)=>{
                    result.seat = type["numberOfSeat"];
                    result.message = "Dữ liệu chưa nhập đủ";
                    res.json(result);
                })
                .catch(err=>console.error(err))
        }
        else{
            var timeStart__S = `${day} ${time}`;
            var timeStart = new MyDate(timeStart__S);
            var idRoute,idStartProvince,seats;
            Promise.all([new DirectedRoute().getDirectedRouteByIDDirect(idDirect),new TypeCoach().getTypeByID(idType)])
            .then(([direct,type])=>{
                idStartProvince = direct["idStartProvince"];
                idRoute = direct["idRoute"];
                seats = type["numberOfSeat"];
                var query = `SELECT sch.idCoach FROM (schedules as sch join directedroutes as dr on sch.idDirectedRoute = dr.iddirectedroutes) join coachs as c on sch.idCoach = c.idCoach and c.idType = ${idType} and dr.idRoute = ${idRoute} group by sch.idCoach`;
                var querySchedule = `SELECT * FROM (schedules as sch join directedroutes as dr on sch.idDirectedRoute = dr.iddirectedroutes) join coachs as c on sch.idCoach = c.idCoach and c.idType = ${idType} and dr.idRoute = ${idRoute} order by sch.idSchedule desc`;
                return Promise.all([new Coach().GetCoachBusy(query),new Coach().getAllCoachByIDTypeAndRoute(idType,idRoute),SchedulePublic.getSchedule(querySchedule),new Coach().getAllCoach()]);
            })
            .then(([busy,all,schedules,coachs])=>{
                for(var x of busy) busyCoach.push(x.idCoach);
                for(var x of all){
                    if(!busyCoach.includes(x.idCoach)){
                        coach.push(coachs.find(coachInfo => coachInfo.idCoach === x.idCoach));
                    }
                    else{
                        var schedule = schedules.find(schedule => schedule.idCoach === x.idCoach);
                        var timeEnd = new MyDate(schedule.endTime);
                        if(timeEnd<=timeStart && schedule.idEndProvince === idStartProvince) coach.push(coachs.find(coachInfo => coachInfo.idCoach === x.idCoach));
                    }
                }
                result.coach = coach;
                result.seat = seats;
                res.json(result);
            })
            .catch(err => console.error(err))
            // tìm các xe thuộc chuyến idRoute
            //liệt kê ra những xe đi theo route đó
        }
        //res.json(timeStart);
        // if(timeS===""){
        //     result.message = "Thời gian chưa nhập đủ";
        //     res.json(result);
        // }
        // else{

        // }
    }
    createSchedule(req,res,next){
        var idDirect = req.body["start-province"];
        var startStation = req.body["start-station"];
        var endStation = req.body["end-station"];
        var timeStart = new MyDate(`${req.body["start-date"]} ${req.body["start-time"]}`);
        var timeEnd = new MyDate(`${req.body["start-date"]} ${req.body["start-time"]}`);
        var idCoach = req.body["license-plate"];
        var price = req.body["price"];
        //res.json(req.session.hours);
        new Route().getInfoRoute(req.body["route"])
        .then((route)=>{
            timeEnd.setHours(timeEnd.getHours()+route.hours);
            var end = `${timeEnd.toDate()} ${timeEnd.toLocaleTimeString()}`;
            var start = `${timeStart.toDate()} ${timeStart.toLocaleTimeString()}`;
            return new Schedule().create(idDirect,startStation,endStation,start,end,price,idCoach);
        })
        .then(()=>{
            res.redirect('/admin/list-schedule');
        })
        .catch(err => console.log(err))
    }
    // getDataStation(req,res,next){
    //     var idDirect = req.query["route"];
    //     var idStartProvince,idEndProvince;
    //     new DirectedRoute().getDirectedRouteByIDDirect(idDirect)
    //         .then((direct)=>{
    //             idStartProvince = direct["idStartProvince"];
    //             idEndProvince = direct["idEndProvince"];
    //             return new Station().getStationByIdProvince(idStartProvince);
    //         })
    //         .then((start)=>{
    //             // var AllStation = {
    //             //     startStaion: start,
    //             //     endStaion: end,
    //             // };
    //             //res.json(AllStation);
    //             var start_arr = [];
    //             for(var x of start) start_arr.push(x);
    //             res.json(start_arr);
    //         })
    //         .catch(err => console.err(err))
    // }


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

module.exports = new CreateScheduleController;
