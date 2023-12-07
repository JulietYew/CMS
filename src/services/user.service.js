// a collection for the users
const user = require('../model/user.model');
const mongoose = require('mongoose')
class userService {
    // create a user
    async createUser (newUser){
        return await user.create(newUser, {_id:id})
    }
    // get all users
    async getAllUsers (filter){
       return await user.find(filter)

    }
    // edit a user by id
    async editUserById (id, data){
        return await user.findByIdAndUpdate({_id:id}, data);

    }
    // delete a user by id
    async deleteUserById (id){
        return await user.findByIdAndDelete({_id:id});
    }
    // get a single user
    async getUser (filter) {
        return await user.findOne(filter);
    }

}
module.exports = new userService();