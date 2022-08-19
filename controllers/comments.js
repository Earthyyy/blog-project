const prisma = require('../database/index')
const {
    isString,
    isInt
} = require('../utils/utils');



async function findAllComments(req, res) {
    const {take,skip} = req.query;
    try {
        const comments = await prisma.comment.findMany({
            take: !isNaN(take) ? parseInt(take) : undefined,
            skip: !isNaN(skip) ? parseInt(skip) : undefined
        });
        return res.status(200).json({
            status: 'Success',
            payload: comments
        })
    } catch (e) {
        return res.status(500).json({
            status: 'Failure',
            message: e.message
        })
    }
}


async function findCommentById(req, res) {
    return res.status(200).json({
        message: 'Success',
        payload: req.comment
    })
}

async function addNewComment(req, res) {
    const {
        content,
        userId,
        articleId
    } = req.body;
    if (isString(content) &&
        isInt(userId) &&
        isInt(articleId)) {

        try {
            const newComment = await prisma.comment.create({
                data: {
                    content,
                    user: {
                        connect: {
                            id: userId
                        }
                    },
                    article: {
                        connect: {
                            id: articleId
                        }
                    }
                }
            });

            return res.status(201).json({
                status: 'Success',
                message: 'Comment created successfully',
                payload: newComment
            });
        } catch (error) {
            return res.status(500).json({
                status: 'Failure',
                message: error.message
            });
        }
    } else {
        return res.status(400).json({
            status: 'Failure',
            message: 'Bad inputs'
        })
    }
}


async function updateComment(req, res) {
    const {
        content
    } = req.body;


    try {
        const updatedComment = await prisma.comment.update({
            where: {
                id: req.id
            },
            data: {
                content
            }
        });

        return res.status(201).json({
            status: 'Success',
            message: 'Comment updated successfully',
            payload: updatedComment
        })
    } catch (error) {
        return res.status(500).json({
            status: 'Failure',
            message: error.message
        })
    }

}


async function deleteComment(req, res) {
    try {
        await prisma.comment.delete({
            where: {
                id: req.id
            }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({
            status: 'Failure',
            message: error.message
        })
    }
}





module.exports = {
    findAllComments,
    findCommentById,
    addNewComment,
    updateComment,
    deleteComment
}