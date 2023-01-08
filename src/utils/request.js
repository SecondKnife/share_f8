import axios from 'axios';

const request = axios.create({
    baseURL: process.env.API_URL || 'https://api.mavietha.info/api',
});

export const get = async (path, option = {}) => {
    const res = await request.get(path, option);

    return res.data;
};

export const post = async (path, option = {}) => {
    const res = await request.post(path, option);

    return res.data;
};

export default request;
