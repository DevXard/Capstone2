const jwt = require('jsonwebtoken');
const { SECRET_KEY, REFRESH_KEY } = require('../config');

function createToken(uId, username, seller){
    let payload = {uId, username, seller};
    let refreshToken = jwt.sign(payload, REFRESH_KEY)
    let token = jwt.sign(payload, SECRET_KEY, {expiresIn: '15m'})

    return {refreshToken, token};
}

module.exports = createToken;