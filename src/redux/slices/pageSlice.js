// src/redux/slices/pageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const root = '/appliance';
const pageSlice = createSlice({
    name: 'page',
    initialState: {
        prevPage: null,
        currentPage: root + "/",
    },
    reducers: {
        nextPage: (state, action) => {
            if (state.currentPage !== action.payload) {
                console.log("Navigating to: " + action.payload);
                state.prevPage = state.currentPage;
                state.currentPage = root + action.payload;
            }
        },
        backPage: (state) => {
            state.currentPage = (state.prevPage !== null) ? state.prevPage : root + '/';
            state.prevPage = null;
        },
    },
});

export const { nextPage, backPage } = pageSlice.actions;
export default pageSlice.reducer;