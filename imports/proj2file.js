// load require node modules
var colors = require('colors');

// import project functions
var eProjFile = require('./eProjectFile');
var nProjFile = require('./nProjectFile');

// function definition
// generate print output file
function proj2file(proj, opt) {
    var output;

    if (opt === '2') {
        output = eProjFile(proj);
    } else if (opt === '1') {
        output = nProjFile(proj);
    }

    var fs = require('fs');

    fs.writeFile('estimate-proj' + proj.number + '.txt', output, function(err) {
        if (err) {

            return console.log(err);
        } else {

            return console.log(' ☑ Text File Created!!! '.bgYellow);
        }
    });
}

module.exports = proj2file;
