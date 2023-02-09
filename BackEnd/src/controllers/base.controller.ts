import jwt from 'jsonwebtoken';
import User from 'src/models/user.model';
require('dotenv').config();

class BaseController {

    static getRandomString(): string{

        let randomString = '';

        for (let i = 0; i < 10; i++) {
            randomString += Math.floor(Math.random() * 10).toString();
        }
        
        return randomString;
    }


    static generateAccessToken(payload) {
        return jwt.sign(payload, `${process.env.JWT_SECRET_KEY}`, { expiresIn: "15m" }
        );
    

    static generateRefreshToken(user : User): string {
        return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, `${process.env.JWT_REFRESH_KEY}`);
    };

}

export default BaseController;
