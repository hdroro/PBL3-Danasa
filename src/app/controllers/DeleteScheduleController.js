const schedulePublic= require('../models/SchedulePublic');
const Schedule = require('../models/Schedule');
const MyDate = require('../models/Date');

class DeleteCusController {

    // [GET] /delete-schedule/:id
    index(req,res,next) {
        var info;
        //mặc định là có thể xóa
        var enable = true;
        //mặc định là chuyến xe đã chạy
        var run = true;
        if(!req.session.stations){
            schedulePublic.getStation__Province()
                .then(([stations,provinces])=>{
                    req.session.stations = stations;
                    req.session.provinces = provinces;
                })
                .catch(next);
        }
        schedulePublic.getScheduleByID(req.params.id)
        .then((schedule) => {
            info = schedule[0];
            const timeNow = new MyDate();
            var time = new MyDate(info.startTime.toString());
            var time2 = new MyDate(info.endTime.toString());
            info.start = `${time.toLocaleTimeString()}`;
            info.end = `${time2.toLocaleTimeString()}`;
            info.day = `${time.toDate()}`;
            // Chuyến xe chưa chạy
            if(time > timeNow) run = false;
            info.firstProvince = req.session.provinces.find(province => province.idProvince === info.idFirstProvince).provinceName;
            info.secondProvince = req.session.provinces.find(province => province.idProvince === info.idSecondProvince).provinceName;
            info.startStation = req.session.stations.find(station => station.idStation === info.idStartStation).stationName;
            info.endStation = req.session.stations.find(station => station.idStation === info.idEndStation).stationName;
            info.startProvince = req.session.provinces.find(province => province.idProvince === info.idStartProvince).provinceName;
            info.endProvince = req.session.provinces.find(province => province.idProvince === info.idEndProvince).provinceName;
            var query = `select * from schedules as sch join directedroutes as dr on sch.idDirectedRoute = dr.iddirectedroutes where sch.idCoach = ${info.idCoach} and sch.startTime > '${info.day} ${info.start}' and sch.isDeleted = 0`
            return Promise.all([new Schedule().getSchedulesByCondition(query),new Schedule().getTickets(req.params.id)]);
        })
        .then(([schedules,tickets]) => {
            var message;
            if(tickets != null && run == false) {
                message = "Chuyến này đã có người đặt. Không thể xóa !!!";
                //không thể xóa chuyến này
                enable = false;
            }
            else{
                message = 'Xóa không ảnh hưởng đến chuyến phía sau.';
                var impact = false;
                if(schedules.length > 0) {
                    req.session.IDBehind = schedules[0].idSchedule;
                    impact = true;
                    message = `Xóa sẽ xóa luôn chuyến phía sau (ID = ${req.session.IDBehind})`;
                }
                else {
                    req.session.IDBehind = 0;
                }
            }
            res.render('admin-xoaLT', {
                schedule: info,
                title: 'Xóa lịch trình',
                message: message,
                impact: impact,
                enable: enable,
            });
        })
        .catch(err => {
            console.error(err);
            res.render('errorPage',{
              title: 'Error',
            });
        })
    }

    delete(req,res,next){
        if(req.session.IDBehind > 0){
            Promise.all([schedulePublic.deleteSoftSchedule(req.params.id),schedulePublic.deleteSoftSchedule(req.session.IDBehind)])
                .then(([])=>{
                    req.flash('success', 'Xóa thành công!');
                    res.redirect('/admin/list-schedule');
                })
                .catch(next);
        }
        else{
        schedulePublic.deleteSoftSchedule(req.params.id)
            .then(()=>{
                req.flash('success', 'Xóa thành công!');
                res.redirect('/admin/list-schedule');
            })
            .catch(next);
        }
    }
}
module.exports = new DeleteCusController;
