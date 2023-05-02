const schedule = require('../models/Schedule');
const schedulePublic = require('../models/SchedulePublic');
const MyDate = require('../models/Date');
const customer = require('../models/InforCustomer');
const account = require('../models/Account');
const seat = require('../models/Seat');
const ticket = require('../models/Ticket');

class BuyTicket4Controller{

    // [GET] /buy-ticket-step2
    index(req, res, next){
        const passedVariable = req.session.nameCustomer;
        const infoCus = req.body;
        // req.session.name = infoCus.fullname;
        // req.session.phoneNumber = infoCus.phonenumber;
        // req.session.email = infoCus.email;
        const idSchedule = req.query.id;
        const totalNumber = req.query.totalNumber;
        const totalPrice =req.query.totalPrice;
        const seats = req.query.seats;
        const confirmedHref = `/buy-ticket-step4/confirm?id=${idSchedule}}`;
        var info;
        if(!req.session.stations){
            schedulePublic.getStation__Province()
                .then(([stations,provinces])=>{
                    req.session.stations = stations;
                    req.session.provinces = provinces;
                })
                .catch(next);
        }
        schedulePublic.getSchedule(`SELECT * FROM ((danasa.schedules as sch join danasa.directedroutes as dr on idDirectedRoute = iddirectedroutes) join danasa.coachs as s on s.idCoach = sch.idCoach) join danasa.typeofcoachs as tp on s.idType = tp.idType where sch.idSchedule = ${idSchedule}`)
        .then((schedules) => {
            info = schedules[0];
            var time = new MyDate(info.startTime.toString());
            info.start = `${time.toLocaleTimeString()}`;
            info.day = `${time.toLocaleDateString()}`;
            info.startStation = req.session.stations.find(station => station.idStation === info.idStartStation).stationName;
            info.endStation = req.session.stations.find(station => station.idStation === info.idEndStation).stationName;
            info.startProvince = req.session.provinces.find(province => province.idProvince === info.idStartProvince).provinceName;
            info.endProvince = req.session.provinces.find(province => province.idProvince === info.idEndProvince).provinceName;
            res.render('buyticketstep4', {
                schedule: info,
                title: 'Đặt vé xe',
                infoLogin: passedVariable, 
                totalNumber: totalNumber,
                totalPrice: totalPrice,
                seats: seats,
                infoCus: infoCus,
                confirmedHref: confirmedHref,
                idSchedule: idSchedule,
            });
        })
    }

    //[GET]/buy-ticket-step2/:slug
    show(req, res){
        res.send('Detail');
    }

    async confirm(req, res) {
        const passedVariable = req.session.nameCustomer;
        const idSchedule = req.query.idSchedule;
        // const totalNumber = req.query.totalNumber;
        // const totalPrice =req.query.totalPrice;
        // const seats = req.query.seats;

        try {
            // save db
            const seatArr = req.body['seat-name'].split(',');
            Array.from(seatArr).forEach(async st => {
                const ac = new account(req.session.userName);
                const idUSer = await ac.getIdAccount();
                const confirmedSeat = new seat();
                await confirmedSeat.save(st, idSchedule);
                const idSeat = await confirmedSeat.getIdSeat(st, idSchedule);
                const confirmedTicket = new ticket(0, idSchedule, idUSer, idSeat, req.body.SDT, req.body.name, req.body.email);
                const checkSeat = await confirmedTicket.check(idSeat, idSchedule);
                if(checkSeat.length === 0) {
                    await confirmedTicket.save();
                }
            })
        } catch(err) {
            console.log(err);
            res.send('Lỗi');
        }

        res.render('buyticket-confirm', {
            title: 'Đặt vé xe',
            infoLogin: passedVariable, 
        })
    }
}

module.exports = new BuyTicket4Controller;