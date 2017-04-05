// load require node modules
var moment = require('moment');

// function definition
// add item to db.collection.projectReg
function addItemProject(db, number, item) {
    return new Promise(function(resolve, reject) {
        db.collection('projectsReg').findAndModify({
            'number': number
        }, {
            'number': 1
        }, {
            $set: {
                modifiedAt: moment().format('MMMM Do YYYY, h:mm:ss a')
            },
            $addToSet: {
                items: item
            }
        }, {
            'new': true
        }, function(err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data.value);
            }
        });
    });
}

module.exports = addItemProject;
