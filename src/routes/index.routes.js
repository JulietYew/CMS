const {Router} = require('express')
const postRoutes = require('./posts.routes')
const userRoutes = require('./user.routes')
const router = Router()

router.use('/v1',postRoutes )
router.use('/v1', userRoutes)

module.exports = router