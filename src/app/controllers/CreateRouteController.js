const path = require('path');
const multer = require('multer');
const route = require('../models/Route');
const province = require('../models/Province');
const directedroute = require('../models/DirectedRoute');

class CreateRouteController {

  // [GET] /home
    async index(req, res) {
        try {
            Promise.all([new route().countRoute()])
            .then(([id]) => {
              const idRoute = id;

              
              const obj = {
                idRoute: idRoute,
                title: 'Thêm tuyến xe',
              }
              res.render('admin-taoTX', obj);
            })
          
        } catch(err) {
          console.log(err);
        }
    }

  //[POST] /updateinfo/success
    async save(req, res) {
        try {
          Promise.all([new province().checkProvinceName(req.body.routeFirstProvince), new province().checkProvinceName(req.body.routeSecondProvince)])
            .then(async ([firstProvince, secondProvince]) => {
              if(Array.from(firstProvince).length === 0) {
                new province().addProvince(req.body.routeFirstProvince);
              }

              if(Array.from(secondProvince).length === 0) {
                new province().addProvince(req.body.routeSecondProvince);
              }

              const firstId = await new province().getIdProvinceByName(req.body.routeFirstProvince);
              const secondId = await new province().getIdProvinceByName(req.body.routeSecondProvince);
              new route().addRoute(req.body.routeInputDistance, req.body.routeInputDuration, firstId, secondId)
                .then(idRoute => {
                  new directedroute().addDirectedRoute(idRoute, firstId, secondId);
                  new directedroute().addDirectedRoute(idRoute, secondId, firstId);
                  res.redirect('list-route');
                })

              
            })
        }
        catch(err) {
          console.log(err);
        }
    }
}

module.exports = new CreateRouteController;