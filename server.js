require('dotenv').config(); // új sor...
const { initDatabase } = require('./service/db');
const express = require('express');
const addRoutes = require('./route'); // automatikusan index.js-ből keresi
const app = express();

app.use(express.json());
app.set('view engine', 'ejs');

initDatabase((err, result) => {
    if (err) {
        return console.error(err);
    }
    const { db, bookModel } = result;

    addRoutes(app, db, bookModel);

    app.use((req, res) => {
        return res.status(404).json({
            error: `Endpoint or method
         not found': ${req.method} ${req.originalUrl}`
        });
    });

    app.listen(process.env.PORT, function () {
        console.log(`Server running on http://localhost:3000`)
    });
});












