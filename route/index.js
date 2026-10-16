const uuid = require('uuid');
const getBooksMW = require('../middleware/getBooks');
const getBookMW = require('../middleware/getBook');
const createBookMW = require('../middleware/createBook');
const deleteBookMW = require('../middleware/deleteBook');
const updateBookMW = require('../middleware/updateBook');
const searchMW = require('../middleware/search');
const renderMW = require('../middleware/render');

function addRoutes(app, db, bookModel) {
    
    const objRep = {
        bookModel,
        db,
        uuid
    }

    //Böngésző:
    app.get('/', getBooksMW(objRep), renderMW(objRep, 'index'));



    //JSON VÁLASZ: 
    app.get('/api/book', getBooksMW(objRep), (req, res, next) => res.json(res.locals.books));
    app.post('/api/book', createBookMW(objRep), (req, res, next) => res.json(res.locals.book).status(201));
    app.get('/api/book/:id', getBookMW(objRep), (req, res, next)=> res.json(res.locals.book));
    app.delete('/api/book/:id',  getBookMW(objRep), deleteBookMW(objRep), (req, res, next)=> res.json(res.locals.book));
    app.patch('/api/book/:id',  getBookMW(objRep), updateBookMW(objRep), (req, res, next)=> res.json(res.locals.book));
    app.post('/api/search', searchMW(objRep), (req, res, next)=> res.json(res.locals.books));

}

module.exports = addRoutes;