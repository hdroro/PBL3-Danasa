const schedulePublic= require('../models/SchedulePublic');
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
            res.render('admin-xoaLT', {
                    schedule: info,
                    title: 'Xóa lịch trình',
                });
        })
        .catch(next);
    }

    delete(req,res,next){
        schedulePublic.deleteSchedule(req.params.id)
            .then(()=>{
                res.redirect('/admin/list-schedule');
            })
            .catch(next);
    }
}
module.exports = new DeleteCusController;
