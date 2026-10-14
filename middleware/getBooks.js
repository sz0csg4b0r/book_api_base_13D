module.exports = (objRep) => {
    const { books } = objRep;
    return (req, res, next) => {
        console.table(books);
        //return res.status(200).json(books);
        res.locals.books = books;   // új sor
        return next();   // új sor
    };
};

