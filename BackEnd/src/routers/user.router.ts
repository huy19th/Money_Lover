import express, {Router} from 'express';
import UserController from "../controllers/user.controller";
import { Request, Response } from "express";


const UserRouter: Router = express.Router();

const userController = new UserController();
UserRouter.post('/update', userController.update)

export default UserRouter;