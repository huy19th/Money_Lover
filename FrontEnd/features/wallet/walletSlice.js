import {createSlice} from "@reduxjs/toolkit";

let initialState = {
    currentWallet: {
        id: '',
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
        },
        resetWallet(state, action) {
            state = initialState
            return state
        },
        changeWallets(state, action) {
            const change = +action.payload
            let allWallet = [];
            let others = [];
            state.wallets.map(wallet => {
                if (wallet.id === state.currentWallet.id) {
                    allWallet.push(wallet)
                } else {
                    others.push(wallet)
                }
            })
            allWallet[0].balance += change
            state.wallets = [...others, ...allWallet]
            state.currentWallet.balance = allWallet[0].balance
        }
    }
})

export const walletActions = walletSlice.actions;
export default walletSlice;