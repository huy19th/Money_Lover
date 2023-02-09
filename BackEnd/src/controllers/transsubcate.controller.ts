import BaseController from "./base.controller";
import { Request, Response } from "express";

import TransSubCateServices from "../services/transsubcate.services";

class TransSubCateController extends BaseController {

    static getAllSubCatesByType(req: Request, res: Response) {
        let transTypeId = Number(req.params.transTypeId);
        TransSubCateServices.getAllSubCatesByType(transTypeId)
        .then(transSubCates => {
            res.status(200).json(transSubCates);
        })
        .catch(err => {
            res.status(500).json(err);
        })
    }
   
}

export default TransSubCateController;