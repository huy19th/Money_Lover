import BaseServices from "./base.services";
import dataSource from "../database/data-source";
import TransType from "../models/trans.type.model";

let transTypeRepo = dataSource.getRepository(TransType)

class TransTypeServices extends BaseServices {
    static async getAll(): Promise<TransType[]> {
        return await transTypeRepo.find({
            relations: {
                transCates: {
                    subCategories: true
                }
            }
        })
    }
    static async getTransactionTypeBySubCate(subcategoryId: number): Promise<TransType> {
        let transType = await transTypeRepo.findOneBy({
            transCates: {
                subCategories: {
                    id: subcategoryId
                }
            }
        });
        if (!transType) {
            throw new Error("Transaction type not found");
        }
        return transType;
    }
}

export default TransTypeServices;