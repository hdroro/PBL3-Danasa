const express = require('express');
const router = express.Router();

const detailStaticsMonthController = require('../app/controllers/DetailStatisticsMonthController');

// router.get('/:slug',loginController.login);
router.get('/detail-statistics/:slug',detailStaticsMonthController.index);
router.get('/detail-statistics-thang', detailStaticsMonthController.index);

module.exports = router;
