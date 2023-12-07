const Categories = require('../model/categories.model');

class CategoryService {
    // create a post
    async createPost (newCategory){
        return await Categories.create(newCategory)
    }
    // get all categories
    async getAllCategories (filter){
       return await Categories.find(filter)

    }
    // edit a category by id
    async editCategorytById (id, data){
        return await Categories.findByIdAndUpdate({_id:id}, data);

    }
    // delete a category by id
    async deleteCategorytById (id){
        return await Categories.findByIdAndDelete({_id:id});
    }
    // get a single category
    async getCategory (filter) {
        return await Categories.findOne(filter);
    }

}

module.exports = new CategoryService();