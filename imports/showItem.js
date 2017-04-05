function showItem(db, collection, section) {
    return new Promise(function(resolve, reject) {
        db.collection(collection).find({
          section: section
        }).toArray(function(err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = showItem;
