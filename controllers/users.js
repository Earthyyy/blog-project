const prisma = require('../database/index')
const validator = require('validator');



async function findAllUsers(req, res) {
    try {
        const users = await prisma.user.findMany();
        return res.status(200).json({
            status: 'Success',
            payload: users
        })
    } catch (e) {
        return res.status(500).json({
            status: 'Failure',
            message: e.message
        })
    }
}


async function findUserById(req, res) {
    return res.status(200).json({
        status: 'Success',
        payload: req.user
    })
}

async function addNewUser(req, res) {
    const {
        username,
        email,
        password,
        role
    } = req.body;
    const roleArray = ["USER", "ADMIN"];


    if (validator.isLength(username, {
            min: 2
        }) &&
        validator.isEmail(email) &&
        typeof password === 'string' &&
        password.length > 7 &&
        roleArray.includes(role)) {

        try {
            const newUser = await prisma.user.create({
                data: {
                    username,
                    email,
                    password,
                    role
                }
            });

            return res.status(201).json({
                status: 'Success',
                message: 'User created successfully',
                payload: newUser
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


async function updateUser(req, res) {
    const {
        username,
        password
    } = req.body;


    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: req.id
            },
            data: {
                username: username,
                password: password
            }
        });

        return res.status(201).json({
            status: 'Success',
            message: 'User updated successfully',
            payload: updatedUser
        })
    } catch (error) {
        return res.status(500).json({
            status: 'Failure',
            message: error.message
        })
    }

}


async function deleteUser(req, res) {
    try {
        await prisma.user.delete({
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
    findAllUsers,
    findUserById,
    addNewUser,
    updateUser,
    deleteUser
}