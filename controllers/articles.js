const prisma = require('../database/index')
const {
    isString,
    isInt,
    isBool
} = require('../utils/utils');



async function findAllArticles(req, res) {
    const {take,skip} = req.query;
    try {
        const articles = await prisma.article.findMany({
            take: !isNaN(take) ? parseInt(take) : undefined,
            skip: !isNaN(skip) ? parseInt(skip) : undefined
        });
        return res.status(200).json({
            status: 'Success',
            payload: articles
        })
    } catch (e) {
        return res.status(500).json({
            status: 'Failure',
            message: e.message
        })
    }
}


async function findArticleById(req, res) {
    return res.status(200).json({
        message: 'Success',
        payload: req.article
    })
}


async function addNewArticle(req, res) {
    const {
        title,
        content,
        image,
        isPublished,
        userId,
        categoryArray
    } = req.body;
    if (isString(title, content, image) &&
        isInt(userId) &&
        isBool(isPublished)) {

        try {
            const newArticle = await prisma.article.create({
                data: {
                    title,
                    content,
                    image,
                    isPublished,
                    user: {
                        connect: {
                            id: userId
                        }
                    },
                    categories: {
                        connect: categoryArray.map(item => {
                            return {
                                id: item
                            }
                        })
                    }
                }
            });

            return res.status(201).json({
                status: 'Success',
                message: 'Article created successfully',
                payload: newArticle
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


async function updateArticle(req, res) {
    const {
        title,
        content,
        image,
        categoryArray
    } = req.body;


    try {
        const updatedArticle = await prisma.article.update({
            where: {
                id: req.id
            },
            data: {
                title,
                content,
                image,
                categories: {
                    set: [],
                    connect: categoryArray.map(item => {
                        return {
                            id: item
                        }
                    })
                }
            }
        });

        return res.status(201).json({
            status: 'Success',
            message: 'Article updated successfully',
            payload: updatedArticle
        })
    } catch (error) {
        return res.status(500).json({
            status: 'Failure',
            message: error.message
        })
    }

}


async function deleteArticle(req, res) {
    try {
        await prisma.article.delete({
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
    findAllArticles,
    findArticleById,
    addNewArticle,
    updateArticle,
    deleteArticle
}