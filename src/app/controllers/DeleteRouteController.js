const route = require('../models/Route');
const province = require('../models/Province');
const coach = require('../models/Coach');

class DeleteRouteController {

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
                    res.render('admin-xoaTX', {
                        title: 'Xóa tuyến xe',
                        routeInfo: routeInfo,
                    });
                })
            
        }
        catch (err) {
            console.log(err);
            res.render('admin-xoaTX', {
                title: 'Xóa tuyến xe',
            })
        }
    }

    async save(req, res) {
        try {
            await new coach().removeCoach(req.params.id);
            await new route().remove(req.params.id);
            res.redirect('../list-route');
        }
        catch(err){
            console.log(err);
            res.render('admin-xoaTX', {
                title: 'Xóa tuyến xe',
            })
        }
    }

}

module.exports = new DeleteRouteController;