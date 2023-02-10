import {createSlice} from "@reduxjs/toolkit";

let initialState = {
    isLoggedIn: false,
    refreshToken: '',
    currentUser: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loggedIn: (state, action) => {
            state.isLoggedIn = true;
            state.refreshToken = action.payload.refreshToken
            state.currentUser = action.payload.user
            return state
        },
        loggedOut: (state, action) => {
            state = initialState
            return state
        },
        updateUser: (state, action) => {
            state.currentUser = {...state.currentUser, image: action.payload}
            return state
        }
    }
})

export const authActions = authSlice.actions;
export default authSlice;