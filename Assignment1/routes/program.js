const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController')

/* GET add program form */
router.get('/add', programController.addProgramForm);

/* POST add program form */
router.post('/add', programController.addProgram);

module.exports = router;