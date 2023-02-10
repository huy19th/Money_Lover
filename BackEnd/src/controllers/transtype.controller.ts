import BaseController from "./base.controller";
import { Request, Response } from "express"
import TransTypeServices from "../services/transtype.services";

class TransTypeController extends BaseController {
    async getAllTypes(req, res) {
        TransTypeServices.getAll().then(types => {
            res.json(types)
        })
    }
}

export default TransTypeController;