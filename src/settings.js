import { Button, InputNumber, message, Select } from "antd";
import React from 'react';
import AddNewCard from "./addNewCard";
import data from "./data";
import './funtab.css';

const Settings = (props) => {
    const { model, defaultAllSize, setDefaultAllSize, widthNum, setWidthNum, heightNum, setHeightNum } = props;
    const { linkList, setLinkList, edit, radius, setRadius } = props;

    const CardStyleSelect = () => (
        <Select
            style={{ marginRight: '12px' }}
            defaultValue={'默认'}
            onChange={() => message.error('这个功能我还没做呢，只有默认模式～')}
            options={
                [
                    {
                        value: 'default',
                        label: '默认'
                    }, {
                        value: 'onlyIcon',
                        label: '仅图标'
                    }, {
                        value: 'phone',
                        label: '类手机桌面'
                    }
                ]
            } />
    )

    function changeSelect(value) {
        setDefaultAllSize(value)
        let sizeChangeList = [...linkList]
        let m = sizeChangeList.length
        for (var i = 0; i < m; i++) {
            sizeChangeList[i].size = value
        }
        setLinkList(sizeChangeList)
    }

    const CardSizeSelect = () => (
        <Select
            style={{ marginRight: '12px' }}
            defaultValue={defaultAllSize}
            onChange={changeSelect}
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
    )


    return (
        <div style={{ minHeight: '18px' }}>
            <div className="settings_option" style={{ display: edit }}>
                <p>卡片宽度：</p>
                <InputNumber style={{ width: '70px', marginRight: '12px' }} value={widthNum} stringMode onChange={(e) => { setWidthNum(e) }} />
                <p>卡片高度：</p>
                <InputNumber style={{ width: '70px', marginRight: '12px' }} stringMode value={heightNum} onChange={(e) => { setHeightNum(e) }} />
                <p>卡片圆角：</p>
                <InputNumber style={{ width: '70px', marginRight: '12px' }} stringMode value={radius} onChange={(e) => { setRadius(e) }} />
                <p>卡片样式：</p>
                <CardStyleSelect />
                <p>卡片大小：</p>
                <CardSizeSelect />
                <AddNewCard
                    model={model}
                    linkList={linkList}
                    setLinkList={setLinkList} />
                <Button type="primary" danger onClick={() => {
                    changeSelect(data.defaultAllSize)
                    setLinkList(data.content)
                    setWidthNum(data.widthNum)
                    setHeightNum(data.heightNum)
                    setRadius(data.radius)
                }}>恢复默认设置</Button>
            </div>
        </div>
    )
}

export default Settings;