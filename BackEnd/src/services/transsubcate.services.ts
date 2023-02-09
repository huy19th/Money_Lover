import BaseServices from "./base.services";
import dataSource from "../database/data-source";
import TransSubCate from "../models/trans.subcate.model";

let transSubCateRepo = dataSource.getRepository(TransSubCate);

class TransSubCateServices extends BaseServices {

    static async getAllSubCatesByType(typeId: number): Promise<TransSubCate[]> {
        let transSubCates = await transSubCateRepo.find({
            relations: {
                category: {
                    transType: true
                }
            },
            where: {
                category: {
                    transType: {
                        id: typeId
                    }
                }
            }
        });

        return transSubCates;
    }
}


export default TransSubCateServices ;