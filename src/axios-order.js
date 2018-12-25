import axios from 'axios';

const instance = axios.create({
    baseURL: "https://real-time-burger.firebaseio.com/"
});

export default instance;                            