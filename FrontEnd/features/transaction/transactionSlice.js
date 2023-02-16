import {createSlice} from "@reduxjs/toolkit";

let initialState = {
    currentTransaction: {
        subCate_name: '',
        wallet_name: '',
        date: '',
        note: '',
        type_name: '',
        money: ''
    },
    trans: []
}

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState: initialState,
    reducers: {
        getTrans(state, action) {
            state = {...state, trans: action.payload}
            return state
        },
        changeCurrentTransaction(state, action) {
            state = {...state, currentTransaction: action.payload}
            return state
        },
        resetTrans(state) {
            state = initialState
            return state
        }
    }
})

export const transactionActions = transactionSlice.actions;
export default transactionSlice;