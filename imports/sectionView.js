// call external require files
var colors = require('colors');

var itemsTable = require('./itemsTable.js');

function sectionView(sec) {
    console.log('\n' +
        '*'.repeat(55));
    console.log(' Section Number: ', sec[0].number);
    console.log(' Section Description: ', sec[0].name);
    console.log('*'.repeat(55));

    var items = new itemsTable(sec, sec[0].items);
        items.itemTable();
}

module.exports = sectionView;
