var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

mongoose.connect('mongodb://6144df924dab/node_test');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource' + mongoose);
});

module.exports = router;
