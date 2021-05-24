const db = require('../db');
const ExpressError = require('../helpers/expressError');
const updataDatabase = require('../helpers/updateTable')

class Item {

    static async register(user_id, type, name, quantity, price, details){
        
        const result = await db.query(
            `INSERT INTO item
                (user_id, type, name, quantity, price, details)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [user_id, type, name, quantity, price, details]
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

    static async updateItem(comumns, id){

        const {query, values} = updataDatabase(
            "item", 
            comumns,
            "id",
            id
        )

        const result = await db.query(query, values)

        if(!result.rows[0]) throw new ExpressError("Item does not exsist", 404)

        return result.rows[0]
    }

    static async delete(id){

        const result = await db.query(
            `DELETE FROM users
            WHERE id = $1
            RETURNING *`,
            [id]
        )

        const item = result.rows[0]
            
        if(!item) {
            throw new ExpressError("Item does not Exsist", 404)
        }
    }
} 

module.exports = Item;