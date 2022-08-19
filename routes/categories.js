const router = require('express').Router();
const {
    findAllCategories,
    findCategoryById,
    addNewCategory,
    deleteCategory,
    updateCategory
} = require('../controllers/categories');
const prisma = require('../database/index');


router.param('id', async (req, res, next, id) => {
    if (!isNaN(id)) {
        req.id = parseInt(id);
        try {
            const category = await prisma.category.findUnique({
                where: {
                    id: req.id
                }
            })

            if (!category) return res.status(404).json({
                status: 'Failure',
                message: 'Category not found'
            })

            req.category = category;

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



/**
 * @swagger
 * /api/v1/categories:
 *      get:
 *          summary: Get all categories
 *          produces:
 *              - application/json
 *          tags:
 *              - Categories
 *          responses:
 *              "200":
 *                  description: Returns a list of all categories
 *              "500":
 *                  description: Internal server error
 */
router.get('/', findAllCategories);


router.get('/:id', findCategoryById);
router.post('/', addNewCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);



module.exports = router