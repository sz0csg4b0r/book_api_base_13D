const loki = require('lokijs');
const db = new loki('library.db');

function initDatabase(cb) {
    db.loadDatabase({}, err => { // lemaradt
        if (err) {
            return cb(err);
        }

        let bookModel = db.getCollection('books');
        if (bookModel === null) {
            bookModel = db.addCollection('books');
        }

        db.saveDatabase(err => {

            return cb(err, { db, bookModel });
        });
    });
};

module.exports.initDatabase = initDatabase;