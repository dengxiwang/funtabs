import { Button, InputNumber, Select } from "antd";
import React, { useEffect } from 'react';
import AddNewCard from "./addNewCard";
import data from "./data";
import './funtabs.css';

const Settings = (props) => {
    const { model, defaultAllSize, setDefaultAllSize, widthNum, setWidthNum, heightNum, setHeightNum } = props;
    const { linkList, setLinkList, edit, editFunction, radius, setRadius, cardStyle, setCardStyle } = props;
    const { gap, setGap } = props;

    useEffect(() => {
    }, [])

    const CardStyleSelect = () => (
        <Select
            style={{ marginRight: '12px' }}
            defaultValue={cardStyle}
            onChange={
                (e) => {
                    setCardStyle(e)
                    if (e === 'defaultCard') {
                        setHeightNum(data.heightNum)
                        setWidthNum(data.widthNum)
                        setRadius(data.radius)
                        setGap(data.gap)
                    } else if (e === 'onlyIconCard') {
                        setHeightNum(64)
                        setWidthNum(64)
                        setRadius(100)
                        setGap(20)
                    }
                }
            }
            options={
                [
                    {
                        value: 'defaultCard',
                        label: '默认卡片'
                    }, {
                        value: 'onlyIconCard',
                        label: '图标纯享'
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
                <p>卡片间距：</p>
                <InputNumber style={{ width: '70px', marginRight: '12px' }} stringMode value={gap} onChange={(e) => { setGap(e) }} />
                <p>卡片样式：</p>
                <CardStyleSelect />
                <p>卡片大小：</p>
                <CardSizeSelect />
                <AddNewCard
                    model={model}
                    linkList={linkList}
                    setLinkList={setLinkList} />
                <Button
                    type="primary"
                    style={{ marginRight: '12px' }}
                    onClick={
                        () => {
                            editFunction()
                        }
                    }
                >保存</Button>
                <Button type="primary" danger onClick={() => {
                    changeSelect(data.defaultAllSize)
                    setWidthNum(data.widthNum)
                    setHeightNum(data.heightNum)
                    setRadius(data.radius)
                    setCardStyle(data.cardStyle)
                    setGap(data.gap)
                    setLinkList(data.content)
                }}>恢复默认设置</Button>
            </div>
        </div>
    )
}

export default Settings;