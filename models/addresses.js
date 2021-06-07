const db = require('../db');
const ExpressError = require('../helpers/expressError');
const updataDatabase = require('../helpers/updateTable');
const distance = require('../helpers/filterWithDistance');

class Addresses {

/*
    RegisterDefault new address

    Accepts {user_id, street_address, city, state, zip, lng, lat}

    returns {id, user_id, street_address, city, state, zip, lng, lat, default_address}

    default_address will be awais true
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

/*
    Register new Addresses

    Accepts {user_id, street_address, city, state, zip, lng, lat}

    returns {id, user_id, street_address, city, state, zip, lng, lat, default_address}

    default_address will awais be false
*/

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

    /*
        Change default address

        Accepts {userId, AddressesId}

    */

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

/*
    Get all addresses of a user.

    Accepts {userID}

    returns [{id, user_id, street_address, city, state, zip, lng, lat, default_address}]
*/
    static async getAll(id){
        const result = await db.query(
            `SELECT * 
            FROM addresses
            WHERE user_id = $1`,
            [id]
        )

        return result.rows
    }

/*
    Get Item Addresses

    Accepts {item ID}

    Returns {{id, user_id, street_address, city, state, zip, lng, lat, default_address}}
*/

    static async getItemAddress(id){
        const result = await db.query(
            `SELECT a.lng, a.lat FROM item AS i 
            JOIN users AS u ON i.user_id = u.id 
            JOIN addresses AS a ON a.user_id = u.id 
            WHERE i.id = $1 AND default_address = $2`,
            [id, true]
        )

        return result.rows[0]
    }

/*
    Get address by ID

    Accepts {addresID}

    Returns {id, user_id, street_address, city, state, zip, lng, lat, default_address}
*/

    static async getById(id){
        const result = await db.query(
            `SELECT * 
            FROM addresses
            WHERE id = $1`,
            [id]
        )

        return result.rows[0]
    }

/*
    Get all sellers main address (default address) in a radius of x miles

    Accepts {lng, lat, miles}

    Returns [{id, user_id, street_address, city, state, zip, lng, lat, default_address}]
*/

    static async getAddressInRadius(lng, lat, miles){

        
        const result = await db.query(
            `SELECT u.id AS uid, u.username, u.email, u.phone,
            a.id AS aId, a.street_address, a.city, a.state, a.zip, a.lng, a.lat
            FROM addresses AS a
            JOIN users AS u ON a.user_id = u.id 
            WHERE u.seller = true AND a.default_address = true;`
        )

        const addressList = result.rows
        
        const filterdAddress = addressList.filter(address => {
            return distance(lng, lat, address.lng, address.lat) < miles;
        })

        return filterdAddress
    }

/*
    Update Addresses

    Accepts {{street_address, city, state, zip, lng, lat}, addressID}

    Returns {id, user_id, street_address, city, state, zip, lng, lat, default_address}
*/

    static async updateAddress(columns, id){
        const {query, values} = updataDatabase(
            "addresses",
            columns,
            "id",
            id
        )

        const result = await db.query(query, values)
        const address = result.rows[0]

        if(!address) {
            throw new ExpressError("Address not Found", 404)
        }

        return address;
    }

/*
    Delete address

    Accepts {AddressID}

    Returns {id, user_id, street_address, city, state, zip, lng, lat, default_address}
*/

    static async delete(id){
        
        const result = await db.query(
            `DELETE FROM addresses WHERE id = $1 RETURNING *`,
            [id]
        )
        const address = result.rows[0]
        
        if(!address) {
            throw new ExpressError("addres not found")
        }

        return address
    }
}

module.exports = Addresses;