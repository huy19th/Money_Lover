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

}

export default AuthController;