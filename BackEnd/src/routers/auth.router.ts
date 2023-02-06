import express, {Router} from 'express';
import AuthController from "../controllers/auth.controller";
import AuthMiddleware from "../middlewares/auth.middlewares";
const AuthRouter: Router = express.Router();

const authController = new AuthController();

AuthRouter.post('/register', authController.register);
AuthRouter.post('/login', authController.login);
AuthRouter.post('/refresh', AuthMiddleware.refreshToken);
AuthRouter.get('/logout', AuthMiddleware.checkAuthentication, authController.logout);

export default AuthRouter;