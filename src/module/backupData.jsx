import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Radio, Row, Space, Upload, message } from 'antd';
import beautify from 'js-beautify';
import omit from 'lodash/omit';
import React, { useEffect, useState } from 'react';
import transformToBookmarks from '../common/transformToBookmarks';

function BackupData() {
    const data = {}
    const [data2, setData2] = useState(data)
    const [backupData, setBackupData] = useState('')
    const [backupModal, setBackupModal] = useState(false)
    const [check, setCheck] = useState('all');
    const [styleCheck, setStyleCheck] = useState('txt')

    useEffect(() => {
        getLocalStorage()
        setBackupData('')
        setCheck('all')
        setStyleCheck('txt')
        // eslint-disable-next-line
    }, [backupModal])

    function getLocalStorage() {
        const data = {};
        for (const key of Object.keys(localStorage)) {
            if (key === 'password' || key === 'userName') {
                continue;
            }
            data[key] = localStorage.getItem(key);
        }
        setData2(omit(data, ['password', 'userName']));
    }

    function saveFile(text) {
        if (styleCheck === 'html') {
            text = text.replace(/\\/g, "")
            text = text.slice(1, -1);
            text = beautify.html(text, { indent_size: 2 })
        }
        const stringData = text
        const time = new Date()
        const year = time.getFullYear();
        const month = time.getMonth() + 1;
        const day = time.getDate();
        // dada 表示要转换的字符串数据，type 表示要转换的数据格式
        const blob = new Blob([stringData], {
            type: "text/html;charset=utf-8"
        })
        // 根据 blob生成 url链接
        const objectURL = URL.createObjectURL(blob)
        // 创建一个 a 标签Tag
        const aTag = document.createElement('a')
        // 设置文件的下载地址
        aTag.href = objectURL
        // 设置保存后的文件名称
        aTag.download = `funtabs趣标签页备份数据${year}-${month}-${day}.${styleCheck}`
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

    function restoreLocalStorage(data) {
        const userName = window.localStorage.getItem('userName')
        const password = window.localStorage.getItem('password')
        window.localStorage.clear()
        for (const [key, value] of Object.entries(data)) {
            window.localStorage.setItem(key, value);
        }
        if (userName) {
            window.localStorage.setItem('userName', userName);
        }
        if (password) {
            window.localStorage.setItem('password', password);
        }
    }

    function save() {
        if (backupData !== '') {
            try {
                const data = JSON.parse(backupData, (key, value) => {
                    // 处理值为 ISO 8601 日期字符串的情况
                    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z?$/.test(value)) {
                        return new Date(value);
                    }
                    return value;
                });
                if (typeof content2 === 'number') {
                    message.error('保存失败！');
                } else {
                    restoreLocalStorage(data);
                    message.success('保存成功');
                    setBackupModal(false);
                }
            } catch (e) {
                message.error('数据格式错误，保存失败！');
            }
        } else {
            message.error('恢复数据未填写，保存失败～');
        }
    }

    const options = [
        {
            label: '全部',
            value: 'all'
        }, {
            label: '布局卡片',
            value: 'card'
        }
    ]

    const fileType = [
        {
            label: '文本（.txt）',
            value: 'txt'
        }, {
            label: '浏览器书签（.html)',
            value: 'html'
        }
    ]

    async function getCardData() {
        const cardData = {};
        const linkList = await localStorage.getItem('funtabs');
        const stickerList = await localStorage.getItem('stickerData');
        cardData['funtabs'] = linkList;
        cardData['stickerData'] = stickerList;
        return cardData;
    }

    async function changeCheck(e) {
        setCheck(e.target.value);
        const type = e.target.value;
        if (type === 'card') {
            const cardData = await getCardData();
            setData2(cardData);
        } else {
            setStyleCheck('txt')
            getLocalStorage();
        }
    }

    async function changeCheck2(e) {
        setStyleCheck(e.target.value);
        const type = e.target.value;
        if (type === 'html') {
            const localFuntabsData = JSON.parse(localStorage.getItem('funtabs'));
            const localStickerData = JSON.parse(localStorage.getItem('stickerData'));
            if (localFuntabsData || localStickerData) {
                setCheck('card')
                const content = localFuntabsData.newData.content
                const content2 = localStickerData
                const newContent = [...content, ...content2]
                for (let i = 0; i < newContent.length; i++) {
                    newContent[i].type = 'folder'
                }
                const newStr = transformToBookmarks(newContent)
                setData2(newStr);
            } else {
                message.error('未保存个性编辑内容，将无法导出浏览器书签样式')
                setStyleCheck('txt')
            }
        } else {
            getLocalStorage();
        }
    }

    return (
        <>
            <p onClick={() => setBackupModal(true)}>备份/恢复数据</p>
            <Modal
                title='备份/恢复数据'
                open={backupModal}
                onCancel={() => setBackupModal(false)}
                okText='确认导入'
                cancelText='取消'
                onOk={save}
                destroyOnClose
            >
                <Row style={{ margin: '12px 0px', alignItems: 'baseline' }}>
                    <Col flex='78px'>
                        导出数据：
                    </Col>
                    <Col flex='1'>
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
                    <Col flex='1'>
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
                <Space style={{ padding: '16px 0px 0px 0px' }} wrap size={0}>
                    <p style={{ width: '78px' }}>
                        导出范围：
                    </p>
                    <Radio.Group
                        options={options}
                        onChange={changeCheck}
                        value={check}
                        optionType='default'
                    />
                </Space>
                <Space style={{ padding: '18px 0px 0px 0px' }} wrap size={0}>
                    <p style={{ width: '78px' }}>
                        导出格式：
                    </p>
                    <Radio.Group
                        options={fileType}
                        onChange={changeCheck2}
                        value={styleCheck}
                        optionType='txt'
                    />
                </Space>
            </Modal>
        </>
    );
}

export default BackupData;
