const path = require('path');
const multer = require('multer');
const Coach = require('../models/Coach');
const Province = require('../models/Province');

class DeleteCoachController {

  // [GET] /delete-coach/:id
  index(req, res) {
    const idCoach = req.params.id;
    Promise.all([new Coach().getInfoCoach(idCoach),new Province().getProvince()])
    .then(([info,provinces])=>{
      info.firstProvince = provinces.find(province => province.idProvince === info.idFirstProvince).provinceName;
      info.secondProvince = provinces.find(province => province.idProvince === info.idSecondProvince).provinceName;
      res.render('admin-xoaXK', {
        title: 'Xóa xe khách',
        coach: info
      });
    })
  }

  //[POST] /delete-coach/:id
  delete(req,res){
    const idCoach = req.params.id;
    Promise.all([new Coach().deleteSoftCoach(idCoach)])
      .then(()=>{
        res.redirect('/admin/list-coach');
      })
      .catch(err => console.error(err))
  }
}

module.exports = new DeleteCoachController;
