const express = require('express');
const app = express();
const {authenticateJWT} = require('./middleware/authUser');
const ExpressError = require('./helpers/expressError');


app.use(express.json());
app.use(authenticateJWT)

const authRoutes = require('./routes/auth');
const itemsRoutes = require('./routes/items');
const addressRoutes = require('./routes/addresses');
const userRoutes = require('./routes/users');
const commentsRoutes = require('./routes/ratingComments');
const orderRoutes = require('./routes/order');

app.use('/auth', authRoutes);
app.use('/items', itemsRoutes);
app.use('/address', addressRoutes);
app.use('/user', userRoutes);
app.use('/comments', commentsRoutes);
app.use('/order', orderRoutes);

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