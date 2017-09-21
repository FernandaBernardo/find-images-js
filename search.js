const request = require('request'),
    cheerio = require('cheerio'),
    googleUrl = "https://www.google.com.br";

let search = {
    setUrls($, start, urls = []) {
        $('.images_table img').each(function(i, element) {
            urls.push(element.attribs.src);
        });
    },

    searchImage(query = '', callback) {
        let urls = [];
        request(googleUrl + '/search?tbm=isch&q=' + query, function (error, response, html) {
            let $ = cheerio.load(html);
            if (!error && response.statusCode == 200) {
                search.setUrls($, 0, urls);
        
                $('.b:last-child .fl').each(function(i, element) {
                    request(googleUrl + element.attribs.href, function(error, response, html) {
                        $ = cheerio.load(html);
                        if (!error && response.statusCode == 200) {
                            search.setUrls($, 20, urls);
                            callback({query, urls});
                        }
                    });
                });
            }
        });
    },
}

module.exports = search;