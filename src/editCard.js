import { EditTwoTone, UploadOutlined } from "@ant-design/icons";
import { Button, Input, message, Modal, Select, Typography, Upload } from "antd";
import ImgCrop from 'antd-img-crop';
import React, { useState } from 'react';

const { Text } = Typography;

const imgStyle = {
    width: 'auto',
    height: '100%',
    margin: '0px 10px 0px 0px',
    WebkitUserDrag: 'none',
}

const EditCard = (props) => {
    const { id, linkList, setLinkList } = props;
    const [link, setLink] = useState(linkList[id].link);
    const [label, setLabel] = useState(linkList[id].label);
    const [icon, setIcon] = useState(linkList[id].icon);
    const [size, setSize] = useState(linkList[id].size);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ellipsis] = useState('true')

    const showEditModal = () => {
        setIsModalOpen(true);
    };

    const cancelEditModal = () => {
        setIsModalOpen(false);
    };

    function saveEdit() {
        message.success('编辑成功')
        let editResult = { 'label': label, 'link': link, 'size': size, 'icon': icon, 'type': 'link' }
        const editList = [...linkList]
        editList.splice(id, 1, editResult)
        setLinkList(editList)
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
            >
                <div className="input-div">
                    链接地址：<Input
                        defaultValue={link}
                        onBlur={() => {
                            var domain = link.split('/'); //以“/”进行分割
                            if (domain[2]) {
                                domain = domain[2];
                            } else {
                                domain = ''; //如果url不正确就取空
                            }
                            setIcon('https://api.iowen.cn/favicon/' + domain + '.png')
                            fetch('https://api.vvhan.com/api/title?url=' + link)
                                .then(res => res.json())
                                .then(data => setLabel(data.title))
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
                </div>
                <div className="input-div">
                    卡片名称：<Input value={label} onChange={(e) => { setLabel(e.target.value) }} placeholder='输入链接后自动获取卡片名称' />
                </div>
                <div className="input-div">
                    卡片大小：<Select
                        id="addSize"
                        defaultValue={size}
                        onChange={(e) => { setSize(e) }}
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
                    图标地址：<Input
                        value={icon}
                        onChange={
                            (e) => {
                                setIcon(e.target.value)
                            }
                        }
                        placeholder='图标地址常为网站域名后加上“/favicon.ico”' />
                </div>
                <div className="input-div" style={{ marginBottom: '0px' }}>
                    卡片预览：
                    <div style={{ width: '140px', height: '77px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F2F0EC' }}>
                        <div style={{ width: '126px', height: '66px', display: 'flex', position: 'relative', overflow: 'hidden', alignItems: 'center', backgroundColor: '#fff', padding: '10px 10px 10px 12px' }}>
                            <img src={icon} style={imgStyle} alt=''></img>
                            <img
                                src={icon}
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
                                            tooltip: label,
                                        }
                                        : false
                                }
                            >
                                {label}
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