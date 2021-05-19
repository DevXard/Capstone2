const User = require('../models/user');
const express = require('express');
const router = express.Router();
const createToken = require('../helpers/createToken');

/* Register user 

    Accepts {username, password, name, email, address, phone}
*/

router.post('/register', async (req, res, next) => {
    
    try {
        const {username, password, name, email, address, phone} = req.body;
        let user = await User.register(username, password, name, email, address, phone)

        const token = createToken(username, user.seller)
        return res.status(201).json({token})
    }catch(err) {
        next(err);
    }
})


module.exports = router;