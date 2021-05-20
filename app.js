const express = require('express');
const app = express();
const ExpressError = require('./helpers/expressError');


app.use(express.json());

const authRoutes = require('./routes/auth')
const itemsRoutes = require('./routes/items')
const addressRoutes = require('./routes/addresses')

app.use('/auth', authRoutes);
app.use('/items', itemsRoutes);
app.use('/address', addressRoutes);

app.get('/', (req, res) => res.send('Hello World'))

app.use((req, res, next) => {
    const err = new ExpressError("Not Found", 404)

    return next(err);
})

app.use((err, req, res, next) => {
    res.status((err.status || 500));

    return res.json({
        status: err.status,
        message: err.message
    })
})

module.exports = app;