// load require node modules
var colors = require('colors');

// function definition
// createb project table
function projTable(data) {
    var hl = '='.repeat(100);
    var rowSep = '-'.repeat(100);
    var colSep = '|';
    var colInd = '  '; // 2 spc
    var colA = 'Project Number';
    var colB = 'Project Name';
    var colC = 'Project Location';
    var d1 = ' '.repeat((20 - colA.length) / 2);
    var d2 = ' '.repeat((54 - colB.length) / 2);
    var d3 = ' '.repeat((24 - colC.length) / 2);
    var headColor = colors.bgWhite.blue;

    console.log('\n' + headColor(hl));
    console.log(headColor(d1 + colA + d1 + colSep + d2 + colB + d2 + colSep + d3 + colC + d3));
    console.log(headColor(hl));

    for (i = 0; i < data.length; i++) {
        var num = data[i].number;
        var desc = data[i].name;
        var loc = data[i].city;
        var sep1 = ' '.repeat(18 - num.toString().length);
        var sep2 = ' '.repeat(52 - desc.length);

        console.log(colInd + num + sep1 + colSep + colInd + desc + sep2 + colSep + colInd + loc);
        console.log(rowSep);
    }
}

// export function
module.exports = projTable;
