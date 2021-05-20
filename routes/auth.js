const User = require('../models/user');
const Adresses = require('../models/addresses');
const express = require('express');
const router = express.Router();
const createToken = require('../helpers/createToken');

/* Register user 

    Accepts {username, password, name, email, address, phone}

    Returns {token}
*/

router.post('/register', async (req, res, next) => {
    
    try {
        const {username, password, name, email, phone} = req.body;
        let user = await User.register(username, password, name, email, phone)

        const token = createToken(username, user.seller)
        return res.status(201).json({token})
    }catch(err) {
        next(err);
    }
})

/* Login user and return token

    Accepts {username, password}
    Returns {token}
*/ 
router.post('/login', async (req, res, next) => {
    
    try {
        const {username, password} = req.body;
        let user = await User.authenticate(username, password)
        console.log(user)
        const token = createToken(username, user.seller)
        return res.json({token})
    }catch(err) {
        return next(err)
    }
})

module.exports = router;