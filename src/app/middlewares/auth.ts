import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { verifyToken } from "../utils/verifyJWT";
import { User } from "../modules/User/user.model.js";
import { catchAsync } from "../utils/catchAsync";

// Define the TUserRole type if not already defined
export type TUserRole = "ADMIN" | "USER";

// Middleware function to validate authentication and authorization
const authValidation = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Extract the token from the Authorization header
    const token = req.headers.authorization;

    // Check if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    // Verify and decode the token
    const decoded = verifyToken(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { role, email } = decoded;

    // Check if the user exists
    const user = await User.isUserExistsByEmail(email);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
    }

    // Check if the user is deleted
    if (user.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, "This user is deleted!");
    }

    // Check if the user is blocked
    if (user.status === "BLOCKED") {
      throw new AppError(httpStatus.FORBIDDEN, "This user is blocked!");
    }

    // Check if the user has the required role
    if (requiredRoles.length && !requiredRoles.includes(role as TUserRole)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

    // Attach the user information to the request object
    req.user = {
      ...decoded,
      role: role as TUserRole, // Cast to TUserRole
    };

    // Proceed to the next middleware or route handler
    next();
  });
};

export default authValidation;
