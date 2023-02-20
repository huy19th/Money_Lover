import { axiosJWT } from "@/configs/axios";
import {myAxios} from "@/configs/axios";

export const ChangePassword = (value) =>{
    return axiosJWT.post('/auth/reset-password',value);
}

class UserService {
    static verifyEmail(hash) {
        console.log(hash);
        let param = hash.join('/');
        return myAxios.post(`/auth/verify/`, {hash: param});
    }
}

export default UserService;