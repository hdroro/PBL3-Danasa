const express = require('express');
const router = express.Router();

const detailStaticsController = require('../app/controllers/DetailStatisticsController');

// router.get('/:slug',loginController.login);
// router.get('/:slug',showListCusController.show);
router.get('/detail-statistics', detailStaticsController.index);

module.exports = router;
