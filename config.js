require('dotenv');

const PORT = +process.env.PORT || 3000;

const DB_URI =
    process.env.NODE_ENV === 'test'
    ? 'postgres://farm-fresh-test'
    : 'postgres://farm-fresh'


module.exports = {
    DB_URI,
    PORT
}