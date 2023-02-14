import { axiosJWT } from "@/configs/axios";

class WalletService {
    static getAllWalletsOfUser() {
        return axiosJWT.get('/wallet');
    }
}

export default WalletService;