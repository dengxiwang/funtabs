import { CloudFilled, FrownOutlined } from '@ant-design/icons'
import { Button, Col, Input, message, Modal, Row, Space } from 'antd'
import React, { useState } from 'react'
import Register from './register'
import updateData from './updateData'

export default function Login() {
    const [opened, setOpened] = useState(false)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [messageApi, contextHolder] = message.useMessage();
    const [loadings, setLoadings] = useState([]);
    const [regDisabled, setRegDisabled] = useState(false)
    const [loginDisabled, setLoginDisabled] = useState(false)
    const controller = new AbortController();
    const { signal } = controller;
    const [logined] = useState(
        () => {
            if (window.localStorage.getItem('password') && window.localStorage.getItem('userName')) {
                return 0
            } else {
                return 1
            }
        }
    )
    const [loginButtonText] = useState(
        () => {
            if (logined === 0) {
                return window.localStorage.getItem('userName')
            } else if (logined === 1) {
                return '登录同步'
            }
        }
    )

    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
    };

    function openModal() {
        if (logined === 0) {
            messageApi.open({
                type: 'error',
                icon: <FrownOutlined />,
                content: '别点啦，不能退出！我可不会轻易放你走～',
                className: 'custom-class',
            });
        } else if (logined === 1) {
            setOpened(true)
        }
    }
    function closeModal() {
        setOpened(false)
        controller.abort()
    }

    async function login() {
        setRegDisabled(true)
        if (userName === '' || password === '') {
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
            enterLoading(0)
            await fetch('/api/login', {
                method: 'POST',
                body: JSON.stringify({ 'userName': `${userName}`, 'password': password }),
                signal: signal
            }).then((res) => {
                if (res.status === 500) {
                    res.text().then(
                        res => {
                            const result = JSON.parse(res)
                            message.error(result.message)
                        }
                    )
                    setLoadings((prevLoadings) => {
                        const newLoadings = [...prevLoadings];
                        newLoadings[0] = false;
                        return newLoadings;
                    });
                } else if (res.status === 200) {
                    res.text().then(
                        res => {
                            const result = JSON.parse(res)
                            message.success('登录成功')
                            window.localStorage.setItem('userName', result.message[0].userName)
                            window.localStorage.setItem('password', result.message[0].password)
                            const data = result.message[0].data.replaceAll('----', '\\')
                            setLoadings((prevLoadings) => {
                                const newLoadings = [...prevLoadings];
                                newLoadings[0] = false;
                                return newLoadings;
                            });
                            recoveryData(data)
                        }
                    )
                }
            })
        }
        setRegDisabled(false)
    }

    function recoveryData(value) {
        console.log(value);
        if (value === '' || value === null || value === undefined || value === '{}') {
            setOpened(false)
            setTimeout(() => {
                updateData()
                window.location.reload(true)
            }, 1000);
        } else {
            try {
                const data = JSON.parse(value)
                //根据要恢复的数据，生成对应的localStorage
                for (var i = 0; i < Object.keys(data).length; i++) {
                    window.localStorage.setItem(Object.keys(data)[i], Object.values(data)[i])
                }
                setOpened(false)
                setTimeout(() => {
                    window.location.reload(true)
                }, 1000);
            } catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <div>
            <Button
                type='text'
                style={{
                    fontWeight: 'bold',
                    color: '#ffffff',
                    marginRight: '-10px'
                }}
                onClick={openModal}
                onDoubleClick={
                    () => {
                        if (logined === 0) {
                            window.localStorage.removeItem('userName')
                            window.localStorage.removeItem('password')
                            message.success('退出成功')
                            setTimeout(() => {
                                window.location.reload(true)
                            }, 1000);
                        }
                    }
                }
            >
                {contextHolder}
                <CloudFilled />
                {loginButtonText}
            </Button>
            <Modal
                title='登录/注册'
                okText='登录'
                cancelText='取消'
                onCancel={closeModal}
                open={opened}
                destroyOnClose
                footer={
                    <Space>
                        <Register
                            userName={userName}
                            password={password}
                            regDisabled={regDisabled}
                            setLoginDisabled={setLoginDisabled}
                            signal={signal}
                        />
                        <Button
                            type='primary'
                            onClick={() => {
                                login()
                            }}
                            loading={loadings[0]}
                            disabled={loginDisabled}
                        >登录</Button>
                    </Space>
                }
            >
                <Row className='input-div'>
                    <Col flex='56px'>
                        用户名：
                    </Col>
                    <Col flex='auto'>
                        <Input
                            onChange={(e) => {
                                setUserName(e.target.value)
                            }}
                            placeholder='输入您的用户名' />
                    </Col>
                </Row>
                <Row className='input-div'>
                    <Col flex='56px'>
                        密&nbsp;&nbsp;&nbsp;&nbsp;码：
                    </Col>
                    <Col flex='auto'>
                        <Input
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            type='password'
                            placeholder='输入您的密码' />
                    </Col>
                </Row>
                <p style={{ fontSize: '12px', color: '#69b1ff' }}>* 密码不要与其他网站密码一样</p>
                <p style={{ fontSize: '12px', color: '#69b1ff' }} >* 注册遇见问题的用户可加QQ群：727809499</p>
            </Modal>
        </div>
    )
}
