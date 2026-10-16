module.exports = (objRep) => {
    const { bookModel, db } = objRep;
    return (req, res, next) => {
        bookModel.remove(res.locals.book);
        db.saveDatabase(err=>{
            if(err){
                return next(err);
            }
            return next();
        })
    };
};