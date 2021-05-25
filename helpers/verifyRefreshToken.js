const jwt = require('jsonwebtoken');
const { SECRET_KEY, REFRESH_KEY } = require('../config');

function verifyToken(token){
    let newToken;
    jwt.verify(token, REFRESH_KEY, (err, user) => {
        if(err) return false;
        newToken = jwt.sign(payload, SECRET_KEY, {expiresIn: '15m'})
    })
    

    return newToken;
}

module.exports = verifyToken;