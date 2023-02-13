import express, {Router} from 'express';
import passport from "passport";
import AuthController from "../controllers/auth.controller";
import AuthMiddleware from "../middlewares/auth.middlewares";
import BaseController from "../controllers/base.controller";
import dataSource from "../database/data-source";
import User from "../models/user.model";

require('dotenv').config();
const AuthRouter: Router = express.Router();

let userRepo = dataSource.getRepository(User);
const CLIENT_URL = process.env.BASE_URL + 'home';

AuthRouter.post('/register', AuthController.register);
AuthRouter.post('/login', AuthController.login);
AuthRouter.post('/refresh', AuthMiddleware.refreshToken);
AuthRouter.get('/logout', AuthMiddleware.checkAuthentication, AuthController.logout);
AuthRouter.post('/reset-password', AuthMiddleware.checkAuthentication, AuthController.resetPassword);
AuthRouter.post('/login/google', AuthController.loginWithGoogle);
// Social Authentication

AuthRouter.get('/login/success', async (req: any, res) => {
    if (req.user) {
        let payload = {
            id: req.user.id,
            email: req.user.email,
            name: req.user.name,
            image: req.user.image
        }
        let accessToken = BaseController.generateAccessToken(payload);
        let refreshToken = BaseController.generateRefreshToken(payload);
        req.user.refreshToken = refreshToken;
        await userRepo.save(req.user)
        res.status(200).json(
            {
                accessToken: accessToken,
                refreshToken: refreshToken,
            }
        )
    }
})

// Google
AuthRouter.get('/google', passport.authenticate('google', {scope: ["profile", "email"]}));
AuthRouter.get('/google/callback', passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: process.env.BASE_URL + 'login'
}));

// Github
AuthRouter.get('/github', passport.authenticate('github', {scope: ["profile", "email"]}));
AuthRouter.get('/github/callback', passport.authenticate('github', {
    successRedirect: CLIENT_URL,
    failureRedirect: process.env.BASE_URL + 'login'
}));

export default AuthRouter;




