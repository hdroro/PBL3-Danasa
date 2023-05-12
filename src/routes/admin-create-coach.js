const express = require('express');
const router = express.Router();

const createCoachController = require('../app/controllers/CreateCoachController');

// router.get('/:slug',loginController.login);
// router.get('/:slug',showListCusController.show);
router.get('/create-coach', createCoachController.index);

module.exports = router;
