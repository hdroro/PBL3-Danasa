const customer = require('../models/InforCustomer');
const account = require('../models/Account');

class ModalController {

    // [GET] /home
    async index(req, res) {
        res.render('modal');
    }

}

module.exports = new ModalController;