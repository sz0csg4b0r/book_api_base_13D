module.exports = (objRep) => {
    const { books } = objRep;
    return (req, res, next) => {
        console.table(books);
        return res.status(200).json(books);
    };
};

