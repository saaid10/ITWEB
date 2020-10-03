const express = require('express');
const router = express.Router();
const programController = require('../controllers/programController')
const {ensureLoggedIn} = require("connect-ensure-login");

/* GET add program form */
router.get('/add', ensureLoggedIn('/auth/login'), programController.addProgramForm);

/* POST add program form */
router.post('/add', ensureLoggedIn('/auth/login'), programController.addProgram);

router.get('/:programid', ensureLoggedIn('/auth/login'), programController.showProgram);

module.exports = router;