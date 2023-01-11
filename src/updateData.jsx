import { message } from "antd";
import { post } from "./fetch";

export default async function updateData() {
    const data = {};
    const userName = window.localStorage.getItem('userName')
    const password = window.localStorage.getItem('password')
    for (var i = 0; i < localStorage.length; i++) {
        data[localStorage.key(i)] = localStorage.getItem(localStorage.key(i))
    }
    delete data['password']
    delete data['userName']

    //验证本地记录的账号密码是否符合格式要求，再调取上传数据接口
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
    } else {
        //调用接口
        await post('/api/saveData', { "userName": userName, "password": password, "data": JSON.stringify(data) }).then((res) => {
            if (res !== null) {
                const result = JSON.parse(res)
                message.success(result.message)
            }
        })
    }
}