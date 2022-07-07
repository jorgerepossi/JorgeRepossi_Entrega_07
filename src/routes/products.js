const { Router } = require( 'express' );

const router = new Router();
const product = require( '../controllers/productController' )
const auth = require( '../classes/auth' )

/* This is a route that allows the admin to edit a product. */
router.get( '/', product.productList )

/* This is a route that allows the admin to edit a product. */
router.get( '/:id', product.getProductById )

/* This is a route that allows the admin to add a new product. */
router.post( '/', auth.isAuth, product.addNewProduct )

/* This is a route that allows the admin to edit a product. */
router.put( '/:id', auth.isAuth, product.editProduct )

/* The above code is deleting a product from the database. */
router.delete( '/:id', auth.isAuth, product.deleteProduct )

module.exports = router;