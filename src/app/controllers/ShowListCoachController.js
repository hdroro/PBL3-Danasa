const path = require('path');
const multer = require('multer');

class ShowListCoachController {

  // [GET] /home
  async index(req, res) {
    const obj = {
      title: 'Xem xe khách',
    }
    res.render('admin-xemXK', obj);
  }

  //[POST] /updateinfo/success
  
}

module.exports = new ShowListCoachController;