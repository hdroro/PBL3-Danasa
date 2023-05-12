const path = require('path');
const multer = require('multer');

class CreateCoachController {

  // [GET] /home
  async index(req, res) {
    const obj = {
      title: 'Thêm xe khách',
    }
    res.render('admin-taoXK', obj);
  }

  //[POST] /updateinfo/success
  
}

module.exports = new CreateCoachController;
