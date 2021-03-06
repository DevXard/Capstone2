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

/*
    Update user info

    Accepts {username, password, name, email, phone}

    Returns {username, password, name, email, phone, seller, date}
*/

router.patch('/update/:id', async (req, res, next) => {

    try {
        const {id} = req.params;
        const fields = {...req.body}

        const user = await User.update(fields, id)

        return res.status(200).json({user})
    }catch(err) {
        return next(err);
    }
})

/* 
    Get User By ID
*/

router.get('/useritems/:id', async (req, res, next) => {
    
    try{
        const { id } = req.params;
        
        const user = await User.getUserById(id)

        return res.status(200).json({user})
    }catch(err){
        return next(err);
    }
})

/*
    Get user by username
*/

router.get('/:username', async (req, res, next) => {
    try {   
        const {username} = req.params;
        const user = await User.getUser(username);
        
        return res.status(200).json({user})
    } catch(err) {

    }
})

module.exports = router;