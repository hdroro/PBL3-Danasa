const express = require('express');
const router = express.Router();

const buyTicket4Controller = require('../app/controllers/BuyTicket4Controller');

// router.get('/:slug',loginController.login);
router.get('/:slug',buyTicket4Controller.show);
router.get('/', buyTicket4Controller.index);

module.exports = router;
