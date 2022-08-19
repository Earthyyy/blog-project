const router = require('express').Router();
const {
    findAllComments,
    findCommentById,
    addNewComment,
    updateComment,
    deleteComment
} = require('../controllers/comments');
const prisma = require('../database/index');


router.param('id', async (req, res, next, id) => {
    if (!isNaN(id)) {
        req.id = parseInt(id);
        try {
            const comment = await prisma.comment.findUnique({
                where: {
                    id: req.id
                }
            })

            if (!comment) return res.status(404).json({
                status: 'Failure',
                message: 'Comment not found'
            })

            req.comment = comment;

            return next();
        } catch (error) {
            return res.status(500).json({
                status: 'Failure',
                message: error.message
            })
        }
    } else {
        return res.status(400).json({
            status: 'Failure',
            message: 'id must be an integer'
        })
    }
})


router.get('/', findAllComments);
router.get('/:id', findCommentById);
router.post('/', addNewComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);



module.exports = router