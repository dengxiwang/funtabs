import { EditTwoTone, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Input, message, Modal, Popover, Row, Select, Upload } from "antd";
import ImgCrop from 'antd-img-crop';
import Paragraph from "antd/es/typography/Paragraph";
import React, { useEffect, useState } from 'react';
import { HexColorPicker } from "react-colorful";
import { hexToRgb } from "./hexToRgb";
import { IconSource } from "./iconSource";

const imgStyle = {
    width: 'auto',
    height: '100%',
    margin: '0px 10px 0px 0px',
    WebkitUserDrag: 'none',
}

const EditCard = (props) => {
    const { id, linkList, setLinkList, setBackgroundColor } = props;
    const [link, setLink] = useState(linkList[id].link);
    const [label, setLabel] = useState(linkList[id].label);
    const [icon, setIcon] = useState(linkList[id].icon);
    const [size, setSize] = useState(linkList[id].size);
    const [color, setColor] = useState(
        () => {
            if (linkList[id].backgroundColor) {
                return linkList[id].backgroundColor
            } else {
                return '#ffffff'
            }
        }
    )
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ellipsis] = useState('true')

    useEffect(() => {
        setLink(linkList[id].link)
        setLabel(linkList[id].label)
        setIcon(linkList[id].icon)
        setSize(linkList[id].size)
        setColor(
            () => {
                if (linkList[id].backgroundColor) {
                    return linkList[id].backgroundColor
                } else {
                    return '#ffffff'
                }
            }
        )
        // eslint-disable-next-line
    }, [isModalOpen])

    const showEditModal = () => {
        setIsModalOpen(true);
    };

    const cancelEditModal = () => {
        setIsModalOpen(false);
    };

    function saveEdit() {
        message.success('编辑成功')
        let editResult = { 'label': label, 'link': link, 'size': size, 'icon': icon, 'type': 'link', 'backgroundColor': color }
        const editList = [...linkList]
        editList.splice(id, 1, editResult)
        setLinkList(editList)
        setBackgroundColor(color)
        setIsModalOpen(false);
    }

    return (
        <>
            <EditTwoTone
                className='edit-button-style'
                onClick={showEditModal}
            />
            <Modal
                title='编辑卡片'
                open={isModalOpen}
                onOk={saveEdit}
                onCancel={cancelEditModal}
                okText='确定'
                cancelText='取消'
                destroyOnClose
            >
                <Row className="input-div">
                    <Col flex='72px'>
                        链接地址：
                    </Col>
                    <Col flex='auto'>
                        <Input
                            defaultValue={link}
                            onBlur={() => {
                                var domain = link.split('/'); //以“/”进行分割
                                if (domain[2]) {
                                    domain = domain[2];
                                    if (domain.substring(0, 4) === 'www.') {
                                        domain = domain.slice(4)
                                    }
                                } else {
                                    domain = ''; //如果url不正确就取空
                                }
                                if (IconSource(domain) === undefined) {
                                    setIcon('https://api.iowen.cn/favicon/' + domain + '.png')
                                    fetch('https://api.vvhan.com/api/title?url=' + link)
                                        .then(res => res.json())
                                        .then(data => setLabel(data.title))
                                } else {
                                    setLabel(IconSource(domain)[0])
                                    setColor(IconSource(domain)[1])
                                    setIcon(`/icons/${IconSource(domain)[2]}`)
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
                                    setLink(result2)
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
                            value={label}
                            onChange={
                                (e) => {
                                    setLabel(e.target.value)
                                }}
                            placeholder='输入链接后自动获取卡片名称' />
                    </Col>
                </Row>
                <div className="input-div">
                    卡片大小：<Select
                        id="addSize"
                        defaultValue={size}
                        onChange={(e) => { setSize(e) }}
                        style={{
                            marginRight: '12px'
                        }}
                        options={
                            [
                                {
                                    value: 11,
                                    label: '1*1'
                                }, {
                                    value: 12,
                                    label: '1*2'
                                }, {
                                    value: 21,
                                    label: '2*1'
                                }, {
                                    value: 22,
                                    label: '2*2'
                                }
                            ]
                        } />
                    背景颜色：
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
                </div>
                <Row className="input-div">
                    <Col flex='72px'>
                        图标地址：
                    </Col>
                    <Col flex='auto'>
                        <Input
                            value={icon}
                            onChange={
                                (e) => {
                                    setIcon(e.target.value)
                                }
                            }
                            placeholder='图标地址常为网站域名后加上“/favicon.ico”' />
                    </Col>
                </Row>
                <div className="input-div" style={{ marginBottom: '0px' }}>
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
                            background: color
                        }}>
                            <img style={imgStyle} src={icon} alt=''></img>
                            <div style={{ display: 'flex', marginBottom: '-14px', alignItems: 'center' }}>
                                <Paragraph
                                    style={{ fontWeight: 'bold', color: hexToRgb(color) }}
                                    ellipsis={
                                        ellipsis
                                            ? {
                                                rows: 2,
                                                tooltip: { title: label, color: 'blue' }
                                            } : false
                                    }
                                >
                                    {label}
                                </Paragraph>
                            </div>
                            <img
                                src={icon}
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
                                            setIcon(reader.result)
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
            </Modal>
        </>
    )
}

export default EditCard;