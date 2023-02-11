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

    static async resetPassword(req, res) {
        try {
            let { password, resetPassword } = req.body
            let user = await userRepo.findOneBy({ id: req.params.userId });
            let newPassword = await bcrypt.compare(password, user.password)

            let resetPasswords = await bcrypt.hash(resetPassword, 10);
            if (!newPassword) {
                res.status(401).json({ message: 'password mismatch' })
            } else {
                user.password = resetPasswords
                await userRepo.save(user)
                return res.status(200).json(user)
            }
        } catch (err) {
            console.log(err)
            res.status(err.status).json({ message: err.message })
        }
    }

}

export default AuthController;