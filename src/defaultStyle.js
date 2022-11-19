import { CloseCircleTwoTone } from '@ant-design/icons';
import { message, Typography } from 'antd';
import { useEffect, useState } from 'react';
import EditCard from './editCard';
import './funtabs.css';
const { Text } = Typography;

const imgStyle = {
    width: 'auto',
    height: '100%',
    margin: '0px 10px 0px 0px',
    WebkitUserDrag: 'none',
}

const DefaultStyle = (props) => {
    const { id, edit, item, heightNum, linkList, setLinkList, radius, } = props;
    const [ellipsis] = useState('ture');
    const ListData = [...linkList]

    function deleteCard() {
        ListData.splice(id, 1)
        setLinkList(ListData)
        message.success('【' + item.label + '】' + '卡片删除成功')
    }

    useEffect(() => {
    }, [])

    const howToShow = () => {
        if (edit === 'none') {
            return (
                <a
                    className={'grid-item' + item.size}
                    href={item.link}
                    target='_blank'
                    style={{ borderRadius: radius + 'px', display: 'flex', padding: '10px', position: 'relative', overflow: 'hidden', width: '100%', height: '100%', background: '#ffffff' }}
                    rel="noreferrer">
                    <img id="lineHeight" style={imgStyle} src={item.icon} alt=''></img>
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
                    <Text
                        style={{ lineHeight: parseInt(heightNum) - 20 + 'px', zIndex: '10', }}
                        strong
                        ellipsis={
                            ellipsis
                                ? {
                                    tooltip: { title: item.label, color: 'blue' }
                                } : false
                        }
                    >
                        {item.label}
                    </Text>
                </a>
            )
        }
        else if (edit === '') {
            return (
                <div
                    className={'grid-item' + item.size}
                    style={{ position: 'relative' }}
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
                    <div style={{ overflow: 'hidden', position: 'relative', borderRadius: radius + 'px', display: 'flex', padding: '10px', width: '100%', height: '100%', background: '#ffffff' }}>
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
                        <div className='edit-show-div'>
                            <img id="lineHeight" style={imgStyle} src={item.icon} alt=''></img>
                            <Text
                                style={{ lineHeight: parseInt(heightNum) - 20 + 'px', zIndex: '10', }}
                                strong
                                ellipsis={
                                    ellipsis
                                        ? {
                                            tooltip: { title: item.label, color: 'blue' }
                                        } : false
                                }
                            >
                                {item.label}
                            </Text>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        howToShow()
    )
}

export default DefaultStyle;