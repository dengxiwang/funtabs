import { BgColorsOutlined, CloudUploadOutlined, ExclamationCircleOutlined, RedoOutlined } from '@ant-design/icons';
import { Button, Col, ColorPicker, Image, Input, Modal, Radio, Row, Slider, Space, Switch, Tabs, Tooltip, Upload, message } from 'antd';
import React, { useEffect, useState } from 'react';
import '../common/funtabs.css';
import getDomainColor from '../common/getDomainColor';
import { hexToRgb } from '../common/hexToRgb';
import rgbToHex from '../common/rgbToHex';
import '../index.css';
import { funtabsData } from './data';
import OfficalWallpaper from './officalWallpaper';

export default function ChangeWallpaper(props) {
    const {
        url,
        setUrl,
        brightness,
        setBrightness,
        blur,
        setBlur,
        oldBlur,
        oldBrightness,
        setOldBlur,
        setOldBrightness,
        type,
        fontColor,
        setFontColor,
        wallpaperType,
        setWallpaperType,
        linkList,
        setLinkList,
        deviceType,
        timeArea,
        setTimeArea
    } = props
    const [inputColor, setInputColor] = useState(fontColor)
    const [inputContent, setInputContent] = useState(url)
    const [previewImage, setPreviewImage] = useState(inputContent)
    const [opened, setOpened] = useState(false)
    const [newBrightness, setNewBrightness] = useState(brightness)
    const [newBlur, setNewBlur] = useState(blur)
    const [checkType, setCheckType] = useState(wallpaperType)
    const [timeAreaCheck, setTimeAreaCheck] = useState(timeArea)
    const localBoxShadow = window.localStorage.getItem('boxShadow')
    const localBoxShadowOpen = window.localStorage.getItem('boxShadowOpen')
    const [boxShadow, setBoxShadow] = useState(() => {
        try {
            if (localBoxShadow) {
                return localBoxShadow
            } else {
                return ''
            }
        } catch (error) {
            return ''
        }
    })
    const [boxShadowOpen, setBoxShadowOpen] = useState(() => {
        try {
            if (localBoxShadowOpen) {
                return localBoxShadowOpen
            } else {
                return 'false'
            }
        } catch (error) {
            return 'false'
        }
    })
    const [logoUrl, setLogoUrl] = useState(window.localStorage.getItem('logoUrl') ? window.localStorage.getItem('logoUrl') : '/logo_white.svg')

    useEffect(() => {
        setInputContent(url)
        setPreviewImage(url)
        setBlur(oldBlur)
        setBrightness(oldBrightness)
        setNewBlur(oldBlur)
        setNewBrightness(oldBrightness)
        setInputColor(fontColor)
        setCheckType(wallpaperType)
        setBoxShadow(localBoxShadow)
        setBoxShadowOpen(localBoxShadowOpen)
        setTimeAreaCheck(timeArea)
        // eslint-disable-next-line
    }, [opened])

    function openChangeModal() {
        setOpened(true)
    }

    function cancelModal() {
        setOpened(false)
    }

    function okModal() {
        setOpened(false)
        message.success('壁纸保存成功')
        setUrl(inputContent)
        setFontColor(inputColor)
        setBrightness(newBrightness)
        setBlur(newBlur)
        setOldBlur(newBlur)
        setOldBrightness(newBrightness)
        setWallpaperType(checkType)
        setLinkList([...linkList])
        setTimeArea(timeAreaCheck)
        window.localStorage.setItem('logoUrl', logoUrl)
        window.localStorage.setItem('timeArea', timeAreaCheck)
        window.localStorage.setItem('wallpaperType', checkType)
        window.localStorage.setItem('brightness', newBrightness)
        window.localStorage.setItem('blur', newBlur)
        window.localStorage.setItem('backgroundImage', inputContent)
        window.localStorage.setItem('fontColor', inputColor)
        window.localStorage.setItem('boxShadow', boxShadow)
        window.localStorage.setItem('boxShadowOpen', boxShadowOpen)
    }

    function showType() {
        if (type === 1) {
            return (
                <p onClick={openChangeModal}>壁纸其它</p>
            )
        } else {
            return (
                <Button
                    type="primary"
                    onClick={openChangeModal}
                >
                    壁纸其它
                </Button>
            )
        }
    }

    function wallpaperPreview() {
        if (checkType === 'image') {
            return (
                <>
                    <Image
                        src={previewImage}
                        style={{
                            borderRadius: '6px',
                            maxHeight: 144,
                            width: 'auto',
                            maxWidth: '100%',
                            filter: `brightness(${newBrightness}%)`,
                            boxShadow: '0px 0px 0px 1px #d9d9d9',
                        }}
                        preview={{
                            mask: '预览大图',
                            maskClassName: 'maskStyle',
                            getContainer: (() => document.body)
                        }}
                        fallback="data:image/png;base64,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"
                    />
                </>
            )
        } else if (checkType === 'video') {
            return (
                <>
                    <video
                        autoPlay
                        loop
                        muted
                        src={`${inputContent}`}
                        style={{
                            borderRadius: '6px',
                            maxHeight: 144,
                            overflow: 'hidden',
                            objectFit: 'cover',
                            width: 'calc(100% - 2px)',
                            filter: `brightness(${newBrightness}%)`,
                            boxShadow: '0px 0px 0px 1px #d9d9d9',
                        }}
                    />
                </>
            )
        } else if (checkType === 'color') {
            return (
                <>
                    <div
                        style={{
                            backgroundColor: `${inputContent}`,
                            borderRadius: '6px',
                            maxHeight: 144,
                            height: '144px',
                            maxWidth: '200px',
                            overflow: 'hidden',
                            objectFit: 'cover',
                            width: 'calc(100% - 2px)',
                            filter: `brightness(${newBrightness}%)`,
                            boxShadow: '0px 0px 0px 1px #d9d9d9',
                        }}
                    />
                </>
            )
        }
    }

    function uploadAccept() {
        if (checkType === 'image') {
            return '.png , .jpg , .jpeg, .webp'
        } else if (checkType === 'video') {
            return '.mp4'
        }
    }

    function showButton() {
        if (checkType !== 'color') {
            return (
                <Upload
                    id='uploadBackgroundImage'
                    accept={uploadAccept()}
                    maxCount={1}
                    beforeUpload={
                        (file) => {
                            // const formData = new FormData()
                            // formData.append('file', file)
                            // const token = window.localStorage.getItem('token')
                            // post(`${variable.api}/api/uploadWallpaper`, formData, token).then(res => {
                            //     setInputContent(res)
                            //     setPreviewImage(res)
                            // })
                            // 将图片转为base64使用
                            const isLt2M = file.size / 1024 / 1024 < 4;
                            if (!isLt2M) {
                                message.error('文件大小必须小于 4MB!');
                            } else {
                                var reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onloadend = function () {
                                    setInputContent(reader.result)
                                    setPreviewImage(reader.result)
                                    getDomainColor(reader.result).then(color => {
                                        const mainColor = rgbToHex(color)
                                        setInputColor(hexToRgb(mainColor))
                                    })
                                }
                            }
                            return false
                        }
                    }
                    showUploadList={false}
                >
                    <Tooltip title='上传壁纸'>
                        <Button
                            style={{ width: '46px' }}
                            icon={<CloudUploadOutlined />}
                            onClick={() => {
                                if (checkType === 'image') {
                                    message.warning('上传图片过大会造成加载缓慢')
                                } else if (checkType === 'video') {
                                    message.warning('只可选择mp4视频类型文件')
                                }
                            }}
                        />
                    </Tooltip>
                </Upload>
            )
        } else {
            return (
                <ColorPicker
                    trigger='hover'
                    value={inputContent}
                    onChange={(e) => {
                        setInputContent(e.toHexString())
                    }}
                />
            )
        }
    }

    function showShadowInput() {
        if (boxShadowOpen === 'true') {
            return (
                <Input
                    placeholder='卡片阴影配置，如“0px 0px 0px 1px #d9d9d9”'
                    value={boxShadow}
                    onChange={(e) => {
                        setBoxShadow(e.target.value.trim())
                    }}
                />
            )
        }
    }

    function showTag() {
        if (boxShadowOpen === 'true') {
            return (
                <Row style={{ marginBottom: '8px', alignItems: 'center' }}>
                    <div style={{
                        borderRadius: '8px',
                        border: '1px solid #91caff',
                        backgroundColor: '#e6f4ff',
                        color: '#1677ff',
                        fontSize: '8px',
                        padding: '2px',
                        width: '100%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        <span>
                            <ExclamationCircleOutlined style={{ fontSize: '12px', marginRight: '4px' }} />
                            阴影格式：x偏移像素 + y偏移像素 + 模糊像素大小 + 阴影大小 + 阴影颜色
                        </span>
                    </div>
                </Row>
            )
        }
    }

    function showLogoSettings() {
        if (timeAreaCheck === 'logo') {
            return (
                <>
                    <Row style={{ marginBottom: '12px', alignItems: 'center' }}>
                        <Col flex='78px'>
                            图片地址：
                        </Col>
                        <Col flex='1'>
                            <Input
                                placeholder='在此输入图片的url地址'
                                value={logoUrl}
                                style={{ width: '100%' }}
                                onBlur={
                                    (e) => {
                                        setLogoUrl(e.target.value)
                                    }
                                }
                                onChange={
                                    (e) => {
                                        setLogoUrl(e.target.value)
                                    }
                                }
                            />
                        </Col>
                        <Col>
                            <Upload
                                id='uploadLogoImage'
                                accept='.png, .jpg, .jpeg, .svg'
                                maxCount={1}
                                beforeUpload={
                                    (file) => {
                                        const isLt400K = file.size / 1024 / 1024 < 0.4;
                                        if (!isLt400K) {
                                            message.error('文件大小必须小于 400KB!');
                                        } else {
                                            var reader = new FileReader();
                                            reader.readAsDataURL(file);
                                            reader.onloadend = function () {
                                                setLogoUrl(reader.result)
                                            }
                                        }
                                        return false
                                    }
                                }
                                showUploadList={false}
                            >
                                <Tooltip title='上传壁纸'>
                                    <Button
                                        style={{ width: '46px' }}
                                        icon={<CloudUploadOutlined />}
                                    />
                                </Tooltip>
                            </Upload>
                            <Tooltip title='恢复默认LOGO'>
                                <Button
                                    danger
                                    onClick={
                                        () => {
                                            setLogoUrl('/logo_white.svg')
                                        }
                                    }>
                                    <RedoOutlined />
                                </Button>
                            </Tooltip>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '12px', marginTop: '22px' }}>
                        <Col flex='78px'>
                            图片预览：
                        </Col>
                        <Col flex='1'>
                            <Image
                                src={logoUrl}
                                height={100}
                                style={{
                                    borderRadius: '6px',
                                    backgroundColor: '#f0f0f0',
                                    width: 'auto'
                                }}
                                preview={{
                                    mask: '预览大图',
                                    maskClassName: 'maskStyle',
                                    getContainer: (() => document.body)
                                }}
                                fallback="data:image/png;base64,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"
                            />
                        </Col>
                    </Row>
                </>
            )
        }
    }

    const wallpaperItems = [
        {
            label: '壁纸设置',
            key: '1',
            children: <>
                <Row style={{ marginBottom: '12px', alignItems: 'center' }}>
                    <Col flex='78px'>
                        壁纸地址：
                    </Col>
                    <Col flex='1'>
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
                    <Col style={{ display: 'flex', flexDirection: 'row' }}>
                        {showButton()}
                        <Tooltip title='恢复默认壁纸'>
                            <Button
                                danger
                                onClick={
                                    () => {
                                        setInputContent(funtabsData.backgroundImage)
                                        setPreviewImage(funtabsData.backgroundImage)
                                        setInputColor('#ffffff')
                                        setCheckType('image')
                                    }
                                }>
                                <RedoOutlined />
                            </Button>
                        </Tooltip>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '12px', marginTop: '16px', alignItems: 'center' }}>
                    <Col flex='78px'>
                        壁纸类型：
                    </Col>
                    <Col flex='1'>
                        <Radio.Group value={checkType} onChange={(e) => {
                            const type = e.target.value
                            if (deviceType !== 'PC') {
                                if (type === 'video') {
                                    message.error('仅PC电脑端可设置动态壁纸')
                                } else {
                                    if (type !== 'color') {
                                        message.warning('地址栏只可使用没有跨域限制的资源地址或自行上传资源')
                                        setInputContent('')
                                    } else {
                                        message.warning('地址栏可输入相应的色彩代码，支持RGB或十六进制')
                                        setInputContent('#1b7c87')
                                    }
                                    setCheckType(type)
                                }
                            } else {
                                if (type !== 'color') {
                                    message.warning('地址栏只可使用没有跨域限制的资源地址或自行上传资源')
                                    setInputContent('')
                                } else {
                                    message.warning('地址栏可输入相应的色彩代码，支持RGB或十六进制')
                                    setInputContent('#1b7c87')
                                }
                                setCheckType(type)
                            }
                        }}>
                            <Radio value={'image'}>静态</Radio>
                            <Radio value={'video'}>动态</Radio>
                            <Radio value={'color'}>纯色</Radio>
                        </Radio.Group>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '8px', alignItems: 'center' }}>
                    <Col flex='78px'>
                        壁纸亮度：
                    </Col>
                    <Col flex='1'>
                        <Slider
                            defaultValue={newBrightness}
                            onAfterChange={(e) => {
                                setBrightness(e)
                            }}
                            onChange={(e) =>
                                setNewBrightness(e)
                            }
                            tooltip={{
                                formatter: null,
                            }}
                        />
                    </Col>
                    <Col style={{ marginLeft: '8px' }}>
                        {`${newBrightness}%`}
                    </Col>
                </Row>
                <Row style={{ marginBottom: '16px', alignItems: 'center' }}>
                    <Col flex='78px'>
                        壁纸模糊：
                    </Col>
                    <Col flex='1'>
                        <Slider
                            defaultValue={blur}
                            onAfterChange={(e) => {
                                setBlur(e)
                            }}
                            onChange={(e) => {
                                setNewBlur(e)
                            }}
                            tooltip={{
                                formatter: null,
                            }}
                        />
                    </Col>
                    <Col style={{ marginLeft: '8px' }}>
                        {`${newBlur}%`}
                    </Col>
                </Row>
                <Row style={{ marginBottom: '0px', alignItems: 'stretch' }}>
                    <Col flex='78px'>
                        预览壁纸：
                    </Col>
                    <Col flex='1'>
                        {wallpaperPreview()}
                    </Col>
                </Row>
            </>
        }, {
            label: '字体其它',
            key: '2',
            children: <>
                <Row style={{ marginBottom: '16px', alignItems: 'center' }}>
                    <Col flex='78px'>
                        字体颜色：
                    </Col>
                    <Col flex='1' style={{ display: 'flex', flexDirection: 'row' }}>
                        <Input
                            placeholder='更改字体颜色'
                            value={inputColor}
                        />
                        <Tooltip title='此处预览颜色'>
                            <Button
                                style={{
                                    backgroundColor: hexToRgb(inputColor),
                                    color: inputColor,
                                    fontWeight: 'bold'
                                }}
                            >
                                效果预览
                            </Button>
                        </Tooltip>
                    </Col>
                    <Col>
                        <ColorPicker
                            trigger='hover'
                            value={inputColor}
                            onChange={(e) => {
                                setInputColor(e.toHexString())
                            }}
                        >
                            <Button>
                                <BgColorsOutlined />
                            </Button>
                        </ColorPicker>
                        <Tooltip title='恢复默认颜色'>
                            <Button
                                danger
                                onClick={
                                    () => {
                                        setInputColor('#ffffff')
                                    }
                                }>
                                <RedoOutlined />
                            </Button>
                        </Tooltip>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '16px', alignItems: 'center', height: '32px' }}>
                    <Col flex='78px'>
                        卡片阴影：
                    </Col>
                    <Col flex='1' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Switch
                            style={{
                                marginRight: '4px'
                            }}
                            defaultChecked={() => {
                                if (boxShadowOpen === 'true') {
                                    return true
                                } else {
                                    return false
                                }
                            }}
                            onChange={(e) => {
                                const type = e.toString()
                                setBoxShadowOpen(type)
                                if (type === 'true' && (boxShadow === '' || boxShadow === 'null')) {
                                    setBoxShadow('0px 0px 0px 1px #d9d9d9')
                                }
                            }}
                        />
                        {showShadowInput()}
                    </Col>
                </Row>
                {showTag()}
                <Row style={{ marginBottom: '16px', alignItems: 'center', height: '32px' }}>
                    <Col flex='78px'>
                        时间区域：
                    </Col>
                    <Col>
                        <Radio.Group value={timeAreaCheck} onChange={(e) => { setTimeAreaCheck(e.target.value) }}>
                            <Radio value={'time'}>时间</Radio>
                            <Radio value={'logo'}>图片LOGO</Radio>
                        </Radio.Group>
                    </Col>
                </Row>
                {showLogoSettings()}
            </>
        }, {
            label: '推荐壁纸',
            key: '3',
            children: <>
                <OfficalWallpaper
                    url={inputContent}
                    setUrl={setInputContent}
                    setCheckType={setCheckType}
                    setFontColor={setInputColor}
                    setPreviewImage={setPreviewImage}
                />
            </>
        }
    ]

    return (
        <>
            {showType()}
            <Modal
                title='壁纸及其它设置'
                open={opened}
                onCancel={cancelModal}
                footer={null}
                bodyStyle={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
                style={{
                    maxHeight: '100%'
                }}
                destroyOnClose
            >
                <Tabs
                    items={wallpaperItems}
                    style={{
                        height: '382px',
                    }}
                />
                <Space style={{ justifyContent: 'flex-end', marginTop: '12px' }}>
                    <Button type='default' onClick={cancelModal}>取消</Button>
                    <Button type='primary' onClick={okModal}>保存</Button>
                </Space>
            </Modal>
        </>
    )
}
