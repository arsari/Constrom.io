function getAll(db, collection) {
  return new Promise(function(resolve, reject) {
    db.collection(collection).find().sort({
      number: 1,
    }).toArray(function(err, data) {
        if (err) {
            reject(err)
        } else {
            resolve(data);
        }
    });
  });
}

module.exports = getAll;
