
const { Router } = require( 'express' )
const router = new Router()
const auth = require( '../classes/auth' )

/* A route to login. */
router.get( '/login', auth.login )

/* A route to logout. */
router.get( '/logout', auth.logout )


module.exports = router