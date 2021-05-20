const User = require('../models/user')
const express = require('express')
const router = express.Router();


/*
    Turn User to Seller

    Accepts {id}

    Returns {username, password, name, email, address, phone, seller}
*/

router.patch('/toseller/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const user = await User.becomeSeller(id)

        return res.status(200).json({user})
    }catch(err){
        return next(err);
    }
})

module.exports = router;