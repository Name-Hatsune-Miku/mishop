import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.timeout = 30000;
axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (err) {
        return Promise.reject(err);
    }
);

export function getstrCode(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params,
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

export function apiloginPost(url, params) {
    return new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: url,
            data: params,
        })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

export function apiregisterPost(url, params) {
    return new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: url,
            data: params,
        })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

export function apidelete(url, params) {
    return new Promise((resolve, reject) => {
        axios({
            method: "delete",
            url: url,
            data: params,
        })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

