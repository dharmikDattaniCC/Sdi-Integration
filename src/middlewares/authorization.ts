// middleware to give various access roles to a user
import { NextFunction, Request, Response } from "express";
import httpStatusCodes from "http-status-codes";

// types.d.ts
declare global {
    namespace Express {
        interface Request {
            user?: { userId: number; email: string; role: string };
        }
    }
}


// Middleware to authorize based on roles
export function authorizeRoles(...roles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        // Ensure user role is available in request (this assumes the token is already decoded in req.user)
        const user = req.user as { role: string };

        if (!user || !roles.includes(user.role)) {
            return res.status(httpStatusCodes.FORBIDDEN).json({
                message: "Access denied. You do not have permission to access this resource.",
            });
        }

        // If the user has the required role, proceed to the next middleware or route
        next();
    };
}
