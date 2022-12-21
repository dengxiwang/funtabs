import { CloseCircleTwoTone } from '@ant-design/icons';
import { message } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import { useEffect, useState } from 'react';
import EditCard from './editCard';
import './funtabs.css';
import Note from './note';
import { default as TimeProgress } from './timeProgress';

const imgStyle = {
    width: 'auto',
    height: '100%',
    margin: '0px 10px 0px 0px',
    WebkitUserDrag: 'none',
}

const DefaultStyle = (props) => {
    const { id, edit, item, linkList, setLinkList, radius, heightNum, } = props;
    const [ellipsis] = useState('ture');
    const ListData = [...linkList]

    function deleteCard() {
        ListData.splice(id, 1)
        setLinkList(ListData)
        message.success(`【 ${item.label} 】卡片删除成功`)
    }

    useEffect(() => {
    }, [])

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
                            background: '#ffffff',
                        }}
                        rel="noreferrer">
                        <img style={imgStyle} src={item.icon} alt=''></img>
                        <div style={{ display: 'flex', marginBottom: '-14px', alignItems: 'center' }}>
                            <Paragraph
                                style={{ fontWeight: 'bold' }}
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
                        <TimeProgress />
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
                        />
                        <div style={{
                            overflow: 'hidden',
                            position: 'relative',
                            borderRadius: `${radius}px`,
                            display: 'flex',
                            width: 'calc(100% - 20px)',
                            height: 'calc(100% - 20px)',
                            padding: '10px',
                            background: '#ffffff'
                        }}>
                            <img style={imgStyle} src={item.icon} alt=''></img>
                            <div style={{ display: 'flex', marginBottom: '-14px', alignItems: 'center' }}>
                                <Paragraph
                                    style={{ fontWeight: 'bold' }}
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
                        <TimeProgress />
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