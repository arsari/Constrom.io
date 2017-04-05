var itemsTable = require('./itemsTable');

function nProjectFile(proj) {
    var output = '';
    output += '\n' + '*'.repeat(45) + ' New ' + '*****' + '\n';
    output += ' Project Number: ' + proj.number + '\n';
    output += ' Project Name: ' + proj.name + '\n';
    output += ' Project City: ' + proj.city + '\n';
    output += ' Project Created on: ' + proj.createdAt + '\n';
    output += '*'.repeat(55) + '\n';

    var items = new itemsTable(proj.createdAt, proj.items);
    output += items.toFile();
    return output;
}

module.exports = nProjectFile;
