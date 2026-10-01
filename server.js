const express = require('express');
const app = express();

app.use(express.json());

let globalId = 5;
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

const getBooks = (req, res, next) => {
    console.table(books);
    return res.status(200).json(books); //TODO: jsonbody
}

const createBook = (req, res, next) => {
    if (typeof req.body.title == 'undefined' || typeof req.body.author == 'undefined') {
        return res.status(400).json({ error: 'Missing title or author' });
    }

    const newBook = {
        id: globalId,
        title: req.body.title,
        author: req.body.author
    };

    books.push(newBook);
    globalId++;
    return res.status(201).json(newBook);

}

const getBookIndex = (req, res, next) => {

    const bookIdAsNumber = parseInt(req.params.id, 10);
    let foundId = -1;

    for (let index = 0; index < books.length; index++) {
        if (books[index].id === bookIdAsNumber) {
            foundId = index;
            break;
        }

    }
    //ha nincs
    if (foundId === -1) {
        return res.status(404).json({ error: `Book not found with id: ${req.params.id}` });
    }

    res.locals.bookId = foundId;
    next();

}

const getBook = (req, res, next) => {
    return res.status(200).json(books[res.locals.bookId]);
}

const deleteBook = (req, res, next) => {
    const deletedBook = books[res.locals.bookId];
    books.splice(res.locals.bookId, 1);
    return res.status(200).json({ deletedBook });
}


const updateBook = (req, res, next) => {
    if (typeof req.body.title !== 'undefined') {
        books[res.locals.bookId].title = req.body.title;
    }
    if (typeof req.body.author !== 'undefined') {
        books[res.locals.bookId].author = req.body.author;
    }

    //TODO: fix:error message...
    if ((typeof req.body.title == 'undefined') && (typeof req.body.author == 'undefined')) {
        return res.status(400).json({ error: 'Missing title or author' });
    }
    return res.status(200).json(books[res.locals.bookId]);
}


const search = (req, res, next) =>{

    if (typeof req.body.search == 'undefined') {
        return res.status(400).json({error: 'Missing search'});
    }
    const searchText = req.body.search;

    return res.status(200).json(books.filter(e=>e.title.includes(searchText) || e.author.includes(searchText)));

}


app.get('/book', getBooks);
app.post('/book', createBook);
app.get('/book/:id', getBookIndex, getBook);
app.delete('/book/:id', getBookIndex, deleteBook);
app.patch('/book/:id', getBookIndex, updateBook);
app.post('/search', search);








app.listen(3000, function () {
    console.log(`Server running on http://localhost:3000`)
})


