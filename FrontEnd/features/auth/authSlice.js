import {createSlice} from "@reduxjs/toolkit";

let initialState = {
    isLoggedIn: false,
    refreshToken: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loggedIn: (state, action) => {
            state.isLoggedIn = true;
            state.refreshToken = action.payload
            return state
        },
        loggedOut: (state, action) => {
            state = initialState
            return state
        },
    }
})

export const authActions = authSlice.actions;
export default authSlice;