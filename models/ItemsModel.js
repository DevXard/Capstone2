const db = require('../db');
const ExpressError = require('../helpers/expressError');

class Item {

    static async register(type, name, waigth, price, date, details){
        
        const result = await db.query(
            `INSERT INTO item
                (type, name, waigth, price, date, details)
            VALUES ($1, $2, $3, $4, $5, $6)`,
            [type, name, waigth, price, date, details]
        )

        return result.rows[0];
    }
} 

module.exports = Item;