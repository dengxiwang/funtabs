import { message } from "antd";
import { post } from "./fetch";

export default async function getData() {
    const userName = window.localStorage.getItem('userName')
    const password = window.localStorage.getItem('password')
    if (userName === undefined || password === undefined || userName === null || password === null) {
        message.error('账号配置错误')
        window.localStorage.removeItem('userName')
        window.localStorage.removeItem('password')
        setTimeout(() => {
            window.location.reload(true)
        }, 1000);
    } else if (userName.length > 18 || userName.length < 5) {
        message.error('账号配置错误')
        window.localStorage.removeItem('userName')
        window.localStorage.removeItem('password')
        setTimeout(() => {
            window.location.reload(true)
        }, 1000);
    } else if (!/[a-zA-Z]/.test(userName[0])) { // 2、首字符不是字母
        message.error('账号配置错误')
        window.localStorage.removeItem('userName')
        window.localStorage.removeItem('password')
        setTimeout(() => {
            window.location.reload(true)
        }, 1000);
    } else if (/\W/.test(userName)) { // 3、用户名必须是数字、字母、下划线组成
        message.error('账号配置错误')
        window.localStorage.removeItem('userName')
        window.localStorage.removeItem('password')
        setTimeout(() => {
            window.location.reload(true)
        }, 1000);
    } else if (/\W/.test(password)) {
        message.error('账号配置错误')
        window.localStorage.removeItem('userName')
        window.localStorage.removeItem('password')
        setTimeout(() => {
            window.location.reload(true)
        }, 1000);
    } else if (password.length > 18 || password.length < 3) {
        message.error('账号配置错误')
        window.localStorage.removeItem('userName')
        window.localStorage.removeItem('password')
        setTimeout(() => {
            window.location.reload(true)
        }, 1000);
    } else {
        await post('/api/getData', { "userName": userName, "password": password }
        ).then((res) => {
            if (res !== null) {
                const result = JSON.parse(res)
                window.localStorage.setItem('userName', result.message[0].userName)
                window.localStorage.setItem('password', result.message[0].password)
                const data = result.message[0].data;
                recoveryData(data)
            }
        })
    }
}

function recoveryData(value) {
    if (value === '' || value === null || value === undefined || value === '{}') {
        message.error('云端同步数据为空')
    } else {
        const dataValue = value.replace(/----/g, '\\')
        try {
            const data = JSON.parse(dataValue)
            //根据要恢复的数据，生成对应的localStorage
            for (var i = 0; i < Object.keys(data).length; i++) {
                window.localStorage.setItem(Object.keys(data)[i], Object.values(data)[i])
            }
            message.success('云端数据拉取成功')
            setTimeout(() => {
                window.location.reload(true)
            }, 1000);
        } catch (e) {
            console.log(e);
        }
    }
}
