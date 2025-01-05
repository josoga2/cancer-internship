import axios from 'axios';
import { SERVER_URL } from './constants/constants';

const publicApi = axios.create({
    baseURL: SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default publicApi;
