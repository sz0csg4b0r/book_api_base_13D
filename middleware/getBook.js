module.exports = (objRep) => {
    const { books } = objRep;
    return (req, res, next) => {

        const bookIdAsNumber = parseInt(req.params.id, 10);
        const book = books.find(e => e.id === bookIdAsNumber); // új sor
        
        
        if (!book) {
            return res.status(404).json({ error: `Book not found with id: ${req.params.id}` });
        }
        res.locals.book = book;
        return next();
    };
};