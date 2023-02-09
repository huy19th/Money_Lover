import {createSlice} from "@reduxjs/toolkit";

let initialState = []

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState: initialState,
    reducers: {
        getTrans(state, action) {
            state = action.payload
            return state
        }
    }
})

export const transactionActions = transactionSlice.actions;
export default transactionSlice;