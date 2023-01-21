import axios from 'axios';

export default baseInstance = axios.create({
    baseURL: 'http://localhost:5000/'
});