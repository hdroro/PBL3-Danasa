const express = require('express');
const router = express.Router();

const homeController = require('../app/controllers/HomeController');

router.post('/buy-ticket-step2', homeController.searchDate);
router.get('/', homeController.index);

module.exports = router;
