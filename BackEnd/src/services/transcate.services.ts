import BaseServices from "./base.services";
import dataSource from "../database/data-source";
import TransCate from "../models/trans.cate.model";

let transCateRepo = dataSource.getRepository(TransCate);

class TransCateServices extends BaseServices {
    static async getAllCates(): Promise<TransCate[]> {
        let result = await transCateRepo.find({
            relations: {
                subCategories: true,
            }
        })
        return result;
    }


}

export default TransCateServices ;