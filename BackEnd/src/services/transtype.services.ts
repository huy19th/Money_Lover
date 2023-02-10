import BaseServices from "./base.services";
import dataSource from "../database/data-source";
import TransType from "../models/trans.type.model";

let cateRepo = dataSource.getRepository(TransType)

class TransTypeServices extends BaseServices {
    static async getAll() {
        return await cateRepo.find({
            relations: {
                transCates: {
                    subCategories: true
                }
            }
        })
    }
}

export default TransTypeServices;