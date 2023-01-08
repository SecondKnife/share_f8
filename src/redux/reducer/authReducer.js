import { createSlice } from '@reduxjs/toolkit';

const authReducer = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
        },
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.login.currentUser = action.payload;
        },
        registerSuccess: (state, action) => {
            state.login.currentUser = action.payload;
        },
        logoutSuccess: (state) => {
            state.login.currentUser = null;
        },
    },
});

export const { loginSuccess, registerSuccess, logoutSuccess } = authReducer.actions;

export default authReducer.reducer;
