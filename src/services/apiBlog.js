import { loadingStart, loadingSuccess } from '~/redux/reducer/modunReducer';
import * as request from '~/utils/request';

export const handleCreateNewPost = async (newPost, dispatch) => {
    dispatch(loadingStart());
    try {
        const res = await request.post('/blog/create', newPost);

        dispatch(loadingSuccess());
        return res;
    } catch (error) {
        dispatch(loadingSuccess());
        return error.response.data;
    }
};

export const getPageBlogs = async (page) => {
    try {
        const res = await request.get(`/blog/get-page?page=${page}`);

        return res;
    } catch (error) {
        return error.response;
    }
};

export const getPostBySlug = async (slug) => {
    try {
        const res = await request.get(`/blog/get-post/${slug}`);

        return res.data;
    } catch (error) {
        return error.response;
    }
};
