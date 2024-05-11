import {getstrCode, apiloginPost, apiregisterPost, apidelete} from "./api";

export function getstrCodedata() {
    return new Promise((resolve) => {
        getstrCode("index.php/index/index/getcode").then(res => {
            resolve(res)
        })
    })
}

export function getenterprise() {
    return new Promise((resolve) => {
        getstrCode("index.php/index/call/getsuperes").then(res => {
            resolve(res)
        })
    })
}

export function apiloginPostdata(data) {
    return new Promise((resolve) => {
        apiloginPost("index.php/index/index/login", data).then(res => {
            resolve(res)
        })
    })
}

export function apiregisterPostdata(data) {
    return new Promise((resolve) => {
        apiregisterPost("index.php/index/index/register", data).then(res => {
            resolve(res)
        })
    })
}

export function getenterprisedata(data) {
    return new Promise((resolve, reject) => {
        const urlWithId = `index.php/index/call/getsuperbyid?id=${data}`;
        apiloginPost(urlWithId, {}).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    });
}

export function editenterprisestatus(data) {
    return new Promise((resolve) => {
        apiregisterPost("index.php/index/call/upsuperstatus", data).then(res => {
            resolve(res)
        })
    })
}

export function addenterprisedata(data) {
    return new Promise((resolve) => {
        apiregisterPost("index.php/index/call/addsuper", data).then(res => {
            resolve(res)
        })
    })
}

export function sercheeterpriseonly(data) {
    return new Promise((resolve) => {
        apiregisterPost("index.php/index/call/getsearches", "ename=" + data).then(res => {
            resolve(res)
        })
    })
}

export function contest() {
    return new Promise((resolve) => {
        getstrCode("index.php/index/index/getImgList").then(res => {
            resolve(res)
        })
    })
}

export function earchs() {
    return new Promise((resolve) => {
        getstrCode("index.php/index/index/getMoreList").then(res => {
            resolve(res)
        })
    })
}

export function configlist(data) {
    return new Promise((resolve) => {
        apiregisterPost("index.php/index/role/getroleslist", data).then(res => {
            resolve(res)
        })
    })
}

export function configset() {
    return new Promise((resolve) => {
        getstrCode("index.php/index/call/getmenu").then(res => {
            resolve(res)
        })
    })
}

export function stopconfigstatus(data) {
    return new Promise((resolve) => {
        apiregisterPost("index.php/index/role/stoproles", data).then(res => {
            resolve(res)
        })
    })
}

export function deleterole(id) {
    return new Promise((resolve) => {
        apidelete(`index.php/index/role/delroles?id=${id}`).then(res => {
            resolve(res)
        })
    })
}

export function getteacherlist(data) {
    return new Promise((resolve) => {
        apiregisterPost("/index.php/index/teacher/teacherlist", data).then(res => {
            resolve(res)
        })
    })
}

export function addteacher(data) {
    return new Promise((resolve) => {
        apiregisterPost("index.php/index/index/addteacher", data).then(res => {
            resolve(res)
        })
    })
}

export function getsearch(data) {
    return new Promise((resolve) => {
        getstrCode("index.php/index/teacher/getsearch", data).then(res => {
            resolve(res)
        })
    })
}

export function deleteteacher(id) {
    return new Promise((resolve) => {
        getstrCode("index.php/index/teacher/delteacher?id=" + id).then(res => {
            resolve(res)
        })
    })
}

export function upteacher(data) {
    return new Promise((resolve) => {
        apiregisterPost("index.php/index/index/upteacher", data).then(res => {
            resolve(res)
        })
    })
}