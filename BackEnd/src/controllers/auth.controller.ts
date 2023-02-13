import bcrypt from "bcrypt";
import { Request, Response } from "express";
import dataSource from "../database/data-source";
import BaseController from "./base.controller";
import User from "../models/user.model";
import AuthServices from "../services/auth.services";

let userRepo = dataSource.getRepository(User);

class AuthController extends BaseController {

    static async register(req: Request, res: Response) {
        try {
            let { name, email, password } = req.body
            await AuthServices.register(name, email, password);
            res.status(200).json({ message: 'Registered successfully!' });
        }
        catch (err: any) {
            res.status(500).json({ message: err.message || this.defaultErrorMessage })
        }
    }

    static async login(req: Request, res: Response) {
        try {
            let { email, password } = req.body;
            let [accessToken, refreshToken] = await AuthServices.checkAuthAndGenerateTokens(email, password);
            res.status(200).json({
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
        }
        catch (err: any) {
            res.status(500).json({ message: err.message || this.defaultErrorMessage });
        }
    }
    static async logout(req, res) {
        req.user.refreshToken = null;
        await userRepo.save(req.user);
        res.status(200).json({ message: 'Logged out successfully!' });
    }

    static async resetPassword(req: Request, res: Response) {
        try {
            let { confirmPassword, newPassword } = req.body;
            await AuthServices.resetPassword(req.user, confirmPassword, newPassword);
            res.status(200).json({message: 'Reset password successfully!'})
        }
        catch (err) {
            res.status(500).json({ message: err.message || this.defaultErrorMessage })
        }
    }

    async loginWithGoogle(req, res) {
        console.log(req.body)
        let existingUser = await userRepo.findOneBy({ googleId: req.body.sub });
        if (existingUser) {
            let payload = {
                id: existingUser.id,
                email: existingUser.email,
                name: existingUser.name,
                image: existingUser.image
            }
            let accessToken = BaseController.generateAccessToken(payload);
            let refreshToken = BaseController.generateRefreshToken(payload);
            existingUser.refreshToken = refreshToken
            await userRepo.save(existingUser)
            res.status(200).json({
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
        } else {
            let newUser = new User();
            newUser.name = req.body.name;
            newUser.email = req.body.email;
            newUser.password = BaseController.getRandomString();
            newUser.googleId = req.body.sub;
            newUser.image = req.body.picture
            let payload = {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                image: newUser.image
            }
            let accessToken = BaseController.generateAccessToken(payload);
            let refreshToken = BaseController.generateRefreshToken(payload);
            newUser.refreshToken = refreshToken
            await userRepo.save(newUser)
            res.status(200).json({
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
        }
    }

}

export default AuthController;