const {Router} = require('express')
const userRouter = Router()
const {
    signUp,
    loginUser,
    getUsers,
    updateUser,
    deleteOne,
    forgotPassword 
}= require('../controller/user.controller')

userRouter.post('/users/register',  signUp)
userRouter.post('/users/login',loginUser)
userRouter.get('/users', getUsers)
userRouter.get('/users/forgotPassword', forgotPassword)
userRouter.patch('/users/:id', updateUser)
userRouter.delete('/users/:id', deleteOne)


module.exports = userRouter