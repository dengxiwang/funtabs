import { Tooltip } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { useState } from 'react';
import DeleteCard from "./deleteCard";
import EditCard from './editCard';
import './funtabs.css';
import { hexToRgb } from './hexToRgb';

const LinkCard = (props) => {
    const { id, edit, item, linkList, setLinkList, radius, heightNum, cardStyle } = props;
    const [ellipsis] = useState('ture');
    const [backgroundColor, setBackgroundColor] = useState(
        () => {
            if (item.backgroundColor) {
                return item.backgroundColor
            } else {
                return '#ffffff'
            }
        }
    );

    const imgStyle = {
        width: `calc(${heightNum}px - 20px)`,
        height: `calc(${heightNum}px - 20px)`,
        margin: '0px 10px 0px 0px',
        WebkitUserDrag: 'none',
        zIndex: 1
    }

    const imgStyle2 = {
        width: `calc(${heightNum}px - 20px)`,
        height: `calc(${heightNum}px - 20px)`,
        margin: '0px 0px 0px 0px',
        WebkitUserDrag: 'none',
        zIndex: 1
    }

    const showSettings = () => {
        if (edit === '') {
            return (
                <>
                    <DeleteCard
                        linkList={linkList}
                        id={id}
                        item={item}
                        setLinkList={setLinkList}
                    />
                    <EditCard
                        id={id}
                        linkList={linkList}
                        setLinkList={setLinkList}
                        setBackgroundColor={setBackgroundColor}
                    />
                </>
            )
        }
    }

    const howToShow = () => {
        if (cardStyle === 'defaultCard') {
            return (
                <>
                    <a
                        href={item.link}
                        target='_blank'
                        onClick={(e) => {
                            if (edit === '') {
                                return e.preventDefault()
                            }
                        }}
                        style={{
                            display: 'flex',
                            padding: '10px',
                            borderRadius: `${radius}px`,
                            position: 'relative',
                            overflow: 'hidden',
                            width: 'calc(100% - 20px)',
                            height: 'calc(100% - 20px)',
                            background: backgroundColor,
                        }}
                        rel="noreferrer">
                        <img style={imgStyle} src={item.icon} alt='fun网址导航｜方格桌面，小众但好用的导航网站'></img>
                        <div style={{ display: 'flex', marginBottom: '-14px', alignItems: 'center' }}>
                            <Paragraph
                                style={{ fontWeight: 'bold', color: hexToRgb(backgroundColor) }}
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
                        </div>
                        <img
                            src={item.icon}
                            alt='fun网址导航｜方格桌面，小众但好用的导航网站'
                            style={{
                                position: 'absolute',
                                height: '100%',
                                top: '0px',
                                right: '-10px',
                                opacity: 0.1,
                                transform: 'rotate(-30deg)',
                                WebkitUserDrag: 'none'
                            }}>
                        </img>
                    </a>
                </>
            )
        } else if (cardStyle === 'onlyIconCard') {
            return (
                <>
                    <a
                        className={`grid-item${item.size}`}
                        href={item.link}
                        onClick={(e) => {
                            if (edit === '') {
                                return e.preventDefault()
                            }
                        }}
                        target='_blank'
                        style={{
                            borderRadius: `${radius}px`,
                            padding: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            width: 'calc(100% - 20px)',
                            height: 'calc(100% - 20px)',
                            background: backgroundColor,
                        }}
                        rel="noreferrer">
                        <Tooltip title={item.label} color='blue'>
                            <img style={imgStyle2} src={item.icon} alt='fun网址导航｜方格桌面，小众但好用的导航网站'></img>
                        </Tooltip>
                    </a>
                </>
            )
        } else if (cardStyle === 'phoneCard') {
            return (
                <div
                    style={{
                        display: 'flex',
                        height: `calc(${heightNum}px - 22px)`,
                        width: '100%',
                        justifyContent: 'center'
                    }}>
                    <a
                        href={item.link}
                        onClick={(e) => {
                            if (edit === '') {
                                return e.preventDefault()
                            }
                        }}
                        target='_blank'
                        rel="noreferrer"
                        style={{
                            overflow: 'hidden',
                            borderRadius: `${radius}px`,
                            backgroundColor: backgroundColor,
                            width: `calc(${heightNum}px - 22px)`,
                            height: `calc(${heightNum}px - 22px)`,
                        }}>
                        <img
                            src={item.icon}
                            alt='fun网址导航｜方格桌面，小众但好用的导航网站'
                            style={{
                                width: `100%`,
                                height: `100%`,
                                WebkitUserDrag: 'none'
                            }}
                        ></img>
                    </a>
                </div>
            )
        }
    }

    const showLabel = () => {
        if (cardStyle === 'phoneCard') {
            return (
                <Paragraph
                    style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '0px', textAlign: 'center', color: '#fff', mixBlendMode: 'difference' }}
                    ellipsis={
                        ellipsis
                            ? {
                                rows: 1,
                                tooltip: { title: item.label, color: 'blue' }
                            } : false
                    }
                >
                    {item.label}
                </Paragraph>
            )
        }
    }

    return (
        <>
            {showSettings()}
            {howToShow()}
            {showLabel()}
        </>
    )
}

export default LinkCard;