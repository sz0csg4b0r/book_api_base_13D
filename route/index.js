const getBooksMW = require('../middleware/getBooks');
const getBookMW = require('../middleware/getBook');
const createBookMW = require('../middleware/createBook');
const deleteBookMW = require('../middleware/deleteBook');
const updateBookMW = require('../middleware/updateBook');
const searchMW = require('../middleware/search');



function addRoutes(app) {
    //let globalId = 5;
    const books = [
        {
            id: 1,
            title: 'Kis herceg',
            author: 'Herczeg András'
        },
        {
            id: 2,
            title: 'Második könyv',
            author: 'Második szerző'
        },
        {
            id: 3,
            title: 'Harmadik könyv',
            author: 'Dj. Mixát Kálmán'
        },
        {
            id: 4,
            title: 'Negyedick Könyv',
            author: 'Lakatos Botond'
        }
    ]

    const objRep = {
        books,
        nextId : 5
    }


    app.get('/book', getBooksMW(objRep));
    app.post('/book', createBookMW(objRep));
    app.get('/book/:id', getBookMW(objRep), (req, res, next)=> res.json(books[res.locals.bookId]) );
    app.delete('/book/:id',  getBookMW(objRep), deleteBookMW(objRep));
    app.patch('/book/:id',  getBookMW(objRep), updateBookMW(objRep));
    app.post('/search', searchMW(objRep));


    





}

module.exports = addRoutes;