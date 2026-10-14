module.exports = (objRep) => {
    const { books } = objRep;
    return (req, res, next) => {
        const index = books.indexOf(res.locals.book)
        books.splice(index, 1);
        return next();
    };
};