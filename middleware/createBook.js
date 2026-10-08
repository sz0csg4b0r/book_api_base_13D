module.exports = (objRep) => {
    const { books } = objRep;
    return (req, res, next) => {
        if (typeof req.body.title == 'undefined' || typeof req.body.author == 'undefined') {
            return res.status(400).json({ error: 'Missing title or author' });
        }
        const newBook = {
            //id: globalId,
            id: objRep.nextId,
            title: req.body.title,
            author: req.body.author
        };
        books.push(newBook);
        //globalId++; 
        objRep.nextId++;
        return res.status(201).json(newBook);
    };
};