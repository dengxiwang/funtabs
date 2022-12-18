import { Button, InputNumber, message, Popconfirm, Select, Space } from "antd";
import React from 'react';
import AddNewCard from "./addNewCard";
import './funtabs.css';
import TabsManager from "./tabsManager";

const Settings = (props) => {
    const { localData, model, widthNum, setWidthNum, heightNum, setHeightNum } = props;
    const { linkList, setLinkList, edit, editFunction, radius, setRadius, cardStyle, setCardStyle } = props;
    const { funtabsData, gap, setGap, setTabsVisibility, tabsItems, setTabsItems, tabsActiveKey, setTabsActiveKey } = props;

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
                        setTabsVisibility={setTabsVisibility}
                        tabsActiveKey={tabsActiveKey}
                        setTabsActiveKey={setTabsActiveKey}
                        localData={localData}
                    />
                    <Button
                        type="primary"
                        onClick={
                            () => {
                                editFunction()
                            }
                        }
                    >保存</Button>
                    <Popconfirm
                        title="您确定恢复到我们的默认导航内容吗？"
                        onConfirm={
                            () => {
                                window.localStorage.removeItem('activeKey')
                                window.localStorage.removeItem('funtabs')
                                message.success('当前分类初始化成功！')
                                window.location.reload(true)
                            }
                        }
                        okText="确定"
                        cancelText="再想想"
                    >
                        <Button type="primary" danger>恢复</Button>
                    </Popconfirm>
                </Space>
            </div>
        </ >
    )
}

export default Settings;