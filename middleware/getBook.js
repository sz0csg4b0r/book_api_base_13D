module.exports = (objRep) => {
    const { bookModel } = objRep;
    return (req, res, next) => {

        const book = bookModel.findOne({id: req.params.id}); // új sor
                
        if (!book) {
            return res.status(404).json({ error: `Book not found with id: ${req.params.id}` });
        }
        res.locals.book = book;
        return next();
    };
};