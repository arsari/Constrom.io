var itemsTable = require('./itemsTable.js');

function eProjectFile(proj) {
    var output = '';
    output += '\n' + '*'.repeat(40) + ' Editing ' + '*****' + '\n';
    output += ' Project Number: ' + proj.number + '\n';
    output += ' Project Name: ' + proj.name + '\n';
    output += ' Project City: ' + proj.city + '\n';
    output += ' Project Created on: ' + proj.createdAt + '\n';

    if (proj.modifiedAt) {
        output += ' Project Modified on: ' + proj.modifiedAt + '\n';
        output += '*'.repeat(55) + '\n';

        var items = new itemsTable(proj.createdAt, proj.items);
        output += items.toFile();
    } else {
        output += '*'.repeat(55) + '\n';

        var items = new itemsTable(proj.createdAt, proj.items);
        output += items.toFile();
    }
    return output;
}

module.exports = eProjectFile;
