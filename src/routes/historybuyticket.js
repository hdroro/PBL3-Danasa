const express = require('express');
const router = express.Router();

const historyBuyTicketController = require('../app/controllers/HistoryBuyTicketController');

router.get('/loadData-search-by-end-province', historyBuyTicketController.loadDataSearchByEndProvince)
router.get('/loadData-search-by-start-province', historyBuyTicketController.loadDataSearchByStartProvince)
router.get('/', historyBuyTicketController.index);

module.exports = router;
