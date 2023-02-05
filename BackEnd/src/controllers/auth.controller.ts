import BaseController from "./base.controller";
import { Request, Response } from "express";
import User from "../models/user.model";
import dataSource from "../database/data-source";

let userRepo = dataSource.getRepository(User);

class AuthController extends BaseController {
   
}

export default AuthController;