module.exports = (objRep) => {
    const { books } = objRep;
    return (req, res, next) => {
        if (typeof req.body.search == 'undefined') {
            return res.status(400).json({ error: 'Missing search' });
        }
        const searchText = req.body.search;
        res.locals.books = books.filter(e => e.title.includes(searchText) || e.author.includes(searchText))
        return next();
    };
};