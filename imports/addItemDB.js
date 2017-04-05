// add item to db.collection.projectReg
function addItemDB(db, secNum, item) {
    return new Promise(function(resolve, reject) {
        db.collection('constructionItems').findAndModify(
            {'section': secNum},
            {'number': 1},
            { $addToSet: { items: item}},
            {'new': true}
        , function(err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data.value);
            }
        });
    });
}

module.exports = addItemDB;
