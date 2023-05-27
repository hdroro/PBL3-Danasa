const express = require('express');
const router = express.Router();

const editStationController = require('../app/controllers/EditStationController');

router.get('/edit-station', editStationController.index);

module.exports = router;
