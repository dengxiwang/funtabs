import { DownOutlined, HistoryOutlined, SearchOutlined } from "@ant-design/icons";
import { Dropdown, Input, Space, message } from "antd";
import fetchJsonp from 'fetch-jsonp';
import React, { useEffect, useState } from 'react';
import './funtabs.css';

const SearchTools = () => {

    const [searchEngine, setSearchEngine] = useState(
        () => {
            if (window.localStorage.getItem('searchEngine')) {
                return window.localStorage.getItem('searchEngine')
            } else {
                return '0'
            }
        }
    )//定义所选搜索引擎的key值
    const [searchContent, setSearchContent] = useState('')//定义搜索的内容
    const [searchSuggestion, setSearchSuggestion] = useState([])
    const [trigger] = useState('hover')
    const [showDropdown, setShowDropdown] = useState('')
    const [searchHistory] = useState([])
    const [searchOption, setSearchOption] = useState(0)

    //定义搜索下拉菜单中的图标的样式
    const imgStyle2 = {
        width: '16px',
        height: '16px',
        marginTop: '5px',
        marginBottom: '5px'
    }

    //搜索引擎下拉菜单
    const items = [
        {
            label: '百度',
            key: "0",
            link: 'https://www.baidu.com/s?wd=',
            icon: <img src='/icons/baidu2.svg' style={imgStyle2} alt='' />,
        },
        {
            label: '谷歌',
            key: "1",
            link: 'https://www.google.com/search?q=',
            icon: <img src='/icons/google2.svg' style={imgStyle2} alt='' />,
        },
        {
            label: '必应',
            key: "2",
            link: 'https://cn.bing.com/search?q=',
            icon: <img src='/icons/bing2.svg' style={imgStyle2} alt='' />
        },
        {
            label: 'fsou',
            key: "3",
            link: 'https://fsoufsou.com/search?q=',
            icon: <img src='/icons/fsou2.svg' style={imgStyle2} alt='' />
        },
    ]

    //组件生命周期
    useEffect(() => {
        // eslint-disable-next-line
    }, [])

    //定义搜索选项组件
    const SearchOptions = () => {

        //当菜单被点击时，将搜索引擎切换为对应的key值
        const onClick = ({ key }) => {
            setSearchEngine(key)
            window.localStorage.setItem('searchEngine', key)
        };

        //组件渲染
        return (
            <>
                <Dropdown
                    menu={{ items, onClick }}
                    placement='bottom'
                >
                    <Space
                        className="search-engine-space"
                    >
                        {items.map((item, index) => {
                            if (item.key === searchEngine) {
                                return (
                                    <div key={index}>
                                        {item.icon}
                                    </div>
                                )
                            }
                            return null
                        })}
                        <DownOutlined />
                    </Space>
                </Dropdown>
            </>
        )
    }

    const SearchOk = () => {
        return (
            <>
                <SearchOutlined
                    className="searchButton"
                    style={{
                        margin: '0px 0px 0px -45px',
                        zIndex: '1',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                    onClick={handleSearch} />
            </>
        )
    }

    function deleteHistory(data) {
        searchHistory.some((item, i) => {
            if (item.label === data) {
                searchHistory.splice(i, 1)
            }
            return null
        })
    }

    function history(data) {
        const data2 = data.replace(/(^\s*)|(\s*$)/g, "")
        if (data2.length !== 0) {
            deleteHistory(data2)
            if (searchHistory.length < 10) {
                searchHistory.unshift({
                    label: data2,
                    icon: <HistoryOutlined style={{ scale: '1.2' }} />,
                })
            } else {
                searchHistory.pop()
                searchHistory.unshift({
                    label: data2,
                    icon: <HistoryOutlined style={{ scale: '1.2' }} />,
                })
            }
        }
    }

    //当点击搜索时候的操作方法
    function handleSearch(data) {
        if (data === 0) {
            if (searchContent === '') {
                message.error('什么都不输就想离开我？没门！')
            } else {
                history(searchContent)
                window.open(items[searchEngine].link + searchContent, '_blank')//在新页面打开搜索内容
            }
        }
    }

    //获取搜索的输入框内容
    function getSearchContent(e) {
        let content = e.target.value
        setSearchContent(content)
        if (content.length !== 0) {
            var api = 'https://suggestion.baidu.com/su?wd=' + content + '&p=3&cb=window.bdsug.sug';
            fetchJsonp(api, { jsonpCallback: 'cb' })
                .then((response) => {
                    return response.json()
                }).then((data) => {
                    let result = data.s
                    let arr = [];
                    for (let i = 0; i < result.length; i++) {
                        let m = { 'key': i, label: result[i] }
                        arr.push(m)
                    }
                    if (arr.length !== 0) {
                        setSearchSuggestion(arr)
                        setShowDropdown('')
                    } else {
                        setShowDropdown('none')
                    }
                    //用到this需要注意指向，箭头函数
                }).catch(function (ex) {
                    console.log(ex)
                })
        } else {
            if (searchHistory.length !== 0) {
                setSearchSuggestion(searchHistory)
            } else {
                setShowDropdown('none')
            }
        }
    }

    const clickSuggestion = (key) => {
        const str = key.key;
        const num = str.charAt(str.length - 1)
        setSearchContent(searchSuggestion[num].label)
        window.open(items[searchEngine].link + searchSuggestion[num].label, '_blank')//在新页面打开搜索内容
        history(searchSuggestion[num].label)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', zIndex: 1, marginBottom: '24px' }} >
            <div className="search-input-style">
                <SearchOptions />
                <Dropdown
                    menu={{
                        items: searchSuggestion,
                        onClick: clickSuggestion,
                    }}
                    placement='bottom'
                    overlayStyle={{
                        height: 0,
                        display: showDropdown
                    }}
                    trigger={trigger}
                >
                    <Input
                        placeholder=""
                        size='large'
                        style={{ borderRadius: '50px', padding: '0px 60px 0px 84px' }}
                        onChange={getSearchContent}
                        onPressEnter={() => handleSearch(searchOption)}
                        onCompositionStart={() => {
                            setSearchOption(1)
                        }}
                        onCompositionEnd={() => {
                            setSearchOption(0)
                        }}
                        autoFocus
                        value={searchContent}
                        onMouseEnter={getSearchContent}
                    />
                </Dropdown>
                <SearchOk />
            </div>
        </div>
    )
}

export default SearchTools;