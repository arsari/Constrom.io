function updateProject(db, number, name, city) {
    return new Promise(function(resolve, reject) {
        db.collection('projectsReg').update({
            number: number
        }, {
            '$set': {
                number: number,
                name: name,
                city: city
            }
        }, function(err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = updateProject;
