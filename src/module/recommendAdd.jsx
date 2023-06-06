import { animated, useSpring } from '@react-spring/web';
import { Button, Space, Tabs } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { source, sourceClass } from './iconSource';
import './recommendAdd.css';

function RecommendAddItem(props) {
    const { item, saveLink } = props;
    const [ellipsis] = useState(true);
    const [animation] = useSpring(() => ({
        from: { y: 20, opacity: 0 },
        to: { y: 0, opacity: 1 }
    }));
    var iconUrl = item.icon.indexOf('http') === 0 ? item.icon : `/icons/${item.icon}`;
    var linkURL = `https://${item.link}`;

    const handleAddLink = useCallback(() => {
        saveLink(
            item.label,
            linkURL,
            iconUrl,
            item.color,
            'recommend'
        );
        // eslint-disable-next-line
    }, [saveLink, item]);

    const openLinkInNewTab = useCallback(() => {
        window.open(item.link.slice(0, 4) !== 'http' ? `https://${item.link}` : item.link);
    }, [item]);

    return (
        <animated.div style={animation} className="recommendAdd-div-style">
            <img
                src={iconUrl}
                alt="funtabs｜趣标签页，给你不一样的浏览器起始页"
                style={{
                    backgroundColor: item.color,
                    height: '42px',
                    width: 'auto',
                    margin: '10px',
                    borderRadius: '8px'
                }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Space>
                    <Paragraph
                        style={{ fontWeight: 'bold', margin: '0px 10px 0px 0px' }}
                        ellipsis={ellipsis ? { rows: 2, tooltip: { title: item.label, color: 'blue' } } : false}>
                        {item.label}
                    </Paragraph>
                </Space>
            </div>
            <div className="recommendAdd-div-mask">
                <Space>
                    <Button onClick={handleAddLink} shape="round" size="small" style={{ fontSize: '0.5rem' }}>
                        添加
                    </Button>
                    <Button onClick={openLinkInNewTab} shape="round" size="small" style={{ fontSize: '0.5rem' }}>
                        查看
                    </Button>
                </Space>
            </div>
        </animated.div>
    );
}

export default function RecommendAddList(props) {
    const [selectValue, setSelectValue] = useState('tuijian');
    const [sourceList, setSourceList] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setSourceList(source.filter(item => item.sourceClass === selectValue))
        }, 0);
        return () => setSourceList([]);
    }, [selectValue])

    const [, api] = useSpring(() => ({
        from: { y: 20, opacity: 0 },
        to: { y: 0, opacity: 1 }
    }));

    const handleSaveLink = useCallback((name, url, icon, color, type) => {
        if (typeof props.saveAddNewLink === 'function') {
            props.saveAddNewLink(name, url, icon, color, type);
        }
    }, [props]);

    const handleSelectValue = useCallback((value) => {
        api.start({
            from: {
                y: 20,
                opacity: 0
            },
            to: {
                y: 0,
                opacity: 1
            }
        });
        setSelectValue(value);
    }, [api]);

    const gridStyle = useMemo(() => ({
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(120px, 1fr))',
        gridTemplateRows: 'repeat(auto-fill,62px)',
        columnGap: '12px',
        rowGap: '12px',
        gridAutoFlow: 'dense',
        overflow: 'scroll',
        height: '258.5px'
    }), []);

    return (
        <div className="newtabs-style" style={{ height: '306px' }}>
            <Tabs
                defaultActiveKey={selectValue}
                tabPosition="top"
                type="card"
                tabBarGutter={8}
                items={sourceClass}
                onChange={handleSelectValue}
            />
            <div style={gridStyle}>
                {sourceList.map((item, index) => (
                    <RecommendAddItem
                        key={index} item={item}
                        saveLink={handleSaveLink}
                    />
                ))}
            </div>
        </div>
    );
}