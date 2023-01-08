import { createSlice } from '@reduxjs/toolkit';

const homeReducer = createSlice({
    name: 'home',
    initialState: {
        courses: {
            currentCourses: null,
            error: false,
        },
    },
    reducers: {
        getAllCoursesSuccess: (state, action) => {
            state.courses.currentCourses = action.payload;
            state.courses.error = false;
        },
        getAllCoursesFailed: (state) => {
            state.courses.error = false;
        },
    },
});

export const { getAllCoursesSuccess, getAllCoursesFailed } = homeReducer.actions;

export default homeReducer.reducer;
