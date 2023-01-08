import { loadingStart, loadingSuccess } from '~/redux/reducer/modunReducer';
import * as request from '~/utils/request';

export const handleUploadImage = async (file, dispatch) => {
    dispatch(loadingStart());
    try {
        const res = await request.post('/upload/image', file);
        dispatch(loadingSuccess());
        return res;
    } catch (error) {
        dispatch(loadingSuccess());
        return error.response.data;
    }
};
