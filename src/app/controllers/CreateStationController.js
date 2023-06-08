const station = require('../models/Station');
const province = require('../models/Province');

class CreateScheduleController {
    async index(req, res) {
        const st = new station();
        const pv = new province();
        const obj = {
            title: 'Thêm bến xe',
            idstation: await st.countStation(),
            listProvince: await pv.getAllProvince()
        }
        res.render('admin-taoBen', obj);
    }

    async createStation(req, res) {
        try {
            const { idstation, stationProvince, namestation } = req.body;
            const pv = new province();
            const st = new station(idstation, namestation, stationProvince);
            if (await st.checkStationName() === 0) {
                st.saveStation();
                req.flash('success', 'Tạo thành công!');
                res.redirect('/admin/list-station');
            }
            else {
                res.render('admin-taoBen',
                    {
                        title: 'Thêm bến xe',
                        idstation: await st.countStation(),
                        listProvince: await pv.getAllProvince(),
                        message: 'Hiện tại đã có bến này!',
                        titletoast: "Failed",
                        statusMessage: "Tạo không thành công!",
                        icon: "fa-exclamation-circle",
                        type: "toast--error"
                    })
            }
        }
        catch (err) {
            console.log(err);
        }
    }
}
module.exports = new CreateScheduleController;