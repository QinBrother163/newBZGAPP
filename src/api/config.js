import axios from 'axios';
import store from 'src/store/index.js';

const API_ROOT = process.env.API_ROOT;
let http = axios.create({
    baseURL: API_ROOT,
    timeout: 1000,
    crossDomain: true,
    withCredentials: true,
    headers: {
        post:{
            "Content-Type": 'application/x-www-form-urlencoded'
        }
    }
  });
// http request 拦截器
http.interceptors.request.use(
    config => {
        if (store.state.token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `${store.state.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器

http.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    store.dispatch('LOGOUT');
                    router.replace({ path: '/login' });
                    // Alert('登录失效，请重新登录！');
                    break;
                    // case 500:
                    //     alert(`服务器发生错误！即将跳转到首页`);
                    //     router.replace({ path: '/home' });
            }
        }
        return Promise.reject(error.response.data) // 返回接口返回的错误信息
    });

    export default http;