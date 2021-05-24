const Order = require('../models/orders');
const express = require('express');
const router = express.Router();

/*
    Create new Order
*/

router.post('/register', async (req, res, next) => {
    try {
        const {user_id, item_id, quantity} =req.body;
        const order = await Order.register(user_id, item_id, quantity)

        return res.status(200).json({order})
    } catch (err) {
        return next(err);
    }
})

module.exports = router;