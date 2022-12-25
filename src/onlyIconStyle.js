import { CloseCircleTwoTone } from '@ant-design/icons';
import { message, Tooltip } from 'antd';
import { useState } from 'react';
import EditCard from './editCard';
import './funtabs.css';
import Note from './note';
import TimeProgress from './timeProgress';



const OnlyIconStyle = (props) => {
    const { id, edit, item, linkList, setLinkList, radius, widthNum, heightNum, } = props;
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
        width: `calc(${heightNum}px - 12px)`,
        height: `calc(${heightNum}px - 12px)`,
        WebkitUserDrag: 'none',
        zIndex: '1'
    }

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
                <a
                    className={`grid-item${item.size}`}
                    href={item.link}
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
                        <img style={imgStyle} src={item.icon} alt=''></img>
                    </Tooltip>
                    {/* <img style={{ position: 'absolute', width: 'auto', height: '120%', filter: 'blur(30px)', }} src={item.icon} alt=''></img> */}
                </a>
            )
        } else if (item.type === 'note') {
            return (
                <div className={`grid-item33`}>
                    <Note
                        heightNum={heightNum}
                        id={item.id} />
                </div>
            )
        } else if (item.type === 'timeProgress') {
            return (
                <div className={`grid-item22`}>
                    <TimeProgress
                        id={item.id}
                        edit={edit}
                        widthNum={widthNum}
                        heightNum={heightNum}
                        cardStyle='onlyIconStyle'
                    />
                </div>
            )
        }
    } else if (edit === '') {
        if (item.type === 'link') {
            return (
                <div
                    className={`grid-item${item.size}`}
                    style={{ position: 'relative', width: '100%', height: '100%' }}
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
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '10px',
                        width: 'calc(100% - 20px)',
                        height: 'calc(100% - 20px)',
                        background: backgroundColor
                    }}>
                        <img style={imgStyle} src={item.icon} alt=''></img>
                    </div>
                </div>
            )
        } else if (item.type === 'note') {
            return (
                <div
                    className={`grid-item33`}
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
                    className={`grid-item22`}
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
                        cardStyle='onlyIconStyle'
                    />
                </div>
            )
        }
    }

}

export default OnlyIconStyle;