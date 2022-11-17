import { UploadOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, Select, Typography, Upload } from "antd";
import ImgCrop from 'antd-img-crop';
import React, { useEffect, useState } from 'react';
import './funtab.css';

const { Text } = Typography;

const imgStyle = {
    width: 'auto',
    height: '100%',
    margin: '0px 10px 0px 0px',
    WebkitUserDrag: 'none',
}

const modalBodyStyle = {
    display: 'flex',
    flexDirection: 'column',
}

const AddNewCard = (props) => {
    const { model, linkList, setLinkList } = props;
    const [isAddModalOpen, setAddIsModalOpen] = useState(false);
    const [addLinkSize, setAddLinkSize] = useState('11')
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

    const saveAdd = () => {

        if (a === '' || b === '' || c === '') {
            message.error('请输入完整后再点击确定')
        } else {
            const addResult = { 'label': a, 'link': b, 'size': addLinkSize, 'icon': c, 'type': 'link' }
            const addResultList = [...linkList]
            addResultList.push(addResult)
            setLinkList(addResultList)
            setAddIsModalOpen(false);
        }
    };

    const cancelAdd = () => {
        setAddIsModalOpen(false);
    };

    return (
        <>
            <Button type='primary' style={{ color: '#fff', fontWeight: 'bold', display: model, marginRight: '12px' }} onClick={showAddModal}>添加</Button>
            <Modal
                title='新增卡片'
                open={isAddModalOpen}
                onOk={saveAdd}
                onCancel={cancelAdd}
                okText='确定'
                cancelText='取消'
                bodyStyle={modalBodyStyle}
                destroyOnClose
            >
                <div className="input-div">
                    卡片名称：<Input id="addLabel" onChange={(e) => { setA(e.target.value) }} placeholder='在此输入想要展示在页面上的卡片名称' />
                </div>
                <div className="input-div">
                    链接地址：<Input id="addLink" onChange={
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
                            var domain = result2.split('/'); //以“/”进行分割
                            if (domain[2]) {
                                domain = domain[2];
                            } else {
                                domain = ''; //如果url不正确就取空
                            }
                            setC('https://api.iowen.cn/favicon/' + domain + '.png')
                        }
                    }
                        placeholder='不需要http://或https://' />
                </div>
                <div className="input-div">
                    卡片大小：<Select
                        id="addSize"
                        defaultValue={'1*1'}
                        onChange={newCardSize}
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
                <div className="input-div">
                    图标地址：<Input id="addIcon" value={c} onChange={
                        (e) => {
                            setC(e.target.value)
                        }
                    }
                        placeholder='图标地址常为网站域名后加上“/favicon.ico”' />
                </div>
                <div className="input-div" style={{ marginBottom: '0px' }}>
                    卡片预览：
                    <div style={{ width: '140px', height: '77px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F0EC' }}>
                        <div style={{ width: '126px', height: '66px', display: 'flex', position: 'relative', overflow: 'hidden', alignItems: 'center', backgroundColor: '#fff', padding: '10px 10px 10px 12px' }}>
                            <img src={c} style={imgStyle} alt=''></img>
                            <img
                                src={c}
                                alt=''
                                style={{
                                    position: 'absolute',
                                    width: '70px',
                                    top: '-10px',
                                    right: '-10px',
                                    opacity: 0.1,
                                    transform: 'rotate(-30deg)',
                                    WebkitUserDrag: 'none'
                                }}>
                            </img>
                            <Text
                                style={{ lineHeight: '44px', zIndex: '10' }}
                                strong
                                ellipsis={
                                    ellipsis
                                        ? {
                                            tooltip: a,
                                        }
                                        : false
                                }
                            >
                                {a}
                            </Text>
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
            </Modal >
        </>
    )
}

export default AddNewCard;