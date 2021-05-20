const Addresses = require('../models/addresses');
const express = require('express');
const router = express.Router();

/*
    Register Address

    Accepts {user_id, street_address, city, state, zip, lng, lat, default_address}

    returns (id, user_id, street_address, city, state, zip, lng, lat, default_address)
*/

router.post('/register', async(req, res) => {

    try {
        const {user_id, street_address, city, state, zip, lng, lat, default_address} = req.body;
        const address = await Addresses.register(user_id, street_address, city, state, zip, lng, lat, default_address)
        
        return res.status(200).json({address})
    }catch(err){
        return next(err);
    }
})

module.exports = router;