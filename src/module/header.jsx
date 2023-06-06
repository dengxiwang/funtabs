import { AppstoreFilled, BellFilled, GithubFilled, HeartFilled, HomeFilled, InteractionFilled, LockFilled, QqOutlined, RedoOutlined, WarningFilled, WechatOutlined } from '@ant-design/icons';
import { easings } from '@react-spring/web';
import { Button, Divider, Dropdown, Input, InputNumber, Space, Switch } from 'antd';
import { useState } from 'react';
import '../common/funtabs.css';
import '../index.css';
import BackupData from './backupData';
import Donate from './donate';
import Notice from './notice';
import ResetData from './resetData';

const Header = (props) => {
    const {
        model,
        editFunction,
        editText,
        drag,
        setModel,
        api,
        fontColor,
        paddingTop,
        setPaddingTop
    } = props;
    const { showClock, setShowClock, showSearch, setShowSearch, linkOpen, setLinkOpen } = props;
    const [title, setTitle] = useState(() => { return document.title })

    const moreMenu = [
        {
            key: 'notice',
            label: <Notice />,
            icon: <BellFilled />
        },
        {
            key: 'BackupRecovery',
            label: <BackupData />,
            icon: <InteractionFilled />
        }, {
            key: 'recovery',
            label: <ResetData />,
            icon: <WarningFilled />
        }, {
            key: 'donate',
            label: <Donate />,
            icon: <HeartFilled />
        }, {
            key: 'home',
            label: <a
                href='https://m.funtabs.cn'
                target={linkOpen}
                rel="noreferrer"
            >
                Funtabs官网
            </a>,
            icon: <HomeFilled />
        }, {
            key: 'github',
            label: <a
                href='https://github.com/dengxiwang/funtabs'
                target={linkOpen}
                rel="noreferrer"
            >
                Github
            </a>,
            icon: <GithubFilled />
        }, {
            key: 'wxqrCode',
            label:
                <a
                    href='./images/wx.JPG'
                    target='_blank'
                    rel="noreferrer"
                >
                    关注我们
                </a>,
            icon: <WechatOutlined />
        }, {
            key: 'privacyPolicy',
            label:
                <a
                    href='https://privacy.funtabs.cn'
                    target={linkOpen}
                    rel="noreferrer"
                >
                    隐私权政策
                </a>,
            icon: <LockFilled />
        }, {
            key: 'qq',
            label:
                <a
                    href='https://qm.qq.com/cgi-bin/qm/qr?k=6N9Y0wlXF5txRjJcBqSYByj0fDsNwjIs&authKey=ziF+0yZBKLQB8GFFDJEHTXMaz35chgIPb88v98Vwdytvym5UlNMWOBOEwMAEHlMj&noverify=0'
                    target={linkOpen}
                    rel="noreferrer"
                >
                    QQ群：727809499
                </a>,
            icon: <QqOutlined />
        }
    ]

    const [moreServe,] = useState([
        {
            label: '官网',
            link: 'https://www.funtabs.cn',
            icon: '/logo.svg'
        }
    ])

    function showOthers() {
        return (
            <>
                <div>
                    <Input
                        addonBefore={'页面标题'}
                        addonAfter={<RedoOutlined
                            onClick={() => {
                                setTitle('趣标签页')
                                document.title = '趣标签页'
                            }}
                        />}
                        value={title}
                        onChange={(e) => {
                            const value = e.target.value
                            setTitle(value)
                            document.title = value
                            window.localStorage.setItem('webTitle', value)
                        }}
                        maxLength={20}
                        style={{
                            width: 'calc(100%)',
                            marginBottom: '8px'
                        }}
                        allowClear
                    />
                </div>
                <div>
                    <InputNumber
                        value={paddingTop}
                        addonBefore='顶部高度'
                        addonAfter='px像素'
                        style={{
                            margin: '8px 0px 12px 0px'
                        }}
                        onChange={(e) => {
                            if (e) {
                                setPaddingTop(e)
                                window.localStorage.setItem('paddingTop', e)
                            }
                        }}
                        min={50}
                    />
                </div>
                <Space wrap className='moreSettings'>
                    <div>
                        页面风格：
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
                                        api.start({
                                            from: {
                                                y: 20,
                                                opacity: 0,
                                            },
                                            to: [
                                                {
                                                    y: 19.9,
                                                    opacity: 0,
                                                }, {
                                                    y: 0,
                                                    opacity: 1,
                                                },
                                            ],
                                            config: {
                                                duration: 180,
                                                easing: easings.easeOutCubic
                                            },
                                        })
                                    }
                                }
                            }
                        />
                    </div>
                    <div>
                        页面跳转：
                        <Switch
                            checkedChildren="页内"
                            unCheckedChildren="页外"
                            onChange={(e) => {
                                if (e === false) {
                                    setLinkOpen('_blank')
                                    window.localStorage.setItem('linkOpen', '_blank')
                                } else {
                                    setLinkOpen('_self')
                                    window.localStorage.setItem('linkOpen', '_self')
                                }
                            }}
                            defaultChecked={
                                () => {
                                    if (linkOpen === '_self') {
                                        return true
                                    } else {
                                        return false
                                    }
                                }
                            }
                        />
                    </div>
                    <div>
                        时钟/LOGO：
                        <Switch
                            checkedChildren="开启"
                            unCheckedChildren="关闭"
                            onChange={(e) => {
                                if (e === false) {
                                    setShowClock('none')
                                    localStorage.setItem('showClock', 'none')
                                } else {
                                    setShowClock('')
                                    localStorage.setItem('showClock', '')
                                }
                            }}
                            defaultChecked={
                                () => {
                                    if (showClock === '') {
                                        return true
                                    } else {
                                        return false
                                    }
                                }
                            }
                        />
                    </div>
                    <div>
                        搜索框：
                        <Switch
                            checkedChildren="开启"
                            unCheckedChildren="关闭"
                            onChange={(e) => {
                                if (e === false) {
                                    setShowSearch('none')
                                    localStorage.setItem('showSearch', 'none')
                                } else {
                                    setShowSearch('')
                                    localStorage.setItem('showSearch', '')
                                }
                            }}
                            defaultChecked={
                                () => {
                                    if (showSearch === '') {
                                        return true
                                    } else {
                                        return false
                                    }
                                }
                            }
                        />
                    </div>
                </Space>
                <Divider style={{ margin: '12px 0px' }} >
                    <Donate />
                </Divider>
                <Space size={21} wrap>
                    {moreServe.map((item, index) => {
                        return (
                            <a
                                key={index}
                                href={item.link}
                                target={linkOpen}
                                style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
                            >
                                <img src={item.icon} alt='' style={{ width: '38px', height: '38px' }} />
                                <p style={{ fontSize: '10px', fontWeight: 'bold', marginTop: '4px' }}>{item.label}</p>
                            </a>
                        )
                    })}
                </Space>
            </>
        )
    }

    return (
        <>
            {/* 设置按钮 */}
            <div className="settings" id='header'>
                <div style={{ display: 'none' }}><Notice /></div>
                <Space style={{ marginRight: '14px', pointerEvents: 'auto' }} size={4} wrap>
                    <Button
                        type="text"
                        style={{
                            fontWeight: 'bold',
                            display: model,
                            marginRight: '-10px',
                            color: fontColor
                        }}
                        onClick={editFunction}
                    >
                        {editText}
                    </Button>
                    <Button
                        type="text"
                        style={{
                            fontWeight: 'bold',
                            display: model,
                            marginRight: '-10px',
                            color: fontColor
                        }}
                        onClick={() => { window.open('https://support.qq.com/product/501945', linkOpen) }}
                    >
                        反馈
                    </Button>
                    <Dropdown
                        menu={{
                            items: moreMenu
                        }}
                        overlayStyle={{
                            width: '200px',
                            pointerEvents: 'auto',
                        }}
                        placement="bottomRight"
                        getPopupContainer={() =>
                            document.getElementById('header')
                        }
                        arrow={true}
                    >
                        <Button
                            type="text"
                            style={{
                                fontWeight: 'bold',
                                display: model,
                                marginRight: '-10px',
                                color: fontColor
                            }}
                        >
                            关于
                        </Button>
                    </Dropdown>
                    <div id='others'>
                        <Dropdown
                            dropdownRender={showOthers}
                            overlayStyle={{
                                width: 'max-content',
                                maxWidth: '300px',
                                pointerEvents: 'auto',
                                borderRadius: '8px',
                                backgroundColor: '#fff',
                                padding: '12px',
                                boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)'
                            }}
                            placement="bottomRight"
                            getPopupContainer={() =>
                                document.getElementById('header')
                            }
                            arrow={true}
                        >
                            <Button
                                type="text"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontWeight: 'bold',
                                    marginRight: '-10px',
                                    color: fontColor
                                }}
                            >
                                <AppstoreFilled style={{ fontSize: '20px' }} />
                            </Button>
                        </Dropdown>
                    </div>
                </Space>
            </div>
        </>
    )
}

export default Header;