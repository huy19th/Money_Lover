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

const authController = new AuthController();

AuthRouter.post('/register', authController.register);
AuthRouter.post('/login', authController.login);
AuthRouter.post('/refresh', AuthMiddleware.refreshToken);
AuthRouter.get('/logout', AuthMiddleware.checkAuthentication, authController.logout);

// Social Authentication
const CLIENT_URL = process.env.BASE_URL + 'home'
AuthRouter.get('/login/success', async (req: any, res) => {
    if (req.user) {
        let payload = {
            id: req.user.id,
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
AuthRouter.get('/logout', (req: any, res) => {
    req.logout();
    res.redirect(CLIENT_URL)
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


