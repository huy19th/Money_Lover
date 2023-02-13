import { axiosJWT } from "@/configs/axios";

export const  ChangePassword = () =>{
    return axiosJWT.post('auth/reset-password')

}