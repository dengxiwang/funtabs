import { CloseCircleTwoTone } from '@ant-design/icons';
import { message } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { useState } from 'react';
import EditCard from './editCard';
import './funtabs.css';
import Note from './note';
import TimeProgress from './timeProgress';

const PhoneStyle = (props) => {
    const { id, edit, item, linkList, setLinkList, radius, widthNum, heightNum, } = props;
    const [ellipsis] = useState('ture');
    const textSize = '12px'
    const [backgroundColor, setBackgroundColor] = useState(
        () => {
            if (item.backgroundColor) {
                return item.backgroundColor
            } else {
                return '#ffffff'
            }
        }
    );

    function deleteCard() {
        const ListData = [...linkList]
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

    if (edit === 'none') {
        if (item.type === 'link') {
            return (
                <div
                    className={`grid-item${item.size}`}
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            height: `calc(${heightNum}px - 22px)`,
                            width: '100%',
                            justifyContent: 'center'
                        }}>
                        <a
                            href={item.link}
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
                                alt={item.label}
                                style={{
                                    width: `100%`,
                                    height: `100%`,
                                }}
                            ></img>
                        </a>
                    </div>
                    <Paragraph
                        style={{ fontWeight: 'bold', fontSize: textSize, marginBottom: '0px', textAlign: 'center', color: '#fff', mixBlendMode: 'difference' }}
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
                </div>
            )
        } else if (item.type === 'note') {
            return (
                <div
                    className={`grid-item33`}
                    style={{
                        margin: '0px 11px 22px 11px'
                    }}>
                    <Note
                        heightNum={heightNum - 22}
                        id={item.id} />
                    <Paragraph
                        style={{ fontWeight: 'bold', fontSize: textSize, marginBottom: '0px', textAlign: 'center', color: '#fff', mixBlendMode: 'difference' }}
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
                </div>
            )
        } else if (item.type === 'timeProgress') {
            return (
                <div
                    className={`grid-item22`}
                    style={{
                        margin: '0px 11px 22px 11px'
                    }}
                >
                    <TimeProgress
                        id={item.id}
                        edit={edit}
                        widthNum={widthNum - 22}
                        heightNum={heightNum - 22}
                        cardStyle='onlyIconStyle'
                    />
                    <Paragraph
                        style={{ fontWeight: 'bold', fontSize: textSize, marginBottom: '0px', textAlign: 'center', color: '#fff', mixBlendMode: 'difference' }}
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
                </div>
            )
        }
    } else if (edit === '') {
        if (item.type === 'link') {
            return (
                <div
                    className={`grid-item${item.size}`}
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
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
                    <div
                        style={{
                            display: 'flex',
                            height: `calc(${heightNum}px - 22px)`,
                            width: '100%',
                            justifyContent: 'center'
                        }}>
                        <a
                            href={item.link}
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
                                alt={item.label}
                                style={{
                                    width: `100%`,
                                    height: `100%`,
                                }}
                            ></img>
                        </a>
                    </div>
                    <Paragraph
                        style={{ fontWeight: 'bold', fontSize: textSize, marginBottom: '0px', textAlign: 'center', color: '#fff', mixBlendMode: 'difference' }}
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
                </div>
            )
        } else if (item.type === 'note') {
            return (
                <div
                    className={`grid-item33`}
                    style={{
                        position: 'relative',
                        margin: '0px 11px 22px 11px'
                    }}>
                    <CloseCircleTwoTone
                        onClick={deleteCard}
                        twoToneColor='red'
                        className='delete-button-style' />
                    <Note
                        heightNum={heightNum - 22}
                        id={item.id} />
                    <Paragraph
                        style={{ fontWeight: 'bold', fontSize: textSize, marginBottom: '0px', textAlign: 'center', color: '#fff', mixBlendMode: 'difference' }}
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
                </div>
            )
        } else if (item.type === 'timeProgress') {
            return (
                <div
                    className={`grid-item22`}
                    style={{
                        position: 'relative',
                        margin: '0px 11px 22px 11px'
                    }}>
                    <CloseCircleTwoTone
                        onClick={deleteCard}
                        twoToneColor='red'
                        className='delete-button-style' />
                    <TimeProgress
                        id={item.id}
                        edit={edit}
                        widthNum={widthNum - 22}
                        heightNum={heightNum - 22}
                        cardStyle='onlyIconStyle'
                    />
                    <Paragraph
                        style={{ fontWeight: 'bold', fontSize: textSize, marginBottom: '0px', textAlign: 'center', color: '#fff', mixBlendMode: 'difference' }}
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
                </div>
            )
        }
    }

}

export default PhoneStyle;