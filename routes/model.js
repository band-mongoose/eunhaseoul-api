var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

router.get('/public', function (req, res, next) {
  request('http://wordsareevil.wix.com/eunhaseoul', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var matches = body.match(/var publicModel = (.*);/im);
      var publicModel = JSON.parse(matches[1]);
      publicModel.domain = 'eunhaseoul.com';
      publicModel.externalBaseUrl = 'http://eunhaseoul.com';
      res.setHeader('Content-Type', 'text/javascript');
      res.send('var publicModel =' + JSON.stringify(publicModel));
    }
  });
});

module.exports = router;
