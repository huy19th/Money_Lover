import BaseServices from "./base.services";
import dataSource from "../database/data-source";
import TransCate from "../models/trans.cate.model";
import TransSubCate from "../models/trans.subcate.model";
import TransSubCateServices from "./transsubcate.services";

let transCateRepo = dataSource.getRepository(TransCate);
let transSubRepo = dataSource.getRepository(TransSubCate);

class TransCateServices extends BaseServices {
    static async getAllCates(): Promise<TransCate[]> {
        let result = await transCateRepo.find({
            relations: {
                subCategories: true,
            }
        })
        return result;
    }
    static async addCate(subcategoryId, categories): Promise<void>{




        try {

        }
        catch (err){

        }

    }


}

export default TransCateServices ;