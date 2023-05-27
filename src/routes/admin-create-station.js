const express = require('express');
const router = express.Router();

const createStationController = require('../app/controllers/CreateStationController');

router.get('/create-station', createStationController.index);

module.exports = router;
