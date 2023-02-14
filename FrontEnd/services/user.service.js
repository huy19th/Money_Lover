import { axiosJWT } from "@/configs/axios";

export const  ChangePassword = (value) =>{
    return axiosJWT.post('/auth/reset-password',value);
}