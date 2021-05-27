const User = require('../models/user');
const Adresses = require('../models/addresses');
const Token = require('../models/token');
const express = require('express');
const router = express.Router();
const createToken = require('../helpers/createToken');
const verifyToken = require('../helpers/verifyRefreshToken');

/* Register user 

    Accepts {username, password, name, email, address, phone}

    Returns {token}
*/

router.post('/register', async (req, res, next) => {
    try {
        console.log(req.body)
        const {username, password, name, email, phone, 
        street_address, city, state, zip, lng, lat} = req.body;
        let user = await User.register(username, password, name, email, phone)
        await Adresses.registerDefault(user.id, street_address, city, state, zip, lng, lat)

        const {token, refreshToken} = createToken(username, user.seller)
        await Token.register(user.id, refreshToken)

        return res.status(201).json({token, refreshToken})
    }catch(err) {
        next(err);
    }
})


/* Login user and return token

    Accepts {username, password}

    Registers a refresh token in database

    Returns {token}
*/ 
router.post('/login', async (req, res, next) => {
    
    try {
        const {username, password} = req.body;
        let user = await User.authenticate(username, password)
        console.log(user)
        const {token, refreshToken} = createToken(username, user.seller)
        const refToken = await Token.register(user.id, refreshToken)
        if(!refToken) throw new ExpressError("Something went wrong", 404)
        return res.json({token, refreshToken})
    }catch(err) {
        return next(err)
    }
})

router.get('/token', async (req, res, next) => {
    try {
        const {refreshToken, id} = req.body;
        const dbRefreshToken = Token.getToken(id)
        if(refreshToken !== dbRefreshToken.token) throw new ExpressError("Refresh token does not match",403)
        const newToken = verifyToken(refreshToken)

        return res.status(200).json({newToken})
    } catch(err) {
        return next(err)
    }
})

/*
    Logout route

    Accepts user ID

    Deletes refresh token from database

    Returns {msg}
*/
router.post('/logout', async (req, res, next) => {
    try{
        const {id} = req.body;
        console.log(id)
        const deleteToken = await Token.delete(id)
        
        if(!deleteToken) throw new ExpressError("Token was not deleted", 404)

        return res.status(200).json({msg: "You are loged out"})
    }catch(err){
        return next(err);
    }
})
module.exports = router;