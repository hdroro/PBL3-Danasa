const express = require('express');
const router = express.Router();

const detailSalesMonthController = require('../app/controllers/DetailSalesMonthController');

// router.get('/:slug',loginController.login);
// router.get('/:slug',showListCusController.show);
router.get('/detail-sales-thang', detailSalesMonthController.index);

module.exports = router;
