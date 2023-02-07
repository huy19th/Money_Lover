import { Http } from 'app/http';

export const getAllWallets = () => {
  return Http.get(`/wallets`);
};

export const getWalletById = (id) => {
  return Http.get(`/wallet/${id}`);
};
