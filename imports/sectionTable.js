// load require node modules
var colors = require('colors');

// function definition
// createb project table
function sectionTable(sec) {
    var hl = '='.repeat(100);
    var rowSep = '-'.repeat(100);
    var colSep = '|';
    var colInd = '  '; // 2 spc
    var colA = 'Section Number';
    var colB = 'Section Name ';
    var d1 = ' '.repeat((20 - colA.length) / 2);
    var d2 = ' '.repeat((79 - colB.length) / 2);
    var headColor = colors.bgWhite.blue;

    console.log('\n' + headColor(hl));
    console.log(headColor(d1 + colA + d1 + colSep + d2 + colB + d2));
    console.log(headColor(hl));

    for (i = 0; i < sec.length; i++) {
        var num = sec[i].number;
        var desc = sec[i].name;
        var sep1 = ' '.repeat(17 - num.toString().length);
        var sep2 = ' '.repeat(78 - desc.length);

        console.log(colInd + num + sep1 + colSep + colInd + desc);
        console.log(rowSep);
    }
}

// export function
module.exports = sectionTable;
