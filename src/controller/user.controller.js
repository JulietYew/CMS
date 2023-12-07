const userService = require('../services/user.service')
// destructuring the services data
const{
    createUser,
    getAllUsers,
    editUserById,
    deleteUserById
} = userService

class UserController{
    //create a user     
        async signUp(req, res)  {
            const {username, password } = req.body
            const {data} = req.body
            try{
                // check if user exist 
                const existingUser = await userService.getUser({
                    name:username
                    
                })
                if (existingUser){
                    return res.status(404).send(
                        {message: 'User already exist' || err.message, 
                        success: false
                    })
                } 
                if (!username) {
                    return res.status(404).send({
                        message: 'Username not found',
                        success: false
                    })
                }
                if (!password) {
                    return res.status(400).send({
                        success: false,
                        message: 'Incorrect password'
                    });
                }
                // hashing password
                const valid = await bcrypt.genSalt(10)
                const encryptedPassword = await bcrypt.hash(password, valid)
                
                // create a new user if the above condition was not met
                const user = await createUser(data) 
                return user
                ? res.status(200).send({
                    message: 'User created successfully',
                    success: true,
                })
                : res.status(400).send({
                    message: 'User not created',
                    success: false
                });
            }catch(error){
                return {
                    success: false,
                    message: 'Internal server error' || error
                };
            }
        } 
        //user login
        async loginUser(req, res) {
            const {username} = req.body
            const enteredPassword = req.body.password 
            try{
                // check if the user exist
                const user = await userService.getUser({
                    name: username
                })
                if (!user){
                    return res.status(400).send({
                        message: 'Please register your details before logging in' || err.message, 
                        success: false
                })
                    
                }
                const verifyPassword = await bcrypt.compare(user.password,  enteredPassword)
                if (!verifyPassword){
                   return res.status(404).send({
                    message: 'Invalid password' || err.message, 
                    success: false})
                }
                // generate a token
            }catch(error){
                return {
                    success: false,
                    message: 'Internal server error' || error
                };
            }
        }
            
        
    // get a list of all the users
    async getUsers(req,res){
        try{
            const users = await getAllUsers({})
            if(!users){
                return res.status(400).send({
                    message: 'Users not found' || err.message,
                    success: false
                    })
            }else{
                return res.status(200).send({
                    message: 'Users found successfully',
                    success: true,
                    users
                })
            }
            
        }catch(error){
                return {
                    success: false,
                    message: 'Internal server error' || error
                };
        }

    }
    
    
    // edit a user
    async updateUser(req, res){
        const id = req.params.id
        const {data} = req.body
        // check by id if a user exists
        try{
            
            const existingUser = await userService.getUser({
                _id: id
            })
            if (existingUser){
                const updatedUser = await editUserById(id)
                // update the user details to the current one
                if (updatedUser){
                    return res.status(200).send({
                    message:'User update done successfully.' , 
                    success: true,
                    updatedUser
                })
                 }else{
                    return res.status(400).send({
                    success: false,
                    message:'You cannot update your account.',
                    })
                }
            }else{   
                return res.status(400).send({
                        success: false,
                        message: 'User Account not found, please register your details.'
                    })
                }
            
        }catch(error){
                return {
                    success: false,
                    message: 'Internal server error' || error
                };
        }
        
    }
    // delete a user
    async  deleteOne (req,res) {
        const id = req.params
        // check if a user exist before deleting
        try{
            const existingUser = await userService.getUser(id)
                if (existingUser) {
                    const deleted = await deleteUserById(id)
                    if (deleted) {
                        return res.status(200).send({
                            success: true,
                            message: 'Acoount deleted successfully'
                        })
                    } else {
                        return res.status(400).send({
                            success: false,
                            message: 'Account not deleted'
                        })
                    }
                } else {
                    return res.status(409).send({
                        success: false,
                        message: 'This account does not exist'
                    })
                }
        }catch(error){
            return {
                success: false,
                message:'Internal server error' || error
            };
        }
    }
    async forgotPassword(req, res) {
        try {
            let { email } = req.body
            let newPassword = req.body.password
            if (!email) {
                return res.status(404).send({
                    message: 'Enter email address',
                    success: false
                })
            }
            if (!newPassword) {
                return res.status(404).send({
                    message: 'Enter new password',
                    success: false
                })
            }
            const id = user._id;
            const updated = await userService.editUserById(
                id,
                { password: newPassword },
            );
            console.log(updated)
            const { password, ...data } = user.toJSON()
            return res.status(200).send({
                message: 'Password changed',
                success: true,
                data: data
            })

        } catch (error) {
            return {
                message: 'Internal server error' || error,
                success: false,
            };
        }
    }

}
module.exports= new UserController()
