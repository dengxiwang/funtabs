import { message, Tabs } from "antd";
import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import DefaultStyle from "./defaultStyle";
import './funtabs.css';
import Header from "./header";
import OnlyIconStyle from "./onlyIconStyle";
import Settings from "./settings";

const funtabsData = {
    model: "",
    widthNum: 160,
    heightNum: 64,
    radius: 6,
    gap: 18,
    cardStyle: "defaultCard",
    tabsActiveKey: 0,
    // backgroundImage: 'https://static.hetaousercontent.com/static/assets/feed/bgp/3b767f40cc228af43dd5805a7cb6f92d.webp',
    // backgroundImage: 'https://api.vvhan.com/api/bing',
    backgroundImage: '/images/backgroundImg.JPG',
    content: [
        {
            label: '默认',
            key: 0,
            content: [
                {
                    id: 0,
                    label: '便捷记事本',
                    type: "note",
                }, {
                    label: "在线文档转换工具",
                    link: "http://217fun.com",
                    size: 11,
                    icon: "./images/shortCut_logo.png",
                    type: "link",
                }, {
                    label: "F搜-干净清爽",
                    link: "http://fsoufsou.com",
                    size: 11,
                    icon: "https://api.iowen.cn/favicon/fsoufsou.com.png",
                    type: "link",
                }, {
                    label: "抖音",
                    link: "http://douyin.com",
                    size: 11,
                    icon: "http://static.yingyonghui.com/icon/128/6996991.png",
                    type: "link",
                }, {
                    label: "今日头条",
                    link: "http://toutiao.com",
                    size: 11,
                    icon: "https://api.iowen.cn/favicon/toutiao.com.png",
                    type: "link",
                }, {
                    label: "微博",
                    link: "https://weibo.com",
                    size: 11,
                    icon: "http://static.yingyonghui.com/icon/128/6996542.png",
                    type: "link",
                }, {
                    label: "iconfont-阿里巴巴矢量图标库",
                    link: "https://iconfont.cn",
                    size: 11,
                    icon: "https://api.iowen.cn/favicon/iconfont.cn.png",
                    type: "link",
                }, {
                    label: "CSDN",
                    link: "https://www.csdn.net",
                    size: 11,
                    icon: "http://static.yingyonghui.com/icon/128/6967165.png",
                    type: "link",
                }, {
                    label: "爱奇艺-在线视频网站-海量正版高清视频在线观看",
                    link: "https://www.iqiyi.com",
                    size: 11,
                    icon: "http://static.yingyonghui.com/icon/128/6996505.png",
                    type: "link",
                }, {
                    label: "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili",
                    link: "https://www.bilibili.com",
                    size: 11,
                    icon: "http://static.yingyonghui.com/icon/128/6997091.png",
                    type: "link",
                }, {
                    label: "知乎",
                    link: "https://zhihu.com",
                    size: 11,
                    icon: "	http://static.yingyonghui.com/icon/128/6997008.png",
                    type: "link",
                }, {
                    label: "iLovePDF | 为PDF爱好者提供的PDF文件在线处理工具",
                    link: "https://www.ilovepdf.com/zh-cn",
                    size: 11,
                    icon: "https://api.iowen.cn/favicon/www.ilovepdf.com.png",
                    type: "link",
                }, {
                    label: "GitHub: Let’s build from here · GitHub",
                    link: "https://github.com",
                    size: 11,
                    icon: "https://github.githubassets.com/pinned-octocat.svg",
                    type: "link",
                }, {
                    label: "Gitee - 基于 Git 的代码托管和研发协作平台",
                    link: "https://gitee.com/",
                    size: 11,
                    icon: "https://api.iowen.cn/favicon/gitee.com.png",
                    type: "link",
                }, {
                    label: "斗鱼直播",
                    link: "https://www.douyu.com/",
                    size: 11,
                    icon: "https://lh1.hetaousercontent.com/img/342d6389cbcb53a3.png?thumbnail=true",
                    type: "link",
                }, {
                    label: "网易云音乐",
                    link: "https://music.163.com/?from=funtabs",
                    size: 11,
                    icon: "https://api.iowen.cn/favicon/music.163.com.png",
                    type: "link",
                }, {
                    label: "火山翻译",
                    link: "https://translate.volcengine.com/translate",
                    size: 11,
                    icon: "https://api.iowen.cn/favicon/translate.volcengine.com.png",
                    type: "link",
                }, {
                    label: "开发者搜索-Beta-让技术搜索更简单高效",
                    link: "https://kaifa.baidu.com/",
                    size: 11,
                    icon: "https://kaifa.baidu.com/assets/favicon.ico",
                    type: "link",
                }, {
                    label: "少数派 - 高效工作，品质生活",
                    link: "https://sspai.com/?utm_source=217fun.com",
                    size: 11,
                    icon: "http://static.yingyonghui.com/icon/128/6724798.png",
                    type: "link",
                }, {
                    label: "微信读书",
                    link: "https://weread.qq.com/",
                    size: 11,
                    icon: "	http://static.yingyonghui.com/icon/128/6994613.png",
                    type: "link",
                }, {
                    label: "魔戒影院",
                    link: "https://www.mojievip.com/",
                    size: 11,
                    icon: "https://www.mojievip.com/favicon.ico",
                    type: "link",
                }
            ]
        }, {
            key: 1,
            label: '法律',
            content: [
                {
                    label: "元典智库",
                    link: "https://chineselaw.com/",
                    size: 11,
                    icon: "https://api.iowen.cn/favicon/chineselaw.com.png",
                    type: "link",
                },
                {
                    label: "中国裁判文书网",
                    link: "https://wenshu.court.gov.cn/",
                    size: 11,
                    icon: "https://api.iowen.cn/favicon/www.hshfy.sh.cn.png",
                    type: "link",
                },
                {
                    label: "中国司法案例网",
                    link: "https://anli.court.gov.cn/",
                    size: 11,
                    icon: "https://anli.court.gov.cn/favicon.ico",
                    type: "link",
                },
                {
                    label: "北大法宝",
                    link: "https://www.pkulaw.com/",
                    size: 11,
                    icon: "https://www.pkulaw.com/favicon.ico",
                    type: "link",
                },
                {
                    label: "无讼案例",
                    link: "https://www.itslaw.com/home",
                    size: 11,
                    icon: "https://www.itslaw.com/favicon.ico",
                    type: "link",
                },
                {
                    label: "最高人民法院网",
                    link: "https://www.court.gov.cn/",
                    size: 11,
                    icon: "https://www.court.gov.cn/favicon.ico",
                    type: "link",
                },
                {
                    label: "最高人民检察院网",
                    link: "https://www.spp.gov.cn/",
                    size: 11,
                    icon: "https://www.spp.gov.cn/favicon.ico",
                    type: "link",
                },
                {
                    label: "中国法律服务网",
                    link: "http://www.12348.gov.cn/",
                    size: 11,
                    icon: "https://api.iowen.cn/favicon/www.12348.gov.cn.png",
                    type: "link",
                },
                {
                    label: "中国执行信息公开网",
                    link: "http://zxgk.court.gov.cn/",
                    size: 11,
                    icon: "https://api.iowen.cn/favicon/zxgk.court.gov.cn.png",
                    type: "link",
                }
            ]
        }
    ],
    components: [
        {
            label: '便捷记事本',
            img: './images/note.png',
            type: 'note'
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
    const [editText] = useState('编辑导航')
    const [color, setColor] = useState('')
    const [dropFilter, setDropFilter] = useState('')
    const [tabsVisibility, setTabsVisibility] = useState('none')

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
        const websiteLink = window.location.href.split('/')[2]
        if (websiteLink === 'daohang.217fun.com') {
        } else if (websiteLink === 'localhost:3000') {
        } else if (websiteLink === '192.168.31.208:3000') {
        } else if (websiteLink === '192.168.2.208:3000') {
        } else if (websiteLink.length !== 32) {
            window.location.href = 'https://daohang.217fun.com'
        }
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
        } else {
            setEdit('none')
            setDrag(true)
            setColor('')
            setDropFilter('')
            saveData()
            message.success('保存成功')
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
                                heightNum={heightNum}
                                tabsActiveKey={tabsActiveKey}
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
                                heightNum={heightNum}
                                tabsActiveKey={tabsActiveKey}
                            />
                        )
                    })}
                </ReactSortable>
            )
        }
    }

    return (
        <>
            <Header
                model={model}
                editFunction={editFunction}
                editText={editText}
                drag={drag}
                setModel={setModel}
            />
            <div className="gridArea" style={{ backgroundColor: color, backdropFilter: dropFilter }}>
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
                />
                <div key='showList' style={{ width: '100%', display: model }}>
                    <Tabs
                        items={tabsItems}
                        defaultActiveKey={tabsActiveKey}
                        centered
                        style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            marginTop: '-24px',
                            display: tabsVisibility
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
                        }}
                    />
                    {howToShow()}
                </div>
            </div>
        </>
    )
}

export { LinkList, funtabsData };
