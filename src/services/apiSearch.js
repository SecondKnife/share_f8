import * as request from '~/utils/request';

export const search = async (params) => {
    try {
        const res = await request.get('upload/search', {
            params: {
                q: params,
            },
        });

        return res;
    } catch (error) {
        return error;
    }
};

export const getDataHomePage = async () => {
    try {
        const res = await request.get('/banners/home/get');

        return res;
    } catch (error) {
        return error.response.data;
    }
};
