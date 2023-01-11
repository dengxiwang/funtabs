import { Button, InputNumber, Select, Space } from "antd";
import React from 'react';
import AddNewCard from "./addNewCard";
import ChangeWallpaper from "./changeWallpaper";
import './funtabs.css';
import TabsManager from "./tabsManager";

const Settings = (props) => {
    const { localData, model, widthNum, setWidthNum, heightNum, setHeightNum, api } = props;
    const { linkList, setLinkList, edit, editFunction, radius, setRadius, cardStyle, setCardStyle } = props;
    const { funtabsData, gap, setGap, setTabsVisibility, tabsItems, setTabsItems, tabsActiveKey, setTabsActiveKey } = props;
    const { url, setUrl } = props

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
                    } else if (e === 'phoneCard') {
                        setHeightNum(86)
                        setWidthNum(86)
                        setRadius(16)
                        setGap(5)
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
                    }, {
                        value: 'phoneCard',
                        label: '手机样式'
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
                        tabsActiveKey={tabsActiveKey}
                        setTabsActiveKey={setTabsActiveKey}
                        tabsItems={tabsItems}
                        api={api}
                    />
                    <TabsManager
                        tabsItems={tabsItems}
                        setTabsItems={setTabsItems}
                        setTabsVisibility={setTabsVisibility}
                        tabsActiveKey={tabsActiveKey}
                        setTabsActiveKey={setTabsActiveKey}
                        localData={localData}
                    />
                    <ChangeWallpaper
                        url={url}
                        setUrl={setUrl} />
                    <Button
                        type="primary"
                        onClick={
                            () => {
                                editFunction()
                            }
                        }
                    >保存</Button>
                </Space>
            </div>
        </ >
    )
}

export default Settings;