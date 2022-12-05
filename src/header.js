import { ChromeFilled, CloudDownloadOutlined, CloudUploadOutlined, InteractionFilled, MailFilled, QqOutlined, RedoOutlined, WechatOutlined } from '@ant-design/icons';
import { Button, Col, Dropdown, Image, Input, message, Modal, Row, Space, Switch, Upload } from 'antd';
import { useEffect, useState } from 'react';
import './funtabs.css';
import './index.css';
import { funtabsData } from './linkList';

const Header = (props) => {
    const { model, editFunction, editText, drag, setModel } = props;
    const backgroundImage = window.localStorage.getItem('backgroundImage')
    const [opened, setOpened] = useState(false)
    const [backupModal, setBackupModal] = useState(false)
    const [url, setUrl] = useState(() => {
        try {
            if (backgroundImage === 'null') {
                return funtabsData.backgroundImage
            } else if (backgroundImage === 'undefined') {
                return funtabsData.backgroundImage
            } else {
                return `${backgroundImage}`
            }
        } catch (error) {
            return funtabsData.backgroundImage
        }
    })
    const [inputContent, setInputContent] = useState(url)
    const [previewImage, setPreviewImage] = useState(inputContent)
    const a = window.localStorage.getItem('backgroundImage')
    const b = window.localStorage.getItem('model')
    const c = window.localStorage.getItem('activeKey')
    const d = window.localStorage.getItem('funtabs')
    const data = {
        backgroundImage: a,
        model: b,
        activeKey: c,
        funtabs: d
    }
    const [backupData, setBackupData] = useState('')

    useEffect(() => {
        setBackupData('')
    }, [backupModal])

    function saveFile(text) {
        const stringData = text
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
        aTag.download = "fun上网导航备份数据.txt"
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
                    window.localStorage.setItem('backgroundImage', data.backgroundImage)
                    window.localStorage.setItem('model', data.model)
                    window.localStorage.setItem('activeKey', data.activeKey)
                    window.localStorage.setItem('funtabs', data.funtabs)
                    message.success('保存成功,请刷新页面～')
                    setBackupModal(false)
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
                <p onClick={() => setBackupModal(true)} ><InteractionFilled style={{ marginRight: '8px' }} />备份/恢复桌面设置</p>
                <Modal
                    title='备份/恢复桌面设置'
                    open={backupModal}
                    onCancel={() => setBackupModal(false)}
                    okText='确认'
                    cancelText='取消'
                    onOk={save}
                >
                    <Row style={{ margin: '12px 0px', alignItems: 'baseline' }}>
                        <Col flex='78px'>
                            备份数据：
                        </Col>
                        <Col flex='auto'>
                            <Input
                                value={JSON.stringify(data)}
                            />
                        </Col>
                        <Col>
                            <Button
                                style={{ width: '80px' }}
                                icon={<CloudDownloadOutlined />}
                                onClick={() => {
                                    saveFile(JSON.stringify(data))
                                    message.success('数据导出本地成功，请妥善保存！')
                                }}
                            >
                                导出
                            </Button>
                        </Col>
                    </Row>
                    <Row style={{ alignItems: 'baseline' }}>
                        <Col flex='78px'>
                            恢复数据：
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
                                    icon={<CloudUploadOutlined />}
                                >
                                    导入
                                </Button>
                            </Upload>
                        </Col>
                    </Row>
                </Modal>
            </>
        }, {
            key: 'contactUs',
            label: <p><MailFilled style={{ marginRight: '8px' }} />admin@217fun.com</p>
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
                <img src="https://www.netlify.com/v3/img/components/full-logo-light.svg" alt="Deploys by Netlify Badge"></img>
            </a>
        }
    ]

    function openChangeModal() {
        setOpened(true)
    }

    function cancelModal() {
        setOpened(false)
        setInputContent(url)
    }

    function okModal() {
        setOpened(false)
        message.success('壁纸保存成功')
        setUrl(inputContent)
        localStorage.setItem('backgroundImage', inputContent)
    }

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
            <div className="settings">
                <Space style={{ marginRight: '14px' }}>
                    <Button
                        type="text"
                        style={{
                            color: '#ffffff',
                            fontWeight: 'bold',
                            display: model,
                            marginRight: '-20px'
                        }}
                        onClick={openChangeModal}
                    >
                        更换壁纸
                    </Button>
                    <Modal
                        title='更换壁纸'
                        open={opened}
                        onCancel={cancelModal}
                        footer={null}
                        bodyStyle={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                        destroyOnClose
                    >
                        <Row style={{ marginBottom: '12px', alignItems: 'baseline' }}>
                            <Col flex='78px'>
                                图片地址：
                            </Col>
                            <Col flex='auto'>
                                <Input
                                    placeholder='在此输入图片的url地址'
                                    value={inputContent}
                                    style={{ width: '100%' }}
                                    onBlur={
                                        (e) => {
                                            setPreviewImage(e.target.value)
                                        }
                                    }
                                    onChange={
                                        (e) => {
                                            setInputContent(e.target.value)
                                        }
                                    }
                                />
                            </Col>
                            <Col>
                                <Upload
                                    id='uploadBackgroundImage'
                                    accept='.png , .jpg , .jpeg'
                                    maxCount={1}
                                    beforeUpload={
                                        (file) => {
                                            var reader = new FileReader();
                                            reader.readAsDataURL(file);
                                            reader.onloadend = function () {
                                                setInputContent(reader.result)
                                                setPreviewImage(reader.result)
                                            }
                                            return false
                                        }
                                    }
                                    showUploadList={false}
                                >
                                    <Button
                                        style={{ width: '46px' }}
                                        icon={<CloudUploadOutlined />}
                                        onClick={() => {
                                            message.warning('上传图片过大会造成加载缓慢,甚至无法加载的情况')
                                        }}
                                    />
                                </Upload>
                                <Button
                                    danger
                                    onClick={
                                        () => {
                                            setInputContent(funtabsData.backgroundImage)
                                            setPreviewImage(funtabsData.backgroundImage)
                                        }
                                    }>
                                    <RedoOutlined />
                                </Button>
                            </Col>
                        </Row>
                        <Space style={{ marginBottom: '12px', alignItems: 'stretch' }}>
                            预览图片：
                            <Image
                                src={previewImage}
                                height={150}
                                style={{
                                    borderRadius: '6px',
                                    minWidth: 150,
                                }}
                                preview={{
                                    mask: '预览大图',
                                    maskClassName: 'maskStyle',
                                    getContainer: (() => document.body)
                                }}
                                fallback="data:image/png;base64,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"
                            />
                        </Space>
                        <Space style={{ justifyContent: 'flex-end' }}>
                            <Button type='default' onClick={cancelModal}>取消</Button>
                            <Button type='primary' onClick={okModal}>保存</Button>
                        </Space>
                    </Modal>
                    <Button
                        type="text"
                        style={{
                            color: '#ffffff',
                            fontWeight: 'bold',
                            display: model,
                            marginRight: '-10px'
                        }}
                        onClick={editFunction}
                    >
                        {editText}
                    </Button>
                    <Dropdown
                        menu={{
                            items: moreMenu
                        }}
                        placement="bottom"
                        arrow
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