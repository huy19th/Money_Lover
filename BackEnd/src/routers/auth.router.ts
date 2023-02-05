import express, {Router} from "express";
import AuthController from "../controllers/auth.controller";
import { Request, Response } from "express";
const multer = require("multer");

const upload = multer();

const AuthRouter: Router = express.Router();

const authController = new AuthController();

AuthRouter.post('/register', upload.none(), )

export default AuthRouter;