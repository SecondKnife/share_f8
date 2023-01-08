import * as request from '~/utils/request';
import { loginSuccess, logoutSuccess, registerSuccess } from '~/redux/reducer/authReducer';
import { loadingStart, loadingSuccess } from '~/redux/reducer/modunReducer';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loadingStart());
    try {
        const res = await request.post('/user/login', user);

        dispatch(loginSuccess(res.data));
        dispatch(loadingSuccess());
        navigate('/');
        return res;
    } catch (error) {
        dispatch(loadingSuccess());
        return error.response;
    }
};

export const RegisterNewUser = async (newUser, dispatch, navigate) => {
    dispatch(loadingStart());
    try {
        const res = await request.post('/user/register', newUser);

        dispatch(registerSuccess(res.data));
        dispatch(loadingSuccess());
        navigate('/');
        return res;
    } catch (error) {
        dispatch(loadingSuccess());
        return error.response;
    }
};

export const logoutUser = async (dispatch, id, navigate, token, axiosJWT) => {
    dispatch(loadingStart());
    try {
        await axiosJWT.post('http://localhost:8080/api/user/logout', id, {
            headers: {
                token: token,
            },
        });

        dispatch(logoutSuccess());
        dispatch(loadingSuccess());
        navigate('/login');
    } catch (error) {
        dispatch(loadingSuccess());
    }
};

export const handleSendMail = async (email) => {
    try {
        const res = await request.post('/user/verify-email', { email });
        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const handlePostComment = async (newComment) => {
    try {
        const res = await request.post('/user/comment/create', newComment);

        return res;
    } catch (error) {
        return error.response.status;
    }
};

export const registerCourse = async (pathName, userId, dispatch) => {
    dispatch(loadingStart());
    try {
        const res = await request.post(`/user/register-course/${pathName}`, { userId });

        dispatch(loginSuccess(res.data));
        dispatch(loadingSuccess());
        const { data, ...other } = res;

        return { ...other };
    } catch (error) {
        dispatch(loadingSuccess());
        return error.response.data;
    }
};

export const getAllMyCourses = async (userId) => {
    try {
        const res = await request.post(`/user/get-myCourse/${userId}`);

        return res;
    } catch (error) {
        return error.response.data;
    }
};

export const getInfoUserByUsername = async (username) => {
    try {
        const res = await request.get(`/user/get-info/${username}`);

        return res;
    } catch (error) {
        return error.response.data;
    }
};
