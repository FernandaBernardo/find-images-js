const request = require('request'),
	cheerio = require('cheerio'),
	shell = require('shelljs');


let query = "arroz";
shell.mkdir("-p", "food-images/" + query);

request('https://www.google.com.br/search?tbm=isch&q=' + query, function (error, response, html) {
	if (!error && response.statusCode == 200) {
		var $ = cheerio.load(html);
		$('.images_table img').each(function(i, element){
			shell.exec("curl " + element.attribs.src + " > food-images/" + query + "/image" + i + ".png")
		});

		// pegar o próximo link
		// $('.b:last-child .fl').each(function(i, element) {
		// 	console.log("link", element.attribs.href);
		// });
	}
});

