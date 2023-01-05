import { Button, message } from 'antd';
import md5 from 'js-md5';
import React, { useState } from 'react';
import { post } from './fetch';

export default function Register(props) {
    const { userName, password, regDisabled, setLoginDisabled } = props;
    const [loadings, setLoadings] = useState([]);
    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
    };

    async function registerAccount() {
        setLoginDisabled(true)
        console.log(md5(password));
        if (userName === undefined || password === undefined || userName === null || password === null) {
            message.error('请输入完整账号信息')
        } else if (userName.length > 18 || userName.length < 5) {
            message.error('用户名长度应为5~18个字符')
        } else if (!/[a-zA-Z]/.test(userName[0])) { // 2、首字符不是字母
            message.error('用户名必须是英文开头')
        } else if (/\W/.test(userName)) { // 3、用户名必须是数字、字母、下划线组成
            message.error('用户名必须是数字、字母、下划线组成')
        } else if (/\W/.test(password)) {
            message.error('密码必须是数字、字母、下划线组成')
        } else if (password.length > 18 || password.length < 3) {
            message.error('密码长度应为3~18个字符')
        } else {
            enterLoading(1)
            await post('/api/register', { 'userName': userName, 'password': md5(password) }).then(
                (res) => {
                    if (res !== null) {
                        const result = JSON.parse(res)
                        message.success(result.message)
                    }
                }
            )
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[1] = false;
                return newLoadings;
            });
        }
        setLoginDisabled(false)
    }
    return (
        <>
            <Button
                type='primary'
                onClick={registerAccount}
                disabled={regDisabled}
                loading={loadings[1]}
            >注册</Button>
        </>
    )
}
