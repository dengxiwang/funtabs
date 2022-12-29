import { message } from "antd";

export default async function updateData() {
    const data = {};
    const userName = window.localStorage.getItem('userName')
    const password = window.localStorage.getItem('password')
    for (var i = 0; i < localStorage.length; i++) {
        data[localStorage.key(i)] = localStorage.getItem(localStorage.key(i))
    }
    delete data['password']
    delete data['userName']
    if (userName === '' || password === '') {
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
        console.log(JSON.stringify(data));
        await fetch('/api/saveData', {
            method: 'POST',
            body: JSON.stringify({ "userName": userName, "password": password, "data": JSON.stringify(data) }),
        }).then((res) => {
            if (res.status === 500) {
                res.text().then(
                    res => {
                        const result = JSON.parse(res)
                        message.error(result.message)
                    }
                )
            } else if (res.status === 200) {
                res.text().then(
                    res => {
                        const result = JSON.parse(res)
                        message.success(result.message)
                    }
                )
            }
        })
    }
}