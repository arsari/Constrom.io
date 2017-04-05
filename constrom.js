/*
* CONSTROM.io
* Construction Rough Order of Magnitude Estimate App
* Intro-to-JS Winter 2017
* Course Final Project
* Arturo Santiago-Rivera
* Codetrotters Academy, San Juan PR
* March 29, 2017
*/

// load require node modules
var colors = require('colors');
var prompt = require('prompt-sync')();
var moment = require('moment');

// db collections definition
var projCollect = 'projectsReg';
var itemCollect = 'constructionItems';

// import project functions
var init = require('./imports/initDB');
var clear = require('./imports/clearTerminal');
var header = require('./imports/header');
var getAll = require('./imports/getAll');
var projTable = require('./imports/projectsTable');
var newProj = require('./imports/newProject');
var showProj = require('./imports/showProject');
var eProjView = require('./imports/eProjectView');
var nProjView = require('./imports/nProjectView');
var addItemProj = require('./imports/addItemProject');
var proj2file = require('./imports/proj2file');
var addItemDB = require('./imports/addItemDB');
var updateItem = require('./imports/updateItem');
var removeItem = require('./imports/removeItem');
var itemsTable = require('./imports/itemsTable');
var newSec = require('./imports/newSectionDB');
var showSec = require('./imports/showSection');
var secTable = require('./imports/sectionTable');
var secView = require('./imports/sectionView');
var exitApp = require('./imports/exitApp');

