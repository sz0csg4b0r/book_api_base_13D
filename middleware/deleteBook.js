module.exports = (objRep) => {
    const { books } = objRep;
    return (req, res, next) => {
        const deletedBook = books[res.locals.bookId];
        books.splice(res.locals.bookId, 1);
        return res.status(200).json({ deletedBook });
    };
};