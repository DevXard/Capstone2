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
} 

module.exports = Item;