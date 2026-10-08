module.exports = (objRep) => {
    const { books } = objRep;
    return (req, res, next) => {

        const bookIdAsNumber = parseInt(req.params.id, 10);
        let foundId = -1;

        for (let index = 0; index < books.length; index++) {
            if (books[index].id === bookIdAsNumber) {
                foundId = index;
                break;
            }
        }
        //ha nincs
        if (foundId === -1) {
            return res.status(404).json({ error: `Book not found with id: ${req.params.id}` });
        }
        res.locals.bookId = foundId;
        next();
    };
};