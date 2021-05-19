const Item = require('../models/ItemsModel');
const User = require('../models/user');
const express = require('express');
const router = express.Router();


/*  Register a new Item

    Accepts {type, name, waigth, price, details}

    Returns {type, name, waigth, price, details}
*/

router.post('/register' , async (req, res, next) => {

    try {
        const {user_id, type, name, waigth, price, details } = req.body;
        await Item.register(user_id, type, name, waigth, price, details)

        return res.status(200).json({msg: "Your item was successfully registered"})
    }catch(err){
        return next(err);
    }
})

/*
    Return list of items 
    [{type, name, waigth, price, details, date}]
*/

router.get('/', async (req, res, next) => {
    try{
        const items = await Item.getAll();

        return res.status(200).json({items})
    }catch(err){
        return next(err)
    }
})

/*
    Update exsisting item

*/

router.patch('/update/:username', async (req, res, next) => {
    try {

    }catch(err){

    }
})

module.exports = router;