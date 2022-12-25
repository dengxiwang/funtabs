import { CloseCircleTwoTone } from '@ant-design/icons';
import { message } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { useState } from 'react';
import EditCard from './editCard';
import './funtabs.css';
import { hexToRgb } from './hexToRgb';
import Note from './note';
import { default as TimeProgress } from './timeProgress';

const DefaultStyle = (props) => {
    const { id, edit, item, linkList, setLinkList, radius, widthNum, heightNum, } = props;
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
    const ListData = [...linkList]

    const imgStyle = {
        width: `calc(${heightNum}px - 20px)`,
        height: `calc(${heightNum}px - 20px)`,
        margin: '0px 10px 0px 0px',
        WebkitUserDrag: 'none',
    }

    function deleteCard() {
        ListData.splice(id, 1)
        setLinkList(ListData)
        message.success(`【 ${item.label} 】卡片删除成功`)
        //删除卡片的同时清除相应的本地缓存
        if (item.id) {
            window.localStorage.removeItem('note' + item.id)
            window.localStorage.removeItem('beginTime' + item.id)
            window.localStorage.removeItem('endTime' + item.id)
            window.localStorage.removeItem('timeText' + item.id)
            window.localStorage.removeItem('timeType' + item.id)
        }
    }

    const howToShow = () => {
        if (edit === 'none') {
            if (item.type === 'link') {
                return (
                    <a
                        className={`grid-item${item.size}`}
                        href={item.link}
                        target='_blank'
                        style={{
                            display: 'flex',
                            padding: '10px',
                            borderRadius: `${radius}px`,
                            position: 'relative',
                            overflow: 'hidden',
                            width: 'calc(100% - 20px)',
                            height: 'calc(100% - 20px)',
                            background: backgroundColor
                        }}
                        rel="noreferrer">
                        <img style={imgStyle} src={item.icon} alt=''></img>
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
                            alt=''
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
                )
            } else if (item.type === 'note') {
                return (
                    <div className={`grid-item23`}>
                        <Note
                            heightNum={heightNum}
                            id={item.id} />
                    </div>
                )
            } else if (item.type === 'timeProgress') {
                return (
                    <div className={`grid-item21`}>
                        <TimeProgress
                            id={item.id}
                            edit={edit}
                            widthNum={widthNum}
                            heightNum={heightNum}
                            cardStyle='defaultStyle'
                        />
                    </div>
                )
            }
        }
        else if (edit === '') {
            if (item.type === 'link') {
                return (
                    <div
                        className={`grid-item${item.size}`}
                        style={{
                            position: 'relative', width: '100%', height: '100%'
                        }}
                    >
                        <CloseCircleTwoTone
                            onClick={deleteCard}
                            twoToneColor='red'
                            className='delete-button-style' />
                        <EditCard
                            id={id}
                            linkList={linkList}
                            setLinkList={setLinkList}
                            setBackgroundColor={setBackgroundColor}
                        />
                        <div style={{
                            overflow: 'hidden',
                            position: 'relative',
                            borderRadius: `${radius}px`,
                            display: 'flex',
                            width: 'calc(100% - 20px)',
                            height: 'calc(100% - 20px)',
                            padding: '10px',
                            background: backgroundColor
                        }}>
                            <img style={imgStyle} src={item.icon} alt=''></img>
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
                                alt=''
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
                        </div>
                    </div>
                )
            } else if (item.type === 'note') {
                return (
                    <div
                        className={`grid-item23`}
                        style={{
                            position: 'relative',
                        }}>
                        <CloseCircleTwoTone
                            onClick={deleteCard}
                            twoToneColor='red'
                            className='delete-button-style' />
                        <Note
                            heightNum={heightNum}
                            id={item.id} />
                    </div>
                )
            } else if (item.type === 'timeProgress') {
                return (
                    <div
                        className={`grid-item21`}
                        style={{
                            position: 'relative',
                        }}>
                        <CloseCircleTwoTone
                            onClick={deleteCard}
                            twoToneColor='red'
                            className='delete-button-style' />
                        <TimeProgress
                            id={item.id}
                            edit={edit}
                            widthNum={widthNum}
                            heightNum={heightNum}
                            cardStyle='defaultStyle'
                        />
                    </div>
                )
            }
        }
    }

    return (
        howToShow()
    )
}

export default DefaultStyle;