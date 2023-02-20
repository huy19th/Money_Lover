import { axiosJWT } from "@/configs/axios";
import {myAxios} from "@/configs/axios";

export const ChangePassword = (value) =>{
    return axiosJWT.post('/auth/reset-password',value);
}

class UserService {
    static verifyEmail(hash) {
        return myAxios.get(`/auth/verify/${hash}`);
    }
}

export default UserService;