import { PlusCircleTwoTone, UploadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, message, Modal, Row, Select, Space, Tabs, Upload } from "antd";
import ImgCrop from 'antd-img-crop';
import Paragraph from "antd/es/typography/Paragraph";
import React, { useEffect, useState } from 'react';
import './funtabs.css';

const imgStyle = {
    width: 'auto',
    height: '100%',
    margin: '0px 10px 0px 0px',
    WebkitUserDrag: 'none',
}

//网格布局样式信息
const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill,minmax(150px, 1fr))',
    columnGap: '12px',
    rowGap: '12px',
    gridAutoFlow: 'dense',
    gridAutoRows: '200px',
    overflow: 'hidden',
}

const modalBodyStyle = {
    display: 'flex',
    flexDirection: 'column',
}

const AddNewCard = (props) => {
    const { model, linkList, setLinkList, components, } = props;
    const [isAddModalOpen, setAddIsModalOpen] = useState(false);
    const [addLinkSize, setAddLinkSize] = useState('11');
    const [a, setA] = useState('')
    const [b, setB] = useState('')
    const [c, setC] = useState('')
    const [ellipsis] = useState('true')

    useEffect(() => {
        setA('')
        setB('')
        setC('')
        setAddLinkSize('11')
    }, [isAddModalOpen])

    const showAddModal = () => {
        setAddIsModalOpen(true);
    };

    const newCardSize = (value) => {
        setAddLinkSize(value)
    }

    const saveAddNewLink = () => {

        if (a === '' || b === '' || c === '') {
            message.error('请输入完整后再点击确定')
        } else {
            const addResult = { 'label': a, 'link': b, 'size': addLinkSize, 'icon': c, 'type': 'link' }
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
                setAddIsModalOpen(false);
                message.success('添加成功！')
            }
        }
    };

    const cancelAdd = () => {
        setAddIsModalOpen(false);
    };

    const addComponent = (type, label, index) => {
        var id;
        for (let i = 0; i < linkList.length; i++) {
            if (linkList[i].id !== undefined && linkList[i].id === index) {
                id = ++index
            }
        }
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
                    style={{ height: '368px', overflow: 'hidden' }}
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
                                                        } else {
                                                            domain = ''; //如果url不正确就取空
                                                        }
                                                        setC('https://api.iowen.cn/favicon/' + domain + '.png')
                                                        fetch('https://api.vvhan.com/api/title?url=' + b)
                                                            .then(res => res.json())
                                                            .then(data => setA(data.title))
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
                                        <div className="input-div">
                                            卡片大小：<Select
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
                                        </div>
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
                                        <div className="input-div">
                                            卡片预览：
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
                                                    background: '#ffffff'
                                                }}>
                                                    <img style={imgStyle} src={c} alt=''></img>
                                                    <div style={{ display: 'flex', marginBottom: '-14px', alignItems: 'center' }}>
                                                        <Paragraph
                                                            strong
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
                                            <div style={{ marginLeft: '24px' }}>
                                                <ImgCrop rotate modalTitle="裁剪图片" modalOk="确定" modalCancel="取消" >
                                                    <Upload
                                                        accept=".png , .jpg , .jpeg "
                                                        beforeUpload={
                                                            (file) => {
                                                                console.log(file)
                                                                var reader = new FileReader();
                                                                reader.readAsDataURL(file);
                                                                reader.onloadend = function () {
                                                                    setC(reader.result)
                                                                }
                                                            }
                                                        }
                                                        maxCount={1}
                                                    >
                                                        <Button icon={<UploadOutlined />}>使用本地图标</Button>
                                                    </Upload>
                                                </ImgCrop>
                                            </div>
                                        </div>
                                        <div className="input-div" style={{ marginBottom: '0px', justifyContent: ' flex-end' }}>
                                            <Space >
                                                <Button
                                                    onClick={cancelAdd}
                                                >
                                                    取消</Button>
                                                <Button
                                                    type="primary"
                                                    onClick={saveAddNewLink}
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
                                                <Card
                                                    key={index}
                                                    className="components-card-style"
                                                    title={item.label}
                                                    extra={
                                                        <PlusCircleTwoTone
                                                            twoToneColor="#00B96B"
                                                            onClick={() => {
                                                                addComponent(item.type, item.label, index)
                                                            }} />
                                                    }
                                                    bodyStyle={{
                                                        padding: '10px',
                                                        display: 'flex',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    <img
                                                        className=""
                                                        alt=""
                                                        src={item.img}
                                                    />
                                                </Card>
                                            )
                                        })}
                                    </div>
                            }
                        ]
                    } />
            </Modal >
        </>
    )
}

export default AddNewCard;