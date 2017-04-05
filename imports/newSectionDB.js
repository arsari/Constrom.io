function newSectionDB(db, number, name) {
    return new Promise(function(resolve, reject) {
        db.collection('constructionItems').insert({
            number: number,
            name: name,
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

module.exports = newSectionDB;
