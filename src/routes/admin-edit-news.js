const express = require('express');
const router = express.Router();

const editNewsController = require('../app/controllers/EditNewsController');

// router.get('/:slug',loginController.login);
// router.get('/:slug',showListCusController.show);
router.get('/edit-news', editNewsController.index);

module.exports = router;
