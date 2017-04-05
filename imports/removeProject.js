var colors = require('colors')

function removeProject(db, number) {
    return new Promise(function(resolve, reject) {
        db.collection('projectsReg').remove({
            number: number
        }, function(err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(' Project Deleted... '.bgYellow);
            }
        });
    });
}

module.exports = removeProject;
