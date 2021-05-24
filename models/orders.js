const db = require('../db');
const User = require('../models/user');
const ExpressError = require('../helpers/expressError');
const updataDatabase = require('../helpers/updateTable');

class Orders {

/*
    Register an order 

    Accepts {user_id, order_id, item_id, waight || quantity, isqty}

    Returns {user_id, order_id, item_id, waight || quantity, isqty, order_date}
*/

    static async register(userId, itemId, quantity){
        const userExsists = User.getUser(userId);

        if(!userExsists) throw new ExpressError("User does not exist", 404);

        const orderResult = await db.query(
            `INSERT INTO orders
                (user_id)
            VALUES
                ($1)
            RETURNING *`,
            [userId]
        )

        const order = orderResult.rows[0]

        await db.query(
            `INSERT INTO order_details
                (order_id, item_id, quantity)
            VALUES
                ($1, $2, $3)
            RETURNING *`,
            [order.id, itemId, quantity]
        )

        const orderdItem = await db.query(
            `SELECT * FROM item
            WHERE id = $1`,
            [itemId]
        )

        const item = orderdItem.rows[0]

        if(item.quantity < 1) throw new ExpressError("Item quantity to low", 404)
        
        const newQty = item.quantity - quantity

        if(newQty < 1) throw new ExpressError("Item quantity not enough", 404)

        await db.query(
            `UPDATE item
            SET quantity = $1
            WHERE id = $2
            RETURNING *`,
            [newQty, itemId]
        )

        const result = await db.query(
            `SELECT u.id, o.id AS o_id, o.order_date, od.id AS od_id, od.quantity,
            i.id AS i_id, i.name, i.type, i.quantity AS i_qty, i.price, i.details
            FROM users AS u 
            JOIN orders AS o ON u.id = o.user_id 
            JOIN order_details AS od ON o.id = od.order_id 
            JOIN item AS i ON i.id = od.item_id 
            WHERE u.id = $1 AND o.id = $2`,
            [userId, order.id]
        )

        return result.rows[0]
    }
}

module.exports = Orders;