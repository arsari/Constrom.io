var itemsTable = require('./itemsTable.js');

function eProjectView(proj) {
    console.log('\n' +
        '*'.repeat(40) + ' Editing '.bgMagenta + '*****');
    console.log(' Project Number: ', proj.number);
    console.log(' Project Name: ', proj.name);
    console.log(' Project City: ', proj.city);
    console.log(' Project Created on: ', proj.createdAt);

    if (proj.modifiedAt) {
        console.log(' Project Modified on: ', proj.modifiedAt);
        console.log('*'.repeat(55));
        var items = new itemsTable(proj.createdAt, proj.items);
        items.estTable();
    } else {
        console.log('*'.repeat(55));
        var items = new itemsTable(proj.createdAt, proj.items);
        items.estTable();
    }
}

module.exports = eProjectView;
