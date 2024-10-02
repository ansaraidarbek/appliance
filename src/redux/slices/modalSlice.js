import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isPressed: false,
    },
    reducers: {
        setIsPressed: (state, action) => {
            state.isPressed = action.payload;
        },
    },
});

export const { setIsPressed } = modalSlice.actions;
export default modalSlice.reducer;