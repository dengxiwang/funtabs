import { Button, InputNumber, message, Select, Space } from "antd";
import React from 'react';
import AddNewCard from "./addNewCard";
import './funtabs.css';
import TabsManager from "./tabsManager";

const Settings = (props) => {
    const { model, widthNum, setWidthNum, heightNum, setHeightNum } = props;
    const { linkList, setLinkList, edit, editFunction, radius, setRadius, cardStyle, setCardStyle } = props;
    const { funtabsData, gap, setGap, tabsActiveKey, tabsItems, setTabsItems } = props;

    const CardStyleSelect = () => (
        <Select
            style={{ marginRight: '12px' }}
            defaultValue={cardStyle}
            onChange={
                (e) => {
                    setCardStyle(e)
                    if (e === 'defaultCard') {
                        setHeightNum(64)
                        setWidthNum(160)
                        setRadius(6)
                        setGap(18)
                    } else if (e === 'onlyIconCard') {
                        setHeightNum(64)
                        setWidthNum(64)
                        setRadius(100)
                        setGap(18)
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

    return (
        <>
            <div className="settings_option" style={{ display: edit }}>
                <Space wrap>
                    <p>卡片宽度：</p>
                    <InputNumber style={{ width: '70px' }} value={widthNum} stringMode onChange={(e) => { setWidthNum(e) }} />
                    <p>卡片高度：</p>
                    <InputNumber style={{ width: '70px' }} stringMode value={heightNum} onChange={(e) => { setHeightNum(e) }} />
                    <p>卡片圆角：</p>
                    <InputNumber style={{ width: '70px' }} stringMode value={radius} onChange={(e) => { setRadius(e) }} />
                    <p>卡片间距：</p>
                    <InputNumber style={{ width: '70px' }} stringMode value={gap} onChange={(e) => { setGap(e) }} />
                    <p>卡片样式：</p>
                    <CardStyleSelect />
                    <AddNewCard
                        model={model}
                        linkList={linkList}
                        setLinkList={setLinkList}
                        components={funtabsData.components}
                        funtabsData={funtabsData}
                    />
                    <TabsManager
                        tabsItems={tabsItems}
                        setTabsItems={setTabsItems}
                    />
                    <Button
                        type="primary"
                        onClick={
                            () => {
                                editFunction()
                            }
                        }
                    >保存</Button>
                    <Button type="primary" danger onClick={() => {
                        window.localStorage.removeItem('funtabs')
                        message.success('当前分类初始化成功！')
                        window.location.reload(true)
                    }}>恢复</Button>
                </Space>
            </div>
        </ >
    )
}

export default Settings;