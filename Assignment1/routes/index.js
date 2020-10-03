const express = require('express');
const {ensureLoggedIn} = require("connect-ensure-login");
const workoutController = require('../controllers/workoutController')
const router = express.Router();

/* GET home page. */
router.get('/', ensureLoggedIn('/auth/login'), workoutController.workoutList);

module.exports = router;