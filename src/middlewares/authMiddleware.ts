// import { NextFunction, Request, Response } from "express";
// import httpStatusCodes from "http-status-codes";
// import { verifyToken } from "../utils/encryptionUtils";
// import { application } from "../constants/application";

// export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
//   const path = req.path;
  
//   // Check if the route should be ignored
//   if (application.authorizationIgnorePath.includes(path)) {
//     return next();
//   }

//   // Get the bearer token from the Authorization header
//   const authHeader = req.headers['authorization'];
//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     res.status(httpStatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized: No token provided' });
//     return;
//   }

//   const token = authHeader.split(' ')[1];
  
//   // Verify the token
//   verifyToken(token)
//     .then(decoded => {
//       // @ts-ignore
//       req.user = decoded;
//       next();
//     })
//     .catch(() => {
//       res.status(httpStatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized: Invalid token' });
//     })
// }