const prisma = require('../database/index');
const {
    isString
} = require('../utils/utils');



async function findAllCategories(req, res) {
    const {take,skip} = req.query;
    try {
        const categories = await prisma.category.findMany({
            take: !isNaN(take) ? parseInt(take) : undefined,
            skip: !isNaN(skip) ? parseInt(skip) : undefined
        });
        return res.status(200).json({
            status: 'Success',
            payload: categories
        })
    } catch (e) {
        return res.status(500).json({
            status: 'Failure',
            message: e.message
        })
    }
}


async function findCategoryById(req, res) {
    return res.status(200).json({
        message: 'Success',
        payload: req.category
    })
}

async function addNewCategory(req, res) {
    const {
        name
    } = req.body;

    if (isString(name)) {

        try {
            const newCategory = await prisma.category.create({
                data: {
                    name
                }
            });

            return res.status(201).json({
                status: 'Success',
                message: 'Category created successfully',
                payload: newCategory
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


async function updateCategory(req, res) {
    const {
        name
    } = req.body;


    try {
        const updatedCategory = await prisma.category.update({
            where: {
                id: req.id
            },
            data: {
                name
            }
        });

        return res.status(201).json({
            status: 'Success',
            message: 'Category updated successfully',
            payload: updatedCategory
        })
    } catch (error) {
        return res.status(500).json({
            status: 'Failure',
            message: error.message
        })
    }

}


async function deleteCategory(req, res) {
    try {
        await prisma.category.delete({
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
    findAllCategories,
    findCategoryById,
    addNewCategory,
    updateCategory,
    deleteCategory
}