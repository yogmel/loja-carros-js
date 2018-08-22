'use strict';

var express = require('express');
var app = express();
var router = express.Router();
var data = [];

router.get('/car', function(req, res) {
  res.json(data);
  console.log(data);
});

router.post('/', function(req, res) {
  data.push({
    image: req.body.image,
    brandModel: req.body.brandModel,
    year: req.body.year,
    plate: req.body.plate,
    color: req.body.color 
  });
  res.json({ message: 'success' });
});

app.listen(3000);

module.exports = router;
