const schedule = require('../models/Schedule');
const schedulePublic = require('../models/SchedulePublic');
const MyDate = require('../models/Date');
class ShowListScheduleController {

    // [GET] /admin/list-schedule
    async index(req, res,next) {
        var idProvinceStart = req.query.start;
        var idProvinceEnd = req.query.end;
        var idTimeAwhile = req.query.time;
        var info = [];
        if(!idProvinceStart) idProvinceStart=-1;
        if(!idProvinceEnd) idProvinceEnd=-1;
        if(!idTimeAwhile) idTimeAwhile=-1;
        const page = parseInt(req.query.page) || 1;
        const perPage = 5;
        const start = (page - 1) * perPage;
        const end = page * perPage;
        var awhile = [{min: 0, max: 24},{min: 0,max: 6,},{min: 6,max: 12,},{min: 12,max: 18,},{min: 18,max: 24,}]
        var query = 'SELECT * FROM ((danasa.schedules as sch join danasa.directedroutes as dr on idDirectedRoute = iddirectedroutes) join danasa.coachs as s on s.idCoach = sch.idCoach) join danasa.typeofcoachs as tp on s.idType = tp.idType where sch.isDeleted = 0';
        if(idProvinceStart && idProvinceStart > 0){
            query += ` and dr.idStartProvince = ${idProvinceStart}`;
            if(idProvinceEnd && idProvinceEnd > 0){
                query += ` and dr.idEndProvince = ${idProvinceEnd}`;
            }
        }
        else{
            if(idProvinceEnd && idProvinceEnd > 0){
                query += ` and dr.idEndProvince = ${idProvinceEnd}`;
            }
        }
        query += ' order by sch.startTime desc'
        if(!req.session.stations){
            schedulePublic.getStation__Province()
                .then(([stations,provinces])=>{
                    req.session.stations = stations;
                    req.session.provinces = provinces;
                })
                .catch(next);
        }
        schedulePublic.getSchedule(query)
        .then((schedules) => {
            if(idTimeAwhile >=0){
                var long = awhile[idTimeAwhile];
                var min = long["min"];
                var max = long["max"];
                for(var x of schedules){
                    var time = new MyDate(x.startTime.toString());
                    var hour = time.getHours();
                    if(time.getMinutes()>0) hour++;
                    if(min<=hour && hour<=max) info.push(x);
                }
            }
            else {
                info = schedules;
            }
            const prev = page === 1 ? 1 : page - 1;
            const lastPage = Math.ceil(info.length / perPage);
            const next = page === lastPage ? lastPage : page + 1;
            info = Array.from(info).slice(start,end);
            for(var x of info) {
                var time = new MyDate(x.startTime.toString());
                var time2 = new MyDate(x.endTime.toString());
                x.start = `${time.toLocaleTimeString()}`;
                x.end = `${time2.toLocaleTimeString()}`;
                x.day = `${time.toMyLocaleDateString()}`;
                x.startStation = req.session.stations.find(station => station.idStation === x.idStartStation).stationName;
                x.endStation = req.session.stations.find(station => station.idStation === x.idEndStation).stationName;
                x.startProvince = req.session.provinces.find(province => province.idProvince === x.idStartProvince).provinceName;
                x.endProvince = req.session.provinces.find(province => province.idProvince === x.idEndProvince).provinceName;
            }
            res.render('admin-xemLT', {
                    provinces: req.session.provinces,
                    start: idProvinceStart,
                    end: idProvinceEnd,
                    time: idTimeAwhile,
                    schedule: info,
                    current: page,
                    prev: prev,
                    next: next,
                    max__page: lastPage,
                    title: 'Xem lịch trình',
                });
        })
        .catch(next);
    }

    //[GET]/updateinfo/:slug
    show(req, res) {
        res.send("OK")
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
