'use strict'

const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require('../config');
const ExpressError = require('../helpers/expressError');

/*
    Authentificate user token

    Accepts {token} from req.body

    Stores payload in res.locals.user
*/

function authenticateJWT(req, res, next) {
    try {
        const authHeader = req.headers && req.headers.authorization;
        if(authHeader) {
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            res.locals.user = jwt.verify(token, SECRET_KEY);
        }
        
        return next()
    } catch (err) {
        return next();
    }
    
}

/*
    Ensure Loged In by checking res.locals.user

*/

function ensureLoggedIn(req, res, next) {
    try {
        if(!res.locals.user) throw new ExpressError("You need to loge in first", 404)
        return next()
    } catch(err) {
        return next(err)
    }
}

/*
    Ensure user is loged in and a seller
*/

function ensureLoggedInAndSeller(req, res, next){
    try {
        if(!res.locals.user) throw new ExpressError("You need to be loged in first", 404)

        if(res.locals.user.seller){
            return next()
        }else {
            throw new ExpressError("You have to be a seller first", 404)
        }
    } catch(err) {
        return next(err)
    }
}

module.exports = {
    authenticateJWT,
    ensureLoggedIn,
    ensureLoggedInAndSeller
}