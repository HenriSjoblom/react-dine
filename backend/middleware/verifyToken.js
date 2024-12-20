const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Default behavior is that an OPTIONS request is sent before all but GET
  if (req.method === 'OPTIONS') {
    return next()
  }
  // Check if the request has an authorization header
  try {
    const token = req.headers.authorization.split(' ')[1] // Convention is 'Bearer TOKEN'
    if (!token) {
      throw new Error('Authentication failed')
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { userId: decodedToken.id }
    next()
  } catch (error) {
    return res.status(401).send('Authentication failed.');
  }
}
module.exports = verifyToken;