// init mongodb
init(function(err, db) {
    if (err) {
        console.log(err + '\n');
    } else {
        // initial menu call
        var menuHandler;

        function initialize() {
            projectsMenu(db);
            process.stdin.setEncoding('utf8');
            process.stdin.on('readable', checkMenu);

            function checkMenu() {
                var input = process.stdin.read();
                if (input !== null) {
                    menuHandler(input.trim());
                }
            }
        }

        /**
         * function declaration
         * projects menu
         * @param {db} db database
         * @returns {functions} to list projects or items in tables or menu change
         */
        function projectsMenu(db) {
            clear();
            header();

            var ind = '   ';
            var opt1 = 'Project Menu Options:';
            var menu1 = '[1] Create Project | [2] Edit Project | [3] Modified DB | [0] Exit';
            var sep1 = ' '.repeat(100 - ind.length - opt1.length);
            var sep2 = ' '.repeat((100 - menu1.length) / 2);
            var optColor = colors.white.bgBlue;
            var menuColor = colors.white.bold.bgBlue;

            console.log(optColor(ind + opt1 + sep1));
            console.log(menuColor(sep2 + menu1 + sep2));
            console.log('-'.yellow.repeat(100));
            console.log('⬇︎ Select menu option, then press enter [ '.bgGreen + '☑ Database is Running!!!'.bgGreen.yellow.bold + ' ] '.bgGreen);

            // initial menu options evaluation
            menuHandler = function(menu1opt) {
                switch (menu1opt) {
                    case '1':
                        getAll(db, projCollect).then(function(proj) {
                            if (proj.length === 0) {
                                console.log('\n');
                                console.log(' ***** ☒ No Project record in Database ***** '.bgRed);
                            } else {
                                projTable(proj);
                            }
                            console.log('\n In prompt, press enter if Project number exist... '.bgRed.yellow.bold);
                            console.log('*'.repeat(55));
                            var number = Number(prompt(' Project number: '));
                            if (number === 0) {
                                return Promise.reject(' Returning to Menu!!! '.bgBlue);
                            } else {
                                var name = prompt(' Project name: ');
                                var city = prompt(' Project city: ');
                                console.log('*'.repeat(55));
                                return newProj(db, number, name, city);
                            }
                        }).then(function(proj) {
                            return itemsMenu(db, proj.ops[0], menu1opt);
                        }).catch(function(err) {
                            console.log('\n', err);
                            return setTimeout(function() {
                                projectsMenu(db);
                            }, 1500);
                        });
                        break;
                    case '2':
                        getAll(db, projCollect).then(function(data) {
                            if (data.length === 0) {
                                console.log('\n');
                                console.log(' ***** ☒ No Project record in Database ***** '.bgRed);
                                return Promise.reject(' Returning to Menu!!! '.bgBlue);
                            } else {
                                projTable(data);
                                console.log('\n In prompt, press enter for return to menu... '.bgRed.yellow.bold);
                                console.log('-'.repeat(46));
                                var projNum = Number(prompt(' Enter number of project to modified ▶︎ '.bgGreen));
                                if (projNum === 0) {
                                    return Promise.reject(' Returning to Menu!!! '.bgBlue);
                                } else {
                                    return showProj(db, projNum);
                                }
                            }
                        }).then(function(proj) {
                            var projCre = proj[0].createdAt;
                            if (projCre.substr(0, 15) === moment().format("MMMM Do YYYY")) {
                                opt = '1';
                                return itemsMenu(db, proj[0], opt);
                            } else {
                                opt = '2';
                                return itemsMenu(db, proj[0], menu1opt);
                            }
                        }).catch(function(err) {
                            console.log('\n', err);
                            return setTimeout(function() {
                                projectsMenu(db);
                            }, 1500);
                        });
                        break;
                    case '3':
                        return dbMenu(db, itemCollect);
                        break;
                    case '0':
                        exitApp();
                        return setTimeout(function() {
                            clear();
                        }, 1500);
                        break;
                    default:
                        console.log('\n' +
                            ' ***** ☒ Invalid Menu Option ***** '.bgRed);
                        return setTimeout(function() {
                            projectsMenu(db);
                        }, 1500);
                }
            }
        }

        /**
         * function declaration
         * rom estimate menu
         * @param {db} db database
         * @param {proj} proj object array
         * @param {opt} opt previous menu option selection
         * @returns {functions} to list projects or items in tables or menu change
         */
        function itemsMenu(db, proj, opt) {
            clear();
            header();

            var ind = '   ';
            var opt2 = 'ROM Estimate Menu Options:';
            var menu2 = '[4] Add Item | [5] Edit Item | [6] Delete Item | [7] Export to TXT File | [0] Project Menu ';
            var sep3 = ' '.repeat(100 - ind.length - opt2.length);
            var sep4 = ' '.repeat((100 - menu2.length) / 2);
            var optColor = colors.white.bgBlue;
            var menuColor = colors.white.bold.bgBlue;

            console.log(optColor(ind + opt2 + sep3));
            console.log(menuColor(sep4 + menu2 + sep4));
            console.log('-'.yellow.repeat(100));

            if (opt === '2') {
                eProjView(proj);
            } else if (opt === '1') {
                nProjView(proj);
            }

            console.log('\n⬇︎ Select menu option, then press enter: '.bgGreen);

            menuHandler = function(menu2opt) {
                switch (menu2opt) {
                        // add proj item
                    case '4':
                        console.log('\n Adding Item to Project '.bgCyan + '*'.repeat(31));
                        var item = {};
                        item.section = Number(prompt(' Item section (6 digits): '));
                        item.description = prompt(' Item description: ');
                        item.unit = prompt(' Item unit: ');
                        item.qty = Number(prompt(' Item quantity: '));
                        item.price = Number(prompt(' Item price: $'));
                        item.cost = item.qty * item.price;
                        console.log(' Item cost: $', item.cost);
                        console.log('*'.repeat(55));
                        addItemProj(db, proj.number, item).then(function(proj) {
                            var projCre = proj.createdAt;
                            if (projCre.substr(0, 15) === moment().format("MMMM Do YYYY")) {
                                opt = '1';
                                return itemsMenu(db, proj, opt);
                            } else {
                                opt = '2';
                                return itemsMenu(db, proj, opt);
                            }
                        }).catch(function(err) {
                            console.log('\n Error in Option [4]... ', err);
                        });
                        break;
                        // edit proj item
                    case '5':
                        console.log('\n Edit Project Item '.bgCyan + '*'.repeat(36));
                        var userInput = Number(prompt(' Item number: '));
                        var num = userInput - 1;
                        var item = {};
                        item.section = Number(prompt(' Item section: '));
                        item.description = prompt(' Item description: ');
                        item.unit = prompt(' Item unit: ');
                        item.qty = Number(prompt(' Item quantity: '));
                        item.price = Number(prompt(' Item price: $'));
                        item.cost = item.qty * item.price;
                        console.log(' Item cost: $', item.cost);
                        console.log('*'.repeat(55));
                        updateItem(db, proj.number, proj.items[num], item).then(function(proj) {
                            var projCre = proj.createdAt;
                            if (projCre.substr(0, 15) === moment().format("MMMM Do YYYY")) {
                                opt = '1';
                                return itemsMenu(db, proj, opt);
                            } else {
                                opt = '2';
                                return itemsMenu(db, proj, opt);
                            }
                        }).catch(function(err) {
                            console.log('\n Error in Option [5]... ', err);
                        });
                        break;
                        // del proj item
                    case '6':
                        console.log('\n Deleting Project Item '.bgCyan + '*'.repeat(33));
                        var userInput = Number(prompt(' Enter number of item to delete: '));
                        var index = userInput - 1;
                        removeItem(db, proj.number, proj.items[index]).then(function(message) {
                            console.log(message);
                            var projCre = proj.createdAt;
                            if (projCre.substr(0, 15) === moment().format("MMMM Do YYYY")) {
                                opt = '1';
                                return itemsMenu(db, proj, opt);
                            } else {
                                opt = '2';
                                return itemsMenu(db, proj, opt);
                            }
                        }).catch(function(err) {
                            console.log('Error in Option [6]... ', err);
                        });
                        break;
                        // export to txt file
                    case '7':
                        console.log('\n Sending Project ROM Estimate to TXT file... '.bgCyan + '*'.repeat(19));
                        proj2file(proj, opt);
                        setTimeout(function() {
                            var projCre = proj.createdAt;
                            if (projCre.substr(0, 15) === moment().format("MMMM Do YYYY")) {
                                opt = '1';
                                return itemsMenu(db, proj, opt);
                            } else {
                                opt = '2';
                                return itemsMenu(db, proj, opt);
                            }
                        }, 2000);
                        break;
                        // go to projects menu
                    case '0':
                        projectsMenu(db);
                        break;
                    default:
                        console.log('\n' +
                            ' ***** ☒ Invalid Menu Option ***** '.bgRed);
                        setTimeout(function() {
                            return itemsMenu(db, proj, opt);
                        }, 1500);
                }
            }
        }

        /**
         * function declaration
         * rom estimate menu
         * @param {db} db database
         * @param {opt} opt previous menu option selection
         * @returns {functions} to list items in tables or menu change
         */
        function dbMenu(db, itemCollect, sec) {
            clear();
            header();

            var ind = '   ';
            var opt3 = 'Database Menu Options';
            var menu3 = '[A] New Section | [B] Add Item | [C] Edit Item | [D] Del Item | [E] List items | [0] Projects Menu';
            var sep5 = ' '.repeat(100 - ind.length - opt3.length);
            var sep6 = ' '.repeat((100 - menu3.length) / 2);
            var optColor = colors.white.bgBlue;
            var menuColor = colors.white.bold.bgBlue;

            console.log(optColor(ind + opt3 + sep5));
            console.log(menuColor(sep6 + menu3 + sep6));
            console.log('-'.yellow.repeat(100));
            console.log(' [ '.bgGreen + '☑ Database is Running!!!'.bgGreen.yellow.bold + ' ] '.bgGreen);

            getAll(db, itemCollect).then(function(sec) {
                if (sec.length === 0) {
                    console.log('\n ***** ☒ No Section record in Database ***** '.bgRed);
                } else {
                    secTable(sec);
                }
                console.log('\n⬇︎ Select menu option, then press enter '.bgGreen);
            }).catch(function(err) {
                console.log('\n', err);
                return setTimeout(function() {
                    projectsMenu(db);
                }, 1500);
            });

            menuHandler = function(menu3opt) {
                switch (menu3opt) {
                        // add item to db
                    case 'a':
                        console.log('\n In prompt, press enter if Project number exist... '.bgRed.yellow.bold);
                        console.log('*'.repeat(55));
                        var number = Number(prompt(' Section number (6 digits): '));
                        if (number === 0) {
                            return Promise.reject(' Returning to Menu!!! '.bgBlue);
                        } else {
                            var name = prompt(' Section name: ');
                            console.log('*'.repeat(55));
                            newSec(db, number, name).then(function(sec) {
                                return dbMenu(db, itemCollect, sec);
                            }).catch(function(err) {
                                console.log('Error in Option [A]... ', err);
                            });
                        }
                        break;
                    case 'b':
                        console.log('\n In prompt, press enter for return to menu... '.bgRed.yellow.bold);
                        console.log('-'.repeat(46));
                        var secNum = Number(prompt(' Enter section number to modified ▶︎ '.bgGreen));
                        if (secNum === 0) {
                            return Promise.reject(' Returning to Menu!!! '.bgBlue);
                        } else {
                            showSec(db, secNum).then(function(sec) {
                                var item = {};
                                console.log('\n Adding Item to DB '.bgYellow + '*'.repeat(36));
                                item.description = prompt(' Item description: ');
                                item.unit = prompt(' Item unit: ');
                                item.price = Number(prompt(' Item price: $'));
                                console.log('*'.repeat(55));
                                addItemDB(db, sec.number, item)
                            }).then(function(sec) {
                                return dbMenu(db, itemCollect);
                            }).catch(function(err) {
                                console.log('Error in Option [B]... ', err);
                            });
                        }
                        break;
                        // edit item on db
                    case 'c':
                        console.log('\n' +
                            ' ***** ☒ Under Construction ***** '.bgRed);
                        return dbMenu(db, itemCollect);
                        // updateItem(db, itemCollect);
                        break;
                        // del item on db
                    case 'd':
                        console.log('\n' +
                            ' ***** ☒ Under Construction ***** '.bgRed);
                        return dbMenu(db, itemCollect);
                        // removeItem(db, itemCollect);
                        break;
                        // list items on db
                    case 'e':
                        console.log('\n In prompt, press enter for return to menu... '.bgRed.yellow.bold);
                        console.log('-'.repeat(46));
                        var secNum = Number(prompt(' Enter section number to modified ▶︎ '.bgGreen));
                        if (secNum === 0) {
                            return Promise.reject(' Returning to Menu!!! '.bgBlue);
                        } else {
                            showSec(db, secNum).then(function(sec) {
                                secView(sec);
                                return Number(prompt(' Press enter to continue... '.bgBlue));
                            }).then(function(sec) {
                                return dbMenu(db, itemCollect);
                            }).catch(function(err) {
                                console.log('Error in Option [B]... ', err);
                            });
                        }
                        break;
                        // previous menu
                    case '0':
                        projectsMenu(db);
                        break;
                    default:
                        console.log('\n' +
                            ' ***** ☒ Invalid Menu Option ***** '.bgRed);
                        setTimeout(function() {
                            return dbMenu(db, itemCollect);
                        }, 1500);
                }
            };
        }
        initialize();
    }
});
