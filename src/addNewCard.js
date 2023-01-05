import { PlusCircleTwoTone, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Input, message, Modal, Popover, Row, Select, Space, Tabs, Upload } from "antd";
import ImgCrop from 'antd-img-crop';
import Paragraph from "antd/es/typography/Paragraph";
import React, { useEffect, useState } from 'react';
import { HexColorPicker } from "react-colorful";
import './funtabs.css';
import { hexToRgb } from "./hexToRgb";
import { IconSource } from "./iconSource";
import RecommendAddList from "./recommendAdd";

const imgStyle = {
    width: 'auto',
    height: '100%',
    margin: '0px 10px 0px 0px',
    WebkitUserDrag: 'none',
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
    const { model, linkList, setLinkList, components, tabsActiveKey, setTabsActiveKey, tabsItems, api } = props;
    const [isAddModalOpen, setAddIsModalOpen] = useState(false);
    const [addLinkSize, setAddLinkSize] = useState('11');
    const [a, setA] = useState('')
    const [b, setB] = useState('')
    const [c, setC] = useState('')
    const [ellipsis] = useState('true')
    const [color, setColor] = useState("#ffffff");
    tabsItems.forEach((item) => {
        Object.assign(item, { value: item.key })
    })


    useEffect(() => {
        setA('')
        setB('')
        setC('')
        setAddLinkSize('11')
        setColor('#ffffff')
    }, [isAddModalOpen])

    const showAddModal = () => {
        setAddIsModalOpen(true);
    };

    const newCardSize = (value) => {
        setAddLinkSize(value)
    }

    const saveAddNewLink = (a, b, c, color, from) => {
        if (a === '' || b === '' || c === '') {
            message.error('请输入完整后再点击确定')
        } else {
            const addResult = { 'label': a, 'link': b, 'size': addLinkSize, 'icon': c, 'type': 'link', 'backgroundColor': color }
            var judgement;
            const addResultList = [...linkList]
            //重复性校验
            for (let i = 0; i < linkList.length; i++) {
                if (linkList[i].link) {
                    if (linkList[i].link.split('//')[1] === b.split('//')[1]) {
                        judgement = true
                    }
                }
            }
            if (judgement === true) {
                message.error('这个已经添加过了哟～')
            } else {
                addResultList.push(addResult)
                setLinkList(addResultList)
                message.success(`已添加到【${tabsItems.filter(item => item.key === tabsActiveKey)[0].label}】分类`)
                if (from === undefined) {
                    setAddIsModalOpen(false);
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
        const addResult = { 'label': label, 'type': type, 'id': id }
        const addResultList = [...linkList]
        addResultList.push(addResult)
        message.success('添加成功！')
        setLinkList(addResultList)
    }

    return (
        <>
            <Button
                type='primary'
                style={{
                    color: '#fff',
                    display: model
                }}
                onClick={showAddModal}>
                新增卡片
            </Button>
            <Modal
                title='新增卡片'
                open={isAddModalOpen}
                onCancel={cancelAdd}
                footer={false}
                bodyStyle={modalBodyStyle}
                destroyOnClose
            >
                <Tabs
                    defaultActiveKey='link'
                    destroyInactiveTabPane
                    style={{ height: '368px', overflow: 'hidden' }}
                    tabBarExtraContent={
                        <div>
                            <Select
                                defaultValue={tabsActiveKey}
                                style={{
                                    width: 120,
                                }}
                                onChange={(e) => {
                                    setTabsActiveKey(e.key)
                                    api.start({
                                        from: {
                                            y: 20,
                                            opacity: 0
                                        },
                                        to: {
                                            y: 0,
                                            opacity: 1
                                        }
                                    })
                                }}
                                labelInValue
                                options={tabsItems}
                            />
                        </div>
                    }
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
                                            <Col flex='auto'>
                                                <Input
                                                    onBlur={() => {
                                                        var domain = b.split('/'); //以“/”进行分割
                                                        if (domain[2]) {
                                                            domain = domain[2];
                                                            if (domain.substring(0, 4) === 'www.') {
                                                                domain = domain.slice(4)
                                                            }
                                                        } else {
                                                            domain = ''; //如果url不正确就取空
                                                        }
                                                        setB(`https://${domain}`)
                                                        if (IconSource(domain) === undefined) {
                                                            setC('https://api.iowen.cn/favicon/' + domain + '.png')
                                                            fetch('https://api.vvhan.com/api/title?url=' + b)
                                                                .then(res => res.json())
                                                                .then(data => setA(data.title))
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
                                                    }}
                                                    onChange={
                                                        (e) => {
                                                            let result = e.target.value;
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
                                            <Col flex='auto'>
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
                                            <Col flex='72px'>
                                                卡片大小：
                                            </Col>
                                            <Col>
                                                <Select
                                                    defaultValue={'1*1'}
                                                    onChange={newCardSize}
                                                    style={{
                                                        marginRight: '12px'
                                                    }}
                                                    options={
                                                        [
                                                            {
                                                                value: '11',
                                                                label: '1*1'
                                                            }, {
                                                                value: '12',
                                                                label: '1*2'
                                                            }, {
                                                                value: '21',
                                                                label: '2*1'
                                                            }, {
                                                                value: '22',
                                                                label: '2*2'
                                                            }
                                                        ]
                                                    } />
                                            </Col>
                                            <Col flex='72px'>
                                                背景颜色：
                                            </Col>
                                            <Col>
                                                <Popover
                                                    placement='right'
                                                    content={
                                                        <HexColorPicker
                                                            color={color}
                                                            onChange={setColor} />}
                                                    title="颜色选择">
                                                    <Input
                                                        style={{ width: '88px', textAlign: 'center' }}
                                                        value={color}
                                                        onChange={(e) => setColor(e.target.value)} />
                                                </Popover>
                                            </Col>
                                        </Row>
                                        <Row className="input-div">
                                            <Col flex='72px'>
                                                图标地址：
                                            </Col>
                                            <Col flex='auto'>
                                                <Input id="addIcon" value={c} onChange={
                                                    (e) => {
                                                        setC(e.target.value)
                                                    }
                                                }
                                                    placeholder='图标地址常为网站域名后加上“/favicon.ico”' />
                                            </Col>
                                        </Row>
                                        <Row className="input-div">
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
                                                                WebkitUserDrag: 'none'
                                                            }}>
                                                        </img>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col flex='auto'>
                                                <ImgCrop rotate modalTitle="裁剪图片" modalOk="确定" modalCancel="取消" >
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
                                                        <Button
                                                            style={{ margin: '12px 0px 0px 0px' }}
                                                            icon={<UploadOutlined />}>自定义</Button>
                                                    </Upload>
                                                </ImgCrop>
                                            </Col>
                                        </Row>
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
                                                    <div style={{
                                                        width: 'auto',
                                                        height: 'calc(100% - 24px)'
                                                    }}>
                                                    <img
                                                        className=""
                                                        alt="fun网址导航｜方格桌面，小众但好用的导航网站"
                                                        src={item.img}
                                                        style={{
                                                            width: 'auto',
                                                            height: '100%'
                                                        }}
                                                        />
                                                    </div>
                                                    <Space style={{
                                                        display: 'flex',
                                                        marginTop: '8px',
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
                                label: 'FUN推荐',
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