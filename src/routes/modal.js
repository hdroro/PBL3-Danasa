const express = require('express');
const router = express.Router();

const modalController = require('../app/controllers/ModalController');

router.get('/', modalController.index);

module.exports = router;
