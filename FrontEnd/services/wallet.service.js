import { axiosJWT } from "@/configs/axios";

class WalletService {
    static getAllWalletsOfUser() {
        return axiosJWT.get('/wallet');
    }
    static getWalletsIncludedInTotal() {
        return axiosJWT.get('/wallet/included-in-total/true');
    }
    static getWalletsNotIncludedInTotal() {
        return axiosJWT.get('/wallet/included-in-total/false');
    }
    static formatMoney(money) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(money);
    }
}

export default WalletService;