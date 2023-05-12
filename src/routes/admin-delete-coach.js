const express = require('express');
const router = express.Router();

const deleteCoachController = require('../app/controllers/DeleteCoachController');

// router.get('/:slug',loginController.login);
// router.get('/:slug',showListCusController.show);
router.get('/delete-coach', deleteCoachController.index);

module.exports = router;
