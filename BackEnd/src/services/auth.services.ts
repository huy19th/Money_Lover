import bcrypt from "bcrypt";

import BaseServices from "./base.services";
import dataSource from "../database/data-source";
import User from "../models/user.model";
import UserServices from "./user.services";

let userRepo = dataSource.getRepository(User);

class AuthServices extends BaseServices {

    static async register({name, email, password, googleId, image, refreshToken}): Promise<User> {
        await this.validateEmail(email);
        await this.validatePassword(password);
        let user = new User();
        user.email = email;
        user.password = await bcrypt.hash(password, 10);
        user.name = name;
        user.image = image;
        user.googleId = googleId
        user.refreshToken = refreshToken
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
        let accessToken = this.generateAccessToken(user);
        let refreshToken = this.generateRefreshToken(user);
        user.refreshToken = refreshToken;
        userRepo.save(user);
        return [accessToken, refreshToken];
    }

    static async resetPassword(user, confirmPassword, newPassword) {
        let oldPassword = user.password;
        let confirmPasswordSuccess = await bcrypt.compare(confirmPassword, oldPassword);
        if (confirmPasswordSuccess) {
            user.password = await bcrypt.hash(newPassword, 10);
            userRepo.save(user);
        }
        else {
            throw new Error ("Password Mismatch");
        }
    }
}


export default AuthServices;