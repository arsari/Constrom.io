// load require node modules
var colors = require('colors');
var moment = require('moment');

// class function definition
// create items tables
function Items(proj, item) {
    var hl = '='.repeat(100);
    var rowSep = '-'.repeat(100);
    var colSep = '|';
    var colInd = '  '; // 2 spc
    var colA = 'Item Num';
    var colB = 'Section';
    var colC = 'Description';
    var colD = 'Unit';
    var colE = 'Qty';
    var colF = '$Price';
    var colG = 'Item Cost';
    var d1 = ' '.repeat((10 - colA.length) / 2);
    var d2 = ' '.repeat((9 - colB.length) / 2);
    var d3 = ' '.repeat((23 - colC.length) / 2);
    var d4 = ' '.repeat((10 - colD.length) / 2);
    var d5 = ' '.repeat((9 - colE.length) / 2);
    var d6 = ' '.repeat((14 - colF.length) / 2);
    var d7 = ' '.repeat((19 - colG.length) / 2);
    var totalSum = 0;
    var totalMessage = 'Total Construction ROM for this project => ';

    // create table for items in project
    this.estTable = function() {
        if (item.length > 0) {
            if (proj !== null && proj.substr(0, 15) === moment().format("MMMM Do YYYY")) {
                var headColor = colors.bgCyan.white.bold;
            } else {
                var headColor = colors.bgMagenta.white.bold;
            }

            console.log(headColor(hl));
            console.log(headColor(d1 + colA + d1 + colSep + d2 + colB + d2 + colSep + d3 + colC + d3 + colSep + d4 + colD + d4 + colSep + d5 + colE + d5 + colSep + d6 + colF + d6 + colSep + d7 + colG + d7));
            console.log(headColor(hl));
            item.sort(function(a, b) {
                return a.section - b.section || a.description.localeCompare(b.description);
            });
            for (i = 0; i < item.length; i++) {
                this.num = i + 1;
                this.sec = item[i].section;
                this.desc = item[i].description;
                this.unit = item[i].unit;
                this.qty = item[i].qty;
                this.price = item[i].price;
                this.cost = item[i].cost;
                totalSum += item[i].cost;
                this.price = this.price.toLocaleString('en-US', {minimumFractionDigits: 2});
                this.cost = this.cost.toLocaleString('en-US', {minimumFractionDigits: 2});

                var sep1 = ' '.repeat(8 - this.num.toString().length);
                var sep2 = ' '.repeat(7 - this.sec.toString().length);
                var sep3 = ' '.repeat(21 - this.desc.length);
                var sep4 = ' '.repeat(8 - this.unit.length);
                var sep5 = ' '.repeat(7 - this.qty.toString().length);
                var sep6 = ' '.repeat(12 - this.price.toString().length);
                var sep7 = ' '.repeat(16 - this.cost.length);

                console.log(colInd + this.num + sep1 + colSep + colInd + this.sec + sep2 + colSep + colInd + this.desc + sep3 + colSep + colInd + this.unit + sep4 + colSep + colInd + this.qty + sep5 + colSep + colInd + this.price + sep6 + colSep + sep7 + '$' + this.cost + colInd);

                if (i === (item.length - 1)) {
                    var totalColor = colors.bgYellow.white.bold.italic;
                    totalSum = totalSum.toLocaleString('en-US', {minimumFractionDigits: 2});
                    console.log(hl);
                    var rowTotal = ' '.repeat(97 - totalMessage.length - totalSum.toString().length);
                    console.log(totalColor(rowTotal + totalMessage + '$' + totalSum + colInd));
                    console.log(hl);
                } else {
                    console.log(rowSep);
                }
            }
        } else {
            console.log('\n' +
                ' ☒ Estimate is Empty: No Records Found... '.bgRed.white.bold + '\n');
        }
    }

    // create table for items in db
    this.itemTable = function() {
        var hl = '='.repeat(100 - 30);
        var rowSep = '-'.repeat(100 - 30);
        var headColor = colors.bgMagenta.white.bold;
        console.log(headColor(hl));
        console.log(headColor(d1 + colA + d1 + colSep + d2 + colB + d2 + colSep + d3 + colC + d3 + colSep + d4 + colD + d4 + colSep + d6 + colF + d6));
        console.log(headColor(hl));
        for (i = 0; i < item.length; i++) {
            this.num = i + 1;
            this.sec = proj[0].number;
            this.desc = item[i].description;
            this.unit = item[i].unit;
            this.price = item[i].price;
            this.price = this.price.toLocaleString('en-US', {minimumFractionDigits: 2});

            var sep1 = ' '.repeat(8 - this.num.toString().length);
            var sep2 = ' '.repeat(7 - this.sec.toString().length);
            var sep3 = ' '.repeat(21 - this.desc.length);
            var sep4 = ' '.repeat(8 - this.unit.toString().length);
            var sep6 = ' '.repeat(12 - this.price.toString().length);

            console.log(colInd + this.num + sep1 + colSep + colInd + this.sec + sep2 + colSep + colInd + this.desc + sep3 + colSep + colInd + this.unit + sep4 + colSep + colInd + this.price + sep6);
            console.log(rowSep);
        }
    }

    this.toFile = function() {
        var output = '';
        output += hl + '\n';
        output += d1 + colA + d1 + colSep + d2 + colB + d2 + colSep + d3 + colC + d3 + colSep + d4 + colD + d4 + colSep + d5 + colE + d5 + colSep + d6 + colF + d6 + colSep + d7 + colG + d7 + '\n';
        output += hl + '\n';
        item.sort(function(a, b) {
            return a.section - b.section || a.description.localeCompare(b.description);
        });
        for (i = 0; i < item.length; i++) {
            this.num = i + 1;
            this.sec = item[i].section;
            this.desc = item[i].description;
            this.unit = item[i].unit;
            this.qty = item[i].qty;
            this.price = item[i].price;
            this.cost = item[i].cost;
            totalSum += item[i].cost;
            this.cost = this.cost.toLocaleString('en-US', {minimumFractionDigits: 2});

            var sep1 = ' '.repeat(8 - this.num.toString().length);
            var sep2 = ' '.repeat(7 - this.sec.toString().length);
            var sep3 = ' '.repeat(21 - this.desc.length);
            var sep4 = ' '.repeat(8 - this.unit.length);
            var sep5 = ' '.repeat(7 - this.qty.toString().length);
            var sep6 = ' '.repeat(12 - this.price.toString().length);
            var sep7 = ' '.repeat(16 - this.cost.length);

            output += colInd + this.num + sep1 + colSep + colInd + this.sec + sep2 + colSep + colInd + this.desc + sep3 + colSep + colInd + this.unit + sep4 + colSep + colInd + this.qty + sep5 + colSep + colInd + this.price + sep6 + colSep + sep7 + '$' + this.cost + colInd + '\n';

            if (i === (item.length - 1)) {
                var totalColor = colors.bgYellow;
                totalSum = totalSum.toLocaleString('en-US', {minimumFractionDigits: 2});
                output += hl + '\n';
                var rowTotal = ' '.repeat(97 - totalMessage.length - totalSum.toString().length);
                output += rowTotal + totalMessage + '$' + totalSum + colInd + '\n';
                output += hl + '\n';
            } else {
                output += rowSep + '\n';
            }
        }
        return output;
    }
}

// export function
module.exports = Items;
