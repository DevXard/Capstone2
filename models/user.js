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

    static async getUserById(id) {

        const userResult = await db.query(
            `SELECT *
            FROM users
            WHERE id = $1`,
            [id]
        )

        const itemsResult = await db.query(
            `SELECT * 
            FROM item
            WHERE user_id = $1`,
            [id]
        )
        let user = userResult.rows[0]

        delete user.password

        const result = {};
        result.user = user
        result.items = itemsResult.rows
        return result
    }

    static async getUser(username){

        const result = await db.query(
            `SELECT u.username, u.name, u.email, u.id, u.phone, u.seller, u.date,
            a.user_id, a.street_address, a.city, a.state, a.zip, a.lng, a.lat, a.default_address
            FROM users AS u
            JOIN addresses AS a ON u.id = a.user_id
            WHERE username = $1 AND default_address = $2`,
            [username, true]
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

    static async update(columns, id) {

        const userToUpdate = await db.query(
            `SELECT * FROM users WHERE id = $1`,
            [id]
        )

        const user = userToUpdate.rows[0]
        if(!user) {
            throw new ExpressError("User Does Not Exsist", 404)
        }

        const {query, values} = updataDatabase(
            'users',
            columns, 
            "id",
            id
        )

        const result = await db.query(query, values)

        return result.rows[0]
    }

    static async delete(id){
        const user = await db.query(
            `DELETE FROM users WHERE id = $1`, [id]
        )
        
        if(!user){
            throw new ExpressError("User not found", 404)
        }

        return user.rows[0]
    }
}

module.exports = User;