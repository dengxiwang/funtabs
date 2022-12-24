import { message, Tabs } from "antd";
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
    // backgroundImage: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201712%2F08%2F20171208222600_wCn2r.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1673972567&t=d501a92834e18aa9d8e701ee8f2bafe6',
    backgroundImage: 'https://api.vvhan.com/api/bing',
    // backgroundImage: '/images/backgroundImg.JPG',
    content: [
        {
            "label": "常用",
            "key": 0,
            "content": [
                {
                    "label": "便捷记事本",
                    "type": "note",
                    "id": 1671810458244,
                    "chosen": false
                },
                {
                    "label": "时间进度条",
                    "type": "timeProgress",
                    "id": 1671810449901,
                    "chosen": false
                },
                {
                    "label": "Google",
                    "link": "http://google.com",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/google.com.png",
                    "type": "link",
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "F 搜",
                    "link": "http://fsoufsou.com",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/fsoufsou.com.png",
                    "type": "link",
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
                    "label": "百度统计——一站式智能数据分析与应用平台",
                    "link": "https://tongji.baidu.com/main/overview/10000487913/overview/index?siteId=18318141",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/tongji.baidu.com.png",
                    "type": "link",
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "吾爱破解",
                    "link": "http://52pojie.cn",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/52pojie.cn.png",
                    "type": "link",
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "爱奇艺-在线视频网站-海量正版高清视频在线观看",
                    "link": "http://iqiyi.com",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/iqiyi.com.png",
                    "type": "link",
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "腾讯视频",
                    "link": "http://v.qq.com",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/v.qq.com.png",
                    "type": "link",
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "抖音",
                    "link": "http://douyin.com",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/douyin.com.png",
                    "type": "link",
                    "chosen": false,
                    "selected": false
                },
                {
                    "label": "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili",
                    "link": "http://bilibili.com",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/bilibili.com.png",
                    "type": "link",
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
                }
            ]
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
                    "type": "link"
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
                    "type": "link"
                },
                {
                    "label": "在线抠图",
                    "link": "https://www.remove.bg/zh",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/www.remove.bg.png",
                    "type": "link"
                },
                {
                    "label": "改图神器",
                    "link": "https://img.logosc.cn/",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/img.logosc.cn.png",
                    "type": "link"
                }
            ]
        },
        {
            "label": "程序猿",
            "key": 1671384254000,
            "content": [
                {
                    "label": "GitHub: Let’s build from here · GitHub",
                    "link": "http://github.com",
                    "size": "11",
                    "icon": "https://github.githubassets.com/pinned-octocat.svg",
                    "type": "link"
                },
                {
                    "label": "CSDN",
                    "link": "https://www.csdn.com",
                    "size": "11",
                    "icon": "https://static.yingyonghui.com/icon/128/6967165.png",
                    "type": "link"
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
                    "label": "SegmentFault 思否",
                    "link": "https://segmentfault.com/",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/segmentfault.com.png",
                    "type": "link"
                },
                {
                    "label": "Gitlab",
                    "link": "https://gitlab.com/",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/gitlab.com.png",
                    "type": "link"
                },
                {
                    "label": "稀土掘金",
                    "link": "https://juejin.cn/",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/juejin.cn.png",
                    "type": "link"
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
                    "icon": "https://api.iowen.cn/favicon/www.aliyun.com.png",
                    "type": "link"
                },
                {
                    "label": "OSCHINA - 中文开源技术交流社区",
                    "link": "https://www.oschina.net/",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/www.oschina.net.png",
                    "type": "link"
                }
            ]
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
                    "icon": "https://api.iowen.cn/favicon/wenshu.court.gov.cn.png",
                    "type": "link"
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
                    "icon": "https://api.iowen.cn/favicon/www.pkulaw.com.png",
                    "type": "link"
                },
                {
                    "label": "无讼案例",
                    "link": "https://www.itslaw.com/home",
                    "size": "11",
                    "icon": "https://api.iowen.cn/favicon/www.itslaw.com.png",
                    "type": "link"
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
            ]
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
    const [tabsVisibility, setTabsVisibility] = useState('')

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
                        }}
                    />
                    {howToShow()}
                </div>
            </div>
        </>
    )
}

export { LinkList, funtabsData };
