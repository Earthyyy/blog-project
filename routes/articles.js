const router = require('express').Router();
const {
    findAllArticles,
    findArticleById,
    addNewArticle,
    updateArticle,
    deleteArticle
} = require('../controllers/articles');
const prisma = require('../database/index');


router.param('id', async (req, res, next, id) => {
    if (!isNaN(id)) {
        req.id = parseInt(id);
        try {
            const article = await prisma.article.findUnique({
                where: {
                    id: req.id
                }
            })

            if (!article) return res.status(404).json({
                status: 'Failure',
                message: 'Article not found'
            })

            req.article = article;

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
 * /api/v1/articles:
 *      get:
 *          summary: Get all articles
 *          produces:
 *              - application/json
 *          tags:
 *              - Articles
 *          responses:
 *              "200":
 *                  description: Returns a list of all articles
 *              "500":
 *                  description: Internal server error
 */
router.get('/', findAllArticles);


// TODO: Update parameters in the swagger docs for this route
/**
 * @swagger
 * /api/v1/articles/{id}:
 *  get:
 *      summary: Get an article by id
 *      produces:
 *          - application/json
 *      tags:
 *          - Articles
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            required: true
 *      responses:
 *          "200":
 *              description: Returns a single article with its corresponding data
 *          "400":
 *              description: id must be an integer
 *          "404":
 *              description: Article not found
 *          "500":
 *              description: Internal server error              
 */
router.get('/:id', findArticleById);

/**
 * @swagger
 * /api/v1/articles:
 *  post:
 *      summary: Creates a new article
 *      produces:
 *          - application/json
 *      tags:
 *          - Articles
 *      requestBody:
 *          description: New article's data
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                          content:
 *                              type: string
 *                          image:
 *                              type: string
 *                          published:
 *                              type: boolean
 *                          userId:
 *                              type: integer
 *      responses:
 *          "201":
 *              description: Returns a success message with the created article's data
 *          "500":
 *              description: Internal server error        
 */
router.post('/', addNewArticle);


/**
 * @swagger
 * /api/v1/articles/{id}:
 *  put:
 *      summary: Updates an existing article
 *      produces:
 *          - application/json
 *      tags:
 *          - Articles
 *      parameters:
 *          - in: path
 *            name: id
 *            description: article's id
 *            type: integer
 *            required: true
 *      requestBody:
 *          description: New article's data
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                           title:
 *                               type: string
 *                           content:
 *                               type: string
 *                           image:
 *                               type: string
 *                           published:
 *                               type: boolean
 *                           userId:
 *                               type: integer                            
 *      responses:
 *              "201":
 *                  description: Article updated
 *              "400":
 *                  description: id must be an integer
 *              "404":
 *                  description: Article not found
 *              "500":
 *                  description: Internal server error
 */
router.put('/:id', updateArticle);


/**
 * @swagger
 * /api/v1/articles/{id}:
 *    delete:
 *         summary: delete an existing article
 *         produces:
 *              - application/json
 *         tags:
 *              - Articles
 *         parameters:
 *              - in: path
 *                name: id
 *                description: article's id
 *                type: integer
 *                required: true
 *         responses:
 *              "204":
 *                  description: Article deleted
 *              "400":
 *                  description: id must be an integer
 *              "404":
 *                  description: Article not found
 *              "500":
 *                  description: Internal server error  
 */
router.delete('/:id', deleteArticle);



module.exports = router