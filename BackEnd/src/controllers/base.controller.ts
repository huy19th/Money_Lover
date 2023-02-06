import jwt from 'jsonwebtoken'
require('dotenv').config();

class BaseController {

    static generateAccessToken(payload) {
        return jwt.sign(payload, `${process.env.JWT_SECRET_KEY}`, { expiresIn: "15s" }
        );
    };

    static generateRefreshToken(user) {
        return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, `${process.env.JWT_REFRESH_KEY}`);
    };
}

export default BaseController;
