import {createSlice} from "@reduxjs/toolkit";

let initialState = {
    currentWallet: {
        name: '',
        balance: '',
        include_total: '',
        active: ''
    },
    wallets: []
}

export const walletSlice = createSlice({
    name: 'wallet',
    initialState: initialState,
    reducers: {
        getWallets(state, action) {
            state = {...state, wallets: action.payload}
            return state
        },
        changeCurrentWallet(state, action) {
            state = {...state, currentWallet: action.payload}
            return state
        }
    }
})

export const walletActions = walletSlice.actions;
export default walletSlice;