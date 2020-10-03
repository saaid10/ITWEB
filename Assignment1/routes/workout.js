const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController')

/* GET add workout form */
router.get('/add', workoutController.addWorkoutForm);

/* GET add workout form */
router.post('/add', workoutController.addWorkout);

module.exports = router;