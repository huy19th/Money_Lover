import BaseServices from "./base.services";
import dataSource from "../database/data-source";
import TransSubCate from "../models/trans.subcate.model";
import TransCate from "../models/trans.cate.model";

let transSubCateRepo = dataSource.getRepository(TransSubCate);
let tranCateRepo = dataSource.getRepository(TransCate);

class TransSubCateServices extends BaseServices {
  static async getAllSubCatesByType(typeId: number): Promise<TransSubCate[]> {
    let transSubCates = await transSubCateRepo.find({
      relations: {
        category: {
          transType: true,
        },
      },
      where: {
        category: {
          transType: {
            id: typeId,
          },
        },
      },
    });

    return transSubCates;
  }

  static async getSubCateById(subCateId: number): Promise<TransSubCate> {
    let transSubCate = await transSubCateRepo.findOneBy({ id: subCateId });
    if (!transSubCate) {
      throw new Error("Transaction subcategory not found");
    }
    return transSubCate;
  }
  static async add(data): Promise<void> {
    await transSubCateRepo.save(
        { category: { id: data.cateId }, ...data });
  }

  static async updateSubCate({subCateId , cateId, name}): Promise<TransSubCate>{
    let transSubCate = await this.getSubCateById(subCateId);
    let category = await tranCateRepo.findOneBy({ id: cateId})
    transSubCate.category = category
    transSubCate.name = name
    await tranCateRepo.save(transSubCate);
    return transSubCate;
  }
}

export default TransSubCateServices;
