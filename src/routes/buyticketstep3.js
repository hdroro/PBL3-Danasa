const express = require('express');
const router = express.Router();

const buyTicket3Controller = require('../app/controllers/BuyTicket3Controller');

// router.get('/:slug',loginController.login);
router.get('/:slug',buyTicket3Controller.show);
router.get('/', buyTicket3Controller.index);

module.exports = router;
