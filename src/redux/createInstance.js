import axios from 'axios';
import jwt_decode from 'jwt-decode';
import * as request from '~/utils/request';

const refreshToken = async () => {
    try {
        const res = await request.post('/user/refresh', {
            withCredentials: true,
        });
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const createAxios = (user, dispatch, stateSuccess) => {
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodeToken = jwt_decode(user?.accessToken);

            if (decodeToken.exp < date.getTime() / 1000) {
                const data = await refreshToken();

                const refreshUser = {
                    ...user.data,
                    accessToken: data.accessToken,
                };

                dispatch(stateSuccess(refreshUser));
                config.headers['token'] = data.accessToken;
            }

            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
    return newInstance;
};
