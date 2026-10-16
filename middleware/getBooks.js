module.exports = (objRep) => {
    const { bookModel } = objRep;
    return (req, res, next) => {
        //console.table(bookModel);
        //return res.status(200).json(books);
        res.locals.books = bookModel.find();   // új sor
        return next();   // új sor
    };
};

