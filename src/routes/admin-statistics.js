const express = require('express');
const router = express.Router();

const statisticsController = require('../app/controllers/StatisticsController');

// router.get('/:slug',loginController.login);
// router.get('/:slug',showListCusController.show);
router.get('/statistics', statisticsController.index);

module.exports = router;
