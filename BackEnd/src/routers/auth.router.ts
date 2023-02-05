import express, {Router} from 'express';
import AuthController from "../controllers/auth.controller";
import { Request, Response } from "express";
const AuthRouter: Router = express.Router();

const authController = new AuthController();

AuthRouter.get('/', (req: Request, res : Response) => {
    res.send('auth router');
});

export default AuthRouter;