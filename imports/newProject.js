// load require node modules
var moment = require('moment');

// function definition
// add project to db.collection.projectReg
function newProject(db, number, name, city) {
    return new Promise(function(resolve, reject) {
        db.collection('projectsReg').insert({
            number: number,
            name: name,
            city: city,
            createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
            items: []
        }, function(err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        });
    });
}

// export function
module.exports = newProject;
