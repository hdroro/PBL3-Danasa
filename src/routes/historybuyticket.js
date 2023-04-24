const express = require('express');
const router = express.Router();

const historyBuyTicketController = require('../app/controllers/HistoryBuyTicketController');

// router.get('/:slug',loginController.login);
router.get('/:slug',historyBuyTicketController.show);
router.get('/', historyBuyTicketController.index);

module.exports = router;
