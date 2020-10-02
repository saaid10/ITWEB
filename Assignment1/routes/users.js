const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {ensureLoggedIn} = require("connect-ensure-login");
const userColl = mongoose.model('User');

/* GET users listing. */
router.get('/' , ensureLoggedIn('/auth/login'), async function (req, res, next) {
    const users = await userColl.find({});
    console.log(users);
    res.send(users);
});

router.get('/add', async function (req, res, next) {
    try {
        await userColl.create({username: "Glenn", password: "132"});
        res.send("User added");
    } catch (e) {
        res.send(e);
    }
});

module.exports = router;
