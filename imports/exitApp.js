function exitApp() {
    var ind = ' '.bgMagenta;
    var line = '-'.bgMagenta.repeat(98);
    var vBar = '|'.bgMagenta;
    var message = 'You exit the app, Bye Bye!!!';
    var colorMessage = message.bgMagenta.white.bold;
    var sep = ' '.bgMagenta.repeat((96 - message.length) / 2);

    console.log('\n');
    console.log(ind + line + ind);
    console.log(ind + vBar + sep + colorMessage + sep + vBar + ind);
    console.log(ind + line + ind);
    console.log('\n');
}

module.exports = exitApp;
