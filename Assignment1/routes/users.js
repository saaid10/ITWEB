var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const userColl = mongoose.model('User');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users = await userColl.find({});
  console.log(users);
  res.send(users);
});

router.get('/add', async function(req, res, next) {
  try {
    await userColl.create({username: "Glenn", password: "132"});
    res.send("User added");
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
