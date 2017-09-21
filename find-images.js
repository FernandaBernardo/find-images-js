const downloadHelper = require('./download-helper'),
    search = require('./search');

let foods = ['arroz', 'feijao'];
foods.map(food => {
    search.searchImage(food, result => {
        downloadHelper.downloadImages(result.query, result.urls);
    });
})