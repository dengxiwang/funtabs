import { PlusCircleTwoTone, UploadOutlined } from "@ant-design/icons";
import { Button, Col, ColorPicker, Input, Modal, Row, Select, Space, Switch, Tabs, Upload, message } from "antd";
import ImgCrop from 'antd-img-crop';
import Paragraph from "antd/es/typography/Paragraph";
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import '../common/funtabs.css';
import { hexToRgb } from "../common/hexToRgb";
import components from "../component/componentList";
import { funtabsData } from "./data";
import { IconSource } from "./iconSource";
import RecommendAddList from "./recommendAdd";

const imgStyle = {
    width: 'auto',
    height: '100%',
    margin: '0px 10px 0px 0px',
}

//网格布局样式信息
const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill,minmax(120px, 1fr))',
    columnGap: '12px',
    rowGap: '12px',
    gridAutoFlow: 'dense'
}

const modalBodyStyle = {
    display: 'flex',
    flexDirection: 'column',
}

const AddNewCard = (props) => {
    const {
        model,
        num,
        linkList,
        setLinkList,
        tabsActiveKey,
        setTabsActiveKey,
        stickerList,
        setStickerList,
        type,
        edit,
        cardStyle
    } = props;
    const [isAddModalOpen, setAddIsModalOpen] = useState(false);
    const [addLinkSize, setAddLinkSize] = useState('11');
    const [a, setA] = useState('')
    const [b, setB] = useState('')
    const [c, setC] = useState('')
    const [ellipsis] = useState('true')
    const [color, setColor] = useState("#ffffff");
    linkList.forEach((item) => {
        Object.assign(item, { value: item.key })
    })
    const [fullDrag, setFullDrag] = useState(false)
    const [activeTab, setActiveTab] = useState('link')

    useEffect(() => {
        return (() => {
            setA('')
            setB('')
            setC('')
            setAddLinkSize('11')
            setColor('#ffffff')
            setFullDrag(false)
            setActiveTab('link')
        })
    }, [isAddModalOpen])

    const showAddModal = () => {
        setAddIsModalOpen(true);
    };

    const newCardSize = (value) => {
        if (cardStyle !== 'onlyText') {
            setAddLinkSize(value)
        } else {
            message.error('文字经典模式下卡片尺寸只可为1行1列')
        }
    }

    const saveAddNewLink = (a, b, c, color, from) => {
        if (a === '' || b === '' || c === '') {
            message.error('请输入完整后再点击确定')
        } else {
            //确保新增卡片的唯一id
            const id = Date.parse(new Date()) + Math.floor(Math.random() * 1000);
            if (fullDrag === false) {
                const addResult = { 'label': a, 'link': b, 'size': addLinkSize, 'icon': c, 'type': 'link', 'backgroundColor': color, "x": 80, "y": 20 }
                var judgement;
                const addResultList = _.cloneDeep(linkList)
                //重复性校验
                for (let i = 0; i < linkList[num].content.length; i++) {
                    if (linkList[num].content[i].link) {
                        if (linkList[num].content[i].link.split('//')[1] === b.split('//')[1]) {
                            judgement = true
                        }
                    }
                }
                if (judgement === true) {
                    message.error('这个已经添加过了哟～')
                } else {
                    addResult.id = id
                    addResultList[num].content.push(addResult)
                    setLinkList(addResultList)
                    saveLinkList(addResultList)
                    message.success(`已添加到【${linkList.filter(item => item.key === tabsActiveKey)[0].label}】分类`)
                    if (from === undefined) {
                        setAddIsModalOpen(false);
                    }
                }
            } else {
                if (cardStyle === 'onlyText') {
                    message.error('文字经典模式下不支持添加全屏卡片')
                } else {
                    const addResult = { 'label': a, 'link': b, 'size': addLinkSize, 'icon': c, 'type': 'link', 'backgroundColor': color, "x": 80, "y": 20 }
                    var judgement2;
                    const addResultList = _.cloneDeep(stickerList)
                    //重复性校验
                    for (let i = 0; i < stickerList[0].content.length; i++) {
                        if (stickerList[0].content[i].link) {
                            if (stickerList[0].content[i].link.split('//')[1] === b.split('//')[1]) {
                                judgement2 = true
                            }
                        }
                    }
                    if (judgement2 === true) {
                        message.error('这个已经添加过了哟～')
                    } else {
                        addResult.id = id
                        addResultList[0].content.push(addResult)
                        setStickerList(addResultList)
                        saveStickerList(addResultList)
                        message.success(`添加成功`)
                        if (from === undefined) {
                            setAddIsModalOpen(false);
                        }
                    }
                }

            }
        }
    };

    const cancelAdd = () => {
        setAddIsModalOpen(false);
    };

    const addComponent = (type, label) => {
        //确保新增卡片的唯一id
        const id = Date.parse(new Date()) + Math.floor(Math.random() * 1000);
        if (fullDrag === false) {
            if (cardStyle === 'onlyText') {
                if (type === 'localWeather' || type === 'markdown' || type === 'timeProgress') {
                    const addResult = { 'label': label, 'type': type, 'id': id, "x": 80, "y": 20, 'content': [], 'size': '21' }
                    const addResultList = _.cloneDeep(linkList)
                    addResultList[num].content.push(addResult)
                    message.success(`已添加到【${linkList.filter(item => item.key === tabsActiveKey)[0].label}】分类`)
                    setLinkList(addResultList)
                    saveLinkList(addResultList)
                } else {
                    message.error('文字经典模式下不支持添加该组件')
                }
            } else {
                const addResult = { 'label': label, 'type': type, 'id': id, "x": 80, "y": 20, 'content': [], 'size': '21' }
                const addResultList = _.cloneDeep(linkList)
                addResultList[num].content.push(addResult)
                message.success(`已添加到【${linkList.filter(item => item.key === tabsActiveKey)[0].label}】分类`)
                setLinkList(addResultList)
                saveLinkList(addResultList)
            }
        } else {
            if (cardStyle === 'onlyText') {
                message.error('文字经典模式下不支持添加全屏组件')
            } else {
                const addResult = { 'label': label, 'type': type, 'id': id, "x": 80, "y": 20, 'content': [], 'size': '21' }
                const addResultList = _.cloneDeep(stickerList)
                addResultList[0].content.push(addResult)
                message.success('添加成功！')
                setStickerList(addResultList)
                saveStickerList(addResultList)
            }
        }
    }

    function saveLinkList(addResultList) {
        if (type === 1 && edit === 'none') {
            var newData;//本地存储数据是newData
            //如果本地数据存在，保存应针对当前本地存储的newData，否则数据应该是内置数据
            const localData = JSON.parse(window.localStorage.getItem('funtabs'))
            if (localData) {
                newData = localData.newData
            } else {
                newData = funtabsData
            }
            newData.content = addResultList;
            //存储到本地
            window.localStorage.setItem('funtabs', JSON.stringify({ newData }))
        }
    }

    function saveStickerList(addResultList) {
        if (type === 1 && edit === 'none') {
            window.localStorage.setItem('stickerData', JSON.stringify(addResultList))
        }
    }

    function showMore() {
        if (fullDrag === false) {
            return (
                <div>
                    <Select
                        defaultValue={tabsActiveKey}
                        style={{
                            width: 120,
                        }}
                        onChange={(e) => {
                            setTabsActiveKey(e.key)
                        }}
                        labelInValue
                        options={linkList}
                    />
                </div>
            )
        } else {
            return ''
        }
    }

    function showFooter() {
        if (activeTab === 'link') {
            return (
                <div className="input-div" style={{ marginBottom: '0px', justifyContent: ' flex-end' }}>
                    <Space >
                        <Button
                            onClick={cancelAdd}
                        >
                            取消</Button>
                        <Button
                            type="primary"
                            onClick={() => saveAddNewLink(a, b, c, color)}
                        >添加</Button>
                    </Space>
                </div>
            )
        } else {
            return null
        }
    }

    function showHeight() {
        if (activeTab === 'link') {
            return '328px'
        } else {
            return '372px'
        }
    }

    function showType() {
        if (type === 1) {
            return (
                <p onClick={showAddModal}>新增卡片</p>
            )
        } else {
            return (
                <Button
                    type='primary'
                    style={{
                        color: '#fff',
                        display: model
                    }}
                    onClick={showAddModal}>
                    新增卡片
                </Button>
            )
        }
    }

    return (
        <>
            {showType()}
            <Modal
                title={<Space>
                    <p style={{ fontSize: '16px' }}>新增卡片</p>
                    <Switch checkedChildren="自由全屏" unCheckedChildren="分类区域" onChange={(e) => { setFullDrag(e) }} />
                </Space>}
                open={isAddModalOpen}
                onCancel={cancelAdd}
                footer={showFooter()}
                bodyStyle={modalBodyStyle}
                destroyOnClose
            >
                <Tabs
                    onChange={(e) => {
                        setActiveTab(e)
                    }}
                    defaultActiveKey={activeTab}
                    style={{ height: showHeight(), overflow: 'hidden' }}
                    tabBarExtraContent={showMore()}
                    items={
                        [
                            {
                                label: `链接卡片`,
                                key: 'link',
                                children:
                                    <>
                                        <Row className="input-div">
                                            <Col flex='72px'>
                                                链接地址：
                                            </Col>
                                            <Col flex='1'>
                                                <Input
                                                    onBlur={(e) => {
                                                        const inputContent = e.target.value.trim();
                                                        var domain = b.split('/'); //以“/”进行分割
                                                        if (domain[2]) {
                                                            domain = domain[2];
                                                            if (domain.substring(0, 4) === 'www.') {
                                                                domain = domain.slice(4)
                                                            }
                                                        } else {
                                                            domain = ''; //如果url不正确就取空
                                                        }
                                                        if (inputContent.length !== 0) {
                                                            if (IconSource(domain) === undefined) {
                                                                setC('https://api.iowen.cn/favicon/' + domain + '.png')
                                                                fetch(`https://bird.ioliu.cn/v1?url=${b}`, {
                                                                    method: 'GET'
                                                                }).then(
                                                                    res => {
                                                                        res.text().then(
                                                                            res => {
                                                                                const parser = new DOMParser()
                                                                                const doc = parser.parseFromString(res, 'text/html')
                                                                                const webTitle = doc.querySelector('title') ? doc.querySelector('title').innerText : '';
                                                                                setA(webTitle)
                                                                            }
                                                                        )
                                                                    }
                                                                )
                                                            } else {
                                                                setA(IconSource(domain).label)
                                                                setColor(IconSource(domain).color)
                                                                setC(
                                                                    () => {
                                                                        if (IconSource(domain).icon.slice(0, 4) === 'http') {
                                                                            return IconSource(domain).icon
                                                                        } else {
                                                                            return `/icons/${IconSource(domain).icon}`
                                                                        }
                                                                    }
                                                                )
                                                            }
                                                        }
                                                    }}
                                                    onChange={
                                                        (e) => {
                                                            let result = e.target.value.trim();
                                                            var result2;
                                                            if (result.substring(0, 7) === 'http://') {
                                                                result2 = result
                                                            } else if (result.substring(0, 8) === 'https://') {
                                                                result2 = result
                                                            } else {
                                                                result2 = 'http://'.concat(result)
                                                            }
                                                            setB(result2)
                                                        }
                                                    }
                                                    placeholder='不需要http://或https://' />
                                            </Col>
                                        </Row>
                                        <Row className="input-div">
                                            <Col flex='72px'>
                                                卡片名称：
                                            </Col>
                                            <Col flex='1'>
                                                <Input
                                                    value={a}
                                                    onChange={
                                                        (e) => {
                                                            setA(e.target.value)
                                                        }
                                                    }
                                                    placeholder='输入链接后自动获取卡片名称' />
                                            </Col>
                                        </Row>
                                        <Row className="input-div">
                                            <Space wrap size={2}>
                                                <Col flex='72px'>
                                                    卡片大小：
                                                </Col>
                                                <Col>
                                                    <Select
                                                        defaultValue={'11'}
                                                        onChange={newCardSize}
                                                        style={{
                                                            marginRight: '12px',
                                                            width: 100
                                                        }}
                                                        options={
                                                            [
                                                                {
                                                                    value: '11',
                                                                    label: '1行1列'
                                                                }, {
                                                                    value: '12',
                                                                    label: '1行2列'
                                                                }, {
                                                                    value: '21',
                                                                    label: '2行1列'
                                                                }, {
                                                                    value: '22',
                                                                    label: '2行2列'
                                                                }
                                                            ]
                                                        } />
                                                </Col>
                                                <Col flex='72px'>
                                                    背景颜色：
                                                </Col>
                                                <Col>
                                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                        <Input
                                                            style={{ width: '88px', textAlign: 'center' }}
                                                            value={color}
                                                            onChange={(e) => setColor(e.target.value)} />
                                                        <ColorPicker
                                                            trigger='hover'
                                                            value={color}
                                                            onChange={(e) => {
                                                                setColor(e.toHexString())
                                                            }} />
                                                    </div>
                                                </Col>
                                            </Space>
                                        </Row>
                                        <Row className="input-div">
                                            <Col flex='72px'>
                                                图标地址：
                                            </Col>
                                            <Col flex='1'>
                                                <Input id="addIcon" value={c} onChange={
                                                    (e) => {
                                                        setC(e.target.value)
                                                    }
                                                }
                                                    placeholder='图标地址常为网站域名后加上“/favicon.ico”'
                                                />
                                            </Col>
                                            <Col flex='46px'>
                                                <ImgCrop rotationSlider modalTitle="裁剪图片" modalOk="确定" modalCancel="取消" >
                                                    <Upload
                                                        accept=".png , .jpg , .jpeg "
                                                        beforeUpload={
                                                            (file) => {
                                                                var reader = new FileReader();
                                                                reader.readAsDataURL(file);
                                                                reader.onloadend = function () {
                                                                    setC(reader.result)
                                                                }
                                                            }
                                                        }
                                                        maxCount={1}
                                                    >
                                                        <Button>
                                                            <UploadOutlined />
                                                        </Button>
                                                    </Upload>
                                                </ImgCrop>
                                            </Col>
                                        </Row>
                                        <Row className="input-div" style={{ marginBottom: '0px' }}>
                                            <Col flex='72px'>
                                                卡片预览：
                                            </Col>
                                            <Col flex='200px'>
                                                <div
                                                    style={{
                                                        position: 'relative',
                                                        width: '156px',
                                                        height: '66px',
                                                        background: 'rgb(245, 245, 245)',
                                                        padding: '10px'
                                                    }}
                                                >
                                                    <div style={{
                                                        overflow: 'hidden',
                                                        position: 'relative',
                                                        borderRadius: `10px`,
                                                        display: 'flex',
                                                        width: 'calc(100% - 20px)',
                                                        height: 'calc(100% - 20px)',
                                                        padding: '10px',
                                                        background: color
                                                    }}>
                                                        <img style={imgStyle} src={c} alt=''></img>
                                                        <div style={{ display: 'flex', marginBottom: '-14px', alignItems: 'center' }}>
                                                            <Paragraph
                                                                style={{ fontWeight: 'bold', color: hexToRgb(color) }}
                                                                ellipsis={
                                                                    ellipsis
                                                                        ? {
                                                                            rows: 2,
                                                                            tooltip: { title: a, color: 'blue' }
                                                                        } : false
                                                                }
                                                            >
                                                                {a}
                                                            </Paragraph>
                                                        </div>
                                                        <img
                                                            src={c}
                                                            alt=''
                                                            style={{
                                                                position: 'absolute',
                                                                height: '100%',
                                                                top: '0px',
                                                                right: '-10px',
                                                                opacity: 0.1,
                                                                transform: 'rotate(-30deg)',
                                                            }}>
                                                        </img>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </>
                            }, {
                                label: '小组件卡片',
                                key: 'components',
                                children:
                                    <div style={gridStyle}>
                                        {components.map((item, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        height: '100px',
                                                        padding: '12px 0px',
                                                        border: '1px solid #f3f3f3',
                                                        alignItems: 'center',
                                                        backgroundColor: '#f0f0f0',
                                                        borderRadius: '8px',
                                                        position: 'relative',
                                                    }}>
                                                    <img
                                                        className=""
                                                        alt="funtabs｜趣标签页，给你不一样的浏览器起始页"
                                                        src={item.img}
                                                        style={{
                                                            width: 'auto',
                                                            height: '76px'
                                                        }}
                                                    />
                                                    <Space style={{
                                                        display: 'flex',
                                                        margin: '8px 4px',
                                                    }}>
                                                        <p
                                                            style={{
                                                                fontSize: '14px',
                                                                fontWeight: 'bold'
                                                            }}
                                                        >{item.label}</p>
                                                        <PlusCircleTwoTone
                                                            style={{
                                                                scale: '1.25'
                                                            }}
                                                            onClick={() => {
                                                                addComponent(item.type, item.label)
                                                            }}
                                                        />
                                                    </Space>
                                                </div>
                                            )
                                        })}
                                    </div>
                            }, {
                                label: '热门推荐',
                                key: 'recommend',
                                children:
                                    <RecommendAddList
                                        saveAddNewLink={saveAddNewLink} />
                            }
                        ]
                    }
                />
            </Modal >
        </>
    )
}

export default AddNewCard;