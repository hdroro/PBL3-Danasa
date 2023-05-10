const schedulePublic = require('../models/SchedulePublic');
const Station = require('../models/Station');
const Province = require('../models/Province');
const Type = require('../models/TypeOfCoach');
const Ticket = require('../models/Ticket');
const MyDate = require('../models/Date');
class BuyTicket2Controller{

    // [GET] /histor-buy-ticket
    index(req, res,next){
        const passedVariable = req.session.nameCustomer;
        var start = req.query["start"];
        var end = req.query["end"];
        var awhileTime = req.query["awhile"];
        var type = req.query["type"];
        var timeQuery = req.query["time"];
        if(!type) type = -1;
        if(!awhileTime) awhileTime = -1;
        var idEnd,idStart,typesName;
        var info = [];
        var awhile = [{min: 0, max: 24},{min: 0,max: 6,},{min: 6,max: 12,},{min: 12,max: 18,},{min: 18,max: 24,}]
        var query = 'SELECT * FROM (((danasa.schedules as sch join danasa.directedroutes as dr on idDirectedRoute = iddirectedroutes) join danasa.coachs as s on s.idCoach = sch.idCoach) join danasa.typeofcoachs as tp on s.idType = tp.idType) join routes as r on dr.idRoute = r.idRoute where sch.isDeleted = 0';
        var queryCount = 'SELECT t.idSchedule, count(t.idSchedule) as SL FROM tickets as t join schedules as sch on t.idSchedule = sch.idSchedule where sch.isDeleted = 0 group by t.idSchedule;';
        Promise.all([new Station().getStation(),new Province().getProvince(),new Type().getTypeOfCoach()])
            .then(([stations,provinces,types])=>{
                req.session.stations = stations;
                req.session.provinces = provinces;
                typesName = types;
                if(start!==""){
                    idStart = req.session.provinces.find(province=>province.provinceName === start).idProvince;
                    query += ` and dr.idStartProvince = ${idStart}`;
                    if(end!==""){
                        idEnd = req.session.provinces.find(province=>province.provinceName === end).idProvince;
                        query += ` and dr.idEndProvince = ${idEnd}`;
                    }
                    else{
                        query += ` and dr.idEndProvince = 0`;
                    }
                }
                else{
                    query += ` and dr.idStartProvince = 0`;
                    if(end!==""){
                        idEnd = req.session.provinces.find(province=>province.provinceName === end).idProvince;
                        query += ` and dr.idEndProvince = ${idEnd}`;
                    }
                    else{
                        query += ` and dr.idEndProvince = 0`;
                    }
                }
                query += ' order by sch.idSchedule';
                return Promise.all([schedulePublic.getSchedule(query),new Ticket().getCount(queryCount)]);
            })
            .then(([schedules,countSchedules]) => {
            if(timeQuery){
                var min,max;
                if(awhileTime<=0){
                    min=0;max=24;
                }
                else{
                    var long = awhile[awhileTime];
                    min = long["min"];
                    max = long["max"];
                }
                var time__S = new MyDate(timeQuery.toString());
                for(var index in schedules){
                    var x = schedules[index];
                    var timeStart = new MyDate(x.startTime.toString());
                    var hour = timeStart.getHours();    
                    var count = countSchedules.find(count => count.idSchedule === x.idSchedule);
                    if(count === undefined) x.haveSeat = x.numberOfSeat;
                    else x.haveSeat = x.numberOfSeat-count["SL"];
                    if(timeStart.getMinutes()>0) hour++;
                    if(time__S.toDate()===timeStart.toDate()&&min<=hour && hour<=max && x.haveSeat > 0){
                        if(type<=0) info.push(x);
                        else if (x.idType == type) info.push(x);
                    }
                }
            }
            for(var x of info) {
                var time = new MyDate(x.startTime.toString());
                var time2 = new MyDate(x.endTime.toString());
                x.start = `${time.toLocaleTimeString()}`;
                x.end = `${time2.toLocaleTimeString()}`;
                x.day = `${time.toLocaleDateString()}`;
                x.startStation = req.session.stations.find(station => station.idStation === x.idStartStation).stationName;
                x.endStation = req.session.stations.find(station => station.idStation === x.idEndStation).stationName;
                // var count = countSchedules.find(count => count.idSchedule === x.idSchedule);
                // if(count === undefined) x.haveSeat = x.numberOfSeat;
                // else x.haveSeat = x.numberOfSeat-count["SL"];
                // if (x.haveSeat == 0) info.
            }
            if(passedVariable != null) {
                res.render('buyticketstep2', {
                    title: 'Đặt vé xe',
                    infoLogin: passedVariable,
                    timeQuery: timeQuery,
                    startProvince: start,
                    endProvince: end,
                    schedule: info,
                    types: typesName,
                    typeCBB: type,
                    awhileCBB: awhileTime,
                });
            } else {
                res.render('buyticketstep2', {
                    title: 'Đặt vé xe',
                    infoLogin: 'Đăng nhập',
                    startProvince: start,
                    endProvince: end,
                    timeQuery: timeQuery,
                    schedule: info,
                    types: typesName,
                    typeCBB: type,
                    awhileCBB: awhileTime,
                });
            }
        })
        .catch(err=>{
            console.error(err);
            res.json("Lỗi");
        });
    }

    //[GET]/buy-ticket-step2/:slug
    show(req, res){
        res.send('Detail');
    }
}

module.exports = new BuyTicket2Controller;