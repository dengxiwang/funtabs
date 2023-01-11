import { animated, useSpring } from '@react-spring/web';
import { Button, Space, Tabs } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import React, { useState } from 'react';
import { source, sourceClass } from './iconSource';
import './recommendAdd.css';

export default function RecommendAddList(props) {
    const { saveAddNewLink } = props;
    const [selectValue, setSelectValue] = useState('tuijian')
    const [ellipsis] = useState('ture');

    const [gridAnimation, api] = useSpring(() => ({
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
        gridTemplateColumns: 'repeat(auto-fill,minmax(120px, 1fr))',
        gridTemplateRows: 'repeat(auto-fill,62px)',
        columnGap: '12px',
        rowGap: '12px',
        gridAutoFlow: 'dense',
        height: 'calc(306px - 47.5px)',
        overflowX: 'scroll',
    }

    return (
        <div>
            <div className='newtabs-style' style={{ height: '306px', }}>
                <Tabs
                    defaultActiveKey={selectValue}
                    tabPosition='top'
                    type='card'
                    tabBarGutter={8}
                    items={sourceClass}
                    onChange={
                        (e) => {
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
                            setSelectValue(e)
                        }
                    }
                />
                <div style={gridStyle}>
                    {source.map((item, index) => {
                        if (item.sourceClass === selectValue) {
                            var icon;
                            if (item.icon.slice(0, 4) === 'http') {
                                icon = item.icon
                            } else {
                                icon = `/icons/${item.icon}`
                            }
                            return (
                                <animated.div
                                    key={index}
                                    style={gridAnimation}
                                    className='recommendAdd-div-style'
                                >
                                    <img
                                        alt='funtabs｜趣标签页，给你不一样的浏览器起始页'
                                        src={icon}
                                        style={{
                                            backgroundColor: item.color,
                                            height: 'calc(100% - 20px)',
                                            width: 'auto',
                                            margin: '10px',
                                            borderRadius: '8px',
                                        }} />
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center'
                                        }}>
                                        <Space>
                                            <Paragraph
                                                style={{ fontWeight: 'bold', margin: '0px 10px 0px 0px' }}
                                                ellipsis={
                                                    ellipsis
                                                        ? {
                                                            rows: 2,
                                                            tooltip: { title: item.label, color: 'blue' }
                                                        } : false
                                                }
                                            >
                                                {item.label}
                                            </Paragraph>
                                        </Space>
                                    </div>
                                    <div
                                        className='recommendAdd-div-mask'>
                                        <Space>
                                            <Button
                                                onClick={() => saveAddNewLink(item.label, `https://${item.link}`, icon, item.color, 'recommend')}
                                                shape="round"
                                                size='small'
                                                style={{ fontSize: '0.5rem' }}>
                                                添加
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    if (item.link.slice(0, 4) !== 'http') {
                                                        window.open(`https://${item.link}`)
                                                    } else {
                                                        window.open(item.link)
                                                    }
                                                }}
                                                shape="round"
                                                size='small'
                                                style={{ fontSize: '0.5rem' }}>
                                                查看
                                            </Button>
                                        </Space>
                                    </div>
                                </animated.div>
                            )
                        } else {
                            return null
                        }
                    })}
                </div>
            </div>
        </div>
    )
}
