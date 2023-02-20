import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import BaseServices from "./base.services";
import dataSource from "../database/data-source";
import User from "../models/user.model";
import UserServices from "./user.services";
require('dotenv').config();

let userRepo = dataSource.getRepository(User);

class AuthServices extends BaseServices {

    static async register({ name, email, password, googleId, image, refreshToken, active }): Promise<User> {
        await this.validateEmail(email);
        await this.validatePassword(password);
        let user = new User();
        user.email = email;
        user.password = await bcrypt.hash(password, 10);
        user.name = name;
        user.image = image;
        user.googleId = googleId;
        user.refreshToken = refreshToken;
        user.active = active
        await userRepo.save(user);
        return user
    }

    static async checkAuthAndGenerateTokens(email, password): Promise<string[]> {
        let user = await UserServices.getUserByEmail(email);
        if (!user) {
            throw new Error("Wrong email or password");
        }
        let match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error("Wrong email or password");
        }
        if (!user.active) {
            throw new Error("Please verify your email to login");
        }
        let accessToken = this.generateAccessToken(user);
        let refreshToken = this.generateRefreshToken(user);
        user.refreshToken = refreshToken;
        userRepo.save(user);
        return [accessToken, refreshToken];
    }

    static async resetPassword(user, oldPassword, newPassword) {
        console.log(newPassword)
        let oldPasswords = user.password;
        let confirmPasswordSuccess = await bcrypt.compare(oldPassword, oldPasswords);
        console.log(confirmPasswordSuccess)
        if (confirmPasswordSuccess) {
            user.password = await bcrypt.hash(newPassword, 10);
            await userRepo.save(user);
        }
        else {
            throw new Error("Password Mismatch");
        }
    }

    static async sendEmailVerificationRequest(email: string): Promise<void> {
        let hash = await bcrypt.hash(email, 10);
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            service: 'gmail',
            auth: {
                user: process.env.AUTH_EMAIL,
                pass: process.env.AUTH_PASSWORD
            }
        });
        let options = {
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: 'Money Lover Email Verification',
            html: `
            <div>
                <span>Dear New User</span>
                <p>
                    You have just registered a Money Lover account.<br/>
                    Please click the following link to verify your email:
                </p>
                <a href="http://localhost:3000/verify/${hash}">
                    http://localhost:3000/verify/${hash}
                </a>
                <p>
                    Please ignore this email if you didn't register.
                </p>
            </div>
            `
        }
        transporter.sendMail(options, (err, info) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Message sent: ' + info.response);
            }
        })
    }

    static async verifyEmail({hash}): Promise<void> {
        let users = await userRepo.findBy({
            active: false
        })
        users.forEach(user => {
            bcrypt.compare(user.email, hash, (err, result) => {
                if (result) {
                    user.active = true;
                    return userRepo.save(user);
                }
            })
        })
    }
}

export default AuthServices;