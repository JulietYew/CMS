const postsServices = require('../services/posts.service')
const user = require('../services/user.service')
// destructuring the post services data
const {
    createPost,
    getAllPosts,
    editPostById,
    deletePostById,
    getPost 
}= postsServices

class PostsController{
    //create a post
    async create (req, res){
        // attaching the post to a particular user Id and then creating the post
        const {post}  = req.body
        const userId = req.user.id
        try{
            const user = await getUser({
                _id: userId
             });
             if(user){
                return res.status(200).send({
                    message: 'You can create a post' , 
                    success: true
                })
             }

            const post = await createPost({ 
                post: post,
                user: user._id,
                post
             });
            return res.status(200).send({
                message: 'Post created successfully', 
                post, 
                success: true 
            })
        
        }catch(error){
            return {
                success: false,
                message: 'Internal server error' || error
            };
        }
    }  
    
    // get all posts
    async getUserPosts(req, res){
        // getting all the posts associated to a particular userId
        const {userId} = req.params;
        try{
            // getting all posts
            const existingUser = await getUser({
                _id: userId
             })
             if (!existingUser){
                return res.status(400).send({
                    message: 'Looks like you cannot get a post here' || err.message, 
                    success: false
                })
             }

            const posts = await getAllPosts({userId})
            if(!posts){
                return res.status(404).send({
                    message: 'Posts not found' || err.message, 
                    success: false
                })
            }else{
                return res.status(200).send({
                    message: 'Posts found successfully', posts, 
                    success: true
                })
            }
            
        }catch(error){
            return {
                success: false,
                message: 'Internal server error' || error
            };
        }

    }
    
    //get all posts
    async getPosts(req, res){
            try {
              const posts = await getAllPosts({});
              if(!posts){
                return res.status(404).send({
                    message: 'No posts was found' || err.message, 
                    success: false
                })
            }else{
                return res.status(200).send({
                    message: 'Posts found successfully', 
                    posts, 
                    success: true
                })
            }

            }catch(error){
                return {
                    success: false,
                    message: 'Internal server error' || error
                };
            }

    }

    // edit a post
    async updatePost(req, res){
        const {postId }= req.params
        const {post} = req.body
        const userId = req.user.id
        try{
            const existingPost = await getPost({ 
                _id: postId,
                userId: userId 
            });
             if (!existingPost) {
                 return res.status(400).send({
                     message: 'Post not found' || err.message, 
                    success: false 
                });
            }
            // update the post details to the current one
            const updatedPost = await editPostById({
               post:post
            })
            return res.status(200).send({
                message: 'Post updated successfully', 
                success: true, 
                data:updatedPost
            });      
        }catch(error){
            return {
                success: false,
                message: 'Internal server error' || error
            };
        }

    }
    
    
    // delete a post
    async deletePost(req, res){
        const {postId} = req.params
        const userId = req.user.id
        // check if a post for a particular userId exist before deleting
        try{
            const existingPost = await getPost({
                _id: postId,
                
            })
            if (!existingPost){
                return res.status(404).send({
                    message: 'No post found' , 
                    success: false
                })
    
            }
            if (existingPost.user.toString() !== userId){
                return res.status(400).send({
                    message: 'You are not authorized to delete this post' , 
                    success: false
                })
    
            }
            // delete post if the above condition was met
            const deletedPost = await deletePostById(postId)
            return res.status(200).send({
                message: 'Post deleted successfuly', 
                success: true, 
                data:deletedPost
            })
        

        }catch(error){
            return {
                success: false,
                message: 'Internal server error' || error
            };
        }

    }
}
module.exports = new PostsController()