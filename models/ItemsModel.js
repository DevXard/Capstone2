const db = require('../db');
const ExpressError = require('../helpers/expressError');

class Item {

    static async register(user_id, type, name, waigth, price, details){
        
        const result = await db.query(
            `INSERT INTO item
                (user_id, type, name, waigth, price, details)
            VALUES ($1, $2, $3, $4, $5, $6)`,
            [user_id, type, name, waigth, price, details]
        )

        return result.rows[0];
    }

    static async getAll(){
        const result = await db.query(
            `SELECT * 
            FROM item
            ORDER BY type
            `
        )

        return result.rows
    }

    static async getItemById(id){

        const result = await db.query(
            `SELECT *
            FROM item
            WHERE id = $1`, [id]
        )

        return result.rows[0]
    }

    static async updateItem(id, type, name, waigth, price, details){

        const itemToUpdate = await db.query(
            `SELECT * 
            FROM item
            WHERE id = $1`,
            [id]
        )

        const item = itemToUpdate.rows[0];
        
        let uType = type || item.type;
        let uName = name || item.name;
        let uWaigth = waigth || item.waigth;
        let uPrice = price || item.price;
        let uDetails = details || item.details;

        const result = await db.query(
            `UPDATE item
            SET 
            type = $1,
            name = $2,
            waigth = $3,
            price = $4,
            details = $5
            WHERE id = $6
            RETURNING *`,
            [uType, uName, uWaigth, uPrice, uDetails, id]
        )

        if(!result.rows[0]) throw new ExpressError("Item does not exsist", 404)

        return result.rows[0]
    }
} 

module.exports = Item;