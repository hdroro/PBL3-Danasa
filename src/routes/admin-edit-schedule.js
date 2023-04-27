const express = require('express');
const router = express.Router();

const editScheduleController = require('../app/controllers/EditScheduleController');

// router.get('/:slug',loginController.login);
// router.get('/:slug',showListCusController.show);
router.get('/edit-schedule/:id', editScheduleController.index);
router.post('/edit-schedule/:id', editScheduleController.edit);


module.exports = router;
