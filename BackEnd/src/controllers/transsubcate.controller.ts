import BaseController from "./base.controller";
import {Request, Response} from "express";

import TransSubCateServices from "../services/transsubcate.services";
import TransactionServices from "../services/transaction.services";
import WalletServices from "../services/wallet.services";

class TransSubCateController extends BaseController {
    static getAllSubCatesByType(req: Request, res: Response) {
        let transTypeId = Number(req.params.transTypeId);
        TransSubCateServices.getAllSubCatesByType(transTypeId)
            .then((transSubCates) => {
                res.status(200).json(transSubCates);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    }

    static async add(req: Request, res: Response) {
        try {
            let {cateId, name} = req.body;
            await TransSubCateServices.add({
                cateId,
                name,
            });
            res.status(200).json({message: "Added subCategory successfully"});
        } catch (err) {
            console.log(err);
            res.status(500).json({message: err.message});
        }
    }

    static async update(req: Request, res: Response) {
        try {
            await TransSubCateServices.updateSubCate(req.body);
            res.status(200).json()
        } catch (e) {
            res.status(500).json({message: e.message});

        }
    }
    // static async delete(req: Request, res: Response) {
    //     try {
    //         let tranCateId = +req.params.subCateId
    //         console.log(tranCateId)
    //         await TransSubCateServices.delete(tranCateId);
    //         res.status(200).json({message:'success'})
    //     }
    //     catch (e) {
    //         res.status(500).json({message: e.message});
    //     }
    // }
}

export default TransSubCateController;
