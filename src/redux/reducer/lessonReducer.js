import { createSlice } from '@reduxjs/toolkit';

const lessonReducer = createSlice({
    name: 'lesson',
    initialState: {
        currentLesson: null,
    },
    reducers: {
        getCurrentLesson: (state, action) => {
            state.currentLesson = action.payload;
        },
    },
});

export const { getCurrentLesson } = lessonReducer.actions;

export default lessonReducer.reducer;
