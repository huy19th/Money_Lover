import BaseController from "./base.controller";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import dataSource from "../database/data-source";

let userRepo = dataSource.getRepository(User);

class AuthController extends BaseController {

    async register(req, res) {
        let {name, email, password} = req.body;
        let user = new User();
        user.email = email ? email : null;
        user.password = password ? password : null;
        user.name = name || '';
        try {
            user.password = await bcrypt.hash(password, 10);
            await userRepo.save(user);
            res.status(200).json({message: 'Registered successfully!'});
        } catch (err: any) {
            let {sqlMessage} = err;
            res.status(500).json({message: sqlMessage})
        }
    }

    async login(req, res) {
        let {email, password} = req.body
        let user = await userRepo.findOneBy({email: email});
        if (!user) {
            return res.status(401).json({message: 'Wrong email or password!'});
        }
        let match = await bcrypt.compare(password, user.password);
        if (match) {
            let payload = {
                id: user.id,
            }
            let accessToken = BaseController.generateAccessToken(payload);
            let refreshToken = BaseController.generateRefreshToken(payload);
            user.refreshToken = refreshToken
            await userRepo.save(user)
            res.status(200).json({
                accessToken: accessToken,
                refreshToken: refreshToken,
            });
        } else {
            res.status(401).json({message: 'Wrong email or password!'});
        }
    }

    async logout(req, res) {
        req.user.refreshToken = null;
        await userRepo.save(req.user);
        res.status(200).json({message: 'Logged out successfully!'});
    }

    async resetPassword(req, res) {
        try {
            let {password, resetPassword} = req.body
            let user = await userRepo.findOneBy({id: req.params.userId});
            let newPassword = await bcrypt.compare(password, user.password)

            let resetPasswords = await bcrypt.hash(resetPassword, 10);
            if (!newPassword) {
                res.status(401).json({message: 'password mismatch'})
            } else {
                user.password = resetPasswords
                await userRepo.save(user)
                return res.status(200).json(user)
            }
        } catch (err) {
            console.log(err)
            res.status(err.status).json({message: err.message})
        }
    }

}

export default AuthController;