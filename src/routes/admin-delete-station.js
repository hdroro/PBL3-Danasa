const express = require('express');
const router = express.Router();

const deleteStationController = require('../app/controllers/DeleteStationController');

router.get('/delete-station', deleteStationController.index);

module.exports = router;
