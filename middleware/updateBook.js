module.exports = (objRep) => {
    const { books } = objRep;
    return (req, res, next) => {
        if (typeof req.body.title !== 'undefined') {
            books[res.locals.bookId].title = req.body.title;
        }
        if (typeof req.body.author !== 'undefined') {
            books[res.locals.bookId].author = req.body.author;
        }


        if ((typeof req.body.title == 'undefined') && (typeof req.body.author == 'undefined')) {
            return res.status(400).json({ error: 'Missing title or author' });
        }
        return res.status(200).json(books[res.locals.bookId]);
    };
};