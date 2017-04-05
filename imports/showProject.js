function showProject(db, number) {
    return new Promise(function(resolve, reject) {
        db.collection('projectsReg').find({
          number: number
        }).toArray(function(err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = showProject;
