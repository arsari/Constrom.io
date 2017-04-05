var colors = require('colors')

function removeItem(db, proj, index) {
    console.log(db, proj, index);
    return new Promise(function(resolve, reject) {
        db.collection('projectsReg').remove({
            "number": proj
        }, {
            "items": index

        }, function(err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(' Construction Item Deleted... '.bgYellow);
            }
        });
    });
}

module.exports = removeItem;
