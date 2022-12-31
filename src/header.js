import { ChromeFilled, DownloadOutlined, GithubFilled, HomeFilled, InteractionFilled, MailFilled, QqOutlined, UploadOutlined, WechatOutlined } from '@ant-design/icons';
import { Button, Col, Dropdown, Image, Input, message, Modal, Row, Space, Switch, Upload } from 'antd';
import { useEffect, useState } from 'react';
import './funtabs.css';
import './index.css';
import { funtabsData } from './linkList';
import Login from './login';
import Notice from './notice';
import ResetData from './resetData';

const Header = (props) => {
    const { model, editFunction, editText, drag, setModel, url, setUrl, } = props;

    const [backupModal, setBackupModal] = useState(false)

    const data = {}
    const [data2, setData2] = useState(data)
    const [backupData, setBackupData] = useState('')

    useEffect(() => {
        getLocalStorage()
        setBackupData('')
        // eslint-disable-next-line
    }, [backupModal])

    //获得本地的数据
    function getLocalStorage() {
        for (var i = 0; i < localStorage.length; i++) {
            data[localStorage.key(i)] = localStorage.getItem(localStorage.key(i))
        }
        setData2(data)
    }

    function saveFile(text) {
        const stringData = text
        const time = new Date()
        const year = time.getFullYear();
        const month = time.getMonth() + 1;
        const day = time.getDate();
        // dada 表示要转换的字符串数据，type 表示要转换的数据格式
        const blob = new Blob([stringData], {
            type: "text/plain;charset=utf-8"
        })
        // 根据 blob生成 url链接
        const objectURL = URL.createObjectURL(blob)
        // 创建一个 a 标签Tag
        const aTag = document.createElement('a')
        // 设置文件的下载地址
        aTag.href = objectURL
        // 设置保存后的文件名称
        aTag.download = `Fun网址导航备份数据${year}-${month}-${day}.txt`
        // 给 a 标签添加点击事件
        aTag.click()
        // 释放一个之前已经存在的、通过调用 URL.createObjectURL() 创建的 URL 对象。
        // 当你结束使用某个 URL 对象之后，应该通过调用这个方法来让浏览器知道不用在内存中继续保留对这个文件的引用了。
        URL.revokeObjectURL(objectURL)
    }

    function analysisData(e) {
        const content = e.target.value
        if (content !== '') {
            try {
                const content2 = JSON.parse(content)
                if (typeof (content2) === 'number') {
                    message.error('数据格式错误，解析失败！')
                }
            } catch (e) {
                message.error('数据格式错误，解析失败！')
            }
        }
    }

    function save() {
        if (backupData !== '') {
            try {
                const data = JSON.parse(backupData)
                if (typeof (content2) === 'number') {
                    message.error('保存失败！')
                } else {
                    //根据要恢复的数据，生成对应的localStorage
                    for (var i = 0; i < Object.keys(data).length; i++) {
                        window.localStorage.setItem(Object.keys(data)[i], Object.values(data)[i])
                    }
                    message.success('保存成功,即将自动刷新页面～')
                    setBackupModal(false)
                    setTimeout(() => {
                        window.location.reload(true)
                    }, 1000);
                }
            } catch (e) {
                message.error('数据格式错误，保存失败！')
            }
        } else {
            message.error('恢复数据未填写，保存失败～')
        }
    }

    const moreMenu = [
        {
            key: 'notice',
            label: <Notice />
        },
        {
            key: 'downloadcrx',
            label: <a
                href='https://siawn.lanzouw.com/b00qfhbhc'
                target='_blank'
                rel="noreferrer"
            >
                <ChromeFilled style={{ marginRight: '8px' }} />
                插件下载(密码: 217fun)
            </a>
        },
        {
            key: 'BackupRecovery',
            label: <>
                {/* eslint-disable-next-line */}
                <a onClick={() => setBackupModal(true)}><InteractionFilled style={{ marginRight: '8px' }} />导入/导出数据</a>
                <Modal
                    title='导入/导出数据'
                    open={backupModal}
                    onCancel={() => setBackupModal(false)}
                    okText='确认'
                    cancelText='取消'
                    onOk={save}
                    destroyOnClose
                >
                    <Row style={{ margin: '12px 0px', alignItems: 'baseline' }}>
                        <Col flex='78px'>
                            导出数据：
                        </Col>
                        <Col flex='auto'>
                            <Input
                                value={JSON.stringify(data2)}
                            />
                        </Col>
                        <Col>
                            <Button
                                style={{ width: '80px' }}
                                icon={<DownloadOutlined />}
                                onClick={() => {
                                    saveFile(JSON.stringify(data2))
                                    message.success('数据导出本地成功，请妥善保存！')
                                }}
                            >
                                导出
                            </Button>
                        </Col>
                    </Row>
                    <Row style={{ alignItems: 'baseline' }}>
                        <Col flex='78px'>
                            导入数据：
                        </Col>
                        <Col flex='auto'>
                            <Input
                                value={backupData}
                                onChange={(e) => { setBackupData(e.target.value) }}
                                onBlur={(e) => { analysisData(e) }}
                            />
                        </Col>
                        <Col>
                            <Upload
                                accept='.txt'
                                showUploadList={false}
                                maxCount={1}
                                beforeUpload={
                                    (file) => {
                                        var reader = new FileReader();
                                        reader.readAsText(file);
                                        reader.onloadend = function () {
                                            setBackupData(reader.result)
                                            message.success('导入成功')
                                        }
                                        return false
                                    }
                                }
                            >
                                <Button
                                    style={{ width: '80px' }}
                                    icon={<UploadOutlined />}
                                >
                                    导入
                                </Button>
                            </Upload>
                        </Col>
                    </Row>
                </Modal>
            </>
        }, {
            key: 'recovery',
            label: <ResetData />
        }, {
            key: 'home',
            label: <a
                href='https://217fun.com'
                target='_blank'
                rel="noreferrer"
            >
                <HomeFilled style={{ marginRight: '8px' }} />
                官网
            </a>
        }, {
            key: 'github',
            label: <a
                href='https://github.com/dengxiwang/funtabs'
                target='_blank'
                rel="noreferrer"
            >
                <GithubFilled style={{ marginRight: '8px' }} />
                Github
            </a>
        }, {
            key: 'wxqrCode',
            label:
                <a
                    href='./images/wx.JPG'
                    target='_blank'
                    rel="noreferrer"
                >
                    <WechatOutlined style={{ marginRight: '8px' }} />
                    关注我们
                </a>
        }, {
            key: 'contactUs',
            label: <p><MailFilled style={{ marginRight: '8px' }} />admin@217fun.com</p>
        }, {
            key: 'qq',
            label:
                <a
                    href='https://qm.qq.com/cgi-bin/qm/qr?k=6N9Y0wlXF5txRjJcBqSYByj0fDsNwjIs&authKey=ziF+0yZBKLQB8GFFDJEHTXMaz35chgIPb88v98Vwdytvym5UlNMWOBOEwMAEHlMj&noverify=0'
                    target='_blank'
                    rel="noreferrer"
                >
                    <QqOutlined style={{ marginRight: '8px' }} />
                    QQ群：727809499
                </a>
        }, {
            key: 'This site is powered by Netlify',
            label: <a href='https://www.netlify.com/'>
                <img src="/images/full-logo-light.svg" alt="Deploys by Netlify Badge"></img>
            </a>
        }
    ]



    return (
        <>
            <div
                className='background'
                style={{
                    backgroundImage: `url(${url})`,
                }}>
            </div>
            {/* 用于检测壁纸是否可以正常显示 */}
            <Image
                src={url}
                style={{
                    display: 'none'
                }}
                onError={
                    () => {
                        setUrl(funtabsData.backgroundImage)
                        window.localStorage.setItem('backgroundImage', funtabsData.backgroundImage)
                    }
                }
            />
            {/* 设置按钮 */}
            <div className="settings" id='header'>
                <div style={{ display: 'none' }}><Notice /></div>
                <Space style={{ marginRight: '14px' }}>
                    <div style={{ display: model }}>
                        <Login />
                    </div>
                    <Button
                        type="text"
                        style={{
                            color: '#ffffff',
                            fontWeight: 'bold',
                            display: model,
                            marginRight: '-10px'
                        }}
                        onClick={
                            editFunction
                        }
                    >
                        {editText}
                    </Button>
                    <Dropdown
                        menu={{
                            items: moreMenu
                        }}
                        placement="bottom"
                        getPopupContainer={() =>
                            document.getElementById('header')
                        }
                    >
                        <Button
                            type="text"
                            style={{
                                color: '#ffffff',
                                fontWeight: 'bold',
                                display: model
                            }}
                        >
                            更多
                        </Button>
                    </Dropdown>
                    <Switch
                        checkedChildren="简约"
                        unCheckedChildren="默认"
                        defaultChecked={() => { if (model === '') { return false } else { return true } }}
                        disabled={!drag}
                        onChange={
                            () => {
                                if (model === '') {
                                    setModel('none')
                                    localStorage.setItem('model', 'none')
                                } else {
                                    setModel('')
                                    localStorage.setItem('model', '')
                                }
                            }
                        }
                    />
                </Space>
            </div >
        </>
    )
}

export default Header;