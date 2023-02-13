import { axiosJWT } from "@/configs/axios";

class WalletService {
    static getAllWalletsOfUser() {
        return axiosJWT.get('/wallet');
    }
    static getWalletsIncludeInTotal() {
        return axiosJWT.get('/wallet/include-in-total');
    }
    static getWalletsNotIncludeInTotal() {
        return axiosJWT.get('/wallet/not-include-in-total');
    }
}

export default WalletService;