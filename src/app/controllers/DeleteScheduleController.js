const schedulePublic= require('../models/SchedulePublic');
const Schedule = require('../models/Schedule');
const MyDate = require('../models/Date');

class DeleteCusController {

    // [GET] /delete-schedule/:id
    index(req,res,next) {
        //res.send(req.params.id);
        var info;
        if(!req.session.stations){
            schedulePublic.getStation__Province()
                .then(([stations,provinces])=>{
                    req.session.stations = stations;
                    req.session.provinces = provinces;
                })
                .catch(next);
        }
        schedulePublic.getSchedule(`SELECT * FROM (((danasa.schedules as sch join danasa.directedroutes as dr on idDirectedRoute = iddirectedroutes) join danasa.coachs as s on s.idCoach = sch.idCoach) join danasa.typeofcoachs as tp on s.idType = tp.idType) join danasa.routes as r on r.idRoute = dr.idRoute where sch.idSchedule = ${req.params.id} and sch.isDeleted = 0`)
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
            var query = `select * from schedules as sch join directedroutes as dr on sch.idDirectedRoute = dr.iddirectedroutes where sch.idCoach = ${info.idCoach} and sch.startTime > '${info.day} ${info.start}' and sch.isDeleted = 0`
            return new Schedule().getSchedulesByCondition(query);
        })
        .then((schedules) => {
            var message = 'Xóa không ảnh hưởng đến chuyến phía sau.';
            var impact = false;
            if(schedules.length > 0) {
                req.session.IDBehind = schedules[0].idSchedule;
                impact = true;
                message = `Xóa sẽ xóa luôn chuyến phía sau (ID = ${req.session.IDBehind})`;
            }
            else {
                req.session.IDBehind = 0;
            }
            res.render('admin-xoaLT', {
                schedule: info,
                title: 'Xóa lịch trình',
                message: message,
                impact: impact,
            });
        })
        .catch(next);
    }

    delete(req,res,next){
        if(req.session.IDBehind > 0){
            Promise.all([schedulePublic.deleteSoftSchedule(req.params.id),schedulePublic.deleteSoftSchedule(req.session.IDBehind)])
                .then(([])=>{
                    res.redirect('/admin/list-schedule');
                })
                .catch(next);
        }
        else{
        schedulePublic.deleteSoftSchedule(req.params.id)
            .then(()=>{
                res.redirect('/admin/list-schedule');
            })
            .catch(next);
        }
    }
}
module.exports = new DeleteCusController;
