import { Button, InputNumber, Select, Space, message } from "antd";
import React from 'react';
import '../common/funtabs.css';
import '../index.css';
import AddNewCard from "./addNewCard";
import Bookmarks from "./bookmarks";
import ChangeWallpaper from "./changeWallpaper";
import TabsManager from "./tabsManager";

const Settings = (props) => {
    const { localData, model, num, widthNum, setWidthNum, heightNum, setHeightNum, api } = props;
    const { linkList, setLinkList, edit, editFunction, radius, setRadius, cardStyle, setCardStyle } = props;
    const { funtabsData, gap, setGap, setTabsVisibility, tabsActiveKey, setTabsActiveKey } = props;
    const { url, setUrl, tabs, gridWidthNum, setGridWidthNum, stickerList, setStickerList } = props;
    const { brightness, setBrightness, blur, setBlur, oldBlur, oldBrightness, setOldBrightness, setOldBlur } = props;
    const { fontColor, setFontColor, wallpaperType, setWallpaperType, deviceType, timeArea, setTimeArea } = props

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
                        setRadius(12)
                        setGap(24)
                    } else if (e === 'onlyIconCard') {
                        setHeightNum(72)
                        setWidthNum(72)
                        setRadius(35)
                        setGap(24)
                    } else if (e === 'phoneCard') {
                        setHeightNum(88)
                        setWidthNum(88)
                        setRadius(16)
                        setGap(12)
                    } else if (e === 'onlyText') {
                        message.warning('此样式下部分功能将被精简')
                        setHeightNum(28)
                        setWidthNum(120)
                        setRadius(0)
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
                    }, {
                        value: 'onlyText',
                        label: '文字经典'
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
                <Space wrap style={{ marginLeft: '1rem', marginRight: '1rem' }}>
                    <p>宽度：</p>
                    <InputNumber min={4} style={{ width: '70px' }} value={widthNum} stringMode
                        onChange={(e) => {
                            if (e !== null) {
                                setWidthNum(e);
                            }
                        }}
                    />
                    <p>高度：</p>
                    <InputNumber min={2} style={{ width: '70px' }} stringMode value={heightNum} onChange={(e) => {
                        if (e !== null) {
                            setHeightNum(e);
                        }
                    }}
                    />
                    <p>圆角：</p>
                    <InputNumber min={0} style={{ width: '70px' }} stringMode value={radius} onChange={(e) => {
                        if (e !== null) {
                            setRadius(e);
                        }
                    }}
                    />
                    <p>间距：</p>
                    <InputNumber min={0} style={{ width: '70px' }} stringMode value={gap} onChange={(e) => {
                        if (e !== null) {
                            setGap(e);
                        }
                    }}
                    />
                    <p>页面总宽：</p>
                    <InputNumber min={0} style={{ width: '70px' }} stringMode value={gridWidthNum} onChange={(e) => {
                        if (e !== null) {
                            setGridWidthNum(e);
                        }
                    }}
                    />
                    <p>卡片样式：</p>
                    <CardStyleSelect />
                    <AddNewCard
                        model={model}
                        linkList={linkList}
                        setLinkList={setLinkList}
                        num={num}
                        funtabsData={funtabsData}
                        tabsActiveKey={tabsActiveKey}
                        setTabsActiveKey={setTabsActiveKey}
                        api={api}
                        stickerList={stickerList}
                        setStickerList={setStickerList}
                        edit={edit}
                        cardStyle={cardStyle}
                    />
                    <ChangeWallpaper
                        url={url}
                        setUrl={setUrl}
                        brightness={brightness}
                        setBrightness={setBrightness}
                        blur={blur}
                        setBlur={setBlur}
                        oldBlur={oldBlur}
                        oldBrightness={oldBrightness}
                        setOldBlur={setOldBlur}
                        setOldBrightness={setOldBrightness}
                        fontColor={fontColor}
                        setFontColor={setFontColor}
                        wallpaperType={wallpaperType}
                        setWallpaperType={setWallpaperType}
                        linkList={linkList}
                        setLinkList={setLinkList}
                        deviceType={deviceType}
                        timeArea={timeArea}
                        setTimeArea={setTimeArea}
                    />
                    <TabsManager
                        num={num}
                        tabs={tabs}
                        linkList={linkList}
                        setLinkList={setLinkList}
                        setTabsVisibility={setTabsVisibility}
                        tabsActiveKey={tabsActiveKey}
                        setTabsActiveKey={setTabsActiveKey}
                        localData={localData}
                        edit={edit}
                    />
                    <Bookmarks
                        linkList={linkList}
                        num={num}
                        tabsActiveKey={tabsActiveKey}
                        setLinkList={setLinkList}
                        setTabsActiveKey={setTabsActiveKey}
                        api={api}
                        stickerList={stickerList}
                        setStickerList={setStickerList}
                        edit={edit}
                        cardStyle={cardStyle}
                    />
                    <Button
                        type="primary"
                        onClick={
                            () => {
                                editFunction(0)
                            }
                        }
                    >保存</Button>
                    <Button
                        danger
                        type="primary"
                        onClick={
                            () => {
                                editFunction()
                            }
                        }
                    >取消</Button>
                </Space>
            </div>
        </ >
    )
}

export default Settings;