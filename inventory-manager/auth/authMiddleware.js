require('dotenv').config();
const jwt = require('jsonwebtoken');

/**
 * Middleware function for authentication. It verifies the authenticity of a token provided in the Authorization header.
 * If the token is valid, it attaches the decoded user object to the request and calls the next middleware function.
 * If the token is missing or invalid, it returns an error response with the corresponding status code.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function to call.
 * @returns {void}
 */
function authMiddleware(req, res, next) {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user object to the request
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token: ' + err });
  }
}

module.exports = authMiddleware;