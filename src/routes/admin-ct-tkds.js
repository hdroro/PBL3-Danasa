const express = require('express');
const router = express.Router();

const detailSalesController = require('../app/controllers/DetailSalesController');

// router.get('/:slug',loginController.login);
// router.get('/:slug',showListCusController.show);
router.get('/detail-sales', detailSalesController.index);

module.exports = router;
