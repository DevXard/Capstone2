const jwt = require('jsonwebtoken');
const { SECRET_KEY, REFRESH_KEY } = require('../config');

function verifyToken(token){
    // console.log(token)
    let payload = jwt.verify(token, REFRESH_KEY)
    
    if(payload){
        delete payload.iat
        return payload
    }
    
    return false;
}

module.exports = verifyToken;