const express = require('express');
const router = express.Router();

const deleteNewsController = require('../app/controllers/DeleteNewsController');

// router.get('/:slug',loginController.login);
// router.get('/:slug',showListCusController.show);
router.post('/delete-news/delete', deleteNewsController.delete)
router.get('/delete-news', deleteNewsController.index);

module.exports = router;
