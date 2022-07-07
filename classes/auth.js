let isAdmin = false

const login = ( req, res ) =>
{
  isAdmin = true
  res.sendStatus( 200 )
}

const logout = ( req, res ) =>
{
  isAdmin = false
  res.sendStatus( 200 )
}

const isAuth = ( req, res, next ) =>
{
  if ( isAdmin ) {
    res.sendStatus( 200 )
    next()
  } else {
    res.status( 403 ).json( {
      error: -1,
      description: `Route '${ req.originalUrl }' method '${ req.method }' not authorized.`,
    } )
  }
}

module.exports = {
  login,
  logout,
  isAuth,
}