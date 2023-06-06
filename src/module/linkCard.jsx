import { Image, Tooltip } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { useEffect, useState } from 'react';
import cursorControl from '../common/cursorControl';
import '../common/funtabs.css';
import { hexToRgb } from '../common/hexToRgb';
import showBoxShadow from '../common/showBoxShadow';
import DeleteCard from "./deleteCard";
import EditCard from './editCard';
import ShowLabel from './showLabel';

const calculateShowSize = (item, heightNum) => {
    if (item.size === 11 || item.size === 12 || item.size === 21 || item.size === '11' || item.size === '12' || item.size === '21') {
        return `calc(${heightNum}px - 20px )`;
    } else if (item.size === 22 || item.size === '22') {
        return `calc( 2 * ${heightNum}px - 20px )`;
    }
};

const getBackgroundColor = (item) => {
    return item.backgroundColor || '#ffffff';
};

const LinkCard = (props) => {
    const {
        id,
        edit,
        item,
        linkList,
        num,
        setLinkList,
        radius,
        heightNum,
        cardStyle,
        linkOpen,
        click,
        setDisabled,
        fontColor
    } = props;

    const ellipsis = true;
    const [backgroundColor, setBackgroundColor] = useState(getBackgroundColor(item));
    const [showSize, setShowSize] = useState(calculateShowSize(item, heightNum));

    useEffect(() => {
        setShowSize(calculateShowSize(item, heightNum));
        // eslint-disable-next-line
    }, [item.size, heightNum]);

    const imgStyle = {
        width: showSize,
        height: showSize,
        margin: '0px 10px 0px 0px',
        zIndex: 1,
    }

    const imgStyle2 = {
        width: showSize,
        height: showSize,
        margin: '0px 0px 0px 0px',
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
                        num={num}
                        setLinkList={setLinkList}
                        cardStyle={cardStyle}
                    />
                    <EditCard
                        id={id}
                        num={num}
                        linkList={linkList}
                        setLinkList={setLinkList}
                        setBackgroundColor={setBackgroundColor}
                        setDisabled={setDisabled}
                        cardStyle={cardStyle}
                    />
                </>
            )
        }
    }

    const shadowStyle = {
        boxShadow: showBoxShadow(),
    }

    function howToShow() {
        if (cardStyle === 'defaultCard') {
            return (
                <>
                    <div
                        onClick={() => {
                            if (edit === '' || click === 1) {
                                return
                            } else {
                                window.open(`${item.link}`, linkOpen)
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
                            alignItems: 'center',
                            cursor: cursorControl(edit),
                            ...shadowStyle
                        }}
                        rel="noreferrer">
                        <Image
                            style={imgStyle}
                            src={item.icon}
                            preview={false}
                            fallback='icon_error.svg' />
                        <div style={{ display: 'flex', marginBottom: '-14px', alignItems: 'center' }}>
                            <Paragraph
                                style={{ fontWeight: 'bold', color: hexToRgb(backgroundColor), zIndex: 1 }}
                                ellipsis={
                                    ellipsis
                                        ? {
                                            rows: 2,
                                            tooltip: edit === 'none' ? {
                                                title: item.label,
                                                color: 'blue'
                                            } : false
                                        } : false
                                }
                            >
                                {item.label}
                            </Paragraph>
                        </div>
                        <img
                            src={item.icon}
                            alt=''
                            style={{
                                position: 'absolute',
                                height: '100%',
                                top: '0px',
                                right: '-10px',
                                opacity: 0.1,
                                transform: 'rotate(-30deg)',
                            }}>
                        </img>
                    </div>
                </>
            )
        } else if (cardStyle === 'onlyIconCard') {
            return (
                <>
                    <div
                        onClick={() => {
                            if (edit === '' || click === 1) {
                                return
                            } else {
                                window.open(`${item.link}`, linkOpen)
                            }
                        }}
                        className={`grid-item${item.size}`}
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
                            cursor: cursorControl(edit),
                            ...shadowStyle
                        }}
                        rel="noreferrer">
                        <Tooltip title={
                            edit === 'none' ? item.label : ''
                        } color='blue' >
                            <Image
                                style={imgStyle2}
                                src={item.icon}
                                preview={false}
                                fallback='icon_error.svg' />
                        </Tooltip>
                    </div>
                </>
            )
        } else if (cardStyle === 'phoneCard') {
            return (
                <div
                    onDragStart={(e) => {
                        return e.preventDefault()
                    }}
                    style={{
                        display: 'flex',
                        height: `calc(100% - 22px)`,
                        width: '100%',
                        justifyContent: 'center'
                    }}>
                    <div
                        onClick={() => {
                            if (edit === '' || click === 1) {
                                return
                            } else {
                                window.open(`${item.link}`, linkOpen)
                            }
                        }}
                        rel="noreferrer"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                            borderRadius: `${radius}px`,
                            backgroundColor: backgroundColor,
                            width: `calc(100% - 22px)`,
                            height: `calc(100%)`,
                            cursor: cursorControl(edit),
                            ...shadowStyle
                        }}>
                        <Image
                            style={{
                                width: showSize,
                                height: showSize,
                            }}
                            src={item.icon}
                            preview={false}
                            fallback='icon_error.svg' />
                    </div>
                </div>
            )
        } else if (cardStyle === 'onlyText') {
            return (
                <div
                    onDragStart={(e) => {
                        return e.preventDefault()
                    }}
                    style={{
                        display: 'flex',
                        height: `calc(100%)`,
                        width: '100%',
                        justifyContent: 'center'
                    }}>
                    <div
                        onClick={() => {
                            if (edit === '' || click === 1) {
                                return
                            } else {
                                window.open(`${item.link}`, linkOpen)
                            }
                        }}
                        rel="noreferrer"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                            width: `calc(100%)`,
                            height: `calc(100%)`,
                            cursor: cursorControl(edit),
                            ...shadowStyle
                        }}>
                        <Paragraph
                            className='onlyTextStyle'
                            ellipsis={
                                ellipsis
                                    ? {
                                        rows: 1,
                                    }
                                    : false
                            }
                            style={{
                                fontWeight: 'bold',
                                color: fontColor,
                                marginBottom: '0px',
                            }}
                        >
                            {item.label}
                        </Paragraph>
                    </div>
                </div>
            )
        }
    }

    return (
        <>
            {showSettings()}
            {howToShow()}
            <ShowLabel
                cardStyle={cardStyle}
                item={item}
                edit={edit}
            />
        </>
    )
}

export default LinkCard;