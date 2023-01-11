import { animated, useSpring } from "@react-spring/web";
import { Tabs, message } from "antd";
import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import DefaultStyle from "./defaultStyle";
import './funtabs.css';
import Header from "./header";
import OnlyIconStyle from "./onlyIconStyle";
import PhoneStyle from "./phoneStyle";
import Settings from "./settings";

const funtabsData = {
    model: "",
    widthNum: 160,
    heightNum: 64,
    radius: 6,
    gap: 18,
    cardStyle: "defaultCard",
    tabsActiveKey: 0,
    backgroundImage: 'https://bing.ioliu.cn/v1',
    content: [
        {
            "label": "常用",
            "key": 0,
            "content": [
                {
                    "label": "便捷记事本",
                    "type": "note",
                    "id": 1671810458244,
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "时间进度条",
                    "type": "timeProgress",
                    "id": 1671810449901,
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "Google",
                    "link": "http://google.com",
                    "size": "11",
                    "icon": "/icons/google.svg",
                    "type": "link",
                    "backgroundColor": "#ffffff",
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "F搜",
                    "link": "http://fsoufsou.com",
                    "size": "11",
                    "icon": "https://static.hetaousercontent.com/static/assets/apple-touch-icon.png",
                    "type": "link",
                    "backgroundColor": "#ffffff",
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "iLovePDF | 为PDF爱好者提供的PDF文件在线处理工具",
                    "link": "https://www.ilovepdf.com/zh-cn",
                    "size": 11,
                    "icon": "https://api.iowen.cn/favicon/www.ilovepdf.com.png",
                    "type": "link",
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "百度统计",
                    "link": "https://tongji.baidu.com/main/overview/10000487913/overview/index?siteId=18318141",
                    "size": "11",
                    "icon": "/icons/tongji.svg",
                    "type": "link",
                    "backgroundColor": "#ffffff",
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "吾爱破解",
                    "link": "https://52pojie.cn",
                    "size": "11",
                    "icon": "/icons/pojie.svg",
                    "type": "link",
                    "backgroundColor": "#C90E3B"
                },
                {
                    "label": "爱奇艺",
                    "link": "http://iqiyi.com",
                    "size": "11",
                    "icon": "/icons/iqiyi.svg",
                    "type": "link",
                    "backgroundColor": "#00b739",
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "腾讯视频",
                    "link": "http://v.qq.com",
                    "size": "11",
                    "icon": "/icons/qqvideo.svg",
                    "type": "link",
                    "backgroundColor": "#ffffff",
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "抖音",
                    "link": "http://douyin.com",
                    "size": "11",
                    "icon": "/icons/douyin.svg",
                    "type": "link",
                    "backgroundColor": "#000",
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "哔哩哔哩",
                    "link": "http://bilibili.com",
                    "size": "11",
                    "icon": "/icons/bilibili.svg",
                    "type": "link",
                    "backgroundColor": "#1296db",
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "静态网站托管服务",
                    "link": "http://netlify.com",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/netlify.com.png",
                    "type": "link",
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "微博",
                    "link": "http://weibo.com",
                    "size": "11",
                    "icon": "/icons/weibo.svg",
                    "type": "link",
                    "backgroundColor": "#ffffff",
                    "chosen": false,
                    "selected": false
                }
            ],
            "value": 0
        },
        {
            "label": "设计灵感",
            "key": 1671380778000,
            "content": [
                {
                    "label": "阿里矢量图",
                    "link": "https://iconfont.cn",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/iconfont.cn.png",
                    "type": "link",
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "Sketch素材-Sketch图片素材免费下载-OurSketch",
                    "link": "https://oursketch.com/resource",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/oursketch.com.png",
                    "type": "link",
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "Antd",
                    "link": "https://ant-design.antgroup.com/index-cn",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/ant-design.antgroup.com.png",
                    "type": "link",
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "摹客 RP",
                    "link": "https://rp.mockplus.cn/",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/rp.mockplus.cn.png",
                    "type": "link",
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "Pexel",
                    "link": "https://www.pexels.com/zh-cn/",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/www.pexels.com.png",
                    "type": "link",
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "395 Circle-Pro Seal",
                    "link": "http://seal.biaozhiku.com/circle-pro/",
                    "size": "11",
                    "icon": "https://picnew13.photophoto.cn/20190423/houdezaiwuhongseyinzhang-32946389_1.jpg",
                    "type": "link",
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "app应用设计示例推荐",
                    "link": "https://screenlane.com/",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/screenlane.com.png",
                    "type": "link",
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "必应壁纸｜必应美图 - 超高质量的必应壁纸4K高清无水印下载",
                    "link": "http://www.todaybing.com",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/www.todaybing.com.png",
                    "type": "link",
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "图片工具",
                    "link": "https://imagestool.com/",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/imagestool.com.png",
                    "type": "link",
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "在线抠图",
                    "link": "https://www.remove.bg/zh",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/www.remove.bg.png",
                    "type": "link",
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "改图神器",
                    "link": "https://img.logosc.cn/",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/img.logosc.cn.png",
                    "type": "link",
                    "chosen": false,
                    "selected": false
                }
            ],
            "value": 1671380778000
        },
        {
            "label": "程序猿",
            "key": 1671384254000,
            "content": [
                {
                    "label": "Github",
                    "link": "https://github.com",
                    "size": "11",
                    "icon": "/icons/github.svg",
                    "type": "link",
                    "backgroundColor": "#ffffff"
                },
                {
                    "label": "CSDN",
                    "link": "https://csdn.net",
                    "size": "11",
                    "icon": "/icons/csdn.svg",
                    "type": "link",
                    "backgroundColor": "#FC5734"
                },
                {
                    "label": "Gitee - 基于 Git 的代码托管和研发协作平台",
                    "link": "http://gitee.com",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/gitee.com.png",
                    "type": "link"
                },
                {
                    "label": "Stack Overflow - Where Developers Learn, Share, & Build Careers",
                    "link": "https://stackoverflow.com/",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/stackoverflow.com.png",
                    "type": "link"
                },
                {
                    "label": "思否",
                    "link": "https://segmentfault.com/",
                    "size": "11",
                    "icon": "/icons/segmentfault.svg",
                    "type": "link",
                    "backgroundColor": "#019A61"
                },
                {
                    "label": "GitLab",
                    "link": "https://gitlab.com/",
                    "size": "11",
                    "icon": "/icons/gitlab.svg",
                    "type": "link",
                    "backgroundColor": "#ffffff"
                },
                {
                    "label": "掘金",
                    "link": "https://juejin.cn/",
                    "size": "11",
                    "icon": "/icons/juejin.svg",
                    "type": "link",
                    "backgroundColor": "#2080FF"
                },
                {
                    "label": "博客园 - 开发者的网上家园",
                    "link": "https://www.cnblogs.com/",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/www.cnblogs.com.png",
                    "type": "link"
                },
                {
                    "label": "WordPress",
                    "link": "https://cn.wordpress.org/",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/cn.wordpress.org.png",
                    "type": "link"
                },
                {
                    "label": "阿里云",
                    "link": "https://www.aliyun.com",
                    "size": "11",
                    "icon": "/icons/aliyun.svg",
                    "type": "link",
                    "backgroundColor": "#FF6A00"
                },
                {
                    "label": "开源中国",
                    "link": "https://www.oschina.net/",
                    "size": "11",
                    "icon": "/icons/oschina.svg",
                    "type": "link",
                    "backgroundColor": "#239B4B"
                }
            ],
            "value": 1671384254000
        },
        {
            "label": "法学僧",
            "key": 1671385421000,
            "content": [
                {
                    "label": "元典智库：法律搜索引擎",
                    "link": "https://chineselaw.com/",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/chineselaw.com.png",
                    "type": "link"
                },
                {
                    "label": "中国裁判文书网",
                    "link": "https://wenshu.court.gov.cn/",
                    "size": "11",
                    "icon": "/icons/chineseWenshu.png",
                    "type": "link",
                    "backgroundColor": "#ffffff"
                },
                {
                    "label": "中国司法案例网",
                    "link": "https://anli.court.gov.cn/",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/anli.court.gov.cn.png",
                    "type": "link"
                },
                {
                    "label": "北大法宝_爱法律 有未来",
                    "link": "https://www.pkulaw.com/",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/pkulaw.com.png",
                    "type": "link",
                    "backgroundColor": "#ffffff"
                },
                {
                    "label": "无讼案例",
                    "link": "https://www.itslaw.com/home",
                    "size": "11",
                    "icon": "/icons/wusonganli.png",
                    "type": "link",
                    "backgroundColor": "#2D82F7"
                },
                {
                    "label": "最高人民法院网",
                    "link": "https://www.court.gov.cn/",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/www.court.gov.cn.png",
                    "type": "link"
                },
                {
                    "label": "最高人民检察院网",
                    "link": "https://www.spp.gov.cn/",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/www.spp.gov.cn.png",
                    "type": "link"
                },
                {
                    "label": "中国法律服务网",
                    "link": "http://www.12348.gov.cn/",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/www.12348.gov.cn.png",
                    "type": "link"
                },
                {
                    "label": "中国执行信息公开网",
                    "link": "http://zxgk.court.gov.cn/",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/zxgk.court.gov.cn.png",
                    "type": "link",
                    "chosen": false
                }
            ],
            "value": 1671385421000
        }
    ],
    components: [
        {
            label: '便捷记事本',
            img: './images/note.png',
            type: 'note'
        }, {
            label: '时间进度条',
            img: './images/timeProgress.png',
            type: 'timeProgress'
        }, {
            label: 'Markdown编辑器',
            img: './images/markdownPre.svg',
            type: 'markdown'
        }, {
            label: '快捷翻译器',
            img: './images/translatePre.svg',
            type: 'translatelite'
        }
    ],
}

