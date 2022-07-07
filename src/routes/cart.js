const { Router } = require( 'express' );

const router = new Router();
const cart = require( '../controllers/cartController' )

/* Getting the cart with the id that is passed in the url. */
router.get( '/:id', )
/* Getting the cart with the id that is passed in the url. */
router.get( '/:id/productos', cart.cartProductList )
/* Creating a new cart. */
router.post( '/', cart.createNewCart )
/* Adding a product to the cart with the id that is passed in the url. */
router.post( '/:id/productos/:id_prod', cart.addProductToCart )
/* Deleting the product with the id that is passed in the url from the cart with the id that is passed
in the url. */
router.delete( '/:id/productos/:id_prod', cart.deleteProductFromCart )
/* Deleting the cart with the id that is passed in the url. */
router.delete( '/:id', cart.emptyCart )
module.exports = router;