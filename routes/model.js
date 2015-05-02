var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

router.get('/public', function (req, res, next) {
  request('http://wordsareevil.wix.com/eunhaseoul', function (error, response, body) {
    var result = 'var publicModel = ';
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
      $('script').each(function (index, element) {
        if (element.children[0]) {
          var script = eval(element.children[0].data);
          if(typeof publicModel !== 'undefined') {
            publicModel.domain = 'eunhaseoul.com';
            publicModel.externalBaseUrl = 'http://eunhaseoul.com';
            result += JSON.stringify(publicModel);
          }
        }
      });
      res.setHeader('Content-Type', 'text/javascript');
      res.send(result);
    }
  });
});

module.exports = router;
