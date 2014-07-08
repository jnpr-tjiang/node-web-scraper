
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
	symbol = req.query.s;
	url = 'http://finance.yahoo.com/q/ks?s=' + symbol;

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);

			var json = {};

			$('.title').filter(function(){
		        var data = $(this);
		        json.name = data.children().first().text();
	        });

			$('.yfnc_tablehead1').filter(function(){
		        var data = $(this);
				json[data.text()] = data.parent().children().last().text();
	        });
		}

		var result = JSON.stringify(json, null, 4);
		res.send(result + '\n');
	})
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app; 	