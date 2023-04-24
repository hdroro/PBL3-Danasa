const express = require('express');
const router = express.Router();

const editScheduleController = require('../app/controllers/EditScheduleController');

// router.get('/:slug',loginController.login);
// router.get('/:slug',showListCusController.show);
router.get('/edit-schedule', editScheduleController.index);

module.exports = router;
