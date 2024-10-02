import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './slices/modalSlice';
import userReducer from './slices/userSlice';
import pageSlice from "./slices/pageSlice";
import jobPosting from "./slices/jobPosting";

const store = configureStore({
    reducer: {
        modal: modalReducer,
        user: userReducer,
        page: pageSlice,
        jobPosting: jobPosting
    },
});

export default store;