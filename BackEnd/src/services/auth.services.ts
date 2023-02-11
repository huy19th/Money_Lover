import bcrypt from "bcrypt";

import BaseServices from "./base.services";
import dataSource from "../database/data-source";
import User from "../models/user.model";
import UserServices from "./user.services";

let userRepo = dataSource.getRepository(User);

class AuthServices extends BaseServices {

    static async register(name: string, email: string, password: string): Promise<void> {
        await this.validateEmail(email);
        await this.validatePassword(password);
        let user = new User();
        user.email = email;
        user.password = await bcrypt.hash(password, 10);
        user.name = name;
        await userRepo.save(user);
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


}


export default AuthServices;