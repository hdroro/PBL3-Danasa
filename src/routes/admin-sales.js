const express = require('express');
const router = express.Router();

const salesController = require('../app/controllers/SalesController');

// router.get('/:slug',loginController.login);
// router.get('/:slug',showListCusController.show);
router.get('/sales', salesController.index);

module.exports = router;
