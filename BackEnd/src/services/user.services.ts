import BaseServices from "./base.services";
import dataSource from "../database/data-source";
import User from "../models/user.model";

let userRepo = dataSource.getRepository(User)

class UserServices extends BaseServices {
    static async updateUser(userId, userImage) {
        const user = await userRepo.findOneBy({id: userId})
        user.image = userImage
        await userRepo.save(user)
    }
}

export default UserServices;