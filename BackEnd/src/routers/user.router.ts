import express, {Router} from 'express';
import UserController from "../controllers/user.controller";
import { Request, Response } from "express";


const UserRouter: Router = express.Router();

const userController = new UserController();


export default UserRouter;