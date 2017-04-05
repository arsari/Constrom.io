// call external require files
var colors = require('colors');

var itemsTable = require('./itemsTable.js');

function nProjectView(proj) {
    console.log('\n' +
        '*'.repeat(45) + ' New '.bgCyan + '*****');
    console.log(' Project Number: ', proj.number);
    console.log(' Project Name: ', proj.name);
    console.log(' Project City: ', proj.city);
    console.log(' Project Created on: ', proj.createdAt);
    console.log('*'.repeat(55));

    var items = new itemsTable(proj.createdAt, proj.items);
    items.estTable();
}

module.exports = nProjectView;
