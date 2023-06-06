import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs';
import { DownOutlined, FormatPainterOutlined, HeartOutlined, PictureOutlined, PlusSquareOutlined, QuestionCircleOutlined, TableOutlined, UploadOutlined } from "@ant-design/icons";
import { animated, easings, useSpring } from "@react-spring/web";
import Device from '@skillnull/device-js';
import { Dropdown, Image, Tabs, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useLongPress } from 'use-long-press';
import '../common/funtabs.css';
import '../index.css';
import AddNewCard from "./addNewCard";
import Bookmarks from "./bookmarks";
import ChangeWallpaper from "./changeWallpaper";
import Clock from "./clock";
import { funtabsData } from "./data";
import Donate from "./donate";
import Header from "./header";
import LogoArea from './logoArea';
import SearchTools from "./searchTools";
import Settings from "./settings";
import ShowList from "./showList";
import TabsManager from "./tabsManager";

const Home = () => {
    const localData = JSON.parse(window.localStorage.getItem('funtabs'));//获取本地存储的数据
    const getLocalStorageData = (key, defaultValue) => {
        const localValue = window.localStorage.getItem(key);
        try {
            return localValue ? JSON.parse(localValue) : defaultValue;
        } catch (error) { // 如果解析JSON失败，则返回原始值
            return localValue || defaultValue;
        }
    };

    const [newlinkList, setNewLinkList] = useState(() =>
        getLocalStorageData('funtabs', funtabsData).newData ? getLocalStorageData('funtabs', funtabsData).newData.content : getLocalStorageData('funtabs', funtabsData).content
    );

    const [tabsActiveKey, setTabsActiveKey] = useState(() => {
        const localFuntabsData = JSON.parse(localStorage.getItem('funtabs'))?.newData || funtabsData;
        const localActiveKey = parseInt(localStorage.getItem('activeKey')) || localFuntabsData.tabsActiveKey;
        try {
            const targetItem = newlinkList.find(item => item.key === localActiveKey);
            let targetKey;
            if (targetItem) {
                const targetItem2 = localFuntabsData.content.find(item => item.label === targetItem.label) || localFuntabsData.content[0];
                targetKey = targetItem2.key;
            } else {
                targetKey = localFuntabsData.content[0].key;
            }

            return targetKey
        } catch (error) {
            return localFuntabsData.tabsActiveKey
        }
    });

    const [model, setModel] = useState(() =>
        getLocalStorageData('model', funtabsData.model)
    );
    //定义卡片的宽度、高度、圆角、卡片样式、卡片间距大小
    const [widthNum, setWidthNum] = useState(() => {
        const localWidthNum = (localData && localData.newData.widthNum) ? localData.newData.widthNum : funtabsData.widthNum;
        return parseInt(localWidthNum);
    });

    const [heightNum, setHeightNum] = useState(() => {
        const localHeightNum = (localData && localData.newData.heightNum) ? localData.newData.heightNum : funtabsData.heightNum;
        return parseInt(localHeightNum);
    });

    const [radius, setRadius] = useState(() => {
        const localRadius = (localData && localData.newData.radius) ? localData.newData.radius : funtabsData.radius;
        return parseInt(localRadius);
    });

    const [cardStyle, setCardStyle] = useState(() => {
        const localCardStyle = (localData && localData.newData.cardStyle) ? localData.newData.cardStyle : funtabsData.cardStyle;
        return localCardStyle;
    });

    const [gap, setGap] = useState(() => {
        const localGap = (localData && localData.newData.gap) ? localData.newData.gap : funtabsData.gap;
        return parseInt(localGap);
    });

    const [brightness, setBrightness] = useState(() => {
        const localBrightness = window.localStorage.getItem('brightness');
        return localBrightness ? parseInt(localBrightness) : 80;
    });

    const [blur, setBlur] = useState(() => {
        const localBlur = window.localStorage.getItem('blur');
        return localBlur ? parseInt(localBlur) : 0;
    });

    const [oldBrightness, setOldBrightness] = useState(() => brightness);

    const [oldBlur, setOldBlur] = useState(() => blur);
    //其他文本
    const [edit, setEdit] = useState('none')
    const [drag, setDrag] = useState(true)
    const [editText, setEditText] = useState('个性编辑')
    const [dropFilter, setDropFilter] = useState('')
    const [tabsVisibility, setTabsVisibility] = useState('')
    const backgroundImage = window.localStorage.getItem('backgroundImage')
    const [settingsAreaAnimation, setSettingsAreaAnimation] = useSpring(() => ({}))
    const tabs = useRef()
    const [num, setNum] = useState(0)
    const [url, setUrl] = useState(() => {
        if (backgroundImage === 'null' || backgroundImage === 'undefined' || backgroundImage === null) {
            return funtabsData.backgroundImage;
        } else {
            return `${backgroundImage}`;
        }
    });

    const [wallpaperType, setWallpaperType] = useState(() => {
        const localWallpaperType = window.localStorage.getItem('wallpaperType');
        return localWallpaperType ? localWallpaperType : 'image';
    });

    const [timeArea, setTimeArea] = useState(() => {
        const timeAreaLocal = localStorage.getItem('timeArea');
        return timeAreaLocal ? timeAreaLocal : 'time';
    });

    //列表动画
    const [linkListAnimation, api] = useSpring(() => ({
        from: {
            y: 20,
            opacity: 0,
        },
        to: [
            {
                y: 19.9,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
            },
        ],
        delay: 200,
        config: {
            duration: 300,
            easing: easings.easeOutCubic
        }
    }))
    const [gridWidth, setGridWidth] = useState('100%')
    const [gridWidthNum, setGridWidthNum] = useState(() =>
        (localData && localData.newData.gridWidthNum) ? localData.newData.gridWidthNum : funtabsData.gridWidthNum)

    const [showClock, setShowClock] = useState(() => {
        const localShowClock = localStorage.getItem('showClock');
        return (localShowClock === '' || localShowClock === 'none') ? localShowClock : '';
    })

    const [showSearch, setShowSearch] = useState(() => {
        const localShowSearch = localStorage.getItem('showSearch');
        return (localShowSearch === '' || localShowSearch === 'none') ? localShowSearch : '';
    })

    const [linkOpen, setLinkOpen] = useState(() => {
        const localLinkOpen = localStorage.getItem('linkOpen');
        return (localLinkOpen === '_self' || localLinkOpen === '_blank') ? localLinkOpen : '_blank';
    })

    const [fontColor, setFontColor] = useState(() => {
        const localFontColor = localStorage.getItem('fontColor');
        return localFontColor ? localFontColor : '#ffffff';
    })

    const [paddingTop, setPaddingTop] = useState(() => {
        const localPaddingTop = window.localStorage.getItem('paddingTop');
        return localPaddingTop ? parseInt(localPaddingTop) : 50;
    })

    //网格布局样式信息
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, ${widthNum}px)`,
        justifyContent: 'center',
        columnGap: `${gap}px`,
        rowGap: `${gap}px`,
        gridAutoFlow: 'dense',
        gridAutoRows: `${heightNum}px`,
        maxWidth: '100%',
        padding: '8px',
        width: `${newWidth()}px`,
    }

    function newWidth() {
        return parseInt(gridWidthNum) < parseInt(gridWidth) ? `${gridWidthNum}` : `${gridWidth}`;
    }

    //判断标签页是否显示
    const tabsVis = () => {
        newlinkList.length === 1 ? setTabsVisibility('none') : setTabsVisibility('')
    }

    function editFunction(e) {
        if (edit === 'none') {
            setEdit('')
            setDrag(false)
            setDropFilter('blur(5px)')
            setEditText('保存编辑')
            setSettingsAreaAnimation.start({
                from: {
                    y: -20,
                    opacity: 0,
                },
                to: {
                    y: 0,
                    opacity: 1,
                }
            })
        } else {
            if (e === 0) {
                setEdit('none')
                setDrag(true)
                setDropFilter('')
                saveData()
                message.success('本地保存成功')
            } else {
                setEdit('none')
                setDrag(true)
                setDropFilter('')
                message.success('取消编辑')
                cancelEdit()
            }
            setEditText('个性编辑')
        }
    }

    function cancelEdit() {
        window.sessionStorage.clear()
        const localFuntabsData = JSON.parse(localStorage.getItem('funtabs'))?.newData || funtabsData;
        const localActiveKey = parseInt(localStorage.getItem('activeKey')) || localFuntabsData.tabsActiveKey;

        setNewLinkList(localFuntabsData.content)
        setWidthNum(localFuntabsData.widthNum)
        setHeightNum(localFuntabsData.heightNum)
        setCardStyle(localFuntabsData.cardStyle)
        setGridWidthNum(localFuntabsData.gridWidthNum)
        setGap(localFuntabsData.gap)
        setRadius(localFuntabsData.radius)
        setTabsVisibility(localFuntabsData.content.length > 1 ? '' : 'none')

        try {
            const targetItem = newlinkList.find(item => item.key === localActiveKey);
            let targetKey;
            if (targetItem) {
                const targetItem2 = localFuntabsData.content.find(item => item.label === targetItem.label) || localFuntabsData.content.slice(-1)[0];
                targetKey = targetItem2.key;
            } else {
                targetKey = localFuntabsData.content.slice(-1)[0].key;
            }

            setTabsActiveKey(targetKey);
            window.localStorage.setItem('activeKey', targetKey);
        } catch (error) {
            setTabsActiveKey(localFuntabsData.tabsActiveKey);
            window.localStorage.setItem('activeKey', localFuntabsData.tabsActiveKey);
        }
    }

    function saveData() {
        const newData = localData ? localData.newData : funtabsData;
        newData.content = newlinkList;
        newData.gap = gap;
        newData.widthNum = widthNum;
        newData.heightNum = heightNum;
        newData.cardStyle = cardStyle;
        newData.radius = radius;
        newData.gridWidthNum = gridWidthNum;
        window.localStorage.setItem('funtabs', JSON.stringify({ newData }));

        const localHotEventColor = window.sessionStorage.getItem('localHotEventColor');
        if (localHotEventColor) {
            window.localStorage.setItem('localHotEventColor', localHotEventColor);
        }
    }

    function saveActiveKey(e) {
        window.localStorage.setItem('activeKey', e)
    }

    function changeWidth(e) {
        const len = newlinkList.length;
        let classNum = 0,
            result = 0;
        for (let i = 0; i < len; i++) {
            if (newlinkList[i].key === e) {
                setNum(i)
                const classList = document.querySelectorAll(`#sortable${i} div[class^='grid-item']`);
                const l = classList.length;
                for (let j = 0; j < l; j++) {
                    const classWidth = parseInt(classList[j].className.slice(0, 11).substr(-1, 1));
                    classNum += classWidth;
                }
                result = widthNum * classNum + gap * classNum - gap;
                tabs.current.slickGoTo(i, true)
                break;
            }
        }
        setGridWidth(`${result}`);
    }

    useEffect(() => {
        tabsVis()
        changeWidth(tabsActiveKey)
        // eslint-disable-next-line
    }, [newlinkList, tabsActiveKey])

    const [deviceType, setDeviceType] = useState('PC')
    useEffect(() => {
        Device.Info({
            info: ['deviceType']
        }).then(data => {
            setDeviceType(data.deviceType)
        })
    }, [])

    const longpress = useLongPress(() => {
        if (edit === 'none') {
            editFunction()
        }
    }, {
        cancelOnMovement: true,
        detect: 'mouse'
    })

    const items = [
        {
            label: editText,
            key: '1',
            icon: <FormatPainterOutlined />,
        },
        {
            label: <AddNewCard
                model={model}
                linkList={newlinkList}
                num={num}
                setLinkList={setNewLinkList}
                funtabsData={funtabsData}
                tabsActiveKey={tabsActiveKey}
                setTabsActiveKey={setTabsActiveKey}
                api={api}
                type={1}
                edit={edit}
                cardStyle={cardStyle}
            />,
            key: '2',
            icon: <PlusSquareOutlined />
        },
        {
            label: <TabsManager
                num={num}
                tabs={tabs}
                linkList={newlinkList}
                setLinkList={setNewLinkList}
                setTabsVisibility={setTabsVisibility}
                tabsActiveKey={tabsActiveKey}
                setTabsActiveKey={setTabsActiveKey}
                localData={localData}
                type={1}
                edit={edit}
            />,
            key: '3',
            icon: <TableOutlined />
        },
        {
            label: <ChangeWallpaper
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
                type={1}
                fontColor={fontColor}
                setFontColor={setFontColor}
                wallpaperType={wallpaperType}
                setWallpaperType={setWallpaperType}
                linkList={newlinkList}
                setLinkList={setNewLinkList}
                deviceType={deviceType}
                timeArea={timeArea}
                setTimeArea={setTimeArea}
            />,
            key: '4',
            icon: <PictureOutlined />
        },
        {
            label: <Bookmarks
                linkList={newlinkList}
                num={num}
                tabsActiveKey={tabsActiveKey}
                setLinkList={setNewLinkList}
                setTabsActiveKey={setTabsActiveKey}
                api={api}
                type={1}
                edit={edit}
                cardStyle={cardStyle}
            />,
            key: '5',
            icon: <UploadOutlined />
        },
        {
            label: '问题反馈',
            key: '6',
            icon: <QuestionCircleOutlined />
        },
        {
            label: <Donate />,
            key: '7',
            icon: <HeartOutlined />
        },
    ];

    function showWallpaper() {
        const videoStyle = {
            filter: `brightness(${brightness}%)`
        };

        const backgroundImage = () => {
            setUrl(funtabsData.backgroundImage);
            setWallpaperType('image');
            window.localStorage.setItem('backgroundImage', funtabsData.backgroundImage);
        }

        return wallpaperType === 'video' && deviceType === 'PC' ?
            <video
                className="background"
                autoPlay
                loop
                muted
                src={`${url}`}
                style={{ ...videoStyle, objectFit: 'cover' }}
            /> :
            wallpaperType === 'color' ?
                <div
                    className="background"
                    style={{
                        backgroundColor: `${url}`,
                        ...videoStyle
                    }}
                /> :
                <>
                    <div
                        className='background'
                        style={{
                            filter: `brightness(${brightness}%)`,
                            backgroundImage: `url(${url})`
                        }}
                        alt=""
                    />
                    <Image
                        src={url}
                        style={{ display: 'none' }}
                        onError={backgroundImage}
                    />
                </>;
    }

    function showTimeArea() {
        if (timeArea === 'time' && showClock === '') {
            return (
                <Clock
                    fontColor={fontColor}
                />
            )
        } else if (timeArea === 'logo' && showClock === '') {
            return (
                <LogoArea />
            )
        }
    }

    return (
        <StyleProvider transformers={[legacyLogicalPropertiesTransformer]} hashPriority="high">
            <Dropdown
                menu={{
                    items,
                    onClick: (e) => {
                        // eslint-disable-next-line
                        switch (e.key) {
                            case '1': {
                                editFunction(0)
                                break
                            }
                            case '6': {
                                window.open('https://support.qq.com/product/501945', linkOpen)
                                break
                            }
                        }
                    }
                }}
                trigger={['contextMenu']}
            >
                <div className='content' style={{ paddingTop: `${paddingTop}px` }}>
                    {showWallpaper()}
                    <div
                        className='background'
                        style={{
                            WebkitBackdropFilter: `blur(${blur / 100 * 20}px)`,
                            backdropFilter: `blur(${blur / 100 * 20}px)`
                        }}
                    />
                    <Header
                        model={model}
                        editFunction={editFunction}
                        editText={editText}
                        drag={drag}
                        setModel={setModel}
                        api={api}
                        showClock={showClock}
                        showSearch={showSearch}
                        linkOpen={linkOpen}
                        setLinkOpen={setLinkOpen}
                        setShowClock={setShowClock}
                        setShowSearch={setShowSearch}
                        fontColor={fontColor}
                        paddingTop={paddingTop}
                        setPaddingTop={setPaddingTop}
                    />
                    {showTimeArea()}
                    <SearchTools
                        showSearch={showSearch}
                        linkOpen={linkOpen}
                    />
                    <div className="gridArea">
                        <div key='showList' style={{ width: '100%', display: model, marginTop: '-32px' }} >
                            <div style={{ minHeight: '20px' }}>
                                <Tabs
                                    id="option_tabs"
                                    items={newlinkList}
                                    activeKey={tabsActiveKey}
                                    tabBarStyle={{
                                        color: fontColor,
                                        fontWeight: 'bold',
                                        display: tabsVisibility,
                                    }}
                                    onDragOver={(e) => {//鼠标拖拽切换分类
                                        const id = e.target.id;
                                        if (id.includes('option_tabs-tab-') === true && drag === false) {
                                            const dropTo = parseInt(id.substring(16))
                                            setTabsActiveKey(dropTo)
                                            saveActiveKey(dropTo)
                                        }
                                    }}
                                    moreIcon={
                                        <DownOutlined
                                            style={{
                                                fontSize: '1rem',
                                                color: '#ffffff',
                                            }}
                                        />
                                    }
                                    onChange={(e) => {
                                        e = parseInt(e)
                                        setTabsActiveKey(e)
                                        saveActiveKey(e)
                                        api.start({
                                            from: {
                                                y: 20,
                                                opacity: 0,
                                            },
                                            to: [
                                                {
                                                    y: 19.9,
                                                    opacity: 0,
                                                }, {
                                                    y: 0,
                                                    opacity: 1,
                                                },
                                            ],
                                            config: {
                                                duration: 180,
                                                easing: easings.easeOutCubic
                                            },
                                        })
                                    }}
                                />
                            </div>
                            <div {...longpress()}>
                                <ShowList
                                    cardStyle={cardStyle}
                                    tabs={tabs}
                                    num={num}
                                    gap={gap}
                                    linkListAnimation={linkListAnimation}
                                    newlinkList={newlinkList}
                                    setNewLinkList={setNewLinkList}
                                    gridStyle={gridStyle}
                                    drag={drag}
                                    edit={edit}
                                    radius={radius}
                                    widthNum={widthNum}
                                    heightNum={heightNum}
                                    tabsActiveKey={tabsActiveKey}
                                    linkOpen={linkOpen}
                                    deviceType={deviceType}
                                    fontColor={fontColor}
                                />
                            </div>
                        </div>
                    </div>
                    {/* eslint-disable-next-line */}
                    <animated.div style={{ backgroundColor: 'rgb(0 0 0 / 50%)', backdropFilter: dropFilter, top: '0px', position: 'fixed', zIndex: 20, ...settingsAreaAnimation }}>
                        <Settings
                            tabs={tabs}
                            model={model}
                            num={num}
                            setNum={setNum}
                            widthNum={widthNum}
                            setWidthNum={setWidthNum}
                            heightNum={heightNum}
                            setHeightNum={setHeightNum}
                            gridWidthNum={gridWidthNum}
                            setGridWidthNum={setGridWidthNum}
                            linkList={newlinkList}
                            setLinkList={setNewLinkList}
                            edit={edit}
                            editFunction={editFunction}
                            radius={radius}
                            setRadius={setRadius}
                            cardStyle={cardStyle}
                            setCardStyle={setCardStyle}
                            gap={gap}
                            setGap={setGap}
                            tabsActiveKey={tabsActiveKey}
                            setTabsActiveKey={setTabsActiveKey}
                            funtabsData={funtabsData}
                            setTabsVisibility={setTabsVisibility}
                            localData={localData}
                            url={url}
                            setUrl={setUrl}
                            api={api}
                            brightness={brightness}
                            setBrightness={setBrightness}
                            blur={blur}
                            setBlur={setBlur}
                            oldBlur={oldBlur}
                            setOldBlur={setOldBlur}
                            setOldBrightness={setOldBrightness}
                            oldBrightness={oldBrightness}
                            setGridWidth={setGridWidth}
                            fontColor={fontColor}
                            setFontColor={setFontColor}
                            wallpaperType={wallpaperType}
                            setWallpaperType={setWallpaperType}
                            deviceType={deviceType}
                            timeArea={timeArea}
                            setTimeArea={setTimeArea}
                        />
                    </animated.div>
                </div>
            </Dropdown >
        </StyleProvider>
    )
}

export { Home };
