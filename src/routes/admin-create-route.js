const express = require('express');
const router = express.Router();

const showListNewsController = require('../app/controllers/ShowListNewsController');

// router.get('/:slug',loginController.login);
// router.get('/:slug',showListCusController.show);
router.get('/edit-news/:idNews', showListNewsController.show_del);
router.get('/list-news/:idNews', showListNewsController.show);
router.get('/list-news', showListNewsController.index);

module.exports = router;
