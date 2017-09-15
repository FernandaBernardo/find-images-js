const request = require('request'),
	cheerio = require('cheerio'),
	shell = require('shelljs'),
	curlHelper = require('./curl-helper');

let downloadFoodImages = function(query = 'arroz') {
	shell.mkdir("-p", `food-images/${query}`);
	
	let downloadImagesFromHtml = function($, start) {
		$('.images_table img').each(function(i, element) {
			let url = element.attribs.src;
			let dest = `food-images/${query}/image${i + start}.png`;
			curlHelper.downloadFile(url, dest, false);
		});
	}
	
	request(googleUrl + '/search?tbm=isch&q=' + query, function (error, response, html) {
		let $ = cheerio.load(html);
		if (!error && response.statusCode == 200) {
			downloadImagesFromHtml($, 0);
	
			$('.b:last-child .fl').each(function(i, element) {
				request(googleUrl + element.attribs.href, function(error, response, html) {
					$ = cheerio.load(html);
					if (!error && response.statusCode == 200) {
						downloadImagesFromHtml($, 20);
					}
				});
			});
		}
	});
}

const googleUrl = "https://www.google.com.br";
let foods = ['arroz', 'tapioca'];
foods.map(food => downloadFoodImages(food));
