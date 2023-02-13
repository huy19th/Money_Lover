import BaseController from "./base.controller";
import User from "../models/user.model";
import bcrypt from "bcrypt";
import dataSource from "../database/data-source";
import { Request, Response } from "express";

let userRepo = dataSource.getRepository(User);

//code so bad
class AuthController extends BaseController {


    async register(req: Request , res: Response) {

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
                email: user.email,
                name: user.name,
                image: user.image
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