const Comment = require('../models/comentsAndRating');
const express = require('express');
const router = express.Router();

/*
    Add new Comment
*/

router.post('/new', async (req, res, next) => {
    try {
        const {user_id, rating, comment} = req.body;
        const newComment = await Comment.register(user_id, rating, comment);

        return res.status(200).json({newComment})
    } catch(err) {
        return next(err);
    }
})

/*
    Get all comments

*/

router.get('/', async (req, res, next) => {
    try {
        const comments = await Comment.getAll();

        return res.status(200).json({comments})
    }catch(err){
        return next(err);
    }
})

/*
    Get comment by ID
*/

router.get('/:id', async (req, res, next) => {
    try{
        const {id} = req.params;
        const comment = await Comment.getById(id)

        return res.status(200).json({comment})
    }catch(err){
        return next(err)
    }
})

/*
    Get Rating of seller

*/

router.get('/rating/:id', async (req, res, next) => {
    
    try {
        const {id} = req.params;
        const rating = await Comment.getRating(id)
        
        return res.status(200).json({rating})
    } catch(err){
        return next(err);
    }
})

/*
    Update comment
*/

router.patch('/update/:id', async (req, res, next) => {

    try {
        const {id} = req.params;
        const fields = {...req.body};
        const comment = await Comment.update(fields, id)

        return res.status(200).json({comment})
    }catch(err){
        return next(err)
    }
})

/*
    Delete comment
*/

router.delete('/delete/:id', async (req, res, next) => {

    try {
        const {id} = req.params;
        await Comment.delete(id)

        return res.status(200).json({msg: "Comment deleted successfully"})
    }catch(err){
        return next(err);
    }
})
module.exports = router;