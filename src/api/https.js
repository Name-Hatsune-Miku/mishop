import {getstrCode,apiloginPost,apiregisterPost} from "./api";

export function getstrCodedata() {
    return new Promise((resolve) => {
            getstrCode("index.php/index/index/getcode").then(res => {
                resolve(res)
            })
    })
}

export function apiloginPostdata(data) {
    return new Promise((resolve) => {
        apiloginPost("index.php/index/index/login",data).then(res => {
            resolve(res)
        })
    })
}

export function apiregisterPostdata(data) {
    return new Promise((resolve) => {
        apiregisterPost("index.php/index/index/register",data).then(res => {
            resolve(res)
        })
    })
}