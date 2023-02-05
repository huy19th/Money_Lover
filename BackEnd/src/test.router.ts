import express, {Router} from 'express';
import TestController from "./test.controller";
import { Request, Response } from "express";
const multer = require("multer");
let upload = multer();
const TestRouter: Router = express.Router();

const testController = new TestController();

TestRouter.get('/', (req: Request, res: Response) => {
    res.send("test");
})
// TestRouter.get('/wallet', testController.getWallets);
TestRouter.post('/user', upload.none(), testController.createUser);



export default TestRouter;