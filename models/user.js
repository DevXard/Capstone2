const bcrypt = require('bcrypt');
const db = require('../db');
const ExpressError = require('../helpers/expressError');
const { BCRYPT_WORK_FACTOR } = require('../config');
const updataDatabase = require('../helpers/updateTable');

class User {

    // Register new user
    // Check if user exsists
        // if exsists throw error
        // else insert new user in to database
    static async register(username, password, name, email, phone){
        
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
                (username, password, name, email, phone)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`, [username, hashedPassword, name, email, phone]
        )
        return result.rows[0]
    }

    //Authenticate user
        // select user by username 
        // compare password using bcrypt
    static async authenticate(username, password) {

        const result = await db.query(
            `SELECT * 
            FROM users
            WHERE username = $1`,
            [username]
        )

        const user = result.rows[0];
        
        if(user && (await bcrypt.compare(password, user.password))){
            return user
        }else{
            throw new ExpressError("Cannot authentificate", 401)
        }
    }

    static async getUser(username){

        const result = await db.query(
            `SELECT * 
            FROM users
            WHERE username = $1`,
            [username]
        )
        return result.rows[0]
    }

    static async becomeSeller(id) {
        const {query, values} = updataDatabase(
            "users",
            {seller: true},
            "id",
            id
        )

        const result = await db.query(query, values);

        return result.rows[0]
    
    }
}

module.exports = User;