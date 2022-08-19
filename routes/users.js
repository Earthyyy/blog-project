const router = require('express').Router();
const prisma = require('../database/index');
const {
    findAllUsers,
    findUserById,
    addNewUser,
    updateUser,
    deleteUser
} = require('../controllers/users');


router.param('id', async (req, res, next, id) => {
    if (!isNaN(id)) {
        req.id = parseInt(id);
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: req.id
                }
            })

            if (!user) return res.status(404).json({
                status: 'Failure',
                message: 'User not found'
            })

            req.user = user;

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


router.get('/', findAllUsers);
router.get('/:id', findUserById);
router.post('/', addNewUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);



module.exports = router