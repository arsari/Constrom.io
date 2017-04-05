var colors = require('colors');

// header function definition
function header() {
    console.log(' '.bgRed.repeat(100));
    console.log('    ######   #######  ##    ##  ######  ######## ########   #######  ##     ##     ####  #######    '.bgRed);
    console.log('   ##    ## ##     ## ###   ## ##    ##    ##    ##     ## ##     ## ###   ###      ##  ##     ##   '.bgRed);
    console.log('   ##       ##     ## ####  ## ##          ##    ##     ## ##     ## #### ####      ##  ##     ##   '.bgRed);
    console.log('   ##       ##     ## ## ## ##  ######     ##    ########  ##     ## ## ### ##      ##  ##     ##   '.bgRed);
    console.log('   ##       ##     ## ##  ####       ##    ##    ##   ##   ##     ## ##     ##      ##  ##     ##   '.bgRed);
    console.log('   ##    ## ##     ## ##   ### ##    ##    ##    ##    ##  ##     ## ##     ## ###  ##  ##     ##   '.bgRed);
    console.log('    ######   #######  ##    ##  ######     ##    ##     ##  #######  ##     ## ### ####  #######    '.bgRed);
    console.log(' '.bgRed.repeat(100));
    var title = 'CONSTRUCTION ROUGH ORDER OF MAGNITUDE ESTIMATE APP';
    var version = ' - v1.2.170404'
    var sep = ' '.repeat((100 - title.length - version.length) / 2);
    var titleColor = colors.bgRed.white.bold;
    console.log(titleColor(sep + title + version + sep));
    console.log(' '.bgRed.repeat(100));
    console.log('-'.yellow.repeat(100));
}

module.exports = header;