const LinkList = () => {
    const localData = JSON.parse(window.localStorage.getItem('funtabs'));//获取本地存储的数据
    const localActiveKey = JSON.parse(window.localStorage.getItem('activeKey'));//获取本地存储的数据
    const modelData = window.localStorage.getItem('model');//获取本地存储的模式
    //卡片当前激活的分类
    const [tabsActiveKey, setTabsActiveKey] = useState(
        () => {
            try {
                if (localActiveKey) {
                    return localActiveKey
                } else {
                    return funtabsData.tabsActiveKey
                }
            } catch (error) {
                return funtabsData.tabsActiveKey
            }
        })
    //卡片展示的列表
    const [linkList, setLinkList] = useState(
        () => {
            try {
                if (localData) {
                    return localData.newData.content.filter(item => item.key === tabsActiveKey)[0].content
                } else {
                    return funtabsData.content.filter(item => item.key === tabsActiveKey)[0].content
                }
            } catch (error) {
                return funtabsData.content.filter(item => item.key === tabsActiveKey)[0].content
            }
        })
    //当前激活的模式（简约或默认）
    const [model, setModel] = useState(
        () => {
            try {
                if (modelData) {
                    return modelData
                } else {
                    return funtabsData.model
                }
            } catch (error) {
                return funtabsData.model
            }
        });//简约和默认
    //定义卡片的宽度、高度、圆角、卡片样式、卡片间距大小
    const [widthNum, setWidthNum] = useState(
        () => {
            try {
                if (localData) {
                    return localData.newData.widthNum
                } else {
                    return funtabsData.widthNum
                }
            } catch (error) {
                return funtabsData.widthNum
            }
        });
    const [heightNum, setHeightNum] = useState(
        () => {
            try {
                if (localData) {
                    return localData.newData.heightNum
                } else {
                    return funtabsData.heightNum
                }
            } catch (error) {
                return funtabsData.heightNum
            }
        });
    const [radius, setRadius] = useState(
        () => {
            try {
                if (localData) {
                    return localData.newData.radius
                } else {
                    return funtabsData.radius
                }
            } catch (error) {
                return funtabsData.radius
            }
        })
    const [cardStyle, setCardStyle] = useState(
        () => {
            try {
                if (localData) {
                    return localData.newData.cardStyle
                } else {
                    return funtabsData.cardStyle
                }
            } catch (error) {
                return funtabsData.cardStyle
            }
        })
    const [gap, setGap] = useState(
        () => {
            try {
                if (localData) {
                    return localData.newData.gap
                } else {
                    return funtabsData.gap
                }
            } catch (error) {
                return funtabsData.gap
            }
        })
    //卡片分类列表
    const [tabsItems, setTabsItems] = useState(
        () => {
            try {
                if (localData) {
                    return localData.newData.content
                } else {
                    return funtabsData.content
                }
            } catch (error) {
                return funtabsData.content
            }
        })
    //其他文本
    const [edit, setEdit] = useState('none')
    const [drag, setDrag] = useState(true)
    const [editText, setEditText] = useState('编辑导航')
    const [color, setColor] = useState('')
    const [dropFilter, setDropFilter] = useState('')
    const [tabsVisibility, setTabsVisibility] = useState('')
    const backgroundImage = window.localStorage.getItem('backgroundImage')
    const [url, setUrl] = useState(() => {
        try {
            if (backgroundImage === 'null' || backgroundImage === 'undefined' || backgroundImage === null) {
                return funtabsData.backgroundImage
            } else {
                return `${backgroundImage}`
            }
        } catch (error) {
            return funtabsData.backgroundImage
        }
    })

    const [linkListAnimation, api] = useSpring(() => ({
        from: {
            y: 20,
            opacity: 0
        },
        to: {
            y: 0,
            opacity: 1
        }
    }))

    //网格布局样式信息
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, ${widthNum}px`,
        justifyContent: 'center',
        // alignItems: 'center',
        columnGap: gap + 'px',
        rowGap: gap + 'px',
        gridAutoFlow: 'dense',
        gridAutoRows: heightNum + 'px',
    }


    //判断标签页是否显示
    const tabsVis = () => {
        let a = tabsItems.length;
        if (a === 1) {
            setTabsVisibility('none')
        } else {
            setTabsVisibility('')
        }
    }

    useEffect(() => {
        const localData = JSON.parse(window.localStorage.getItem('funtabs'));//获取本地存储
        tabsVis()
        //当页面的分类key变化的时候显示对应的卡片列表
        setLinkList(
            () => {
                try {
                    if (localData) {
                        return localData.newData.content.filter(item => item.key === tabsActiveKey)[0].content
                    } else {
                        return funtabsData.content.filter(item => item.key === tabsActiveKey)[0].content
                    }
                } catch (error) {
                    return funtabsData.content.filter(item => item.key === tabsActiveKey)[0].content
                }
            }
        )
        // eslint-disable-next-line
    }, [tabsActiveKey])

    //编辑
    function editFunction() {
        if (edit === 'none') {
            setEdit('')
            setDrag(false)
            message.warning('您正处于编辑模式,可拖动排列卡片～')
            setColor('rgb(0 0 0 / 30%)')
            setDropFilter('blur(5px)')
            setEditText('退出编辑')
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
            setEdit('none')
            setDrag(true)
            setColor('')
            setDropFilter('')
            saveData()
            message.success('本地保存成功')
            setEditText('编辑导航')
            setSettingsAreaAnimation.start({
                from: {
                    y: 20,
                },
                to: {
                    y: 0,
                }
            })
        }
    }

    //保存数据到本地
    function saveData() {
        var newData;//本地存储数据是newData
        //如果本地数据存在，保存应针对当前本地存储的newData，否则数据应该是内置数据
        if (localData) {
            newData = localData.newData
        } else {
            newData = funtabsData
        }
        newData.content = tabsItems;
        newData.content.filter(item => item.key === tabsActiveKey)[0].content = linkList;
        newData.gap = gap
        newData.widthNum = widthNum
        newData.heightNum = heightNum
        newData.cardStyle = cardStyle
        newData.radius = radius
        //存储到本地
        window.localStorage.setItem('funtabs', JSON.stringify({ newData }))
    }

    function saveActiveKey(e) {
        window.localStorage.setItem('activeKey', e)
    }

    const howToShow = () => {
        if (cardStyle === 'defaultCard') {
            return (
                <ReactSortable
                    id="sortable"
                    key='sortable1'
                    list={linkList}
                    setList={
                        (e) => {
                            setLinkList(e)
                        }}
                    tag='div'
                    style={gridStyle}
                    disabled={drag}
                    animation={500}
                >
                    {linkList.map((item, index) => {
                        return (
                            < DefaultStyle
                                key={item.link + item.type + item.id}
                                id={index}
                                edit={edit}
                                item={item}
                                linkList={linkList}
                                setLinkList={setLinkList}
                                radius={radius}
                                widthNum={widthNum}
                                heightNum={heightNum}
                                tabsActiveKey={tabsActiveKey}
                                cardStyle={cardStyle}
                            />
                        )
                    })}
                </ReactSortable>
            )
        } else if (cardStyle === 'onlyIconCard') {
            return (
                <ReactSortable
                    id="sortable"
                    key='sortable2'
                    list={linkList}
                    setList={
                        (e) => {
                            setLinkList(e)
                        }}
                    tag='div'
                    style={gridStyle}
                    disabled={drag}
                    animation={500}
                >
                    {linkList.map((item, index) => {
                        return (
                            < OnlyIconStyle
                                key={item.link + item.type + item.id}
                                id={index}
                                edit={edit}
                                item={item}
                                linkList={linkList}
                                setLinkList={setLinkList}
                                radius={radius}
                                widthNum={widthNum}
                                heightNum={heightNum}
                                tabsActiveKey={tabsActiveKey}
                                cardStyle={cardStyle}
                            />
                        )
                    })}
                </ReactSortable>
            )
        } else if (cardStyle === 'phoneCard') {
            return (
                <ReactSortable
                    id="sortable"
                    key='sortable3'
                    list={linkList}
                    setList={
                        (e) => {
                            setLinkList(e)
                        }}
                    tag='div'
                    style={gridStyle}
                    disabled={drag}
                    animation={500}
                >
                    {linkList.map((item, index) => {
                        return (
                            < PhoneStyle
                                key={item.link + item.type + item.id}
                                id={index}
                                edit={edit}
                                item={item}
                                linkList={linkList}
                                setLinkList={setLinkList}
                                radius={radius}
                                widthNum={widthNum}
                                heightNum={heightNum}
                                tabsActiveKey={tabsActiveKey}
                                cardStyle={cardStyle}
                            />
                        )
                    })}
                </ReactSortable>
            )
        }
    }

    const [settingsAreaAnimation, setSettingsAreaAnimation] = useSpring(() => ({}))

    return (
        <>
            <Header
                model={model}
                editFunction={editFunction}
                editText={editText}
                drag={drag}
                setModel={setModel}
                url={url}
                setUrl={setUrl}
            />
            <animated.div className="gridArea" style={{ backgroundColor: color, backdropFilter: dropFilter, ...settingsAreaAnimation }}>
                <Settings
                    model={model}
                    widthNum={widthNum}
                    setWidthNum={setWidthNum}
                    heightNum={heightNum}
                    setHeightNum={setHeightNum}
                    linkList={linkList}
                    setLinkList={setLinkList}
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
                    tabsItems={tabsItems}
                    setTabsItems={setTabsItems}
                    setTabsVisibility={setTabsVisibility}
                    localData={localData}
                    url={url}
                    setUrl={setUrl}
                    api={api}
                />
                <div key='showList' style={{ width: '100%', display: model }}>
                    <Tabs
                        items={tabsItems}
                        activeKey={tabsActiveKey}
                        centered
                        tabBarStyle={{
                            color: '#fff',
                            fontWeight: 'bold',
                            marginTop: '-22px',
                            display: tabsVisibility,
                        }}
                        onChange={(e) => {
                            if (edit === '') {
                                setTabsActiveKey(e)
                                saveActiveKey(e)
                                saveData()
                            } else {
                                setTabsActiveKey(e)
                                saveActiveKey(e)
                            }
                            api.start({
                                from: {
                                    y: 20,
                                    opacity: 0
                                },
                                to: {
                                    y: 0,
                                    opacity: 1
                                }
                            })
                        }}
                    />
                    <animated.div style={linkListAnimation}>
                        {howToShow()}
                    </animated.div>
                </div>
            </animated.div>
        </>
    )
}

export { LinkList, funtabsData };
