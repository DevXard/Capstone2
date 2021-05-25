require('dotenv');

const PORT = +process.env.PORT || 3000;

const SECRET_KEY = process.env.SECRET_KEY || 'development-secret-key';
const REFRESH_KEY = process.env.REFRESH_KEY || 'Refresh-Token';

const DB_URI =
    process.env.NODE_ENV === 'test'
    ? 'postgres://farm_fresh_test'
    : 'postgres://farm_fresh'

const BCRYPT_WORK_FACTOR = 12;

module.exports = {
    DB_URI,
    PORT,
    BCRYPT_WORK_FACTOR,
    SECRET_KEY,
    REFRESH_KEY
}