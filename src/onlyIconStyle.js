import { CloseCircleTwoTone } from '@ant-design/icons';
import { message, Tooltip } from 'antd';
import { useState } from 'react';
import EditCard from './editCard';
import './funtabs.css';
import Note from './note';

const imgStyle = {
    width: 'auto',
    height: '100%',
    WebkitUserDrag: 'none',
    zIndex: '1'
}

const OnlyIconStyle = (props) => {
    const { id, edit, item, linkList, setLinkList, radius, heightNum, } = props;
    const [backgroundcolor] = useState('#ffffff')

    function deleteCard() {
        const ListData = [...linkList]
        ListData.splice(id, 1)
        setLinkList(ListData)
        message.success(`【 ${item.label} 】卡片删除成功`)
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
                        background: backgroundcolor,
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
                        label={item.label}
                        link={item.link}
                        size={item.size}
                        icon={item.icon}
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
                        background: backgroundcolor
                    }}>
                        {/* <Tooltip title={item.label} color='blue'> */}
                        <img style={imgStyle} src={item.icon} alt=''></img>
                        {/* </Tooltip> */}
                        {/* <img style={{ position: 'absolute', width: 'auto', height: '120%', filter: 'blur(30px)' }} src={item.icon} alt=''></img> */}
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
        }
    }

}

export default OnlyIconStyle;