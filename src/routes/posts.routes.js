const postRouter = Router()
const{
    create,
    getUserPosts,
    getPosts,
    updatePost,
    deletePost
    
}= require('../controller/posts.controller')

postRouter.post('/posts', create)
postRouter.get('/posts/:id', getUserPosts)
postRouter.get('/posts',  getPosts)
postRouter.patch('/posts/:id', updatePost)
postRouter.delete('/posts/:id', deletePost )


module.exports = postRouter
