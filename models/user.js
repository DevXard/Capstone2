const bcrypt = require('bcrypt');
const db = require('../db');
const ExpressError = require('../helpers/expressError');
const { BCRYPT_WORK_FACTOR } = require('../config');

class User {

    static async register(username, password, name, email, address, phone){
        
        const checkDuplicate = await db.query(
            `SELECT username FROM users WHERE username = $1`,
            [username]
        );
        
        if(checkDuplicate.rows[0]) {
            
            throw new ExpressError(
                `There already exists a user with username ${username}`, 400
            )
        };

        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
        
        const result = await db.query(
            `INSERT INTO users 
                (username, password, name, email, default_address, phone)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`, [username, hashedPassword, name, email, address, phone]
        )
        return result.rows[0]
    }
}

module.exports = User;