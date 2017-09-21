const shell = require('shelljs');

let curlHelper = {
    downloadFile(url, dest, secured = true) {
        let curlCommand = secured ? 'curl' : 'curl -k';
        shell.exec(`${curlCommand} ${url} > ${dest}`);
    }
}
module.exports = curlHelper;