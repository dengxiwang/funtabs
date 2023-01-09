import { CloudFilled, DownCircleFilled, FrownFilled, UpCircleFilled } from '@ant-design/icons'
import { Button, Col, Dropdown, Input, Modal, Row, Space, message } from 'antd'
import md5 from 'js-md5'
import React, { useState } from 'react'
import { post } from './fetch'
import getData from './getData'
import Register from './register'
import updateData from './updateData'

export default function Login() {
    const [opened, setOpened] = useState(false)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loadings, setLoadings] = useState([]);
    const [regDisabled, setRegDisabled] = useState(false)
    const [loginDisabled, setLoginDisabled] = useState(false)
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
    const [display] = useState(
        () => {
            if (logined === 0) {
                return ''
            } else {
                return 'none'
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
        if (logined === 1) {
            setOpened(true)
        }
    }
    function closeModal() {
        setOpened(false)
    }

    async function login() {
        setRegDisabled(true)
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
            enterLoading(0)
            await post('/api/login', { 'userName': `${userName}`, 'password': md5(password) })
                .then((res) => {
                    if (res !== null) {
                        const result = JSON.parse(res)
                        message.success('登录成功')
                        window.localStorage.setItem('userName', result.message[0].userName)
                        window.localStorage.setItem('password', result.message[0].password)
                        setOpened(false)
                        setTimeout(() => {
                            window.location.reload(true)
                        }, 1000);
                    }
                })
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[0] = false;
                return newLoadings;
            });
        }
        setRegDisabled(false)
    }

    const items = [
        {
            key: '0',
            label: (
                <p
                    onClick={updateData}>
                    <UpCircleFilled style={{ marginRight: '8px' }} />从本地上传
                </p>
            ),
        }, {
            key: '1',
            label: (
                <p
                    onClick={getData}>
                    <DownCircleFilled style={{ marginRight: '8px' }} />从云端拉取
                </p>
            ),
        }, {
            key: '2',
            label: (
                <p
                    onClick={
                        () => {
                            window.localStorage.removeItem('userName')
                            window.localStorage.removeItem('password')
                            message.success('退出成功')
                            setTimeout(() => {
                                window.location.reload(true)
                            }, 1000);
                        }
                    }>
                    <FrownFilled style={{ marginRight: '8px' }} />退出登录
                </p>
            ),
        }
    ]

    return (
        <div>
            <Dropdown
                menu={{
                    items,
                }}
                placement='bottom'
                getPopupContainer={() =>
                    document.getElementById('header')
                }
                overlayStyle={{
                    display: display
                }}
            >
                <Button
                    type='text'
                    style={{
                        fontWeight: 'bold',
                        color: '#ffffff',
                        marginRight: '-10px'
                    }}
                    onClick={() => {
                        if (logined === 1) {
                            openModal()
                        }
                    }}
                >
                    <CloudFilled />
                    {loginButtonText}
                </Button>
            </Dropdown>
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
                <p style={{ fontSize: '12px', color: '#69b1ff' }}>* 数据同步需在用户名处下拉菜单中手动上传或拉取；</p>
                <p style={{ fontSize: '12px', color: '#69b1ff' }}>* 密码不要与其他网站密码一样；</p>
                <p style={{ fontSize: '12px', color: '#69b1ff' }} >* 注册遇见问题的用户可加QQ群：727809499；</p>
            </Modal>
        </div>
    )
}
