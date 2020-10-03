const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController')

/* GET add workout form */
router.get(':programid/add', workoutController.addWorkoutForm);

/* POST add workout form */
router.post(':programid/add', workoutController.addWorkout);

module.exports = router;