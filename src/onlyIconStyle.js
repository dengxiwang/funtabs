import { CloseCircleTwoTone } from '@ant-design/icons';
import { message, Tooltip } from 'antd';
import EditCard from './editCard';
import './funtabs.css';

const imgStyle = {
    width: 'auto',
    height: '100%',
    WebkitUserDrag: 'none',
    zIndex: '1'
}

const OnlyIconStyle = (props) => {
    const { id, edit, item, linkList, setLinkList, radius } = props;

    function deleteCard() {
        const ListData = [...linkList]
        ListData.splice(id, 1)
        setLinkList(ListData)
        message.success('【' + item.label + '】' + '卡片删除成功')
    }

    if (edit === 'none') {
        return (
            <a
                className={'grid-item' + item.size}
                href={item.link}
                target='_blank'
                style={{
                    borderRadius: radius + 'px',
                    padding: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    width: '100%',
                    height: '100%',
                    background: '#ffffff',
                }}
                rel="noreferrer">
                <Tooltip title={item.label}>
                    <img style={imgStyle} src={item.icon} alt=''></img>
                </Tooltip>
                <img style={{ position: 'absolute', width: 'auto', height: '120%', filter: 'blur(30px)', }} src={item.icon} alt=''></img>
            </a>
        )
    } else if (edit === '') {
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
                    label={item.label}
                    link={item.link}
                    size={item.size}
                    icon={item.icon}
                />
                <div style={{
                    overflow: 'hidden',
                    position: 'relative',
                    borderRadius: radius + 'px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px',
                    width: '100%',
                    height: '100%',
                    background: '#ffffff'
                }}>
                    <Tooltip title={item.label}>
                        <img style={imgStyle} src={item.icon} alt=''></img>
                    </Tooltip>
                    <img style={{ position: 'absolute', width: 'auto', height: '120%', filter: 'blur(30px)' }} src={item.icon} alt=''></img>
                </div>
            </div>
        )
    }

}

export default OnlyIconStyle;