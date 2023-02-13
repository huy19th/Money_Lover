import {createSlice} from "@reduxjs/toolkit";

let initialState = {
    current: {
        id: '',
        balance: ''
    },
    array: []
}

export const testSlice = createSlice({
    name: 'test',
    initialState: initialState,
    reducers: {
        getCurrent(state, action) {
            state.current = action.payload
        },
        getValues(state, action) {
            state.array = action.payload;
        },
        changeValues(state, action) {
            let newItem = []
            let others = []
            state.array.map(item => {
                if (item.id === 1) {
                    newItem.push(item)
                } else {
                    others.push(item)
                }
            })
            newItem[0].balance = 1000
            state.array = [...newItem, ...others]
        }
    }
})

export const testActions = testSlice.actions;
export default testSlice;