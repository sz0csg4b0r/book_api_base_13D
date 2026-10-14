module.exports = (objRep) => {
    const { books } = objRep;
    return (req, res, next) => {
        if (typeof req.body.title !== 'undefined') {
            res.locals.book.title = req.body.title;
        }
        if (typeof req.body.author !== 'undefined') {
            res.locals.book.author = req.body.author;
        }
        if ((typeof req.body.title == 'undefined') && (typeof req.body.author == 'undefined')) {
            return res.status(400).json({ error: 'Missing title or author' });
        }
        return next();
    };
};