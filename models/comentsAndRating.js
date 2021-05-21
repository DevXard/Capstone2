const db = require('../db');
const ExpressError = require('../helpers/expressError');
const updataDatabase = require('../helpers/updateTable');

class commentsAndRating {

/*
    Register new comment

    Accepts {user_id, rating, comment}

    Returns {id, user_id, rating, comment, date}
*/
    static async register(user_id, rating, comment) {
        const result = await db.query(
            `INSERT INTO rating_comments
            (user_id, rating, comment)
            VALUES 
            ($1, $2, $3)
            RETURNING *`,
            [user_id, rating, comment]
        )
        
        return result.rows[0]
    }

/*
    Get all comments

    Returns [{id, user_id, rating, comment}]
*/

    static async getAll(){
        const result = await db.query(
            `SELECT * FROM rating_comments`
        )

        return result.rows
    }

/*
    Get Comment by 

    Accepts {ID}

    Returns {id, user_id, rating, comment}
 */

    static async getById(id) {
        const result = await db.query(
            `SELECT * 
            FROM rating_comments
            WHERE id = $1`,
            [id]
        )

        return result.rows[0]
    }

/*
    Update Comment 

    Accepts {{rating, comment}, id}

    Returns {id, user_id, rating, comment}
*/

    static async update(columns, id){
        const {query, values} = updataDatabase(
            "rating_comments",
            columns,
            "id",
            id
        )

        const result = await db.query(query, values)

        const rating_comments = result.rows[0]

        if(!rating_comments) {
            throw new ExpressError("Comment does not exsist", 404)
        }

        return rating_comments
    }

/*
    Delete Comment and Rating

    Accepts {id}

    Returns {id, user_id, rating, comment}
*/

    static async delete(id){
        const result = await db.query(
            `DELETE FROM rating_comments
            WHERE id = $1
            RETURNING *`,
            [id]
        )

        const rating_comments = result.rows[0]

        if(!rating_comments) {
            throw new ExpressError("Comment does not exsist", 404)
        }

        return rating_comments
    }
}