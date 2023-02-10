import {createSlice} from "@reduxjs/toolkit";

let initialState = []

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState: initialState,
    reducers: {
        getTrans(state, action) {
            state = action.payload
            return state
        },
        addTran(state, action) {
            state = [...state, action.payload]
            return state
        },
        resetTrans(state, action) {
            state = initialState
            return state
        }
    }
})

export const transactionActions = transactionSlice.actions;
export default transactionSlice;