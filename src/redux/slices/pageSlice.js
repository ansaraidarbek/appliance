// src/redux/slices/pageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const pageSlice = createSlice({
    name: 'page',
    initialState: {
        prevPage: null,
        currentPage: '/',
    },
    reducers: {
        nextPage: (state, action) => {
            if (state.currentPage !== action.payload) {
                console.log("Navigating to: " + action.payload);
                state.prevPage = state.currentPage;
                state.currentPage = action.payload;
            }
        },
        backPage: (state) => {
            state.currentPage = (state.prevPage !== null) ? state.prevPage : '/';
            state.prevPage = null;
        },
    },
});

export const { nextPage, backPage } = pageSlice.actions;
export default pageSlice.reducer;