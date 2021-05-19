const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

function createToken(username, seller){
    let payload = {username, seller};
    return jwt.sign(payload, SECRET_KEY)
}

module.exports = createToken;