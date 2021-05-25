const db = require('../db');
const ExpressError = require('../helpers/expressError');

class Token {

    static async register(user_id, token) {
        const result = await db.query(
            `SELECT *
            FROM token
            WHERE user_id = $1`,
            [user_id]
        )

        const tokenFound = result.rows[0]

        if(tokenFound) throw ExpressError('User is alredy loged in', 401);

        const registerToken = await db.query(
            `INSERT INTO token
                (user_id, token)
            VALUES 
                ($1, $2)
            RETURNING *`,
            [user_id, token]
        )

        return registerToken.rows[0]
    }

    static async getToken(user_id){
        const result = await db.query(
            `SELECT *
            FROM token
            WHERE user_id = $1`,
            [user_id]
        )

        return result.rows[0]
    }

    static async delete(id){
        const result = await db.query(
            `DELETE FROM token WHERE user_id = $1
            RETURNING *`,
            [id]
        )

        return result.rows[0]
    }
}

module.exports = Token;