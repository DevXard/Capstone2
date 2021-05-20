const db = require('../db');
const ExpressError = require('../helpers/expressError');

class Addresses {

/*
    Register new address

    Accepts {user_id, street_address, city, state, zip, lng, lat, default_address}

    returns {id, user_id, street_address, city, state, zip, lng, lat, default_address}
*/

    static async registerDefault(user_id, street_address, city, state, zip, lng, lat){
        
        const result = await db.query(
            `INSERT INTO addresses
                (user_id, street_address, city, state, zip, lng, lat, default_address)
            VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *`,
            [user_id, street_address, city, state, zip, lng, lat, true]
        )
        
        return result.rows[0]
    }

    static async addNewAddress(user_id, street_address, city, state, zip, lng, lat){

        const result = await db.query(
            `INSERT INTO addresses
                (user_id, street_address, city, state, zip, lng, lat, default_address)
            VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`,
            [user_id, street_address, city, state, zip, lng, lat, false]
        )

        return result.rows[0]
    }

    static async switchDefaultAddress(userId, addressId) {

        const userSelect = await db.query(
            `SELECT id 
            FROM users
            WHERE id = $1`,
            [userId]
        )

        const user = await userSelect.rows[0]

        const address = await db.query(
            `SELECT id FROM
            addresses
            WHERE user_id = $1 AND default_address = $2`,
            [user.id, true]
        )

        await db.query(
            `UPDATE addresses
            SET 
            default_address = $1
            WHERE id = $2
            `,
            [false, address.id]
        )

        await db.query(
            `UPDATE addresses
            SET
            default_address = $1
            WHERE id = $2`,
            [true, addressId]
        )
    }

    static async getAll(){
        const result = await db.query(
            `SELECT * 
            FROM addresses
            `
        )

        return result.rows
    }
}

module.exports = Addresses;