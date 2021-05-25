const Item = require('../models/ItemsModel');
const User = require('../models/user');
const express = require('express');
const router = express.Router();
const {ensureLoggedInAndSeller} = require('../middleware/authUser');


/*  Register a new Item

    Accepts {type, name, waigth, price, details}

    Returns {type, name, waigth, price, details}
*/

router.post('/register', ensureLoggedInAndSeller, async (req, res, next) => {

    try {
        const {user_id, type, name, quantity, price, details } = req.body;
        
        await Item.register(user_id, type, name, quantity, price, details)

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

router.patch('/update/:id', async (req, res, next) => {
    
    try {
        const fields = {...req.body}
        const id = req.params.id;

        const user = await User.getUser(fields.username)
        const itemToUpdate = await Item.getItemById(id)

        if(user.id === itemToUpdate.user_id){
            delete fields.username
           
            const item = await Item.updateItem(fields, id)

            return res.status(200).json({msg: "Item updated successfully", item})
        }else{
            throw new ExpressError("Item does not belong to user", 404)
        }

    }catch(err){
        return next(err)
    }
})

router.delete('/delete/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        await Item.delete(id)

        return res.status(200).json({msg: "Item deleted"})

    }catch(err){
        return next(err)
    }
})

module.exports = router;