const Item = require('../models/ItemsModel');
const express = require('express');
const router = express.Router();


/*  Register a new Item

    Accepts {type, name, waigth, price, details}

    Returns {type, name, waigth, price, details}
*/

router.post('/register' , async (req, res, next) => {

    try {
        const { type, name, waigth, price, details } = req.body;
        await Item.register(type, name, waigth, price, details)

        return res.status(200).json({msg: "Your item was successfully registered"})
    }catch(err){
        return next(err);
    }
})

router.get('/', async (req, res, next) => {
    try{
        
    }catch(err){

    }
})

module.exports = router;