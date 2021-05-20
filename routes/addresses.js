const Addresses = require('../models/addresses');
const express = require('express');
const router = express.Router();

/*
    Register Address

    Accepts {user_id, street_address, city, state, zip, lng, lat, default_address}

    returns (id, user_id, street_address, city, state, zip, lng, lat, default_address)
*/

router.post('/register', async(req, res, next) => {

    try {
        const {user_id, street_address, city, state, zip, lng, lat} = req.body;
        const address = await Addresses.addNewAddress(user_id, street_address, city, state, zip, lng, lat)

        return res.status(200).json({address})
    }catch(err){
        return next(err);
    }
})

/*
    Delete Address

    Accepts {id}

    Returns {msg: Adress deleted}
*/

router.delete('/delete/:id', async(req, res, next) => {

    try{
        const {id} = req.params;

        await Addresses.delete(id)

        return res.status(200).json({msg: "Address deleted"})
    }catch(err){
        return next(err);
    }
})

module.exports = router;