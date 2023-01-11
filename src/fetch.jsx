import { message } from 'antd';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
//封装的请求
const request = (url, config) => {
    NProgress.start();
    return fetch(url, config).then((res) => {
        if (res.status === 500) {
            NProgress.done();
            res.text().then(
                res => {
                    const result = JSON.parse(res)
                    message.error(result.message)
                }
            )
            return null
        } else if (res.status === 404) {
            NProgress.done();
            message.error('请求地址不存在')
            return null
        } else if (res.status === 200) {
            NProgress.done();
            return res.text()
        }
    }).catch((error) => {
        NProgress.done();
        console.log("error---->", error)
        message.error('内部错误');
    });
};

//GET
export const get = (url) => {
    return request(url, {
        method: 'GET',
        mode: 'cors',
    });
};
//POST
export const post = (url, data) => {
    return request(url, {
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST'
    });
};