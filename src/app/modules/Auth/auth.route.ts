import { Router } from "express";
import { UserValidation } from "../User/user.validation";
import { AuthControllers } from "./auth.controller";
import validateRequest, { validateRequestCookies } from "../../middlewares/validateRequest";
import { AuthValidation } from "./auth.validation";

const router= Router();


router.post(
    '/signup',
    validateRequest(UserValidation.createUserValidationSchema),
    AuthControllers.createUser
  );
  router.post(
    '/login',
    validateRequest(AuthValidation.loginValidationSchema),
    AuthControllers.loginUser
  );


  router.post(
    '/refresh-token',
    validateRequestCookies(AuthValidation.refreshTokenValidationSchema),
    AuthControllers.refreshToken
  );

  export const AuthRoutes = router;