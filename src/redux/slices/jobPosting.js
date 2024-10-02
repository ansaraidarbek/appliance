import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isJobPostingModal: false,
    job: null
};

const jobPostingSlice = createSlice({
    name: 'jobPosting',
    initialState,
    reducers: {
        setJobPostingModal: (state, action) => {
            state.isJobPostingModal = action.payload;
            state.job = null;
        },
        editJobPostingModal: (state, action) => {
            const {isJobPostingModal, job} = action.payload;
            state.isJobPostingModal = isJobPostingModal;
            state.job = job;
        }
    },
});

export const {setJobPostingModal, editJobPostingModal } = jobPostingSlice.actions;
export default jobPostingSlice.reducer;