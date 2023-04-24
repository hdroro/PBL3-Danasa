const express = require('express');
const router = express.Router();

const deleteCusController = require('../app/controllers/DeleteCusController');

// router.get('/:slug',loginController.login);
// router.get('/:slug',showListCusController.show);
router.get('/delete-cus', deleteCusController.index);

module.exports = router;
