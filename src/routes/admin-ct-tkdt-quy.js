const express = require('express');
const router = express.Router();

const detailStaticsQuarterController = require('../app/controllers/DetailStatisticsQuarterController');

// router.get('/:slug',loginController.login);
router.get('/detail-statistics/:slug',detailStaticsQuarterController.index);
router.get('/detail-statistics-quy', detailStaticsQuarterController.index);

module.exports = router;
