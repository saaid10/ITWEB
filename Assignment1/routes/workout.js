const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController')
const {ensureLoggedIn} = require("connect-ensure-login");

/* GET add workout form */
router.get('/:programid/add', ensureLoggedIn('/auth/login'), workoutController.addWorkoutForm);

/* POST add workout form */
router.post('/:programid/add', ensureLoggedIn('/auth/login'), workoutController.addWorkout);

module.exports = router;