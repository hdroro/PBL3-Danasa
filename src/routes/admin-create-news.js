const express = require('express');
const router = express.Router();

const createNewsController = require('../app/controllers/CreateNewsController');

// router.get('/:slug',loginController.login);
// router.get('/:slug',showListCusController.show);
router.get('/create-news', createNewsController.index);

module.exports = router;
