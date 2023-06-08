const route = require('../models/Route');
const province = require('../models/Province');

class EditRouteController {

    // [GET] /home

    async index(req, res) {
        try {
            Promise.all([new route().getInfoRoute(req.params.id), new province().getProvince()])
                .then(([routeItem, provinces]) => {
                    const routeInfo = routeItem;
                    const listProvince = Array.from(provinces);
                    listProvince.forEach(pr => {
                        if(pr.idProvince == routeItem.idFirstProvince) {
                            routeInfo.nameFirstProvince = pr.provinceName;
                        }
                        if(pr.idProvince == routeItem.idSecondProvince) {
                            routeInfo.nameSecondProvince = pr.provinceName;
                        }
                    })
                    res.render('admin-suaTX', {
                        title: 'Sửa tuyến xe',
                        routeInfo: routeInfo,
                    });
                })
            
        }
        catch (err) {
            console.log(err);
            res.render('admin-suaTX', {
                title: 'Sửa tuyến xe',
            })
        }
    }

    async save(req, res) {
        try {
            await new route().update(req.body.routeInputDistance, req.body.routeInputDuration, req.params.id);
            req.flash('success', 'Cập nhật thành công!');
            res.redirect('../list-route');
        } catch(err) {
            console.log(err);
        }
    }

}

module.exports = new EditRouteController;