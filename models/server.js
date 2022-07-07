const express = require( "express" );
const cors = require( "cors" );

const { Server: HttpServer } = require( "http" );
const { Server: IOServer } = require( "socket.io" );

const main = require( '../routes/app' )
const product = require( '../routes/products' )
const cart = require( '../routes/cart' )

class Server
{
  constructor ()
  {
    this.app = express()
    this.port = 8080
    this.server = require( "http" ).createServer( this.app );
    this.httpServer = new HttpServer( this.app )
    this.io = new IOServer( this.httpServer )

    /* It's calling the middleware function. */
    this.middlewares();

    /* It's calling the routes function. */
    this.routes();
  }

  /* It's calling the middleware function. */
  middlewares ()
  {

    /* It's telling the server to use the public folder as a static folder. */
    this.app.use( express.static( "public" ) );

    /* It's telling the server to use the express.urlencoded() method to parse the body of the request. */
    this.app.use( express.urlencoded( { extended: true } ) );

    /* It's telling the server to use the express.json() method to parse the body of the request. */
    this.app.use( express.json() );

    /* It's telling the server to use the cors() method to parse the body of the request. */
    this.app.use( cors() );
  }
  /**
   * It's a function that uses the express.Router() method to create a new router object, then it uses
   * the router.get() method to add a route to the router object, and finally it exports the router
   * object
   */
  routes ()
  {
    this.app.use( '/api', main )
    this.app.use( '/api/productos', product );
    this.app.use( '/api/carritos', cart );
    this.app.all( '*', ( req, res ) =>
    {
      res.status( 404 ).json( {
        error: `404 Not Found`, desc: `The page you are looking for does not exist!`

      } )

    } )
  }

  /**
   * It creates a server, listens on the port, and logs an error if there is one
   */
  listen ()
  {
    const server = this.httpServer.listen( this.port, () =>
    {
      console.log( `Server listening on port ${ this.port }` )
    } )
    server.on( 'error', ( err ) => console.log( err ) )
  }
}

module.exports = Server