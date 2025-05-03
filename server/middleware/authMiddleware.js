// const jwt = require('jsonwebtoken');
// const { CustomError, statusCodes } = require('../models/errors');

// const authenticate = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) throw new CustomError('No token provided', statusCodes.UNAUTHORIZED);

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // { id: ..., username: ... }
//     next();
//   } catch (err) {
//     throw new CustomError('Invalid token', statusCodes.UNAUTHORIZED);
//   }
// };

// module.exports = authenticate;
