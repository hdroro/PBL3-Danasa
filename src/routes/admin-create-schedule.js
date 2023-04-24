const express = require('express');
const router = express.Router();

const createScheduleController = require('../app/controllers/CreateScheduleController');

// router.get('/:slug',loginController.login);
// router.get('/:slug',showListCusController.show);
router.get('/create-schedule', createScheduleController.index);

module.exports = router;
