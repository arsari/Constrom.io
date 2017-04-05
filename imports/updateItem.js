function updateItem(db, number, section, description, unit, quantity, price, cost) {
    return new Promise(function(resolve, reject) {
        db.collection('constructionItems').update({
              number: number
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

module.exports = updateItem;
