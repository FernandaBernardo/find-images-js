const shell = require('shelljs'),
    curlHelper = require('./curl-helper');

let downloadHelper = {
    downloadImage(url, dest, fileName) {
        dest = `food-images/${dest}/image${fileName}.png`;
        curlHelper.downloadFile(url, dest, false);
    },

    downloadImages(dest = '', urls = []) {
        shell.mkdir("-p", `food-images/${dest}`);
        urls.forEach((url, i) => this.downloadImage(url, dest, i));
    },
}

 module.exports = downloadHelper;