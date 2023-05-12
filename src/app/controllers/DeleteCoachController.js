const path = require('path');
const multer = require('multer');

class DeleteCoachController {

  // [GET] /home
  async index(req, res) {
    const obj = {
      title: 'Xóa xe khách',
    }
    res.render('admin-xoaXK', obj);
  }

  //[POST] /updateinfo/success
  
}

module.exports = new DeleteCoachController;
