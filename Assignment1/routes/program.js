const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController')

/* GET add workout form */
router.get('/add', programController.addProgramForm);

/* GET add workout form */
router.post('/add', programController.addProgram);

module.exports = router;