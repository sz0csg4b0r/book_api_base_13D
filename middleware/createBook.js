module.exports = (objRep) => {
    const { bookModel, db, uuid } = objRep;
    return (req, res, next) => {
        if (typeof req.body.title == 'undefined' || typeof req.body.author == 'undefined') {
            return res.status(400).json({ error: 'Missing title or author' });
        }
        const newBook = {
            id: uuid.v4(),
            title: req.body.title,
            author: req.body.author
        };

        //uj rész - db használat és db mentés
        res.locals.book = bookModel.insert(newBook);
        db.saveDatabase(err =>{
            if(err){
                return next(err);
            }
            return next();      
        });
    };
};