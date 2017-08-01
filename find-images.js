var request = require('request');
var cheerio = require('cheerio');

request('https://www.google.com.br/search?tbm=isch&q=arroz', function (error, response, html) {
	if (!error && response.statusCode == 200) {
		var $ = cheerio.load(html);
		$('.images_table img').each(function(i, element){
			console.log(element.attribs.src);
		});

		// pegar o próximo link
		// $('.b:last-child .fl').each(function(i, element) {
		// 	console.log("link", element.attribs.href);
		// });
	}
});

