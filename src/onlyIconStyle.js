import './funtabs.css';
import LinkCard from './linkCard';
import Note from './note';
import TimeProgress from './timeProgress';

const OnlyIconStyle = (props) => {
    const { id, edit, item, linkList, setLinkList, radius, widthNum, heightNum, cardStyle } = props;

    if (item.type === 'link') {
        return (
            <div
                className={`grid-item${item.size}`}
                style={{
                    position: 'relative',
                }}>
                <LinkCard
                    id={id}
                    edit={edit}
                    item={item}
                    linkList={linkList}
                    setLinkList={setLinkList}
                    radius={radius}
                    heightNum={heightNum}
                    cardStyle={cardStyle}
                />
            </div>
        )
    } else if (item.type === 'note') {
        return (
            <div
                className={`grid-item33`}
                style={{
                    position: 'relative',
                }}
            >
                <Note
                    heightNum={heightNum}
                    edit={edit}
                    cardStyle={cardStyle}
                    id={id}
                    item={item}
                    linkList={linkList}
                    setLinkList={setLinkList}
                />
            </div>
        )
    } else if (item.type === 'timeProgress') {
        return (
            <div
                className={`grid-item22`}
                style={{
                    position: 'relative',
                }}
            >
                <TimeProgress
                    id={id}
                    edit={edit}
                    widthNum={widthNum}
                    heightNum={heightNum}
                    cardStyle={cardStyle}
                    linkList={linkList}
                    item={item}
                    setLinkList={setLinkList}
                />
            </div>
        )
    }
}

export default OnlyIconStyle;