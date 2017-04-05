function updateItemProject(db, number, index, item) {
    return new Promise(function(resolve, reject) {
        db.collection('projectsReg').update({
              number: number
              "items[index]"
          }, {
            section: section,
            description: description,
            unit: unit,
            quantity: quantity,
            price: price,
            cost: cost
        }, function(err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        });
    });
}

module.exports = updateItemProject;
