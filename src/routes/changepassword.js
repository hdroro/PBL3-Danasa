const express = require('express');
const router = express.Router();

const changePasswordController = require('../app/controllers/ChangePasswordController');

router.get('/:slug',changePasswordController.show);
router.get('/',changePasswordController.index);


module.exports = router;
